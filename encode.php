<?php
require __DIR__ . '/vendor/autoload.php';

use function Jawira\PlantUml\encodep;

$data = json_decode(file_get_contents("php://input"), true);
$value = $data["value"];
$type = $data["type"];

$encode = encodep($value);
echo "http://www.plantuml.com/plantuml/{$type}/{$encode}";
