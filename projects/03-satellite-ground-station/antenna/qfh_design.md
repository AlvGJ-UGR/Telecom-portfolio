# Diseño de antena: Quadrifilar Helicoidal (QFH) para 137 MHz

## Por qué QFH y no otra cosa

Los satélites meteorológicos (NOAA APT, Meteor-M2 LRPT) transmiten con **polarización circular**. Una antena lineal (dipolo, Yagi) pierde hasta 3 dB solo por desajuste de polarización, y ese desajuste varía según el ángulo de la pasada. La QFH genera polarización circular de forma nativa y tiene un patrón de radiación hemisférico sin nulos importantes — recibe igual de bien cerca del cénit que cerca del horizonte, que es exactamente el rango de elevaciones por el que pasa un satélite en órbita baja durante un pase completo. Por eso es el diseño de referencia de la comunidad para esta aplicación, y el que se usa en este proyecto.

## Frecuencia de diseño

Los satélites objetivo transmiten en distintos canales dentro de la banda de 137 MHz (NOAA en 137.1 / 137.62 / 137.9125 MHz; Meteor-M2 en 137.1 o 137.9 MHz según el satélite). Se elige como frecuencia de diseño el centro de banda:

$$f_{diseño} = 137.5 \text{ MHz} \quad\Rightarrow\quad \lambda = \frac{c}{f} = 2180.3 \text{ mm}$$

Esto reparte el desajuste entre todos los canales por igual en vez de optimizar uno y penalizar los demás.

## Geometría: dos lazos helicoidales, no uno

La QFH son dos lazos bifilares concéntricos (4 conductores en total) de tamaño ligeramente distinto — un lazo grande y uno pequeño — conectados en paralelo en el punto de alimentación, en la parte inferior del conjunto (junto al mástil de soporte, por donde sube el coaxial). La diferencia de tamaño entre lazos hace que la corriente sea inductiva en uno y capacitiva en el otro; conectados en paralelo, esto tiende a dar una impedancia de alimentación cercana a 50Ω resistivos sin red de adaptación adicional — es el comportamiento reportado de forma consistente por constructores de QFH en foros y blogs de radioafición para 137MHz. No se pudo extraer el contenido completo de la página de adaptación de John Coppens (es una calculadora interactiva en JavaScript, no accesible por scraping simple), así que esta afirmación se apoya en la práctica documentada de la comunidad, no en esa página concreta — **hay que confirmarlo con una medición real de ROE propia una vez construida la antena**, y no dar por hecho el valor hasta entonces.

## Por qué las medidas exactas NO se calculan aquí a mano

La longitud de onda de referencia (2180.3mm) es solo el punto de partida. Las medidas reales de una QFH dependen de: el "twist" (giro, normalmente 0.5 vueltas = 180°), el diámetro real del conductor/tubo que vayas a usar, y el radio de curvatura de los codos — porque un doblez real no es una esquina de 90° perfecta, hay una corrección geométrica por eso. Estas correcciones no son un simple factor de velocidad como en el monopolo del Proyecto 01; dependen de la geometría 3D completa del doblez.

En vez de derivar (y arriesgarme a equivocar) esa corrección geométrica desde cero, se usa la **calculadora de referencia de la comunidad**: la de John Coppens (ON6JC/LW3HAZ), la misma que usan los proyectos de referencia consultados como [`3dp-qfh`](https://github.com/LongHairedHacker/3dp-qfh) (soporte impreso en 3D para QFH de 137MHz, prácticamente el mismo objetivo que este proyecto) y varios remixes en Thingiverse. Es una decisión de ingeniería deliberada: usar una herramienta validada por la comunidad en vez de reinventar un cálculo geométrico propenso a error cuando la pieza física ya es cara/lenta de fabricar si sale mal.

### Parámetros a introducir en la calculadora

Calculadora: **http://www.jcoppens.com/ant/qfh/calc.en.php**

⚠️ **Nota de honestidad técnica**: la calculadora es una página interactiva en JavaScript; no fue posible extraer su contenido/formulario exacto de forma automática. Los nombres de campo de la tabla siguiente son los habituales en calculadoras QFH de este tipo (según práctica general de la comunidad, no una captura verificada de esta página en concreto) — **al abrir la calculadora real, confirmar que los campos coinciden antes de fiarte de esta tabla**, y ajustar si el interfaz real usa otra nomenclatura.

| Campo | Valor a usar | Por qué |
|---|---|---|
| Design frequency | `137.5` MHz | Centro de banda, ver arriba |
| Number of turns (twist) | `0.5` | Configuración estándar (180°), la que genera el patrón hemisférico deseado |
| Length of one turn | `1` wavelength | Configuración estándar más común, mejor documentada |
| Bending radius | según el radio real de los codos que imprimas (medir con calibre) | Depende de tu pieza impresa, no del diseño eléctrico |
| Conductor diameter | diámetro real del hilo/tubo de cobre que vayas a usar | Afecta a la longitud eléctrica compensada |
| Width/height ratio (D/H) | `0.35` | El valor "de catálogo" es 0.44 (máxima ganancia), pero 0.3-0.4 da mejor cobertura hacia el horizonte — priorizamos duración de pase sobre ganancia pico, igual que se prioriza en el resto del proyecto (Fase de resultados: comparar pases completos, no solo el pico en el cénit) |

### Salidas que necesitamos de la calculadora (y que alimentan el modelo 3D)

- `H1`, `Dc1` — altura y separación horizontal compensada del **lazo grande**
- `H2`, `Dc2` — altura y separación horizontal compensada del **lazo pequeño**

Estos cuatro valores son los parámetros de entrada de [`qfh_support.scad`](qfh_support.scad) — el modelo paramétrico no asume ninguna medida fija, se generan las piezas a partir de estos números reales una vez calculados con tu conductor y radio de doblez exactos.

## Alimentación y balun

Siguiendo la práctica estándar de la comunidad: alimentar en paralelo ambos lazos en el punto de alimentación inferior (junto al mástil, ~50Ω resistivo esperado, a confirmar con ROE real — ver nota de la sección anterior), y añadir un **balun de choque** — varias vueltas del propio cable coaxial alrededor del mástil de soporte, cerca del punto de alimentación — para bloquear corrientes de modo común en la malla del coaxial sin introducir ninguna transformación de impedancia adicional. Es la solución más simple y la más citada en construcciones caseras de QFH, y no requiere componentes adicionales.

## Piezas impresas en 3D

Ver [`qfh_support.scad`](qfh_support.scad): mástil central + dos soportes en cruz (uno para cada lazo, girados 90° entre sí como exige la geometría bifilar) que sostienen los 4 conductores helicoidales. Inspirado en el enfoque estructural de `3dp-qfh` (mástil + piezas de conexión impresas, tubo/varilla recta entre ellas), pero generado paramétricamente a partir de las salidas reales de la calculadora en vez de medidas fijas de ese proyecto.

## Estado

🔵 Metodología y parámetros de la calculadora definidos. Pendiente: ejecutar la calculadora con el conductor real elegido (hilo de cobre vs. tubo — determina el precio y la rigidez mecánica) y el radio de doblez de la pieza impresa, para obtener H1/Dc1/H2/Dc2 finales e imprimir.

## Referencias

- John Coppens ON6JC/LW3HAZ — [Calculadora QFH](http://www.jcoppens.com/ant/qfh/calc.en.php) y [página de adaptación/balun](http://www.jcoppens.com/ant/qfh/adapt.en.php)
- [`LongHairedHacker/3dp-qfh`](https://github.com/LongHairedHacker/3dp-qfh) — soporte impreso en 3D de referencia para QFH de 137MHz
