<?php
include "../inner-database.php";
session_start();
$temp_empquery = $_SESSION['user_session'];
$pollData = $_POST['pollData'];
$update_id = $pollData['update_id'];
$update_product = $pollData['update_product'];
$update_price = $pollData['update_price'];
$update_promotion = $pollData['update_promotion'];
$update_place = $pollData['update_place'];
$update_five_why = $pollData['update_five_why'];
$update_five_who = $pollData['update_five_who'];
$update_five_what = $pollData['update_five_what'];
$update_five_where = $pollData['update_five_where'];
$update_five_when = $pollData['update_five_when'];
$update_one_how = $pollData['update_one_how'];
$update_ps_note = $pollData['update_ps_note'];
try {
    $sql_updatePoll = "UPDATE `triz_poll` SET `poll_product`='$update_product',`poll_price`='$update_price',`poll_promotion`='$update_promotion',`poll_place`='$update_place',`poll_why`='$update_five_why',`poll_who`='$update_five_who',`poll_what`='$update_five_what',`poll_where`='$update_five_where',`poll_when`='$update_five_when',`poll_how`='$update_one_how',`poll_note`='$update_ps_note' WHERE `ID`= $update_id AND `Emp_ID` LIKE '$temp_empquery'"; //work in progress
    $stmt = $conn -> prepare($sql_updatePoll);
    $stmt->execute();
    echo "complete";
} catch (Exception $exc) {
    echo $exc->getMessage();
}
?>