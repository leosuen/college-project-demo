<?php
header('Content-Type: application/json');
$taiwan_zone = "ASIA/Taipei";
$today = new DateTime("now", new DateTimeZone($taiwan_zone));
$end_week = new DateTime("next Tuesday", new DateTimeZone($taiwan_zone));
$date_format = 'Y-m-d';
$format_today = $today->format($date_format);
$format_nextTuesday = $end_week->format($date_format);
if($today->format('N') == 2){
    $tomorrow = new DateTime("tomorrow", new DateTimeZone($taiwan_zone));
    $format_tomorrow = $tomorrow->format($date_format);
    $data_echo = array("now" => $format_tomorrow,"nextTuesday" => $format_nextTuesday,"isTuesday" => "true");
}
else{
    $data_echo = array("now" => $format_today,"nextTuesday" => $format_nextTuesday,"isTuesday" => "false");
}

echo json_encode($data_echo);
?>