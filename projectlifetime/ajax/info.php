<?php
	include_once 'dbh_connect.php';
	$table_name = "";
	$table_amount = "";


	$sql = "SELECT * FROM chat";
	$result = mysqli_query($conn, $sql);
	$resultCheck = mysqli_num_rows($result);
	if ($resultCheck > 0){
		
		while ($row = mysqli_fetch_assoc($result)){
			echo "<span class = 'post'>";
			echo "<p class = 'post'>".$row['zeit']." | <span class = 'user' onClick='get_user(this);'>" . $row['user'] . "</span>: <span class = 'msg'>" . $row['msg'] . " </span></p>";
			
			echo "</span>";
		}
	}
?>
