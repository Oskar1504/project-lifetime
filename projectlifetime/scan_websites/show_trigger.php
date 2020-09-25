<?php
	include_once 'dbh_connect.php';
	$table_name = "";
	$table_amount = "";


	$sql = "SELECT * FROM twitter_trigger";
	$result = mysqli_query($conn, $sql);
	$resultCheck = mysqli_num_rows($result);
	if ($resultCheck > 0){
		
		while ($row = mysqli_fetch_assoc($result)){
			echo "".$row['twit_trigger']."";
		}
	}
?>
