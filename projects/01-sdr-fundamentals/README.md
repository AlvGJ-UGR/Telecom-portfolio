# 01 — Fundamentos SDR: Espectro en vivo + ADS-B

**Estado:** 🟡 En progreso — código y diseño de antena completos, pendiente de captura con hardware real

## Objetivo

Construir un sistema completo de recepción RF: desde una antena diseñada y fabricada a medida, hasta la visualización de datos reales de tráfico aéreo, pasando por análisis de espectro en tiempo real. Todo el pipeline de software está terminado y probado; solo falta la captura final con el RTL-SDR físico.

## Por qué importa

Es la base del resto del portfolio: SDR es la herramienta central para los proyectos de satélites y análisis de espectro que vienen después. Además, ADS-B es uno de los pocos protocolos de comunicaciones aeronáuticas reales que se pueden recibir y decodificar legalmente con equipo casero, lo que permite validar todo el pipeline (RF → demodulación → geolocalización → visualización) con tráfico real y verificable.

## Arquitectura del sistema

```mermaid
flowchart LR
    A[Antena ground-plane<br/>1090 MHz] --> B[RTL-SDR]
    B --> C[dump1090<br/>demodulación + decodificación]
    C -->|aircraft.json| D[adsb_logger.py<br/>geometría: distancia/rumbo]
    D --> E[(CSV log)]
    E --> F[coverage_plot.py<br/>gráfico polar de cobertura]
    B --> G[spectrum_analyzer.py<br/>análisis de espectro en vivo]
```

## Diseño de antena

Ground-plane de cuarto de onda, diseñada específicamente para 1090 MHz (frecuencia de emisión ADS-B). Cálculo completo de dimensiones, justificación de la elección de topología, y modelo 3D paramétrico en OpenSCAD:

- 📐 [`antenna/antenna_design.md`](antenna/antenna_design.md) — cálculos y justificación de diseño
- 🖨️ [`antenna/mount.scad`](antenna/mount.scad) — modelo paramétrico (OpenSCAD)

<img src="antenna/mount_preview.png" width="500" alt="Render del soporte de antena">

## Código

| Script | Función |
|---|---|
| [`src/spectrum_analyzer.py`](src/spectrum_analyzer.py) | Espectro en tiempo real (PSD vía método de Welch) sobre IQ del RTL-SDR |
| [`src/adsb_logger.py`](src/adsb_logger.py) | Consulta `dump1090`, calcula distancia (Haversine) y rumbo real desde la estación, registra en CSV |
| [`src/coverage_plot.py`](src/coverage_plot.py) | Gráfico polar de cobertura (rumbo vs. alcance, coloreado por altitud) a partir del CSV |

Los tres scripts incluyen un **modo `--demo`** que genera datos sintéticos (IQ simulado / detecciones ADS-B plausibles), lo que permite probar y validar todo el pipeline de software antes de tener el hardware conectado — la evidencia de que el código funciona end-to-end está en `assets/`.

Guía completa de instalación (drivers, udev, dump1090, entorno Python): [`docs/setup_guide.md`](docs/setup_guide.md)

## Resultados

> ⚠️ Las gráficas de abajo son del **modo demo** (datos sintéticos), generadas para validar el pipeline de software. Se reemplazarán por capturas reales en cuanto esté montada la antena y funcionando el RTL-SDR.

**Espectro (demo):**

<img src="assets/spectrum_demo.png" width="600" alt="Espectro demo">

**Cobertura ADS-B (demo — geometría real, tráfico sintético):**

<img src="assets/coverage_demo.png" width="500" alt="Cobertura demo">

### Pendiente con hardware real

- [ ] Imprimir y soldar la antena según `antenna/mount.scad` y `antenna/antenna_design.md`
- [ ] Captura de espectro real en 1090 MHz, comparar suelo de ruido con/sin antena casera vs. la antena stock
- [ ] Sesión de logging ADS-B de varias horas con coordenadas reales de la estación
- [ ] Gráfico de cobertura real, alcance máximo medido vs. horizonte de radio teórico (fórmula incluida en `coverage_plot.py`)
- [ ] Tabla comparativa: antena casera vs. antena stock del dongle (alcance, nº de aviones detectados/hora)

## Habilidades demostradas

- Diseño de antenas desde primeros principios (cálculo de λ/4, adaptación de impedancia por ángulo de radiales)
- Modelado paramétrico 3D (OpenSCAD) para fabricación
- Configuración y uso de SDR (RTL-SDR, procesamiento de IQ)
- Procesamiento de señal: PSD mediante método de Welch
- Geometría esférica aplicada (Haversine, bearing) para geolocalización
- Diseño de software con modo de prueba sin hardware (testability, buena práctica de ingeniería)
