<?php
	include_once 'dbh_connect.php';


	$trigger = $_REQUEST['trigger'];

	
	$sql = "UPDATE twitter_trigger SET twit_trigger='$trigger' WHERE id = 1;";
	mysqli_query($conn,$sql);


?>