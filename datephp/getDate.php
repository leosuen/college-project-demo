<?php
$today = strtotime("now");
$start_week = strtotime("last Tuesday",$today);
$end_week = strtotime("next Tuesday",$today);

$today = new DateTime("now", new DateTimeZone('ASIA/Taipei'));
$end_week = new DateTime("next Tuesday", new DateTimeZone('ASIA/Taipei'));
/*$start_week = date("Y-m-d",$start_week);
$end_week = date("Y-m-d",$end_week);*/

echo $end_week->format('Y-m-d');//$date_diff->format('%d Day %h Hours %i Minute %s Seconds');
?>