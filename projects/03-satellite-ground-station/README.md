# 03 — Estación terrena de satélites meteorológicos

**Estado:** 🔵 Planeado

## Objetivo

Recibir y decodificar imágenes en vivo de satélites meteorológicos (NOAA APT / Meteor-M2 LRPT, banda 137 MHz) usando una antena QFH diseñada e impresa en 3D.

## Por qué importa

Combina diseño mecánico de antenas, RF, doppler tracking y procesamiento de señal/imagen en un único sistema automatizado — demuestra integración de sistemas completa, no solo un componente aislado.

## Enfoque

1. Diseñar e imprimir una antena QFH (o turnstile) para 137 MHz.
2. Configurar RTL-SDR + software de recepción (SDR++/gqrx).
3. Decodificar señal APT/LRPT con `noaa-apt` o `SatDump`.
4. Automatizar la predicción de pases de satélite (Gpredict/predict) y la captura.
5. Documentar la calidad de imagen obtenida en distintos pases (elevación, SNR).

## Material / BOM

- RTL-SDR Blog v3
- LNA opcional para 137 MHz
- Elementos de la antena QFH (varilla/cable de cobre)
- Soporte impreso en 3D
- Raspberry Pi para automatización

## Resultados

*(Pendiente — completar con imágenes de satélite recibidas, SNR por pase, tabla de pases exitosos vs fallidos)*

## Habilidades demostradas

- Enlaces de comunicación satelital
- Corrección de efecto doppler
- Automatización de sistemas de recepción
- Procesamiento de señal a imagen

## Media

*(Añadir aquí imágenes de satélite decodificadas, fotos de la antena QFH, capturas de espectro del pase)*
