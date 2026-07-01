# Diseño de antena: Ground-plane cuarto de onda para 1090 MHz

## Elección de topología

Para ADS-B se barajan tres diseños caseros habituales: colineal de fase (varias secciones λ/2 con stubs de fase), dipolo doblado, y **ground-plane de cuarto de onda** (un radiador vertical + radiales a modo de plano de tierra).

Se elige **ground-plane** para este proyecto porque:

- Con una sola sección resonante, el margen de error de fabricación es mucho menor que en un colineal de fase (que acumula error por cada stub).
- La impedancia de entrada se puede ajustar mecánicamente (ángulo de los radiales) sin necesidad de red de adaptación adicional.
- Es el diseño de referencia usado en la comunidad RTL-SDR para ADS-B, lo que permite validar resultados contra referencias conocidas.

Es una decisión de ingeniería con trade-off explícito: se sacrifica algo de ganancia (un colineal bien hecho puede dar +3 dB adicionales) a cambio de repetibilidad y facilidad de ajuste con herramientas caseras.

## Cálculo de dimensiones

Frecuencia de diseño: **f = 1090 MHz** (frecuencia de emisión ADS-B / Modo S)

$$\lambda = \frac{c}{f} = \frac{299{,}792{,}458 \text{ m/s}}{1{,}090{,}000{,}000 \text{ Hz}} = 275.04 \text{ mm}$$

$$\frac{\lambda}{4} = 68.76 \text{ mm} \quad \text{(cuarto de onda en espacio libre)}$$

**Radiador vertical** (con factor de velocidad de 0.95 para hilo de cobre rígido, que corrige el efecto de los extremos):

$$L_{radiador} = 0.95 \times \frac{\lambda}{4} = 65.3 \text{ mm}$$

**Radiales** (4 unidades, angulados 45° por debajo de la horizontal — esto sube la impedancia de entrada de ~35-37 Ω, típica de un plano de tierra a 90°, hasta acercarla a los 50 Ω del cable coaxial/SDR):

$$L_{radial} = 1.05 \times L_{radiador} \approx 68.6 \text{ mm}$$

## Resumen de la pieza

| Elemento | Cantidad | Longitud | Material sugerido |
|---|---|---|---|
| Radiador vertical | 1 | 65.3 mm | Hilo de cobre rígido 1-1.5 mm Ø |
| Radiales | 4 | 68.6 mm | Hilo de cobre rígido 1-1.5 mm Ø |
| Ángulo de radiales | — | 45° bajo horizontal | — |
| Conector | 1 | — | SMA hembra panel-mount |

## Ajuste fino (sin VNA)

Si todavía no tienes el NanoVNA (llega en la Fase 2), puedes ajustar la antena de forma empírica:

1. Corta el radiador y los radiales unos 3-4 mm más largos de lo calculado.
2. Conecta la antena al RTL-SDR y observa el ruido de fondo/número de aviones detectados en `dump1090`.
3. Recorta 1 mm cada vez de todos los elementos por igual y repite, buscando el punto de máxima recepción.

Si ya tienes el NanoVNA, mide S11 directamente y ajusta hasta minimizar el ROE en 1090 MHz — este método es mucho más rápido y preciso, y te sirve como práctica directa para el Proyecto 02.

## Pieza impresa en 3D

Ver [`mount.scad`](mount.scad): base para el conector SMA con 4 brazos guía a 45° para fijar los radiales, y canal central para el radiador. Parametrizado en OpenSCAD (gratuito) para que puedas ajustar las medidas si cambias de conector o de grosor de hilo.
