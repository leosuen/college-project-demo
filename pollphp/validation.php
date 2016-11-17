<?php
session_start();
include '../inner-database.php';
$valid_empid = $_SESSION['user_session'];
try {
    $sql_valid_query = "SELECT `fk_emp_id`, `fk_poll_id` FROM `triz_poll_validation` WHERE `fk_emp_id` LIKE '$valid_empid'";
    $stmt = $conn -> prepare($sql_valid_query);
    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    if($data['fk_emp_id'] == $valid_empid){
        $sendback = array('status' => "is voted",'vote_number' => $data['fk_poll_id']);
        echo json_encode($sendback);
    }
    else{
        $sendback = array('status' => "not voted");
        echo json_encode($sendback);
    }
} catch (Exception $exc) {
    echo $exc->getMessage();
}
?>