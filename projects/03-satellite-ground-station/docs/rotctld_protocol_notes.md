# Notas del protocolo `rotctld` (Hamlib)

Referencia: [man page oficial de rotctld](https://hamlib.sourceforge.net/html/rotctld.1.html). Resumen del subconjunto que implementa `rotctld_bridge.py`:

- El protocolo es texto plano por TCP (puerto por defecto `4533`), un comando por línea terminada en `\n`.
- **`P <azimut> <elevacion>\n`** (o `set_pos`) — mueve el rotor a la posición indicada (grados, float). Respuesta: `RPRT 0\n` si OK, `RPRT <negativo>\n` si error.
- **`p\n`** (o `get_pos`) — consulta posición actual. Respuesta: dos líneas, `<azimut>\n<elevacion>\n`.
- **`S\n`** (o `stop`) — detiene el movimiento. Respuesta: `RPRT 0\n`.

Existe también un "Extended Response Protocol" (prefijo `+`) que añade eco del comando y formato `clave: valor` — no lo implementamos, nos quedamos con el protocolo básico, que es el que usa Gpredict por defecto al configurar un rotor como backend "Hamlib rotctld / Net rotctl (rotator model 2)".

## Referencia de proyectos similares

Para contrastar el diseño del puente, se revisó [`OH1KH/WiFiRotorCtl`](https://github.com/OH1KH/WiFiRotorCtl) (controlador de rotor con ESP12e), un proyecto open-source que implementa el mismo protocolo directamente en el microcontrolador (en vez de con un puente Python intermedio como aquí). Se documenta como alternativa de diseño: en una futura iteración, se podría mover la lógica de `rotctld_bridge.py` directamente al firmware del ESP32 y exponerlo por WiFi en vez de por serie+Python, eliminando el PC intermedio.

## Configuración en Gpredict

En Gpredict: `Edit > Preferences > Interfaces > Rotators > Add`, seleccionar backend **Hamlib rotctld / Net rotctl (rotator model 2)**, host `localhost`, puerto `4533` (o la IP del equipo que corre `rotctld_bridge.py` si está en otra máquina).

⚠️ Nota: el comportamiento exacto de línea de respuesta (si `get_pos` incluye o no un `RPRT 0` final tras los dos valores) puede variar ligeramente entre versiones de Hamlib. Verificar con `rotctl` o `nc` antes de la primera prueba con Gpredict real, y ajustar `rotctld_bridge.py` si es necesario.
