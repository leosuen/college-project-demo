<?php
header('Content-Type: application/json');
include '../inner-database.php';
$today = new DateTime("now", new DateTimeZone('ASIA/Taipei'));
$format_today = $today->format('Y-m-d');
try {
    $sql_getTheMost = "SELECT * FROM `triz_poll` WHERE poll_vote = (SELECT MAX(poll_vote) FROM triz_poll WHERE end_date <= '$format_today') AND poll_certificate is null";
    $stmt = $conn -> prepare($sql_getTheMost);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (Exception $exc) {
    echo $exc->getMessage();
}
?>