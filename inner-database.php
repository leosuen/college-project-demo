<?php
try {
	
	$db_host = 'localhost';
	$db_user = 'root';
	$db_password = 'leo0956021035';
	$db_name = 'triz';
    $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8";
    $conn = new PDO($dsn, $db_user, $db_password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch (Exception $exc) {
    echo $exc->getMessage();
}
?>