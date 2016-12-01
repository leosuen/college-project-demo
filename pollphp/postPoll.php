<?php

include "../inner-database.php";

$pollData = $_POST['pollData'];
$emp_name = $pollData['emp_name'];
$emp_id = $pollData['emp_id'];
$date = $pollData['date'];
$product = $pollData['product'];
$price = $pollData['price'];
$promotion = $pollData['promotion'];
$place = $pollData['place'];
$five_why = $pollData['five_why'];
$five_who = $pollData['five_who'];
$five_what = $pollData['five_what'];
$five_where = $pollData['five_where'];
$five_when = $pollData['five_when'];
$one_how = $pollData['one_how'];
$ps_note = $pollData['ps_note'];

$today = new DateTime("now", new DateTimeZone('ASIA/Taipei'));
$end_week = new DateTime("next Tuesday", new DateTimeZone('ASIA/Taipei'));
$format_today = $today->format('Y-m-d');
$format_nextTuesday = $end_week->format('Y-m-d');//format y=year,m=month,d=day,N=the day of week
try {
    $sql_poll_schema = "INSERT INTO `triz_poll`(`ID`, `Name`, `Emp_ID`, `Date`, `end_date`, `poll_product`, `poll_price`, `poll_promotion`, `poll_place`, `poll_why`, `poll_who`, `poll_what`, `poll_where`, `poll_when`, `poll_how`, `poll_vote`, `poll_note`) VALUES (NULL,'$emp_name','$emp_id','$date','$format_nextTuesday','$product','$price','$promotion','$place','$five_why','$five_who','$five_what','$five_where','$five_when','$one_how','0','$ps_note')";
    $stmt = $conn->prepare($sql_poll_schema);
    $stmt->execute();
    echo "complete";
} catch (Exception $exc) {
    echo $exc->getMessage();
}

?>