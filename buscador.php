<?php
$conexion = new mysqli("localhost", "root", "", "bienes_raices");
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$ciudad = $_POST['ciudad'] ?? '';
$tipo = $_POST['tipo'] ?? '';
$precio = $_POST['precio'] ?? '0;1000000';

list($min, $max) = explode(";", $precio);
$min = (int)$min;
$max = (int)$max;

$query = "SELECT * FROM propiedades WHERE 
  REPLACE(REPLACE(REPLACE(precio, '$', ''), ',', ''), ' ', '') + 0 BETWEEN $min AND $max";

if ($ciudad !== '') {
    $ciudad = $conexion->real_escape_string($ciudad);
    $query .= " AND ciudad = '$ciudad'";
}
if ($tipo !== '') {
    $tipo = $conexion->real_escape_string($tipo);
    $query .= " AND tipo = '$tipo'";
}

$resultado = $conexion->query($query);
if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        echo "<div class='colContenido'>
            <img src='img/home.jpg' class='imagen-propiedad'>
            <div class='tarjeta'>
                <h3>{$row['direccion']}</h3>
                <p><strong>Ciudad:</strong> {$row['ciudad']}</p>
                <p><strong>Teléfono:</strong> {$row['telefono']}</p>
                <p><strong>Código Postal:</strong> {$row['codigo_postal']}</p>
                <p><strong>Tipo:</strong> {$row['tipo']}</p>
                <p><strong>Precio:</strong> <span class='precio'>{$row['precio']}</span></p>
            </div>
        </div>";
    }
} else {
    echo "<p>No se encontraron resultados.</p>";
}
?>
