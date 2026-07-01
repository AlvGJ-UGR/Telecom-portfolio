/*
 * rotor_firmware.ino
 * Firmware de control de dos motores 28BYJ-48 (azimut + elevación)
 * vía driver ULN2003, recibiendo comandos por puerto serie desde
 * rotctld_bridge.py.
 *
 * Proyecto 03 - Estación terrena de satélites
 * Portfolio de Ingeniería de Telecomunicaciones
 *
 * Protocolo serie (texto, 115200 baud, terminado en '\n'):
 *   Comando entrante:  "AZ:<grados> EL:<grados>\n"   ej. "AZ:135.50 EL:42.00"
 *   Respuesta:         "OK AZ:<grados> EL:<grados>\n" cuando alcanza el objetivo
 *   Consulta:          "POS?\n" -> "AZ:<grados> EL:<grados>\n"
 *
 * Requiere la librería Stepper (incluida en el IDE de Arduino) o
 * AccelStepper para mejor control de velocidad/aceleración.
 */

#include <Stepper.h>

// --- Calibración geométrica (ver rotor_design.md para la justificación) ---
const int STEPS_PER_OUTPUT_REV = 8152; // medio paso, calculado a partir de
                                        // la relación de reducción real 63.684:1
const float DEG_PER_STEP = 360.0 / STEPS_PER_OUTPUT_REV; // ~0.044 grados/paso

// --- Pines (ajustar según tu cableado real de los dos ULN2003) ---
// Motor de azimut
#define AZ_IN1 8
#define AZ_IN2 9
#define AZ_IN3 10
#define AZ_IN4 11
// Motor de elevación
#define EL_IN1 4
#define EL_IN2 5
#define EL_IN3 6
#define EL_IN4 7

Stepper azMotor(STEPS_PER_OUTPUT_REV, AZ_IN1, AZ_IN3, AZ_IN2, AZ_IN4);
Stepper elMotor(STEPS_PER_OUTPUT_REV, EL_IN1, EL_IN3, EL_IN2, EL_IN4);

float currentAz = 0.0;
float currentEl = 0.0;

const float EL_MIN = 0.0;
const float EL_MAX = 90.0;
// Límite mecánico de azimut para evitar que el cableado se retuerza
// indefinidamente (sin anillo colector / slip ring):
const float AZ_MIN = 0.0;
const float AZ_MAX = 360.0;

void moveAxis(Stepper &motor, float &current, float target, float axisMin, float axisMax) {
    target = constrain(target, axisMin, axisMax);
    float delta = target - current;
    long steps = round(delta / DEG_PER_STEP);
    if (steps != 0) {
        motor.step(steps);
        current += steps * DEG_PER_STEP;
    }
}

void setup() {
    Serial.begin(115200);
    azMotor.setSpeed(10); // RPM de salida, conservador para no perder pasos
    elMotor.setSpeed(10);
    Serial.println("READY rotor_firmware v1");
}

void handleCommand(String line) {
    line.trim();
    if (line == "POS?") {
        Serial.print("AZ:");
        Serial.print(currentAz, 2);
        Serial.print(" EL:");
        Serial.println(currentEl, 2);
        return;
    }

    int azIdx = line.indexOf("AZ:");
    int elIdx = line.indexOf("EL:");
    if (azIdx == -1 || elIdx == -1) {
        Serial.println("ERR formato esperado: AZ:<num> EL:<num>");
        return;
    }

    float targetAz = line.substring(azIdx + 3, line.indexOf(' ', azIdx)).toFloat();
    float targetEl = line.substring(elIdx + 3).toFloat();

    moveAxis(azMotor, currentAz, targetAz, AZ_MIN, AZ_MAX);
    moveAxis(elMotor, currentEl, targetEl, EL_MIN, EL_MAX);

    Serial.print("OK AZ:");
    Serial.print(currentAz, 2);
    Serial.print(" EL:");
    Serial.println(currentEl, 2);
}

void loop() {
    if (Serial.available()) {
        String line = Serial.readStringUntil('\n');
        handleCommand(line);
    }
}
