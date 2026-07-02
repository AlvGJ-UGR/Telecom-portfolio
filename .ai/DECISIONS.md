# ENGINEERING DECISIONS

Este documento registra las decisiones técnicas importantes tomadas durante el proyecto.

Su objetivo es evitar replantear continuamente decisiones ya justificadas.

---

## Formato

### Fecha

### Decisión

### Justificación

### Alternativas descartadas

### Consecuencias

---

## Ejemplo

### 2026-07-02

Decisión:

El proyecto principal será la estación terrena SDR.

Justificación:

Es el proyecto con mayor capacidad para demostrar conocimientos multidisciplinares:

* RF
* SDR
* Satélites
* ESP32
* Control
* CAD
* Automatización

Alternativas descartadas:

Priorizar LoRa o ADS-B.

Motivo:

Tienen menor impacto visual y técnico para un reclutador.

---

Añadir todas las decisiones relevantes durante el desarrollo.

---

## 2026-07-02

Decisión:

Sincronizar `PROJECT_STATE.md` y `MASTER_PLAN.md` con el estado real del repositorio (documentación, no código). Marcar la Fase A del Proyecto 03 como completa en `MASTER_PLAN.md`, ya que el trabajo (arquitectura, diagrama de bloques, selección de hardware, BOM, presupuesto) ya estaba hecho en `README.md` y `rotor_design.md` pero no reflejado en el checklist.

Justificación:

`MASTER_PLAN.md` y `PROJECT_STATE.md` habían quedado desactualizados respecto al trabajo real de diseño ya realizado, lo que rompe su función como fuente de verdad para decidir la siguiente tarea (tal como exige `CLAUDE.md`).

Alternativas descartadas:

Ninguna — es mantenimiento de documentación, no una decisión de diseño técnico.

Consecuencias:

Ninguna sobre el diseño técnico. Deja expuesto un conflicto real que sí requiere decisión: ver entrada siguiente.

---

## 2026-07-02 (pendiente de decisión del usuario)

Decisión:

**No resuelta todavía.** Se ha detectado que la Fase B del Proyecto 03 en `MASTER_PLAN.md` (predicción TLE, cálculo de Azimuth/Elevation/Doppler propios) contradice la decisión ya documentada en `rotor/rotor_design.md` de delegar esa funcionalidad en Gpredict, integrando solo vía el protocolo `rotctld`.

Justificación:

`rotor_design.md` da una justificación técnica explícita para delegar en Gpredict (herramienta madura, evita reinventar una parte ya resuelta de forma robusta desde hace más de 20 años). `MASTER_PLAN.md` no da ninguna justificación para la reimplementación propia — parece un remanente de una planificación anterior a esa decisión.

Alternativas:

1. Actualizar `MASTER_PLAN.md` Fase B para reflejar la delegación en Gpredict (alcance reducido: solo verificar/pulir la integración `rotctld`, no implementar predicción orbital propia).
2. Revertir la decisión de `rotor_design.md` y sí implementar predicción TLE/Doppler propios (aumenta el alcance y el valor demostrado en efemérides/predicción orbital, a costa de duplicar una funcionalidad ya resuelta por herramientas estándar).

Consecuencias:

Pendientes de la decisión del usuario. No se ha modificado el alcance técnico del Proyecto 03 en esta sesión.

---

## 2026-07-02 (resuelta)

Decisión:

Se confirma la alternativa 1: Gpredict se mantiene como único motor de predicción orbital del Proyecto 03. No se reimplementan TLE, Azimuth, Elevation ni Doppler propios salvo que surja una razón técnica de peso en el futuro. La Fase B de `MASTER_PLAN.md` se reescribe como una fase de **integración y validación** de Gpredict (actualización automática de TLE, validación de `rotctld_bridge.py` contra Gpredict real, verificación de error angular de seguimiento, verificación de la compensación Doppler), no de desarrollo de un sistema de predicción propio.

Justificación:

Confirmada explícitamente por el usuario. Coincide con la justificación técnica ya dada en `rotor_design.md`: evitar reinventar una parte del sistema ya resuelta de forma robusta por herramientas estándar de la comunidad (Gpredict + Hamlib), y concentrar el esfuerzo de ingeniería en las partes del proyecto con valor diferencial real (rotor físico, antena QFH, integración de protocolo).

Alternativas descartadas:

Implementar predicción TLE/Azimuth/Elevation/Doppler propios (alternativa 2 de la entrada anterior). Descartada explícitamente por el usuario salvo que aparezca una razón técnica de peso.

Consecuencias:

* `MASTER_PLAN.md` Fase B reescrita en consecuencia (ver ese documento).
* El "cálculo Doppler" pendiente en `MASTER_PLAN.md` pasa a ser "verificar que la compensación Doppler de Gpredict se aplica correctamente en la integración", no un cálculo a implementar desde cero.
* Si en el futuro se decide implementar predicción orbital propia, debe documentarse aquí la razón técnica que motive revertir esta decisión, antes de empezar ese trabajo.

