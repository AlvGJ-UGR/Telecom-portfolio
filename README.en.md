# 📡 RF & Telecommunications Engineering Portfolio

🇬🇧 English | 🇪🇸 [Versión en español](README.md)

> Hands-on RF, antenna, SDR and communication systems projects — designed, built, and measured end to end.

**🌐 [View the live portfolio site →](https://alvgj-ugr.github.io/telecom-portfolio/)** · 📋 [Current status](PROJECT_STATE.md) · 🗺️ [Detailed roadmap](docs/roadmap.md)

<p>
  <img src="projects/01-sdr-fundamentals/assets/coverage_demo.png" width="280" alt="ADS-B coverage (demo)">
  <img src="projects/02-antenna-design-vna/assets/biquad_reflector_pattern.png" width="280" alt="Simulated biquad pattern with reflector">
  <img src="projects/03-satellite-ground-station/rotor/rotor_preview.png" width="280" alt="Project 03 Az/El rotor">
</p>

## How to read this repository

1. **Just want the overview?** → the [portfolio site](https://alvgj-ugr.github.io/telecom-portfolio/) summarizes all 4 projects with charts and CAD.
2. **Want the technical detail?** → each folder under `projects/` has its own README with methodology, simulations, and data.
3. **Want to know what's being worked on right now?** → [`PROJECT_STATE.md`](PROJECT_STATE.md) (real, session-by-session status) and [`MASTER_PLAN.md`](MASTER_PLAN.md) (phased plan).

## About me

Telecommunications Engineering student (Universidad de Granada). This repository documents personal projects in RF, antenna design, SDR, and embedded communication systems, built in my free time with my own equipment: 3D printer, soldering station, SDR dongle, and a NanoVNA.

Every project follows the same engineering loop: **design → simulate → fabricate → measure → iterate**, backed by real scripts, data, and CAD sources in the repo — not just screenshots.

## 🧰 Tools & Equipment

| Category | Tools |
|---|---|
| RF / Measurement | RTL-SDR Blog v3, NanoVNA |
| Fabrication | 3D printer (PLA/PETG), soldering station |
| Software | GNU Radio, SDR++/SDR#, KiCad, 4nec2 / PyNEC, Python (NumPy/SciPy/Matplotlib) |
| Embedded | ESP32, Arduino, LoRa modules SX1276/78 |
| Protocols | ADS-B, LoRa (Meshtastic), APT/LRPT, MQTT, rotctld/Hamlib |

## 📂 Projects

| # | Project | Status | Frequency | Highlight |
|---|---|---|---|---|
| 01 | [SDR Fundamentals: Spectrum + ADS-B](projects/01-sdr-fundamentals/) | 🟡 In progress | 1090 MHz | Full pipeline validated on real demo data; RTL-SDR still pending |
| 02 | [Antenna Design & VNA Measurement](projects/02-antenna-design-vna/) | 🟡 In progress | 868 MHz / 2.4 GHz | 3 antennas (Yagi/biquad/helix) simulated in NEC2, CAD geometrically validated |
| 03 | [Weather Satellite Ground Station](projects/03-satellite-ground-station/) | 🟡 In progress — priority | 137 MHz | Az/El rotor with real homing + standalone Skyfield tracking client |
| 04 | [LoRa/Meshtastic Alpine Network](projects/04-alpine-mesh-tracking/) | 🔵 Planned | 868 MHz | Explicit assumptions table, pending physical verification |

**Status legend:** 🔵 Planned · 🟡 In progress · 🟢 Completed

## 🔗 Related project (separate repository)

- **[wifi-csi-presence-sensing](https://github.com/AlvGJ-UGR/wifi-csi-presence-sensing)** — WiFi CSI presence sensing on ESP32 (different line of work, own repo).

## 🎯 Technical skills demonstrated

RF antenna design (NEC2 simulation, fabrication, VNA measurement) · SDR and signal processing · embedded systems (ESP32, motor control, homing) · orbital mechanics and satellite tracking · honest technical documentation, including simulation-vs-measurement discrepancies when they show up.

## 📫 Contact

- Email: alvarogj1@correo.ugr.es
- LinkedIn / CV: *(add links)*

## License

MIT — see [LICENSE](LICENSE).
