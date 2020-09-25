<?php
	include_once 'dbh_connect.php';


	$data = $_REQUEST['data'];

	
	$sql = "INSERT INTO twitter (data) VALUES ('$data');";
	mysqli_query($conn,$sql);


?>