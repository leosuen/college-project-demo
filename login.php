<?php 
	include 'inner-database.php';
	session_start();

	if(isset($_POST['id']) && isset($_POST['password']))
	{
		
		$account = trim($_POST['id']);
		$NoConvert_password = trim($_POST['password']);

		$password = md5($NoConvert_password);

		try{
			$sql_acc = "SELECT e.ID AS 'ID',e.Password AS 'Password',e.Name AS 'name',p.Name AS 'position' FROM triz_emp e LEFT JOIN triz_pos p ON e.PosID = p.ID WHERE e.ID LIKE '$account' AND e.Password LIKE '$password'";
			/*$stmt = $conn->query($sql_acc);
			$result_arr = $stmt -> fetch();*/
            
            $stmt = $conn->prepare($sql_acc);
            $stmt->execute();
            $result_arr = $stmt -> fetch(PDO::FETCH_ASSOC);

			if($result_arr['Password']==$password){
				echo "ok"; // log in
				$_SESSION['user_session'] = $result_arr['ID'];
				$_SESSION['user_position'] = $result_arr['position'];
                $_SESSION['username_position'] = $result_arr['name'];
			}
			else{
				echo "email or password does not exist."; // wrong details 
			}

		}
		catch(PDOException $e){
			echo $e->getMessage();
		}
	}
	else{
		echo "缺少帳號或密碼";
	}

 ?>