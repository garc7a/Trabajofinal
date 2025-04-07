<?php
$conexion = new mysqli("localhost", "root", "", "bienes_raices");
$ciudades = [];
$tipos = [];

$ciudadesQuery = $conexion->query("SELECT DISTINCT ciudad FROM propiedades");
while ($row = $ciudadesQuery->fetch_assoc()) {
    $ciudades[] = $row['ciudad'];
}

$tiposQuery = $conexion->query("SELECT DISTINCT tipo FROM propiedades");
while ($row = $tiposQuery->fetch_assoc()) {
    $tipos[] = $row['tipo'];
}

echo json_encode(['ciudades' => $ciudades, 'tipos' => $tipos]);
?>
