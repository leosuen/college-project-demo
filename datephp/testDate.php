<?php
header('Content-Type: application/json');

$tomorrow = new DateTime("tomorrow", new DateTimeZone('ASIA/Taipei'));
$format_tomorrow = $tomorrow->format('Y-m-d');
$format_nextTuesday = null;
$data_echo = array("now" => $format_tomorrow,"nextTuesday" => $format_nextTuesday,"isTuesday" => "true");

echo json_encode($data_echo);//$date_diff->format('%d Day %h Hours %i Minute %s Seconds');
?>