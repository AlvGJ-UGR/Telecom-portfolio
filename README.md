# 📡 Portfolio de Ingeniería RF & Telecomunicaciones

🇪🇸 Español | 🇬🇧 [English version](README.en.md)

> Proyectos prácticos de RF, antenas, SDR y sistemas de comunicación, diseñados, fabricados y medidos de principio a fin.

---

## Sobre mí

Soy estudiante de Ingeniería de Telecomunicaciones. Este repositorio documenta una serie de proyectos personales enfocados en RF, diseño de antenas, radio definida por software (SDR) y sistemas de comunicación embebidos, construidos durante mi tiempo libre con equipo propio: impresora 3D, soldador, un dongle SDR y un analizador de redes vectorial (NanoVNA).

El objetivo no es solo "hacer que funcione", sino aplicar el proceso de ingeniería completo en cada proyecto: **diseño → simulación → fabricación → medición → iteración → documentación**, con datos y gráficas reales, no solo capturas de pantalla.

---

## 🧰 Stack de herramientas y equipo

| Categoría | Herramientas |
|---|---|
| RF / Medición | RTL-SDR Blog v3, NanoVNA |
| Fabricación | Impresora 3D (PLA/PETG), estación de soldadura |
| Software | GNU Radio, SDR++/SDR#, KiCad, 4nec2, Python (NumPy/SciPy/Matplotlib) |
| Embebido | ESP32, módulos LoRa SX1276/78 |
| Protocolos estudiados | ADS-B, LoRa (Meshtastic), APT/LRPT (satélites meteorológicos), MQTT, rotctld/Hamlib |

---

## 📂 Proyectos

| # | Proyecto | Estado | Descripción breve | Habilidades clave |
|---|---|---|---|---|
| 01 | [Fundamentos SDR: Espectro + ADS-B](projects/01-sdr-fundamentals/) | 🟡 En progreso | Analizador de espectro en vivo y rastreo de aviones vía ADS-B (1090 MHz) con antena ground-plane casera | SDR, modulación digital, RF básica |
| 02 | [Diseño y medición de antenas con VNA](projects/02-antenna-design-vna/) | 🔵 Planeado | Diseño, impresión 3D y caracterización real (S11, ROE, ancho de banda) de antenas Yagi/biquad/helicoidal | Diseño de antenas, medición RF, simulación vs. realidad |
| 03 | [Estación terrena de satélites meteorológicos](projects/03-satellite-ground-station/) | 🟡 En progreso | Recepción y decodificación de imágenes de satélites NOAA/Meteor-M2 con antena QFH impresa en 3D y rotor de seguimiento Az/El motorizado | Enlaces satelitales, doppler tracking, procesamiento de señal, cinemática de motores |
| 04 | [Red LoRa/Meshtastic para alta montaña](projects/04-alpine-mesh-tracking/) | 🔵 Planeado | Mensajería y track GPS off-grid para senderismo, con nodo gateway direccional para bridging ocasional hacia internet | LPWAN, hacking de hardware, propagación RF en terreno real |

**Leyenda de estado:** 🔵 Planeado · 🟡 En progreso · 🟢 Completado

*(Esta tabla se actualiza a medida que avanza cada proyecto — ver [roadmap completo](docs/roadmap.md))*

---

## 🔗 Proyecto relacionado (repositorio aparte)

- **[wifi-csi-presence-sensing](https://github.com/AlvGJ-UGR/wifi-csi-presence-sensing)** — Sensado de presencia mediante WiFi Channel State Information (CSI) sobre ESP32, sin cámaras ni sensores dedicados. Repositorio independiente por tratarse de una línea de trabajo distinta (procesamiento de señal / sensado RF, no comunicaciones); ver su propio README para la diferenciación frente a proyectos similares ya existentes en la comunidad.

---

## 🗺️ Roadmap

- [ ] **Fase 1** — Fundamentos SDR (espectro + ADS-B) — código completo, pendiente hardware
- [ ] **Fase 2** — Diseño y medición de antenas con NanoVNA — sin empezar
- [ ] **Fase 3** — Estación terrena de satélites meteorológicos — antena QFH y rotor Az/El diseñados, pendiente fabricación
- [ ] **Fase 4** — Red LoRa/Meshtastic de comunicación y GPS para alta montaña — diseño y BOM cerrados, pendiente verificación de hardware

Detalle completo, presupuesto y justificación técnica de cada fase en [`docs/roadmap.md`](docs/roadmap.md).

---

## 🎯 Habilidades técnicas demostradas

- **RF y antenas**: diseño, simulación (NEC2), fabricación e impedancia/adaptación medida con VNA
- **SDR y procesamiento de señal**: demodulación, decodificación de protocolos, GNU Radio
- **Sistemas embebidos**: programación de microcontroladores (ESP32), comunicación LoRa
- **Redes y protocolos**: MQTT, arquitecturas IoT de extremo a extremo
- **Metodología de ingeniería**: documentación técnica, análisis de resultados, comparación simulación vs. medición real

---

## 📫 Contacto

- LinkedIn: [tu perfil aquí]
- Email: [tu-email@ejemplo.com]
- CV: [enlace a tu CV]

---

## Licencia

Este repositorio está bajo licencia MIT — ver [LICENSE](LICENSE) para más detalles.
