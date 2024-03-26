<?php

function load_json(): array
{
    $url = "../json/problems.json";
    $json = file_get_contents($url);
    $arrs = json_decode($json, TRUE);
    return $arrs;
}
