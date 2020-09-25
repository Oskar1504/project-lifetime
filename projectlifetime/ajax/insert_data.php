<?php
	include_once 'dbh_connect.php';


	$user = $_REQUEST['user'];
	$msg = $_REQUEST['msg'];
	$zeit = $_REQUEST['time'];

	if($msg == ""){exit();}
	$sql = "INSERT INTO chat (user,msg,zeit) VALUES ('$user','$msg','$zeit');";
	mysqli_query($conn,$sql);


?>