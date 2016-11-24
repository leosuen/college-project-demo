<?php
header('Content-Type: application/json');
include '../inner-database.php';

try {
    $sql_highest_poll = "SELECT tp.`ID` AS ID, `Name`, `Emp_ID`, `Date`, `end_date`, `poll_product`, `poll_price`, `poll_promotion`, `poll_place`, `poll_why`, `poll_who`, `poll_what`, `poll_where`, `poll_when`, `poll_how`, `poll_vote`, `poll_note` FROM `triz_poll` tp JOIN `triz_highest_poll` thp ON tp.ID = thp.fk_poll_id";
    $stmt = $conn -> prepare($sql_highest_poll);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (Exception $exc) {
    echo $exc->getMessage();
}
?>