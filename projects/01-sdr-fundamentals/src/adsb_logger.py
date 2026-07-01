"""
adsb_logger.py
Registra en CSV los aviones detectados vía ADS-B a través de dump1090,
calculando distancia y rumbo (bearing) reales desde la estación receptora.

Proyecto 01 - Fundamentos SDR
Portfolio de Ingeniería de Telecomunicaciones

Requisito previo: dump1090 (o dump1090-fa) corriendo y exponiendo
aircraft.json, típicamente en http://localhost:8080/data/aircraft.json

Uso:
    python adsb_logger.py --lat 40.4168 --lon -3.7038 --duration 3600
    python adsb_logger.py --demo --lat 40.4168 --lon -3.7038 --duration 60

(--demo genera detecciones sintéticas para poder probar el pipeline
 completo -incluida la geometría de distancia/rumbo- sin tener dump1090
 corriendo todavía)
"""
import argparse
import csv
import math
import time
from pathlib import Path

import numpy as np


EARTH_RADIUS_KM = 6371.0


def parse_args():
    p = argparse.ArgumentParser(description="Logger de detecciones ADS-B con geometría respecto a la estación")
    p.add_argument("--lat", type=float, required=True, help="Latitud de la estación receptora (grados)")
    p.add_argument("--lon", type=float, required=True, help="Longitud de la estación receptora (grados)")
    p.add_argument("--url", type=str, default="http://localhost:8080/data/aircraft.json",
                    help="URL del endpoint aircraft.json de dump1090")
    p.add_argument("--interval", type=float, default=5.0, help="Segundos entre consultas")
    p.add_argument("--duration", type=float, default=3600.0, help="Duración total del logging en segundos")
    p.add_argument("--csv-out", type=str, default="data/adsb_log.csv", help="Ruta del CSV de salida")
    p.add_argument("--demo", action="store_true", help="Genera detecciones sintéticas, sin dump1090 real")
    return p.parse_args()


def haversine_km(lat1, lon1, lat2, lon2):
    """Distancia great-circle entre dos puntos, en km."""
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    return 2 * EARTH_RADIUS_KM * math.asin(math.sqrt(a))


def bearing_deg(lat1, lon1, lat2, lon2):
    """Rumbo inicial (bearing) desde el punto 1 al punto 2, en grados [0, 360)."""
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    dlon = lon2 - lon1
    x = math.sin(dlon) * math.cos(lat2)
    y = math.cos(lat1) * math.sin(lat2) - math.sin(lat1) * math.cos(lat2) * math.cos(dlon)
    return (math.degrees(math.atan2(x, y)) + 360) % 360


def fetch_aircraft_real(url):
    import requests
    resp = requests.get(url, timeout=5)
    resp.raise_for_status()
    data = resp.json()
    return data.get("aircraft", [])


def fetch_aircraft_demo(rng, station_lat, station_lon, n=None):
    """Genera aviones sintéticos distribuidos en distancia/rumbo/altitud
    plausibles, para poder probar el resto del pipeline (CSV, plot de
    cobertura) sin tener dump1090 corriendo."""
    n = n if n is not None else rng.integers(0, 6)
    aircraft = []
    for _ in range(n):
        range_km = rng.uniform(2, 60)
        bearing = rng.uniform(0, 360)
        lat = station_lat + (range_km / EARTH_RADIUS_KM) * math.degrees(math.cos(math.radians(bearing)))
        lon = station_lon + (range_km / EARTH_RADIUS_KM) * math.degrees(math.sin(math.radians(bearing))) / math.cos(math.radians(station_lat))
        aircraft.append({
            "hex": f"{rng.integers(0, 0xFFFFFF):06x}",
            "flight": f"DEMO{rng.integers(100, 999)}",
            "lat": lat,
            "lon": lon,
            "alt_baro": int(rng.uniform(1000, 38000)),
        })
    return aircraft


def main():
    args = parse_args()
    rng = np.random.default_rng()

    csv_path = Path(args.csv_out)
    csv_path.parent.mkdir(parents=True, exist_ok=True)
    is_new_file = not csv_path.exists()

    fields = ["timestamp", "hex", "flight", "lat", "lon", "alt_baro_ft", "range_km", "bearing_deg"]

    n_logged = 0
    t_start = time.time()
    with open(csv_path, "a", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        if is_new_file:
            writer.writeheader()

        while time.time() - t_start < args.duration:
            try:
                if args.demo:
                    aircraft = fetch_aircraft_demo(rng, args.lat, args.lon)
                else:
                    aircraft = fetch_aircraft_real(args.url)
            except Exception as e:
                print(f"[AVISO] Error consultando dump1090: {e}")
                aircraft = []

            ts = time.time()
            for ac in aircraft:
                lat, lon = ac.get("lat"), ac.get("lon")
                if lat is None or lon is None:
                    continue  # sin posición decodificada aún (normal en ADS-B)
                r_km = haversine_km(args.lat, args.lon, lat, lon)
                brg = bearing_deg(args.lat, args.lon, lat, lon)
                writer.writerow({
                    "timestamp": ts,
                    "hex": ac.get("hex", ""),
                    "flight": (ac.get("flight") or "").strip(),
                    "lat": lat,
                    "lon": lon,
                    "alt_baro_ft": ac.get("alt_baro", ""),
                    "range_km": round(r_km, 2),
                    "bearing_deg": round(brg, 1),
                })
                n_logged += 1
            f.flush()
            time.sleep(args.interval)

    print(f"Logging finalizado. {n_logged} detecciones guardadas en {csv_path}")


if __name__ == "__main__":
    main()
