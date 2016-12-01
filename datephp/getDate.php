<?php
header('Content-Type: application/json');

$today = new DateTime("now", new DateTimeZone('ASIA/Taipei'));
$end_week = new DateTime("next Tuesday", new DateTimeZone('ASIA/Taipei'));
$format_today = $today->format('Y-m-d');
$format_nextTuesday = $end_week->format('Y-m-d');//format y=year,m=month,d=day,N=the day of week
if($today->format('N') == 2){
    $tomorrow = new DateTime("tomorrow", new DateTimeZone('ASIA/Taipei'));
    $format_tomorrow = $tomorrow->format('Y-m-d');
    $data_echo = array("now" => $format_tomorrow,"nextTuesday" => $format_nextTuesday,"isTuesday" => "true");
}
else{
    $data_echo = array("now" => $format_today,"nextTuesday" => $format_nextTuesday,"isTuesday" => "false");
}

echo json_encode($data_echo);//$date_diff->format('%d Day %h Hours %i Minute %s Seconds');
?>