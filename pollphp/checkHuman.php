<?php
session_start();
include '../inner-database.php';
$today = new DateTime("now", new DateTimeZone('ASIA/Taipei'));
$minusSeventoday = new DateTime("-7 days", new DateTimeZone('ASIA/Taipei'));
$format_today = $today->format('Y-m-d');
$format_minusSeventoday = $minusSeventoday->format('Y-m-d');
$sql_check_name = "SELECT `Emp_ID` FROM `triz_poll` WHERE poll_vote = (SELECT MAX(poll_vote) FROM triz_poll WHERE end_date <= '$format_today' AND end_date > '$format_minusSeventoday') AND poll_certificate is null";
$stmt = $conn -> prepare($sql_check_name);
$stmt->execute();
$data = $stmt->fetch(PDO::FETCH_ASSOC);
if($data['Emp_ID'] == $_SESSION['user_session']){
    echo "chosenOne";
}
else{
    echo "NOT YOU";
}
?>