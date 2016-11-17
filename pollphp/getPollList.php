<?php 
header('Content-Type: application/json');
include '../inner-database.php';

$today = strtotime("now");
$start_week = strtotime("last Monday",$today);
$end_week = strtotime("next Monday",$today);

$start_week = date("Y-m-d",$start_week);
$end_week = date("Y-m-d",$end_week);

try {
    $sql_txt = "SELECT `ID`, `Name`, `Emp_ID`, `Date`, `end_date`, `poll_product`, `poll_price`, `poll_promotion`, `poll_place`, `poll_why`, `poll_who`, `poll_what`, `poll_where`, `poll_when`, `poll_how`, `poll_vote`, `poll_note` FROM `triz_poll` WHERE `end_date` = '$end_week'";
    $stmt = $conn -> prepare($sql_txt);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);

} catch (Exception $exc) {
    echo $exc->getMessage();
}
?>