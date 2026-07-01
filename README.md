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
| Protocolos estudiados | ADS-B, LoRaWAN, APT/LRPT (satélites meteorológicos), MQTT |

---

## 📂 Proyectos

| # | Proyecto | Estado | Descripción breve | Habilidades clave |
|---|---|---|---|---|
| 01 | [Fundamentos SDR: Espectro + ADS-B](projects/01-sdr-fundamentals/) | 🔵 Planeado | Analizador de espectro en vivo y rastreo de aviones vía ADS-B (1090 MHz) con antena colineal casera | SDR, modulación digital, RF básica |
| 02 | [Diseño y medición de antenas con VNA](projects/02-antenna-design-vna/) | 🔵 Planeado | Diseño, impresión 3D y caracterización real (S11, ROE, ancho de banda) de antenas Yagi/biquad/helicoidal | Diseño de antenas, medición RF, simulación vs. realidad |
| 03 | [Estación terrena de satélites meteorológicos](projects/03-satellite-ground-station/) | 🔵 Planeado | Recepción y decodificación de imágenes de satélites NOAA/Meteor-M2 con antena QFH impresa en 3D | Enlaces satelitales, doppler tracking, procesamiento de señal |
| 04 | [Red mesh IoT con LoRa](projects/04-lora-mesh-network/) | 🔵 Planeado | Red de sensores desplegada con nodos ESP32+LoRa, gateway MQTT y dashboard en tiempo real | Comunicaciones LPWAN, sistemas embebidos, redes IoT |

**Leyenda de estado:** 🔵 Planeado · 🟡 En progreso · 🟢 Completado

*(Esta tabla se actualiza a medida que avanza cada proyecto — ver [roadmap completo](docs/roadmap.md))*

---

## 🗺️ Roadmap

- [ ] **Fase 1** — Fundamentos SDR (espectro + ADS-B)
- [ ] **Fase 2** — Diseño y medición de antenas con NanoVNA
- [ ] **Fase 3** — Estación terrena de satélites meteorológicos
- [ ] **Fase 4** — Red mesh LoRa IoT desplegada

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

- LinkedIn: 
- Email: alvarogj1@correo.ugr.es
- CV: 

---

## Licencia

Este repositorio está bajo licencia MIT — ver [LICENSE](LICENSE) para más detalles.
