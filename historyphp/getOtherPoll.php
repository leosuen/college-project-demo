<?php
header('Content-Type: application/json');
include '../inner-database.php';

$last_week = new DateTime("last Tuesday", new DateTimeZone('ASIA/Taipei'));
$format_lastweek = $last_week->format('Y-m-d');

try {
    $sql_other_poll = "SELECT tp.`ID` AS ID, `Name`, `Emp_ID`, `Date`, `end_date`, `poll_product`, `poll_price`, `poll_promotion`, `poll_place`, `poll_why`, `poll_who`, `poll_what`, `poll_where`, `poll_when`, `poll_how`, `poll_vote`, `poll_note` FROM `triz_poll` tp LEFT JOIN `triz_highest_poll` thp ON tp.`ID` = thp.`fk_poll_id` WHERE `end_date` <= '$format_lastweek' AND tp.`ID` NOT IN (SELECT thp.`fk_poll_id` AS fkid FROM `triz_highest_poll` thp)";
    $stmt = $conn -> prepare($sql_other_poll);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (Exception $exc) {
    echo $exc->getMessage();
}
?>