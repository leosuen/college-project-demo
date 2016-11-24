<?php 
include '../inner-database.php';
$obj = $_POST['uploadjson'];
$title = $obj['title'];
$date = $obj['date'];
$companyname = $obj['companyname'];
$content = $obj['content'];

try {
    $upload_schema = "INSERT INTO `triz_example`(`ID`, `CompanyName`, `Date`, `Title`, `Content`) VALUES (NULL,'$companyname','$date','$title','$content')";
    $stmt = $conn->prepare($upload_schema);
    $stmt->execute();
    echo "uploadcomplete";
    
} catch (Exception $exc) {
    echo $exc->getMessage();
}
?>