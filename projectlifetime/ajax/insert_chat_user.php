<?php
	include_once 'dbh_connect.php';


	$user = $_REQUEST['user'];
	$status = $_REQUEST['status'];

	//schuat ob da ist
	$sql = "SELECT * FROM chat_user";
	$result = mysqli_query($conn, $sql);
	$resultCheck = mysqli_num_rows($result);
	if ($resultCheck > 0){
		
		while ($row = mysqli_fetch_assoc($result)){
			if($row['user']==$user){
				
				$sql = "UPDATE chat_user set status= '$status' WHERE user = '$user'";
				mysqli_query($conn,$sql);
				exit();
			}
			
		}
	}

	//added neuen user
	$sql = "INSERT INTO chat_user (user,status) VALUES ('$user','$status');";
	mysqli_query($conn,$sql);


?>