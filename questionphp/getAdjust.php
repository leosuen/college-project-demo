<?php 
session_start();
header('Content-Type: application/json');
include '../inner-database.php';
sleep(1);
$temp_empquery = $_SESSION['user_session'];
try {

    $sql_txt = "SELECT `ID`, `Name`, `Emp_ID`, `Date`, `poll_product`, `poll_price`, `poll_promotion`, `poll_place`, `poll_why`, `poll_who`, `poll_what`, `poll_where`, `poll_when`, `poll_how`, `poll_vote`, `poll_note` FROM `triz_poll` WHERE `Emp_ID` LIKE '$temp_empquery'"; //work in progress
    $stmt = $conn -> prepare($sql_txt);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);

} catch (Exception $exc) {
    echo $exc->getMessage();
}
?>