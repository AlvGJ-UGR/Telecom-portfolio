# 📡 RF & Telecommunications Engineering Portfolio

🇬🇧 English | 🇪🇸 [Versión en español](README.md)

> Hands-on RF, antenna, SDR and communication systems projects — designed, built, and measured end to end.

---

## About me

I'm a Telecommunications Engineering student. This repository documents a series of personal projects focused on RF, antenna design, software-defined radio (SDR), and embedded communication systems, built in my free time with my own equipment: a 3D printer, a soldering station, an SDR dongle, and a vector network analyzer (NanoVNA).

The goal isn't just to "make it work" — each project follows the full engineering process: **design → simulation → fabrication → measurement → iteration → documentation**, backed by real data and plots, not just screenshots.

---

## 🧰 Tools & Equipment

| Category | Tools |
|---|---|
| RF / Measurement | RTL-SDR Blog v3, NanoVNA |
| Fabrication | 3D printer (PLA/PETG), soldering station |
| Software | GNU Radio, SDR++/SDR#, KiCad, 4nec2, Python (NumPy/SciPy/Matplotlib) |
| Embedded | ESP32, LoRa modules SX1276/78 |
| Protocols studied | ADS-B, LoRaWAN, APT/LRPT (weather satellites), MQTT |

---

## 📂 Projects

| # | Project | Status | Short description | Key skills |
|---|---|---|---|---|
| 01 | [SDR Fundamentals: Spectrum + ADS-B](projects/01-sdr-fundamentals/) | 🟡 In progress | Live spectrum analyzer and aircraft tracking via ADS-B (1090 MHz) with a homemade ground-plane antenna | SDR, digital modulation, RF basics |
| 02 | [Antenna Design & VNA Measurement](projects/02-antenna-design-vna/) | 🔵 Planned | Design, 3D printing, and real characterization (S11, VSWR, bandwidth) of Yagi/biquad/helical antennas | Antenna design, RF measurement, simulation vs. reality |
| 03 | [Weather Satellite Ground Station](projects/03-satellite-ground-station/) | 🟡 In progress | Reception and decoding of NOAA/Meteor-M2 satellite images with a 3D-printed QFH antenna and a motorized Az/El tracking rotor | Satellite links, doppler tracking, signal processing, motor kinematics |
| 04 | [LoRa/Meshtastic Alpine Network](projects/04-alpine-mesh-tracking/) | 🔵 Planned | Off-grid messaging and GPS tracking for hiking, with a directional gateway node for occasional internet bridging | LPWAN, hardware hacking, real-terrain RF propagation |

**Status legend:** 🔵 Planned · 🟡 In progress · 🟢 Completed

*(This table is updated as each project progresses — see the [full roadmap](docs/roadmap.md))*

---

## 🗺️ Roadmap

- [ ] **Phase 1** — SDR fundamentals (spectrum + ADS-B)
- [ ] **Phase 2** — Antenna design and measurement with NanoVNA
- [ ] **Phase 3** — Weather satellite ground station
- [ ] **Phase 4** — Deployed LoRa IoT mesh network

Full details, budget, and technical rationale for each phase in [`docs/roadmap.md`](docs/roadmap.md).

---

## 🎯 Technical skills demonstrated

- **RF and antennas**: design, simulation (NEC2), fabrication, and impedance/matching measured with a VNA
- **SDR and signal processing**: demodulation, protocol decoding, GNU Radio
- **Embedded systems**: microcontroller programming (ESP32), LoRa communication
- **Networks and protocols**: MQTT, end-to-end IoT architectures
- **Engineering methodology**: technical documentation, results analysis, simulation vs. real measurement comparison

---

## 📫 Contact

- LinkedIn: 
- Email: alvarogj1@correo.ugr.es
- CV: 

---

## License

This repository is under the MIT License — see [LICENSE](LICENSE) for details.
