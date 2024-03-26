<?php

function json(): array
{
    $url = "../json/problems.json";
    $json = file_get_contents($url);
    $arrs = json_decode($json, TRUE);
    return $arrs;
}
