<?php 
	sleep(1);
	session_start();
	unset($_SESSION['user_session']);
	session_destroy();
	header("Location: welcome.php");
 ?>