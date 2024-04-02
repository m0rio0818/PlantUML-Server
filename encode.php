<?php
require __DIR__ . '/vendor/autoload.php';

use function Jawira\PlantUml\encodep;

$data = json_decode(file_get_contents("php://input"), true);
$value = $data["value"];
$type = $data["type"];

if ($type == "png" || $type == "svg") {
    $encode = encodep($value);
    echo "http://www.plantuml.com/plantuml/{$type}/{$encode}";
} else {
    $encode = encodep($value);
    $apiUrl = "https://www.plantuml.com/plantuml/txt/{$encode}";
    $asciiArt = file_get_contents($apiUrl);

    // 取得したASCIIアートをHTMLに表示
    echo '<pre>' . $asciiArt . '</pre>';
}
