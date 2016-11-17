<?php 
	session_start();
 ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>應用TRIZ理論於創造力支援系統</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<link href='http://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.13.1/jquery.validate.min.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

	<link rel="stylesheet" href="./css/custom.css">

</head>
<body>
	<!-- LOGIN FORM -->
	<div class="text-center" style="padding:50px 0">
		<div class="logo">登入</div>
		<!-- Main Form -->
		<div class="login-form-1">
			<form id="login-form" class="text-left">
				<div class="login-form-main-message"></div>
				<div class="main-login-form">
					<div class="login-group">
						<div class="form-group">
							<label for="lg_username" class="sr-only">員工ID</label>
							<input type="text" class="form-control" id="id" name="id" placeholder="員工ID">
						</div>
						<div class="form-group">
							<label for="lg_password" class="sr-only">密碼</label>
							<input type="password" class="form-control" id="password" name="password" placeholder="密碼">
						</div>
					</div>
					<button type="submit" class="login-button" id="login-btn"><i class="fa fa-chevron-right"></i></button>
				</div
			</form>
		</div>
		<!-- end:Main Form -->
		<div id="message"></div>
	</div>
</body>
<script type="text/javascript" src="./js/custom.js"></script>
</html>