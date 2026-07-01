# 04 — Red mesh IoT con LoRa (proyecto insignia)

**Estado:** 🔵 Planeado

## Objetivo

Diseñar, desplegar y documentar una red de sensores IoT real, de extremo a extremo, usando nodos ESP32+LoRa distribuidos en varios puntos de la ciudad/campus, con gateway MQTT y dashboard en tiempo real.

## Por qué importa

Es el proyecto que mejor demuestra una visión de sistema completo: RF (LoRa), hardware embebido, protocolo de red (MQTT), backend y visualización — todo en un despliegue real, no una demo de laboratorio.

## Enfoque

1. Programar nodos ESP32 con módulo LoRa SX1276/78 y sensores (temperatura, humedad, calidad de aire).
2. Diseñar e imprimir carcasas resistentes a intemperie para cada nodo.
3. Desplegar 4-6 nodos en ubicaciones reales, medir alcance efectivo.
4. Configurar gateway que recibe datos LoRa y los publica vía MQTT.
5. Construir dashboard en tiempo real (Grafana o Node-RED).
6. Calcular el link budget teórico y compararlo con el alcance medido en campo.

## Material / BOM

- ESP32 x4-6
- Módulos LoRa SX1276/78 x4-6
- Sensores ambientales (DHT22, sensor de calidad de aire, etc.)
- Carcasas impresas en 3D
- Raspberry Pi (gateway)

## Resultados

*(Pendiente — completar con mapa de cobertura, datos de alcance real vs. link budget, dashboard en vivo)*

## Habilidades demostradas

- Comunicaciones LPWAN (LoRa/LoRaWAN)
- Sistemas embebidos y programación de microcontroladores
- Arquitectura de red IoT de extremo a extremo (RF → gateway → backend → visualización)
- Cálculo y validación de link budget

## Media

*(Añadir aquí mapa de cobertura, capturas del dashboard, fotos del despliegue)*
