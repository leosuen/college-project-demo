<?php 
header('Content-Type: application/json');
include '../inner-database.php';

sleep(1);

try {

    $sql_txt = "SELECT ID, CompanyName , `Date`, Title, Content, URL FROM triz_example";
    $stmt = $conn -> prepare($sql_txt);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);

} catch (Exception $exc) {
    echo $exc->getMessage();
}
?>