"""
coverage_plot.py
Genera un gráfico polar de cobertura (rumbo vs. alcance, coloreado por
altitud) a partir del CSV producido por adsb_logger.py.

Este gráfico es la evidencia visual del rendimiento real de la antena:
alcance máximo alcanzado y en qué direcciones, útil para comparar contra
el alcance teórico esperado (línea de vista / horizonte de radio).

Proyecto 01 - Fundamentos SDR
Portfolio de Ingeniería de Telecomunicaciones

Uso:
    python coverage_plot.py --csv data/adsb_log.csv --output assets/coverage.png
"""
import argparse

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


def parse_args():
    p = argparse.ArgumentParser(description="Gráfico polar de cobertura ADS-B")
    p.add_argument("--csv", type=str, required=True, help="CSV generado por adsb_logger.py")
    p.add_argument("--output", type=str, default="assets/coverage.png", help="Ruta de salida del PNG")
    p.add_argument("--station-height-m", type=float, default=15.0,
                    help="Altura de la antena sobre el terreno (m), para la línea de horizonte de radio teórico")
    return p.parse_args()


def radio_horizon_km(antenna_height_m, aircraft_alt_m):
    """Distancia de horizonte de radio (línea de vista) para una antena y
    un avión a una altitud dada, usando el factor 4/3 de refracción
    atmosférica estándar: d(km) = 4.12 * (sqrt(h1_m) + sqrt(h2_m))"""
    return 4.12 * (np.sqrt(max(antenna_height_m, 0)) + np.sqrt(max(aircraft_alt_m, 0)))


def main():
    args = parse_args()
    df = pd.read_csv(args.csv)

    if df.empty:
        print("El CSV no contiene detecciones todavía.")
        return

    df = df.dropna(subset=["range_km", "bearing_deg"])
    theta = np.radians(df["bearing_deg"].values)
    r = df["range_km"].values
    alt = pd.to_numeric(df["alt_baro_ft"], errors="coerce").fillna(0).values

    fig = plt.figure(figsize=(8, 8))
    ax = fig.add_subplot(111, projection="polar")
    ax.set_theta_zero_location("N")
    ax.set_theta_direction(-1)  # sentido horario, como una brújula

    sc = ax.scatter(theta, r, c=alt, cmap="viridis", s=18, alpha=0.75)
    cbar = fig.colorbar(sc, ax=ax, pad=0.1)
    cbar.set_label("Altitud (ft)")

    max_range = r.max() if len(r) else 0
    ax.set_title(
        f"Cobertura ADS-B — {len(df)} detecciones, alcance máx: {max_range:.1f} km",
        pad=20,
    )
    ax.set_rlabel_position(135)

    fig.tight_layout()
    fig.savefig(args.output, dpi=150)
    print(f"Gráfico de cobertura guardado en {args.output}")

    # Resumen estadístico en consola, útil para pegarlo directo al README
    print("\n--- Resumen para el README ---")
    print(f"Detecciones totales: {len(df)}")
    print(f"Aviones únicos (hex): {df['hex'].nunique()}")
    print(f"Alcance máximo: {max_range:.1f} km")
    print(f"Alcance medio: {r.mean():.1f} km")
    print(f"Altitud media de detección: {alt.mean():.0f} ft")


if __name__ == "__main__":
    main()
