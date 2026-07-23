# CHANGELOG

Registro de cambios relevantes del repositorio, sesión a sesión. Formato libre, orientado a legibilidad para un revisor, no a un estándar tipo Keep a Changelog estricto.

---

## 2026-07-04 (f)

Añadido:

* `projects/02-antenna-design-vna/sim/helix_gap_sweep.json` — barrido real de separación hélice-plano de tierra (0-40mm), intento de adaptación de impedancia citando literatura real (Kraus 1977, Mardani et al.).

**Resultado negativo, documentado sin maquillar**: el barrido no encuentra un punto de buena adaptación (VSWR₅₀ entre 6 y 46 en todo el rango probado, empeorando drásticamente a corta separación antes de mejorar lentamente). Se concluye que las técnicas de adaptación que sí funcionan en la literatura (tira plana de Kraus, sección de cuarto de onda de impedancia controlada) requieren geometría de parches en NEC2, fuera de alcance de esta pasada — queda como pendiente explícito para hardware real (NanoVNA) o una futura sesión con modelado de parches.

Modificado:

* `projects/02-antenna-design-vna/antenna/helix_design.md`.

---

## 2026-07-04 (e)

Añadido:

* `projects/02-antenna-design-vna/antenna/helix_design.md`, `antenna/helix_support.scad`, `sim/helix_24_nec2.py`, `sim/helix_24_final.json`, `sim/helix_c_over_lambda_sweep.json`, `assets/helix_24_vswr.png`, `assets/helix_24_pattern.png`, `assets/helix_support_preview.png` — tercera y última antena prevista del Proyecto 02: helicoidal axial de 10 vueltas para 2.4GHz.

**Contratiempo real de biblioteca, resuelto y documentado**: la primitiva nativa de hélice de PyNEC (`geo.helix()`) produce el error "Geometry has no wires or patches" — confirmado como bug conocido y ya reportado en el repositorio oficial de `necpp` (issue #48) antes de descartar esa vía, no asumido como error propio. Reconstruida la geometría a mano como poli-línea de segmentos rectos (24 puntos/vuelta, técnica NEC2 estándar).

**Hallazgo documentado con honestidad, sin forzar una explicación**: la reactancia de entrada simulada (~-155Ω) no coincide con la regla empírica simplificada de Kraus (~140Ω resistivo puro), y no se elimina barriendo C/λ en todo el rango recomendado (0.90-1.20) — la causa exacta no se ha identificado con certeza; queda como pregunta abierta para la medición real con NanoVNA.

Modificado:

* `projects/02-antenna-design-vna/README.md`, `MASTER_PLAN.md`, `PROJECT_STATE.md`.

**Balance de portfolio (nota explícita)**: con la helicoidal, las 3 antenas previstas del Proyecto 02 y el rotor del Proyecto 03 agotan razonablemente el diseño/simulación ejecutable sin hardware. `PROJECT_STATE.md` señala explícitamente que el siguiente paso de valor real es hardware, no más diseño — recomendación ya repetida varias sesiones consecutivas.

---

## 2026-07-04 (d)

Añadido:

* `projects/02-antenna-design-vna/antenna/biquad_reflector_frame.scad` — marco físico del reflector de la biquad: 4 patas separadoras a la distancia simulada (34.4mm) + marco con rebaje para sujetar una lámina metálica real (cobre-clad de PCB o aluminio) sin pegamento. Validado geométricamente (1 único componente de volumen positivo en el primer intento — a diferencia de las dos piezas anteriores del rotor, esta vez sin fallos de conectividad).
* `projects/02-antenna-design-vna/assets/biquad_reflector_frame_preview.png`.

Modificado:

* `projects/02-antenna-design-vna/antenna/biquad_design.md`, `README.md`, `MASTER_PLAN.md`, `PROJECT_STATE.md` — reflector de la biquad pasa de "simulado, mecánica pendiente" a "simulado y con mecánica lista para fabricar".

Nota de balance del portfolio: con esta pieza, el diseño/simulación software-only razonable en los Proyectos 02 y 03 está prácticamente agotado (Yagi, biquad y rotor ya no tienen más recorrido sin hardware; solo queda la helicoidal como antena nueva). Señalado explícitamente en `PROJECT_STATE.md` como punto de rendimientos decrecientes: toca priorizar hardware, no más diseño.

---

## 2026-07-04 (c)

Añadido:

* `projects/03-satellite-ground-station/rotor/elevation_antenna_mount.scad` — acoplador eje-mástil: monta la antena QFH sobre el eje del motor de elevación y porta el taco de homing de ese eje (pieza que cerraba el hueco dejado en la sesión anterior). Diseñada como pieza independiente, calibrada en campo, ya que su posición axial depende de una medida del motor no verificada.
* `projects/03-satellite-ground-station/rotor/elevation_antenna_mount_preview.png`.

**Validación geométrica encontró un segundo fallo real de conectividad esta sesión** (tras el de `elevation_fork()` en la sesión anterior): el hub del eje y el zócalo del mástil resultaron ambos huecos justo en el punto donde sus ejes se cruzan, así que una unión que parecía correcta por solape de cajas delimitadoras no tocaba ningún material sólido real. Un primer intento de pieza de unión tampoco alcanzaba la pared real del tubo del mástil. Corregido y reverificado con `trimesh`: 1 único componente de volumen positivo.

Modificado:

* `projects/03-satellite-ground-station/rotor/rotor_design.md`, `README.md`, `MASTER_PLAN.md` (Fase C y D), `PROJECT_STATE.md` — homing de elevación pasa de "a medias" a resuelto (mecánica completa en ambos ejes; calibración fina queda para cuando exista hardware real).

---

## 2026-07-04 (b)

Añadido:

* `projects/03-satellite-ground-station/rotor/satellite_tracker.py` — cliente `rotctld` standalone: calcula Az/El real de un satélite concreto con Skyfield (no reimplementa SGP4) y lo sigue por el mismo protocolo que usaría Gpredict, sin necesitar su GUI. Incluye `--predict-next-pass` (AOS/culminación/LOS) y `--dry-run`.
* `projects/03-satellite-ground-station/rotor/requirements.txt` — dependencias del rotor (`pyserial`, `skyfield`).
* `projects/03-satellite-ground-station/tle_examples/` — TLEs de ejemplo usados para validar el tracker (referencia oficial de Skyfield para la ISS; NOAA 19 real vía CelesTrak), con README explicando que no son para uso real (desactualizados).

Validado en tres niveles antes de darlo por bueno: (1) cálculo orbital contra el TLE de referencia de la documentación oficial de Skyfield, comprobando continuidad física de la trayectoria (sin saltos ni valores fuera de rango); (2) integración end-to-end real — `rotctld_bridge.py --demo` lanzado como servidor TCP de verdad, con el tracker conectado como cliente real, no una prueba unitaria; (3) prueba con TLE real de NOAA 19 obtenido de CelesTrak (~76 días de antigüedad, detectado correctamente por el aviso automático del propio script) dando predicciones de pase físicamente coherentes con el comportamiento real de un satélite heliosíncrono.

Modificado:

* `projects/03-satellite-ground-station/rotor/rotor_design.md` — sección nueva documentando el tracker, su justificación (complementa a Gpredict, no lo reemplaza) y las tres verificaciones hechas.
* `projects/03-satellite-ground-station/README.md`, `MASTER_PLAN.md` (Fase F), `PROJECT_STATE.md`.

---

## 2026-07-04 (a)

Añadido:

* `projects/03-satellite-ground-station/rotor/rotor_mount.scad` (revisión 2) — finales de carrera: soporte + taco de homing de azimut (completo), soporte de homing de elevación (a medias, taco pendiente de una pieza que aún no existe — soporte de antena sobre el eje de elevación). **Corregido un fallo estructural real preexistente, nunca detectado antes de esta sesión**: los dos brazos de `elevation_fork()` no estaban conectados entre sí (2 piezas sueltas en vez de 1 horquilla) — encontrado y corregido validando cada una de las 4 piezas del rotor individualmente con OpenSCAD + comprobación de conectividad `trimesh` (no solo el ensamblaje visual conjunto).
* `projects/03-satellite-ground-station/rotor/firmware/rotor_firmware.ino` (v2) — comando `HOME` con secuencia de homing real contra finales de carrera, sustituyendo la asunción de arranque en AZ=0°/EL=0° de la versión anterior (falsa tras cualquier apagado). Parseo de comandos algo más robusto (falla explícitamente en vez de comportamiento indefinido ante formato inesperado). **No se ha podido compilar** en este entorno (el toolchain de Arduino necesita un dominio — `release-assets.githubusercontent.com` — fuera de la configuración de red permitida; se intentó honestamente, con `gcc-avr`/`avr-libc` instalados y una descarga directa de `arduino-cli`, antes de descartarlo). Revisado a mano, pendiente de compilación real antes de flashear.
* `projects/03-satellite-ground-station/rotor/rotctld_bridge.py` — homing automático al conectar con hardware real (bloqueante, no arranca el servidor rotctld hasta calibrar o fallar de forma visible); parseo compatible con el nuevo prefijo `WARN UNHOMED`. **Probado con un puerto serie simulado (mock)**: caso de éxito, caso de timeout, y parseo del nuevo formato — los tres pasan.
* `projects/03-satellite-ground-station/rotor/rotor_design.md` — sección nueva de homing con la justificación de ingeniería, el estado real (qué está resuelto y qué no) y el detalle de qué se ha podido verificar en este entorno y qué no.

Modificado:

* `MASTER_PLAN.md` (Fase C: finales de carrera y homing marcados, con matices), `PROJECT_STATE.md`.

Nota: el usuario preguntó además si, dado que el rotor permite calibrar con precisión el seguimiento, convendría cambiar la antena del Proyecto 03. Respuesta: no, se recomienda mantener la QFH — cambiarla a una antena más pesada (p. ej. Yagi cruzado) invalidaría el dimensionado de motor ya justificado por cálculo en `rotor_design.md` y sería una decisión de arquitectura nueva, no un ajuste. Anotado como nota de contexto en `PROJECT_STATE.md`, sin tocar `qfh_design.md` ni `DECISIONS.md`.

---

## 2026-07-03 (d)

Añadido:

* `projects/02-antenna-design-vna/sim/biquad_24_reflector_nec2.py` — reflector de la biquad modelado como malla NEC2 correcta (grafo de nodos compartidos en cada cruce), corrigiendo el enfoque de hilos largos cruzados que NEC2 había rechazado por geometría inválida en la sesión anterior.
* `sim/biquad_reflector_final.json`, `sim/biquad_reflector_distance_sweep.json` — resultados numéricos: barrido de distancia lazos-reflector (6 puntos) y comprobación de convergencia de malla (3 densidades, 229/512/1067 hilos).
* `assets/biquad_reflector_vswr.png`, `assets/biquad_reflector_pattern.png`, `assets/biquad_reflector_dist_sweep.png`.

Hallazgo documentado (no un cambio de arquitectura, pero sí relevante para la calidad del portfolio): el F/B simulado del diseño final (0.28λ, reflector 85×145mm) es de solo ~4dB, notablemente más bajo que la fama informal de la topología biquad+reflector en la comunidad. Confirmado por convergencia de malla que no es un artefacto de simulación. Se documenta tal cual en `antenna/biquad_design.md`, sin suavizarlo, como pregunta abierta para la medición real.

Modificado:

* `projects/02-antenna-design-vna/antenna/biquad_design.md`, `README.md`, `MASTER_PLAN.md`, `PROJECT_STATE.md`.

Nota: el usuario preguntó (a título informativo, sin presupuesto) qué antena sería mejor para el Proyecto 03 sin restricciones — se respondió Yagi cruzado de polarización circular, aprovechando que el proyecto ya tiene seguimiento activo. No se ha tocado la decisión de arquitectura ya tomada (QFH, ver `DECISIONS.md`); queda anotado como nota de contexto en `PROJECT_STATE.md`, no como cambio de diseño.

---

## 2026-07-03 (c)

Añadido:

* `projects/02-antenna-design-vna/antenna/yagi_mast_mount.scad` — montaje al mástil de la Yagi como pieza separada (abrazadera + placa atornillable), validado geométricamente. Corrige el hueco dejado en la sesión anterior tras descartar una versión fundida con el boom por riesgo estructural.
* `projects/02-antenna-design-vna/antenna/biquad_design.md`, `antenna/biquad_support.scad`, `sim/biquad_24_nec2.py`, `sim/biquad_24_results.json`, `assets/biquad_24_vswr.png`, `assets/biquad_24_pattern.png`, `assets/biquad_support_preview.png` — segunda antena del Proyecto 02: biquad de doble lazo para 2.4GHz, radiador simulado en NEC2 (Zin 53.68+0.08j Ω, VSWR₅₀=1.07, patrón bidireccional confirmado con datos) y soporte 3D validado en el primer intento. Reflector explícitamente no simulado en esta pasada (requiere malla NEC2 con nodos compartidos, deferred).

Modificado:

* `projects/02-antenna-design-vna/README.md`, `MASTER_PLAN.md`, `PROJECT_STATE.md` — estado de ambas antenas del Proyecto 02 actualizado.

---

## 2026-07-03 (b)

Añadido:

* `projects/02-antenna-design-vna/antenna/yagi_design.md` — diseño y simulación NEC2 real (PyNEC) de una Yagi-Uda de 3 elementos para 868MHz: validación del motor contra un dipolo de referencia, ajuste de resonancia por simulación, barrido paramétrico de separación entre elementos con datos de trade-off, diseño final justificado con limitaciones explícitas.
* `projects/02-antenna-design-vna/antenna/yagi_support.scad` — soporte 3D paramétrico (boom + 3 soportes de elemento, pieza única), validado geométricamente con OpenSCAD + comprobación de conectividad de malla (`trimesh`). Se detectó y corrigió un fallo real de piezas desconectadas en la primera versión.
* `projects/02-antenna-design-vna/sim/yagi_868_nec2.py`, `sim/yagi_868_final_results.json`, `sim/spacing_sweep_results.json` — script y resultados numéricos completos de la simulación.
* `projects/02-antenna-design-vna/assets/yagi_868_vswr.png`, `assets/yagi_868_pattern.png`, `assets/yagi_868_spacing_tradeoff.png`, `assets/yagi_support_preview.png` — gráficas y render generados a partir de los datos reales de simulación.

Modificado:

* `projects/02-antenna-design-vna/README.md` — de "no iniciado" a Yagi diseñada, simulada y con soporte 3D validado.
* `MASTER_PLAN.md` — Proyecto 02: investigación, diseño de la Yagi y estado de fabricación (modelo listo, impresión física pendiente de hardware) actualizados.
* `PROJECT_STATE.md` — sesión, estado del Proyecto 02 y próxima tarea actualizados.

Nota de alcance: esta sesión deja el Proyecto 02 en el mismo punto que el Proyecto 03 — diseño y simulación completos, fabricación y medición real pendientes de hardware. Se recomienda una pausa aquí antes de seguir generando más diseño sin fabricar (ver "Próxima tarea" en `PROJECT_STATE.md`).

---

## 2026-07-03 (a)

Añadido:

* `projects/03-satellite-ground-station/docs/tle_update.md` — metodología de actualización automática de TLE en Gpredict para el Proyecto 03 (Fase B): fuentes CelesTrak (consultas dinámicas `gp.php` por catálogo NORAD, ya que el formato `.txt` estático fue deprecado), frecuencia de auto-actualización recomendada, y justificación de por qué se usa el mecanismo nativo de Gpredict en vez de un script propio.
* `CHANGELOG.md` — este documento, referenciado en `CLAUDE.md` pero ausente hasta ahora.

Modificado:

* `projects/03-satellite-ground-station/README.md` — enlazado el nuevo `docs/tle_update.md`; checklist de resultados actualizado (punto de metodología TLE marcado como hecho, configuración real en Gpredict del usuario queda pendiente).
* `MASTER_PLAN.md` — Fase B del Proyecto 03 marcada con el primer punto (automatización de TLE) resuelto a nivel de metodología/documentación; los tres puntos restantes de Fase B siguen bloqueados por hardware.
* `PROJECT_STATE.md` — estado del Proyecto 03 y "Próxima tarea" actualizados en consecuencia.

Sin cambios de arquitectura en esta sesión (no se ha tocado `DECISIONS.md`): esta tarea es una implementación directa de la decisión de arquitectura ya confirmada el 2026-07-02 (Gpredict como motor de predicción orbital), no una decisión nueva.

---

## 2026-07-02

Añadido:

* Ninguna decisión técnica nueva sobre diseño; sesión de sincronización de documentación.

Modificado:

* `PROJECT_STATE.md`, `MASTER_PLAN.md`, `DECISIONS.md` — sincronizados con el estado real del repositorio. Fase A del Proyecto 03 marcada como completa (ya estaba hecha, no reflejada en el checklist). Detectado y luego resuelto (con confirmación del usuario) un conflicto entre la Fase B de `MASTER_PLAN.md` (que pedía reimplementar TLE/Azimuth/Elevation/Doppler propios) y la decisión ya documentada en `rotor_design.md` de delegar esa parte en Gpredict. Se confirma Gpredict como motor de predicción orbital; Fase B reescrita como fase de integración y validación.

---

*(Sesiones anteriores a 2026-07-02 no registradas retroactivamente — el repositorio ya contenía el trabajo de diseño de los 4 proyectos, pero no existía este CHANGELOG en ese momento.)*
