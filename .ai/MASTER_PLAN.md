# MASTER PLAN

## Objetivo general

Construir uno de los mejores portfolios personales de Ingeniería de Telecomunicaciones enfocado en RF, SDR, antenas, sistemas embebidos y comunicaciones por satélite.

Cada proyecto debe ser suficiente para demostrar competencias reales ante empresas del sector.

---

# Prioridad de proyectos

| Prioridad | Proyecto                      | Estado        |
| --------- | ----------------------------- | ------------- |
| ⭐⭐⭐⭐⭐     | 03 - Satellite Ground Station | En desarrollo |
| ⭐⭐⭐⭐      | 02 - Antenna Design + NanoVNA | Planificado   |
| ⭐⭐⭐       | 01 - SDR Fundamentals         | En desarrollo |
| ⭐⭐        | 04 - LoRa Mesh                | Planificado   |

---

# Reglas generales

Antes de comenzar cualquier tarea:

* comprobar dependencias
* revisar documentación existente
* evitar duplicación
* mantener consistencia

---

# Proyecto 03 (PRIORIDAD ABSOLUTA)

## Fase A

* [x] Arquitectura general — ver `projects/03-satellite-ground-station/README.md` (diagrama de bloques del sistema completo) y `rotor/rotor_design.md` (arquitectura del subsistema de rotor)
* [x] Diagrama de bloques — `README.md` (mermaid, sistema completo) y `rotor/rotor_design.md` (mermaid, cadena Gpredict → rotctld_bridge → firmware → motores)
* [x] Selección de hardware — motores 28BYJ-48 + ULN2003 justificados por cálculo en `rotor/rotor_design.md`; RTL-SDR ya seleccionado en Proyecto 01
* [x] BOM — tabla "Material / BOM" en `README.md`
* [x] Presupuesto — incluido en la misma tabla de BOM

> Nota (sesión 2026-07-02): Fase A estaba de hecho completa antes de esta sesión; el checklist no reflejaba el trabajo ya hecho. Se marca ahora para que `MASTER_PLAN.md` sea una fuente de verdad fiable.

---

## Fase B

Integración y validación de seguimiento orbital (Gpredict)

> Decisión de arquitectura (confirmada por el usuario, 2026-07-02): Gpredict es el motor de predicción orbital. No se reimplementa TLE, Azimuth, Elevation ni Doppler propios salvo que surja una razón técnica de peso — ver `DECISIONS.md`. Esta fase es de **integración y validación**, no de desarrollo de un sistema de predicción propio.

* [ ] Automatizar la actualización de TLE en Gpredict (fuente y frecuencia de actualización, sin reimplementar el parseo/propagación TLE)
* [ ] Validar `rotctld_bridge.py` contra Gpredict real (no solo el modo `--demo`): confirmar formato exacto de `get_pos`/`set_pos` en la versión de Hamlib usada (ver nota en `docs/rotctld_protocol_notes.md`)
* [ ] Verificar seguimiento Azimuth/Elevation real durante un pase: error angular entre posición comandada por Gpredict y posición reportada por el firmware
* [ ] Verificar compensación Doppler: confirmar que Gpredict la calcula y, si se usa control de frecuencia por `rigctld`, validar que el SDR/receptor la aplica correctamente (no reimplementar el cálculo, solo verificar la integración)

---

## Fase C

Control mecánico

* [ ] diseño del rotor
* [ ] selección de reductoras
* [ ] selección de motores
* [ ] drivers
* [ ] finales de carrera
* [ ] homing
* [ ] cinemática

---

## Fase D

Diseño CAD

* [ ] soporte principal
* [ ] eje azimut
* [ ] eje elevación
* [ ] alojamiento electrónica
* [ ] protección lluvia
* [ ] paso de cables

---

## Fase E

Firmware

* [ ] ESP32
* [ ] control motores
* [ ] comunicación serie
* [ ] WiFi
* [ ] OTA
* [ ] watchdog

---

## Fase F

Software PC

* [ ] GUI
* [ ] seguimiento automático
* [ ] visualización satélite
* [ ] logs
* [ ] configuración

---

## Fase G

SDR

* [ ] GNU Radio
* [ ] NOAA
* [ ] Meteor
* [ ] SDR++
* [ ] sincronización

---

## Fase H

Recepción

* [ ] QFH
* [ ] Helicoidal
* [ ] pruebas
* [ ] comparativa

---

## Fase I

Procesamiento

* [ ] decodificación NOAA
* [ ] decodificación Meteor
* [ ] corrección Doppler
* [ ] generación imágenes

---

## Fase J

Validación

* [ ] precisión seguimiento
* [ ] error angular
* [ ] rendimiento
* [ ] estabilidad
* [ ] consumo

---

## Fase K

Documentación

* [ ] fotografías
* [ ] diagramas
* [ ] resultados
* [ ] conclusiones
* [ ] futuras mejoras

---

# Proyecto 02

## Investigación

* [ ] teoría
* [ ] NEC2
* [ ] simulaciones

## Diseño

* [ ] Yagi
* [ ] Biquad
* [ ] Helicoidal

## Fabricación

* [ ] impresión 3D
* [ ] montaje

## Medición

* [ ] NanoVNA
* [ ] S11
* [ ] VSWR
* [ ] ancho de banda

## Comparativa

* [ ] simulación vs medida

---

# Proyecto 01

* [ ] analizador espectral
* [ ] waterfall
* [ ] ADS-B
* [ ] mapas
* [ ] estadísticas
* [ ] documentación

---

# Proyecto 04

* [ ] arquitectura
* [ ] Meshtastic
* [ ] gateway
* [ ] GPS
* [ ] MQTT
* [ ] pruebas en montaña
* [ ] consumo
* [ ] cobertura

---

# Calidad

Antes de marcar una tarea como terminada comprobar:

* código limpio
* documentación
* arquitectura
* reproducibilidad
* validación
* estilo consistente

---

# Definición de terminado (Definition of Done)

Una tarea solo podrá marcarse como completada cuando:

* esté implementada
* esté documentada
* compile correctamente (si aplica)
* no introduzca regresiones conocidas
* siga las convenciones del proyecto
* tenga una justificación técnica suficiente

---

# Mantenimiento continuo

Después de cada sesión de trabajo:

* actualizar CHANGELOG.md
* actualizar PROJECT_STATE.md
* actualizar este documento
* revisar la siguiente prioridad
* proponer mejoras si aportan valor al portfolio

---

# Objetivo final

Construir un portfolio que pueda competir con proyectos realizados durante un Trabajo Fin de Grado o en un entorno profesional, demostrando dominio de RF, SDR, antenas, comunicaciones por satélite, sistemas embebidos, diseño mecánico y metodología de ingeniería.

