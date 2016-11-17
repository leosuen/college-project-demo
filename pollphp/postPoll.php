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

$today = strtotime("now");
$start_week = strtotime("last Tuesday",$today);
$end_week = strtotime("next Tuesday",$today);

$start_week = date("Y-m-d",$start_week);
$end_week = date("Y-m-d",$end_week);
try {
    $sql_poll_schema = "INSERT INTO `triz_poll`(`ID`, `Name`, `Emp_ID`, `Date`, `end_date`, `poll_product`, `poll_price`, `poll_promotion`, `poll_place`, `poll_why`, `poll_who`, `poll_what`, `poll_where`, `poll_when`, `poll_how`, `poll_vote`, `poll_note`) VALUES (NULL,'$emp_name','$emp_id','$date','$end_week','$product','$price','$promotion','$place','$five_why','$five_who','$five_what','$five_where','$five_when','$one_how','0','$ps_note')";
    $stmt = $conn->prepare($sql_poll_schema);
    $stmt->execute();
    echo "complete";
} catch (Exception $exc) {
    echo $exc->getMessage();
}

?>