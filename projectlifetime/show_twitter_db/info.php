<?php
	include_once 'dbh_connect.php';



	$sql = "SELECT * FROM twitter";
	$result = mysqli_query($conn, $sql);
	$resultCheck = mysqli_num_rows($result);
	if ($resultCheck > 0){
		
		while ($row = mysqli_fetch_assoc($result)){
			echo "<span class = 'tweet'>".$row['data']."</span><br><br>";
		}
	}
?>
