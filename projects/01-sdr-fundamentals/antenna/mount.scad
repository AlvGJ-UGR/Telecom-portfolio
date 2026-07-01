// ============================================================
// Soporte de antena ground-plane 1090 MHz (ADS-B)
// Proyecto 01 - Portfolio de Telecomunicaciones
//
// Base para conector SMA panel-mount + 4 brazos guía de radiales
// a 45 grados bajo la horizontal + canal central para el radiador.
//
// Uso: abrir en OpenSCAD (openscad.org, gratuito), ajustar
// parámetros según tu conector/hilo real, exportar a STL.
// ============================================================

// --- Parámetros ajustables ---
base_diameter   = 32;    // diámetro de la base [mm]
base_height     = 10;    // altura de la base [mm]
connector_hole  = 8;     // diámetro del taladro para el conector SMA [mm] - AJUSTAR a tu conector real
wire_channel_d  = 1.6;   // diámetro del canal para el hilo (radiador/radiales) [mm]
radial_length   = 68.6;  // longitud de cada brazo guía de radial [mm]
radial_angle    = 45;    // ángulo del radial respecto a la horizontal [grados]
n_radials       = 4;     // número de radiales
arm_width       = 4;     // ancho de cada brazo guía [mm]
arm_height      = 3;     // altura/grosor de cada brazo guía [mm]

$fn = 64; // resolución de curvas

module base() {
    difference() {
        cylinder(d = base_diameter, h = base_height);
        // taladro central para el conector SMA
        translate([0, 0, -1])
            cylinder(d = connector_hole, h = base_height + 2);
        // canal central para el hilo del radiador, saliendo hacia arriba
        translate([0, 0, base_height - 4])
            cylinder(d = wire_channel_d + 0.6, h = 6);
    }
}

module radial_arm() {
    // Brazo con canal en forma de "V" poco profundo para alojar el hilo
    difference() {
        cube([radial_length, arm_width, arm_height], center = false);
        translate([0, arm_width/2, arm_height])
            rotate([0, 90, 0])
            cylinder(d = wire_channel_d + 0.4, h = radial_length + 2, center = false);
    }
}

module radial_arms() {
    // overlap: cuánto se introduce cada brazo dentro de la base para
    // garantizar una unión sólida y fusionada al imprimir (crítico para
    // que el slicer no genere dos piezas separadas)
    overlap = 8;
    for (i = [0 : n_radials - 1]) {
        rotate([0, 0, i * (360 / n_radials)])
            translate([base_diameter/2 - overlap, -arm_width/2, base_height/2])
            rotate([0, radial_angle, 0])
            radial_arm();
    }
}

module antenna_mount() {
    base();
    radial_arms();
}

antenna_mount();

// ============================================================
// Notas de fabricación:
// - Imprimir con soporte en los brazos si tu impresora lo requiere
//   (ángulo de 45° suele imprimirse sin soporte en la mayoría de FDM).
// - Material recomendado: PETG (mejor resistencia a intemperie que PLA
//   si vas a dejar la antena fuera, ej. en el techo/balcón).
// - El hilo de cobre se pasa a través de los canales y se suelda
//   al conector SMA por dentro de la base.
// ============================================================
