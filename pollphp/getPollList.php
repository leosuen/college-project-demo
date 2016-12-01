<?php 
header('Content-Type: application/json');
include '../inner-database.php';

$today = new DateTime("now", new DateTimeZone('ASIA/Taipei'));
$end_week = new DateTime("next Tuesday", new DateTimeZone('ASIA/Taipei'));
$format_today = $today->format('Y-m-d');
$format_nextTuesday = $end_week->format('Y-m-d');//format y=year,m=month,d=day,N=the day of week
if($today->format('N') == 2){
    $end_week = $format_today;
}
else{
    $end_week = $format_nextTuesday;
}
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