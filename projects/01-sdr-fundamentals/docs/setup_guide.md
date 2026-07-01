# Guía de instalación

## 1. Drivers del RTL-SDR (Linux)

El chip RTL2832U viene reconocido por defecto como sintonizador de TV DVB-T, hay que bloquear ese driver para poder usarlo como SDR genérico:

```bash
sudo tee /etc/modprobe.d/blacklist-rtlsdr.conf << EOF
blacklist dvb_usb_rtl28xxu
blacklist rtl2832
blacklist rtl2830
EOF

sudo apt update
sudo apt install -y rtl-sdr librtlsdr-dev

# Reglas udev para poder usar el dongle sin sudo
sudo tee /etc/udev/rules.d/20-rtlsdr.rules << EOF
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bda", ATTRS{idProduct}=="2838", GROUP="plugdev", MODE="0666"
EOF
sudo udevadm control --reload-rules
sudo udevadm trigger

# Desconecta y reconecta el dongle, luego verifica:
rtl_test -t
```

## 2. Entorno Python

```bash
cd projects/01-sdr-fundamentals
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 3. dump1090 (decodificación ADS-B)

Se recomienda `dump1090-fa` (mantenimiento activo, expone `aircraft.json` vía HTTP):

```bash
sudo apt install -y build-essential debhelper
git clone https://github.com/flightaware/dump1090.git
cd dump1090
sudo apt install -y librtlsdr-dev libusb-1.0-0-dev pkg-config
make
./dump1090 --interactive --net
```

Por defecto expone:
- Mapa web: `http://localhost:8080`
- Datos JSON: `http://localhost:8080/data/aircraft.json`

## 4. Verificación rápida sin hardware (modo demo)

Antes de tener el dongle o dump1090 corriendo, puedes validar que todo el código funciona:

```bash
python3 src/spectrum_analyzer.py --demo --output assets/spectrum_demo.png
python3 src/adsb_logger.py --demo --lat TU_LATITUD --lon TU_LONGITUD --duration 60 --csv-out data/adsb_log_demo.csv
python3 src/coverage_plot.py --csv data/adsb_log_demo.csv --output assets/coverage_demo.png
```

## 5. Ejecución real

```bash
# Terminal 1: dump1090 corriendo
./dump1090 --interactive --net

# Terminal 2: espectro en vivo
python3 src/spectrum_analyzer.py --freq 1090e6 --gain 40

# Terminal 3: logging de detecciones (usa TUS coordenadas reales)
python3 src/adsb_logger.py --lat TU_LATITUD --lon TU_LONGITUD --duration 3600

# Al terminar, genera el gráfico de cobertura
python3 src/coverage_plot.py --csv data/adsb_log.csv --output assets/coverage.png
```

## 6. Impresión del soporte de antena

1. Abrir `antenna/mount.scad` en [OpenSCAD](https://openscad.org/) (gratuito).
2. Ajustar `connector_hole` al diámetro real de tu conector SMA panel-mount.
3. Exportar a STL (`F6` para renderizar, luego exportar).
4. **Antes de laminar**: comprobar que la malla es manifold (la mayoría de slicers como PrusaSlicer/Cura lo indican automáticamente y pueden auto-reparar mallas con solapes menores).
5. Material recomendado: PETG si la antena queda expuesta a la intemperie.
