// ============================================================
// Rotor Az/El de dos ejes para antena ligera de estación de
// satélites (QFH/turnstile, Proyecto 03)
// Motores: 28BYJ-48 + driver ULN2003
//
// Uso: abrir en OpenSCAD, ajustar motor_shaft_d y demás medidas
// a tu motor real (hay variantes con eje de 5mm "D-shaft" muy
// comunes), exportar a STL.
// ============================================================

// --- Parámetros ajustables ---
motor_body_d      = 28;    // diámetro del cuerpo del 28BYJ-48 [mm]
motor_body_h      = 19;    // altura del cuerpo del motor [mm]
motor_shaft_d     = 5;     // diámetro del eje (tipo "D-shaft") [mm]
motor_mount_holes_spacing = 35; // separación de los tornillos de fijación del 28BYJ-48 [mm]

base_d            = 90;    // diámetro de la base de azimut [mm]
base_h            = 8;     // altura de la base [mm]

turntable_d       = 80;    // diámetro del plato giratorio [mm]
turntable_h       = 6;     // altura del plato giratorio [mm]

fork_height       = 60;    // altura de la horquilla de elevación [mm]
fork_arm_width    = 12;    // ancho de cada brazo de la horquilla [mm]
fork_arm_thick    = 6;     // grosor de cada brazo [mm]

$fn = 64;

module motor_mount_holes() {
    for (a = [45, 135, 225, 315])
        rotate([0,0,a])
            translate([motor_mount_holes_spacing/2, 0, -1])
            cylinder(d = 3.2, h = 20); // tornillos M3
}

module azimuth_base() {
    difference() {
        cylinder(d = base_d, h = base_h);
        // hueco central para el eje del motor de azimut (pasa a traves)
        translate([0,0,-1])
            cylinder(d = motor_shaft_d + 0.6, h = base_h + 2);
        // tornillos de fijacion del motor de azimut (montado por debajo)
        motor_mount_holes();
    }
}

module turntable() {
    difference() {
        cylinder(d = turntable_d, h = turntable_h);
        translate([0,0,-1])
            cylinder(d = motor_shaft_d + 0.6, h = turntable_h + 2);
    }
}

module elevation_fork() {
    // Dos brazos verticales sobre el plato giratorio, sujetando el
    // motor de elevacion entre ellos (a modo de horquilla)
    gap = motor_body_d + 6; // separacion interior entre brazos
    for (side = [-1, 1])
        translate([side * (gap/2 + fork_arm_thick/2), 0, turntable_h])
            cube([fork_arm_thick, fork_arm_width, fork_height], center = true);
}

module elevation_motor_bracket() {
    // Soporte del motor de elevacion, atornillado a la cara interior
    // de un brazo de la horquilla
    difference() {
        cylinder(d = motor_body_d + 6, h = 6);
        translate([0,0,-1])
            cylinder(d = motor_shaft_d + 0.6, h = 8);
        motor_mount_holes();
    }
}

module rotor_assembly() {
    azimuth_base();
    translate([0, 0, base_h + 2])
        turntable();
    translate([0, 0, base_h + 2])
        elevation_fork();
}

rotor_assembly();

// ============================================================
// Notas de fabricación:
// - La base de azimut se atornilla al motor de azimut (28BYJ-48)
//   montado por debajo, con su eje pasando por el agujero central.
// - El plato giratorio (turntable) va acoplado al eje del motor de
//   azimut con un acoplador de eje impreso o un tubo termorretráctil
//   a presión (el eje "D-shaft" de 5mm evita que resbale).
// - Sobre el plato giratorio se imprime la horquilla de elevación;
//   el motor de elevación va atornillado dentro de la horquilla con
//   elevation_motor_bracket(), con su eje perpendicular al de azimut.
// - Imprimir azimuth_base + turntable + elevation_fork como piezas
//   separadas (ya lo son en este ensamblaje) para poder insertar los
//   rodamientos/ejes antes de unir.
// ============================================================
