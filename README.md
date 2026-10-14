# 📡 RF & Telecommunications Engineering Portfolio

[![License: MIT](https://img.shields.io/badge/license-MIT-2ea44f)](LICENSE)
[![GitHub Pages](https://img.shields.io/github/deployments/AlvGJ-UGR/telecom-portfolio/github-pages?label=pages)](https://alvgj-ugr.github.io/telecom-portfolio/)
[![Python](https://img.shields.io/badge/python-3.10%2B-3776AB?logo=python&logoColor=white)](projects/01-sdr-fundamentals/requirements.txt)
[![Build](https://img.shields.io/github/actions/workflow/status/AlvGJ-UGR/telecom-portfolio/ci.yml?label=build)](https://github.com/AlvGJ-UGR/telecom-portfolio/actions)

🇪🇸 Español | 🇬🇧 [English version](README.en.md)

> RF, antenna, SDR and satellite ground-station systems — designed, simulated, fabricated (in progress) and measured (pending hardware), end to end.

**🌐 [Portfolio site](https://alvgj-ugr.github.io/telecom-portfolio/)** · 📋 [Project status](PROJECT_STATE.md) · 🗺️ [Roadmap](docs/roadmap.md)

---

## Hilo conductor

Los cuatro proyectos se apoyan en la misma cadena teórica de la ingeniería de telecomunicaciones, de la radiación al control:

```
┌─────────────────┐   ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│  RF & ANTENAS   │-->│ ANÁLISIS DE REDES│-->│ TEORÍA DE        │-->│ POSICIONADOR     │
│  radiación, Z0, │   │ matching,        │   │ SISTEMAS         │   │ homing, pasos,   │
│  VSWR, acoplo   │   │ S-params         │   │ (marco teórico)  │   │ rotctld          │
└─────────────────┘   └──────────────────┘   └──────────────────┘   └──────────────────┘
  Proyectos 01 · 02      Proyecto 02          sin implementar          Proyecto 03
```

La antena (radiación, impedancia) alimenta el problema de red (adaptación a $Z_0$ = 50 Ω), cuyo análisis en frecuencia (Bode, LTI) es el marco teórico de fondo —no implementado aún en el repositorio—, y que en el rotor de seguimiento se traduce en un posicionador real (homing por finales de carrera).

---

## Proyectos destacados

| # | Proyecto | Enfoque | Aspectos técnicos clave | Stack |
|---|---|---|---|---|
| 01 | [Fundamentos SDR: Espectro + ADS-B](projects/01-sdr-fundamentals/) | Cadena RF completa: antena → SDR → decodificación → geolocalización | Antena ground-plane $\lambda/4$, adaptación de impedancia por ángulo de radiales hacia $Z_0$ = 50 Ω, PSD (Welch) | Python, RTL-SDR, dump1090, NumPy/SciPy |
| 02 | [Diseño de antenas + NanoVNA](projects/02-antenna-design-vna/) | Yagi, biquad y hélice: simulación NEC2 antes que fabricación | VSWR, $Z_0$, acoplamiento entre elementos parásitos, ganancia, relación F/B, ajuste de impedancia por simulación | PyNEC (NEC2), OpenSCAD, Python |
| 03 | [Estación terrena de satélites](projects/03-satellite-ground-station/) | Antena QFH + rotor Az/El con seguimiento orbital real | Control y realimentación (homing por finales de carrera, homing y posicionamiento por pasos), cinemática de dos ejes, integración `rotctld` | Arduino/ESP32, Python (Skyfield), OpenSCAD |
| 04 | [Red LoRa/Meshtastic alpina](projects/04-alpine-mesh-tracking/) | Mensajería y GPS off-grid en malla LPWAN | Acoplamiento de antena por banda, presupuesto de enlace, topología de red mesh | ESP32, módulos SX1276/78, Meshtastic |

---

## Matriz de competencias

| Dominio | Herramientas | Conceptos teóricos |
|---|---|---|
| RF y antenas | PyNEC/NEC2, NanoVNA, 4nec2 | $Z_0$, VSWR, ganancia, patrón de radiación, acoplamiento mutuo |
| Redes y circuitos | NanoVNA, KiCad | Parámetros S, adaptación de impedancia, líneas de transmisión |
| Sistemas LTI (teoría) | — | Marco teórico del matching/filtrado; **sin implementación propia todavía** |
| Control y realimentación | Arduino/ESP32, firmware propio | Homing con finales de carrera, máquina de estados, posicionamiento por pasos (lazo abierto con referencia física; sin lazo cerrado con realimentación continua) |
| SDR y procesamiento de señal | GNU Radio, RTL-SDR, dump1090 | PSD (Welch), demodulación, decodificación de protocolo |
| Mecánica orbital | Python (Skyfield), Gpredict/Hamlib | Propagación SGP4, coordenadas Az/El, geometría de pase |
| Fabricación digital | OpenSCAD, impresión 3D | Diseño paramétrico, validación de malla (manifold/conectividad) |

---

## Estructura estándar de proyecto

Cada carpeta en `projects/NN-nombre/` sigue la misma arquitectura interna:

```
projects/NN-nombre/
├── README.md          # objetivo, metodología, resultados, guía de replicabilidad
├── docs/               # notas de diseño, protocolo, guías de instalación
├── src/ | rotor/        # código de aplicación (scripts, firmware)
├── sim/ | antenna/      # modelos NEC2/OpenSCAD, resultados (JSON) y diseños
└── assets/             # gráficas, renders CAD, capturas — generadas por script, no a mano
```

---

## Explorar en profundidad

La [web del portfolio](https://alvgj-ugr.github.io/telecom-portfolio/) ofrece navegación interactiva por proyecto, gráficas de simulación (VSWR, patrones de radiación, cartas de Smith) y las derivaciones matemáticas completas de cada diseño de antena. El detalle técnico exhaustivo — con ecuaciones, barridos paramétricos y datos crudos — vive en el `README.md` y los documentos de diseño de cada carpeta de proyecto.
