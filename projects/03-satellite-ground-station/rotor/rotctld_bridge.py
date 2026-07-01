"""
rotctld_bridge.py
Servidor TCP que habla el protocolo basico de rotctld (Hamlib) y lo
traduce a comandos serie hacia el firmware del rotor (rotor_firmware.ino).

Esto permite que Gpredict controle el rotor fisico seleccionando
"Hamlib rotctld / Net rotctl (rotator model 2)" como backend, sin
escribir ninguna integracion a medida en Gpredict.

Proyecto 03 - Estacion terrena de satelites
Portfolio de Ingenieria de Telecomunicaciones

Referencia del protocolo: docs/rotctld_protocol_notes.md
                           https://hamlib.sourceforge.net/html/rotctld.1.html

Uso:
    python rotctld_bridge.py --serial-port /dev/ttyUSB0 --tcp-port 4533
    python rotctld_bridge.py --demo --tcp-port 4533   # sin hardware conectado
"""
import argparse
import socketserver
import threading
import time

try:
    import serial
except ImportError:
    serial = None


def parse_args():
    p = argparse.ArgumentParser(description="Puente rotctld <-> serie para el rotor Az/El")
    p.add_argument("--serial-port", type=str, default="/dev/ttyUSB0", help="Puerto serie del Arduino/ESP32")
    p.add_argument("--baud", type=int, default=115200, help="Baud rate serie")
    p.add_argument("--tcp-host", type=str, default="0.0.0.0", help="Host de escucha del servidor rotctld")
    p.add_argument("--tcp-port", type=int, default=4533, help="Puerto de escucha (4533 es el estandar de rotctld)")
    p.add_argument("--demo", action="store_true", help="Modo demo: simula el rotor, sin hardware ni puerto serie real")
    return p.parse_args()


class RotorLink:
    """Abstrae la comunicacion con el firmware, real (serie) o simulada (demo)."""

    def __init__(self, port, baud, demo=False):
        self.demo = demo or serial is None
        self.lock = threading.Lock()
        self.sim_az = 0.0
        self.sim_el = 0.0
        if not self.demo:
            self.ser = serial.Serial(port, baud, timeout=2)
            time.sleep(2)  # esperar el reset del Arduino al abrir el puerto serie
            self.ser.readline()  # descarta el "READY" inicial del firmware
        else:
            self.ser = None

    def set_pos(self, az, el):
        with self.lock:
            if self.demo:
                # simula un movimiento instantaneo (en la realidad el firmware
                # tarda segun la velocidad configurada en el motor)
                self.sim_az, self.sim_el = az, el
                return az, el
            cmd = f"AZ:{az:.2f} EL:{el:.2f}\n"
            self.ser.write(cmd.encode())
            resp = self.ser.readline().decode(errors="ignore").strip()
            return self._parse_ok(resp)

    def get_pos(self):
        with self.lock:
            if self.demo:
                return self.sim_az, self.sim_el
            self.ser.write(b"POS?\n")
            resp = self.ser.readline().decode(errors="ignore").strip()
            return self._parse_ok(resp)

    @staticmethod
    def _parse_ok(resp):
        # respuesta esperada: "OK AZ:123.45 EL:67.89" o "AZ:123.45 EL:67.89"
        try:
            az_part = resp.split("AZ:")[1].split(" ")[0]
            el_part = resp.split("EL:")[1].split(" ")[0]
            return float(az_part), float(el_part)
        except (IndexError, ValueError):
            return 0.0, 0.0


class RotctldHandler(socketserver.StreamRequestHandler):
    def handle(self):
        while True:
            raw = self.rfile.readline()
            if not raw:
                break
            line = raw.decode(errors="ignore").strip()
            if not line:
                continue
            self._dispatch(line)

    def _dispatch(self, line):
        rotor: RotorLink = self.server.rotor_link
        tokens = line.split()
        cmd = tokens[0]

        if cmd in ("P", "set_pos"):
            try:
                az, el = float(tokens[1]), float(tokens[2])
            except (IndexError, ValueError):
                self.wfile.write(b"RPRT -1\n")
                return
            rotor.set_pos(az, el)
            self.wfile.write(b"RPRT 0\n")

        elif cmd in ("p", "get_pos"):
            az, el = rotor.get_pos()
            self.wfile.write(f"{az:.6f}\n{el:.6f}\n".encode())

        elif cmd in ("S", "stop"):
            # el firmware actual es de movimiento discreto (no continuo),
            # asi que "stop" es un no-op seguro; se deja el hook para un
            # futuro firmware con movimiento por velocidad continua.
            self.wfile.write(b"RPRT 0\n")

        else:
            self.wfile.write(b"RPRT -1\n")


class RotctldServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True

    def __init__(self, addr, handler, rotor_link):
        super().__init__(addr, handler)
        self.rotor_link = rotor_link


def main():
    args = parse_args()
    rotor = RotorLink(args.serial_port, args.baud, demo=args.demo)
    if rotor.demo:
        print("[AVISO] Ejecutando en modo demo (sin puerto serie real).")

    server = RotctldServer((args.tcp_host, args.tcp_port), RotctldHandler, rotor)
    print(f"Servidor rotctld escuchando en {args.tcp_host}:{args.tcp_port}")
    print("Configura Gpredict: Rotator backend = 'Hamlib rotctld / Net rotctl (rotator model 2)'")
    server.serve_forever()


if __name__ == "__main__":
    main()
