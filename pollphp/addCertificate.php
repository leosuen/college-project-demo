<?php
include '../inner-database.php';
$idvalue = $_POST['postdata'];
$idvalue = intval($idvalue);
$today = new DateTime("now", new DateTimeZone('ASIA/Taipei'));
$format_today = $today->format('Y-m-d');
try {
    $sql_update = "UPDATE `triz_poll` SET `poll_certificate`='Y' WHERE `ID` = $idvalue";
    $stmt = $conn -> prepare($sql_update);
    $stmt->execute();
    $updateData = true;
    $sql_insert = "INSERT INTO `triz_highest_poll`(`ID`, `fk_poll_id`, `insert_date`) VALUES (NULL,$idvalue,'$format_today')";
    $stmt = $conn -> prepare($sql_update);
    $stmt->execute();
    $insertData = true;
    if($updateData && $insertData){
        echo "complete";
    }
    else{
        echo "error";
    }
} catch (Exception $exc) {
    echo $exc->getMessage();
}
?>