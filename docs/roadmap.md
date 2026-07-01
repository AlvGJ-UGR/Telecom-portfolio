# Roadmap detallado

Ruta de proyectos de verano en RF/telecomunicaciones. Cada fase se apoya en la herramienta/skill adquirida en la anterior.

## Kit de herramientas (inversión inicial, ~90-130 €)

| Herramienta | Precio aprox. | Uso |
|---|---|---|
| RTL-SDR Blog v3 | 25-35 € | Recepción de RF de banda ancha |
| NanoVNA | 45-55 € | Medición de impedancia, S11/S21, ROE |
| ESP32 x2-4 | 4-6 €/u | Nodos de red IoT |
| Módulos LoRa SX1276/78 x2-4 | 5-8 €/u | Comunicación de largo alcance |
| Coaxial + conectores SMA | 10-15 € | Interconexión RF |

## Fase 1 — Fundamentos SDR (semanas 1-2)

Analizador de espectro en vivo + rastreo de aviones ADS-B (1090 MHz). Antena colineal casera con soporte impreso en 3D. Herramientas: GNU Radio, SDR#/SDR++, dump1090.

## Fase 2 — Diseño y medición de antenas (semanas 3-4)

Diseño de 2-3 antenas (Yagi, biquad, helicoidal) para banda ISM (868/915 MHz o 2.4 GHz). Simulación previa en NEC2/4nec2, fabricación con soportes impresos en 3D, y caracterización real con NanoVNA (S11, ROE, ancho de banda). Comparación simulación vs. medición.

## Fase 3 — Estación terrena de satélites (semanas 5-7)

Antena QFH o turnstile impresa en 3D para recepción de satélites NOAA/Meteor-M2 (137 MHz). Decodificación de imágenes con noaa-apt/SatDump. Automatización de captura con predicción de pases (Gpredict/predict).

## Fase 4 — Proyecto insignia: red de comunicación y GPS para alta montaña (semanas 8-12)

Pivote respecto al plan original de red IoT genérica: en vez de sensores ambientales, el proyecto insignia es una red Meshtastic (LoRa) orientada a senderismo/alta montaña — mensajería sin cobertura móvil, track GPS fiable, y bridging ocasional hacia internet vía nodo gateway con antena direccional. Se prioriza por ser un caso de uso real del autor, no sustituible por un móvil o app existente. Ver [`projects/04-alpine-mesh-tracking/README.md`](../projects/04-alpine-mesh-tracking/README.md) para el diseño completo, BOM y asunciones activas.

## Extras opcionales

- Filtro de RF impreso/coaxial caracterizado con NanoVNA
- Repetidor/digipeater APRS (requiere licencia de radioaficionado)
- Diseño de PCB propia en KiCad (amplificador de bajo ruido o filtro)

## Presupuesto total estimado

| Escenario | Fases incluidas | Coste aprox. |
|---|---|---|
| Ajustado | Fases 1-4 | ~90-110 € |
| Medio | Fases 1-4 + extras ligeros | ~115-140 € |
| Ambicioso | Todo + red LTE/5G privada (SDR más potente) | ~270-350 € |
