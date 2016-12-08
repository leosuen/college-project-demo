<?php
header('Content-Type: application/json');
date_default_timezone_set("Asia/Taipei");

$tomorrow = new DateTime("tomorrow", new DateTimeZone('ASIA/Taipei'));
$format_tomorrow = $tomorrow->format('Y-m-d');
$data_echo = array("tomorrow" => $format_tomorrow,"testTrigger" => "true");

echo json_encode($data_echo);
?>