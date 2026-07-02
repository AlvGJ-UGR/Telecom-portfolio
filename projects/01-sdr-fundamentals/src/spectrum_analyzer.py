"""
spectrum_analyzer.py
Analizador de espectro en tiempo real usando RTL-SDR.

Proyecto 01 - Fundamentos SDR
Portfolio de Ingeniería de Telecomunicaciones

Uso:
    python spectrum_analyzer.py --freq 1090e6 --rate 2.4e6 --gain 40
    python spectrum_analyzer.py --demo --output espectro_demo.png

Requiere: pyrtlsdr, numpy, scipy, matplotlib
(--demo funciona sin pyrtlsdr ni hardware conectado, generando IQ sintético
 para poder probar y validar todo el pipeline antes de tener el dongle en mano)
"""
import argparse

import numpy as np
from scipy.signal import welch
import matplotlib
import matplotlib.pyplot as plt


def parse_args():
    p = argparse.ArgumentParser(description="Analizador de espectro en tiempo real con RTL-SDR")
    p.add_argument("--freq", type=float, default=1090e6,
                    help="Frecuencia central en Hz (default: 1090 MHz, ADS-B)")
    p.add_argument("--rate", type=float, default=2.4e6,
                    help="Sample rate en Hz (default: 2.4 MSps)")
    p.add_argument("--gain", type=str, default="auto",
                    help="Ganancia del tuner en dB, o 'auto'")
    p.add_argument("--nfft", type=int, default=2048,
                    help="Tamaño de FFT para el cálculo de PSD (Welch)")
    p.add_argument("--nsamples", type=int, default=256 * 1024,
                    help="Muestras IQ por captura")
    p.add_argument("--demo", action="store_true",
                    help="Modo demo: genera IQ sintético sin hardware SDR")
    p.add_argument("--output", type=str, default=None,
                    help="Si se indica, guarda un único frame como PNG en vez de animar en vivo")
    return p.parse_args()


def get_iq_samples_demo(n_samples, sample_rate, rng):
    """Genera IQ sintético: ruido blanco + un par de tonos simulados,
    para poder probar y demostrar el pipeline sin hardware conectado."""
    t = np.arange(n_samples) / sample_rate
    noise = (rng.normal(0, 1, n_samples) + 1j * rng.normal(0, 1, n_samples)) * 0.05
    tone1 = 0.6 * np.exp(2j * np.pi * 0.15e6 * t)   # tono simulado a +150 kHz del centro
    tone2 = 0.3 * np.exp(2j * np.pi * -0.4e6 * t)   # tono simulado a -400 kHz del centro
    return (noise + tone1 + tone2).astype(np.complex64)


def get_sdr(freq, rate, gain):
    """Inicializa el RTL-SDR real. Import diferido para que --demo
    funcione en un equipo sin pyrtlsdr instalado."""
    from rtlsdr import RtlSdr
    sdr = RtlSdr()
    sdr.sample_rate = rate
    sdr.center_freq = freq
    sdr.gain = gain if gain == "auto" else float(gain)
    return sdr


def compute_psd(iq, sample_rate, nfft):
    freqs, psd = welch(iq, fs=sample_rate, nperseg=min(nfft, len(iq)), return_onesided=False)
    freqs = np.fft.fftshift(freqs)
    psd = np.fft.fftshift(psd)
    psd_db = 10 * np.log10(psd + 1e-20)
    return freqs, psd_db


def main():
    args = parse_args()
    rng = np.random.default_rng(42)

    sdr = None
    if not args.demo:
        try:
            sdr = get_sdr(args.freq, args.rate, args.gain)
        except Exception as e:
            print(f"[AVISO] No se pudo inicializar el RTL-SDR ({e}).")
            print("Cambiando a modo demo (IQ simulado) para no bloquear la ejecución.")

    def capture_once():
        if sdr is not None:
            iq = sdr.read_samples(args.nsamples)
        else:
            iq = get_iq_samples_demo(args.nsamples, args.rate, rng)
        freqs, psd_db = compute_psd(iq, args.rate, args.nfft)
        freqs_mhz = (freqs + args.freq) / 1e6
        return freqs_mhz, psd_db

    fig, ax = plt.subplots(figsize=(10, 5))
    ax.set_xlabel("Frecuencia (MHz)")
    ax.set_ylabel("Densidad espectral de potencia (dB, unidades relativas)")
    ax.set_title(f"Espectro en vivo — fc = {args.freq / 1e6:.3f} MHz")
    ax.grid(True, alpha=0.3)

    if args.output:
        freqs_mhz, psd_db = capture_once()
        ax.plot(freqs_mhz, psd_db, linewidth=1.2)
        ax.set_xlim(freqs_mhz.min(), freqs_mhz.max())
        fig.tight_layout()
        fig.savefig(args.output, dpi=150)
        print(f"Espectro guardado en {args.output}")
        return

    import matplotlib.animation as animation
    line, = ax.plot([], [], linewidth=1.2)

    def update(_frame):
        freqs_mhz, psd_db = capture_once()
        line.set_data(freqs_mhz, psd_db)
        ax.set_xlim(freqs_mhz.min(), freqs_mhz.max())
        ax.set_ylim(psd_db.min() - 5, psd_db.max() + 5)
        return (line,)

    ani = animation.FuncAnimation(fig, update, interval=200, blit=False, cache_frame_data=False)
    plt.show()


if __name__ == "__main__":
    main()
