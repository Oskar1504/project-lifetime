<?php
	include_once 'dbh_connect.php';

	$user = $_REQUEST['user'];
	$msg = $_REQUEST['msg'];
	$old_msg = $_REQUEST['old_msg'];


	$sql = "UPDATE chat SET msg = '$msg',user = '$user' WHERE msg = '$old_msg';";
	mysqli_query($conn,$sql);


?>