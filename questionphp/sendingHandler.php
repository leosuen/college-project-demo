<?php 
    include '../inner-database.php';

    $obj = $_POST['sendData'];
    $name = $obj['name'];
    $id = $obj['id'];
    $date = $obj['question_date'];
    $question_why = $obj['question_why'];
    $question_who = $obj['question_who'];
    $question_what = $obj['question_what'];
    $question_where = $obj['question_where'];
    $question_when = $obj['question_when'];
    $question_text = $obj['question_text'];
    
    if(isset($question_when)){
        $sql_question_schema = "INSERT INTO `triz_question`(`ID`, `Name`, `Emp_ID`, `Date`, `quest_why`, `quest_who`, `quest_what`, `quest_where`, `quest_when`, `note`) VALUES (NULL,'$name','$id','$date','$question_why','$question_who','$question_what','$question_where','$question_when','$question_text')";
        $stmt = $conn->prepare($sql_question_schema);
        $stmt->execute();
        echo "complete";
    }
    else{
        echo "data is not completely filled";
    }
?>