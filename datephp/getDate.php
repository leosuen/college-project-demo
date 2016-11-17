<?php
$today = strtotime("now");
$start_week = strtotime("last Tuesday",$today);
$end_week = strtotime("next Tuesday",$today);

$start_week = date("Y-m-d",$start_week);
$end_week = date("Y-m-d",$end_week);
echo $end_week;
?>