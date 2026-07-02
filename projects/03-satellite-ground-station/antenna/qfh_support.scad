// ============================================================
// Soporte de antena QFH (Quadrifilar Helicoidal) para 137MHz
// Proyecto 03 - Estación terrena de satélites
//
// IMPORTANTE: H1/Dc1/H2/Dc2 son valores de EJEMPLO (orden de
// magnitud razonable para 137.5MHz, D/H=0.35) para poder previsualizar
// la pieza. Sustituir por los valores REALES que devuelva la
// calculadora de John Coppens (ver qfh_design.md) con tu conductor
// y radio de doblez exactos antes de imprimir la pieza final.
// ============================================================

// --- Parámetros ajustables (sustituir por salida real de la calculadora) ---
H1   = 480;   // altura compensada del lazo GRANDE [mm] (placeholder, ver nota arriba)
Dc1  = 240;   // separación horizontal compensada del lazo GRANDE [mm] (placeholder)
H2   = 380;   // altura compensada del lazo PEQUEÑO [mm] (placeholder)
Dc2  = 190;   // separación horizontal compensada del lazo PEQUEÑO [mm] (placeholder)

mast_od         = 25;   // diámetro exterior del mástil central (tubo PVC) [mm]
conductor_d     = 6;    // diámetro del conductor (hilo/tubo de cobre) [mm]
arm_thickness   = 8;    // grosor de los brazos en cruz [mm]
arm_width       = 14;   // ancho de los brazos en cruz [mm]
bracket_height  = 12;   // altura de cada pieza de soporte [mm]

$fn = 48;

module mast_clamp() {
    // Abrazadera central que rodea el mástil, con un pequeño corte
    // para poder apretarla a presión sobre el tubo (sin tornillo)
    difference() {
        cylinder(d = mast_od + 2*arm_thickness, h = bracket_height);
        translate([0,0,-1])
            cylinder(d = mast_od + 0.5, h = bracket_height + 2);
        // corte para permitir apriete a presión
        translate([-1, -(mast_od/2 + arm_thickness + 2), -1])
            cube([2, mast_od/2 + arm_thickness + 4, bracket_height + 2]);
    }
}

module conductor_holder(offset_xy) {
    // Soporte tubular para un conductor individual, en el extremo del brazo
    translate([offset_xy[0], offset_xy[1], 0])
        difference() {
            cylinder(d = conductor_d + 2*arm_thickness*0.5, h = bracket_height);
            translate([0,0,-1])
                cylinder(d = conductor_d + 0.4, h = bracket_height + 2);
        }
}

module cross_arms(half_separation) {
    // Cuatro brazos en cruz, uno por cada conductor del lazo
    for (a = [0, 90, 180, 270])
        rotate([0, 0, a])
            translate([half_separation/2 - arm_width/2, -arm_thickness/2, 0])
                cube([half_separation/2 + arm_width/2, arm_thickness, bracket_height]);
}

module loop_bracket(half_separation) {
    union() {
        mast_clamp();
        cross_arms(half_separation);
        for (a = [45, 135, 225, 315]) {
            x = half_separation/2 * cos(a) / cos(45);
            y = half_separation/2 * sin(a) / cos(45);
            conductor_holder([x, y]);
        }
    }
}

// Soporte INFERIOR: punto de convergencia de los 4 conductores cerca
// del punto de alimentación (separación mínima, solo para mantenerlos
// ordenados junto al mástil antes de que se abran hacia los soportes
// superiores)
feed_gap = mast_od + 2*conductor_d + 16;
translate([0, 0, 0])
    loop_bracket(feed_gap);

// Soporte SUPERIOR del lazo GRANDE, a la altura real H1 (salida de la
// calculadora, ver qfh_design.md)
translate([0, 0, H1])
    loop_bracket(Dc1);

// Soporte SUPERIOR del lazo PEQUEÑO, a la altura real H2, girado 90°
// respecto al del lazo grande — el giro de 90° es el que exige la
// geometría bifilar de la QFH (los dos lazos van en planos perpendiculares)
translate([0, 0, H2])
    rotate([0, 0, 90])
    loop_bracket(Dc2);

// ============================================================
// Notas de fabricación:
// - Tres piezas independientes a lo largo del mástil: soporte inferior
//   de convergencia (z=0), soporte del lazo grande (z=H1) y soporte
//   del lazo pequeño (z=H2, girado 90°). Enhebrar las tres en el
//   mástil de PVC/tubo y fijar a las alturas correctas ANTES de pasar
//   los 4 conductores helicoidales por los conductor_holder().
// - ⚠️ Verificar contra la salida real de la calculadora si H1 > H2 o
//   al revés (la convención de qué lazo es "grande"/"pequeño" en altura
//   puede variar) — el código no asume un orden concreto, solo coloca
//   cada soporte en su H correspondiente.
// - El corte de mast_clamp() permite apriete a presión sin tornillos;
//   si el ajuste queda flojo, añadir una brida o un tornillo M3 lateral.
// - Los conductores helicoidales (hilo/tubo de cobre) se doblan a mano
//   sobre una plantilla circular del diámetro Dc1/Dc2 correspondiente,
//   y se sueldan/conectan en el punto de alimentación inferior (soporte
//   de convergencia) según qfh_design.md (alimentación en paralelo +
//   balun de choque).
// ============================================================
