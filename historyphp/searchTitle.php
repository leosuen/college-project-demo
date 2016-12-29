<?php
header('Content-Type: application/json');
include '../inner-database.php';
$search_obj = $_POST['pollData'];
$title = $search_obj['titleVal'];
$class = $search_obj['searchClass'];
htmlEntities($_SERVER["PHP_SELF"], ENT_QUOTES, "UTF-8");
try {
    if($class == "history"){
        $sql_getTheMost = "SELECT * FROM `triz_example` WHERE title LIKE '%$title%'";
        $stmt = $conn -> prepare($sql_getTheMost);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    echo json_encode($data);
} catch (Exception $exc) {
    echo $exc->getMessage();
}
?>