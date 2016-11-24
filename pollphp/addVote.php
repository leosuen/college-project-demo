<?php
session_start();
include '../inner-database.php';

$obj = $_POST['sendData'];
$pollid = $obj['pollid'];
$vote_empid = $_SESSION['user_session'];
$today = strtotime("now");
try {
    $poll_vote_query = "SELECT `poll_vote` FROM `triz_poll` WHERE `triz_poll`.`ID` = $pollid";
    $stmt = $conn -> prepare($poll_vote_query);
    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    $vote_num = intval($data['poll_vote']);
    $vote_num = $vote_num + 1;
    
    $poll_vote_update = "UPDATE `triz_poll` SET `poll_vote`=$vote_num WHERE `triz_poll`.`ID` = $pollid";
    $stmt = $conn -> prepare($poll_vote_update);
    $stmt->execute();
    
    $poll_insert_to_validation = "INSERT INTO `triz_poll_validation`(`ID`, `fk_emp_id`, `fk_poll_id`, `vote_date`) VALUES (NULL,'$vote_empid',$pollid,'$today')";
    $stmt = $conn -> prepare($poll_insert_to_validation);
    $stmt->execute();
    echo "complete";
} catch (Exception $exc) {
    echo $exc->getMessage();
}

?>