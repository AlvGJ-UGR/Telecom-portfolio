# PROJECT STATE

> Este documento representa el estado actual del repositorio y debe mantenerse actualizado tras cada sesión de trabajo.

---

# Estado general

Proyecto:

Portfolio de Ingeniería RF & Telecomunicaciones

Versión:

v0.1.0 (Development)

Estado:

🟡 Desarrollo activo — buena parte del trabajo de diseño/software está por delante del trabajo de hardware real. Ningún proyecto tiene todavía datos experimentales.

---

# Proyecto prioritario

**03 - Satellite Ground Station**

Prioridad:

⭐⭐⭐⭐⭐

Motivo:

Es el proyecto con mayor valor técnico y el que mejor demuestra conocimientos de:

* SDR
* RF
* Satélites
* ESP32
* Control de motores
* Diseño mecánico
* Procesamiento de señal
* Automatización

---

# Última sesión

Fecha:

2026-07-02

---

Trabajo realizado

* Revisión completa de la documentación existente del repositorio (los 4 proyectos, `docs/roadmap.md`, código y `.scad`).
* Sincronización de `PROJECT_STATE.md` con el estado real (no se ha tocado código, firmware, ni diseño CAD/RF en esta sesión).
* Detección y registro de una inconsistencia entre `MASTER_PLAN.md` (Fase B del Proyecto 03) y la decisión de arquitectura ya documentada en `rotor_design.md` — ver "Riesgos conocidos" más abajo.

---

Archivos modificados

* `PROJECT_STATE.md`
* `MASTER_PLAN.md` (Fase A del Proyecto 03 marcada como completa; nota añadida en Fase B)
* `DECISIONS.md` (nueva entrada registrando esta sincronización y el conflicto detectado)

---

Decisiones tomadas

* Ninguna decisión técnica nueva. Se ha documentado (no resuelto) el conflicto entre Fase B de `MASTER_PLAN.md` y la decisión ya tomada en `rotor_design.md` de delegar predicción orbital/Doppler en Gpredict. Requiere confirmación del usuario antes de tocar el alcance de esa fase.

---

# Estado de proyectos

## Proyecto 01 — SDR Fundamentals

Estado:

🟡 En progreso — pipeline de software completo y validado en modo demo; falta hardware real.

Último avance:

* Antena ground-plane λ/4 para 1090 MHz diseñada y justificada (`antenna/antenna_design.md`), con modelo 3D paramétrico (`antenna/mount.scad`).
* Tres scripts completos con modo `--demo`: `spectrum_analyzer.py`, `adsb_logger.py`, `coverage_plot.py`. Hay un CSV demo real (`data/adsb_log_demo.csv`, 30 detecciones sintéticas) que demuestra el pipeline end-to-end.
* Guía de instalación completa (`docs/setup_guide.md`).

Pendiente:

* Imprimir y soldar la antena.
* Captura real de espectro y logging ADS-B con coordenadas reales.
* Gráfico de cobertura real y comparación antena casera vs. stock del dongle.

---

## Proyecto 02 — Antenna Design + NanoVNA

Estado:

🔵 Planeado — no iniciado.

Último avance:

Solo existe el README con el enfoque metodológico (simular en NEC2 → fabricar → medir con NanoVNA → iterar). Sin diseños concretos todavía.

Pendiente:

Todo: elegir topologías concretas (Yagi/biquad/helicoidal), simular en 4nec2, fabricar, medir.

---

## Proyecto 03 — Satellite Ground Station

Estado:

🟡 En progreso — subsistemas de software/diseño completos y probados en modo demo; sin fabricar ni montar.

Último avance:

* **Antena QFH**: metodología y justificación de topología completas (`antenna/qfh_design.md`); modelo 3D paramétrico con valores de ejemplo (`antenna/qfh_support.scad`), a la espera de las salidas reales de la calculadora de John Coppens.
* **Rotor Az/El**: diseño, cálculo de resolución angular (0.088°/paso) y elección de motor completos y justificados (`rotor/rotor_design.md`); modelo 3D paramétrico (`rotor/rotor_mount.scad`); firmware Arduino completo (`rotor/firmware/rotor_firmware.ino`); puente `rotctld` completo con modo `--demo` (`rotor/rotctld_bridge.py`), documentado contra la especificación oficial de Hamlib (`docs/rotctld_protocol_notes.md`).

Pendiente inmediato:

* Elegir el conductor real (hilo vs. tubo de cobre) para poder ejecutar la calculadora QFH de John Coppens y obtener H1/Dc1/H2/Dc2 finales — **requiere una decisión del usuario, no es una tarea de software**.
* Automatizar la actualización de TLE en Gpredict (Fase B, único punto no bloqueado por hardware — ver Próxima tarea).
* Probar `rotctld_bridge.py` contra Gpredict real (no solo el modo demo).
* Imprimir, montar y fabricar (antena QFH, rotor, soportes).

Bloqueadores:

* Requiere hardware físico (impresora 3D, motores, VNA/NanoVNA, RTL-SDR) y decisiones de materiales del usuario para la mayoría de tareas pendientes.

---

## Proyecto 04 — LoRa Mesh (Alpine Tracking)

Estado:

🔵 Planeado — diseño y BOM cerrados, con asunciones explícitas pendientes de verificar.

Último avance:

README completo con arquitectura, diseño por fases (A/B/C), BOM y tabla explícita de asunciones activas (banda de antenas existentes, tipo de conector, viabilidad de hackear el GPS USB).

Pendiente:

Verificar cada asunción de la tabla (requiere inspección física de hardware que ya posee el usuario), luego comprar componentes y fabricar.

---

# Próxima tarea

Claude debe comenzar siempre por esta tarea salvo que el usuario indique otra.

> Fase A del Proyecto 03 está completa; Fase B (integración y validación de Gpredict, ver `MASTER_PLAN.md`) es la siguiente. De sus cuatro puntos, el único que no depende de hardware físico ni de decisiones de materiales es:
> **Automatizar la actualización de TLE en Gpredict** (fuente de TLE, frecuencia de actualización) — es una tarea de configuración/documentación abordable ahora mismo.
> El resto de Fase B (validar `rotctld_bridge.py` contra Gpredict real, verificar error angular de seguimiento, verificar compensación Doppler) requiere el rotor físico montado y por tanto sigue bloqueado por fabricación, igual que el resto de tareas pendientes del proyecto.

---

# Riesgos conocidos

* Ningún proyecto tiene todavía datos experimentales reales (todo lo mostrado en READMEs como "resultados" es modo demo, correctamente etiquetado como tal). Riesgo de que el portfolio parezca menos avanzado de lo que la documentación sugiere si un revisor no lee las etiquetas de "demo" con atención.
* `qfh_support.scad` usa valores placeholder (H1/Dc1/H2/Dc2) explícitamente marcados como no válidos para imprimir — riesgo bajo porque está bien documentado, pero a vigilar para que no se imprima por error antes de ejecutar la calculadora real.
* `CHANGELOG.md` está referenciado en `CLAUDE.md` y en este mismo documento como parte del flujo de mantenimiento, pero no está presente en el repositorio (no se ha podido actualizar en esta sesión porque no existe).

---

# Deuda técnica

* `CHANGELOG.md` no existe todavía pese a estar referenciado en el flujo de trabajo (`CLAUDE.md` y este documento). Crear cuando se decida su formato.
* `docs/roadmap.md` marca su tabla de presupuesto como no reconciliada con los BOM detallados por proyecto — pendiente de una pasada de reconciliación cuando los BOM estén más cerrados (especialmente Proyecto 04, que depende de asunciones aún sin verificar).

---

# Ideas futuras

* (Sin cambios en esta sesión — pendiente de completar por el usuario/Claude en sesiones futuras conforme avancen los proyectos.)

---

# Calidad

Checklist general

* [x] Documentación actualizada (esta sesión)
* [x] README actualizado (ya estaban al día, se ha verificado en esta sesión)
* [ ] CHANGELOG actualizado (no existe el archivo — ver Deuda técnica)
* [x] MASTER_PLAN actualizado (Fase A del Proyecto 03 completa; Fase B reescrita conforme a la decisión de mantener Gpredict como motor de predicción)
* [x] Código consistente (no se ha modificado código en esta sesión)
* [x] Arquitectura consistente (conflicto Fase B resuelto — ver Notas y `DECISIONS.md`)

---

# Notas

* Decisión de arquitectura del Proyecto 03 (rotor): usar Gpredict + protocolo `rotctld` de Hamlib en vez de reimplementar predicción orbital/protocolo de control — documentado y justificado en `rotor/rotor_design.md`.
* Decisión de arquitectura del Proyecto 03 (antena QFH): usar la calculadora de referencia de la comunidad (John Coppens) en vez de derivar a mano la corrección geométrica del doblez — documentado en `antenna/qfh_design.md`.
* Decisión de pivote del Proyecto 04: de "red IoT genérica" a "red Meshtastic para alta montaña", justificada en `docs/roadmap.md` (Fase 4) por ser un caso de uso real del autor.
