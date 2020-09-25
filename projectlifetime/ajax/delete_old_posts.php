<?php
	include_once 'dbh_connect.php';
	//löscht alle posts soads nur 10 da sind
	$max_posts = 15;
	$sql = "SELECT * FROM chat";
	$result = mysqli_query($conn, $sql);
	$resultCheck = mysqli_num_rows($result);
	if ($resultCheck > 0){
		while ($row = mysqli_fetch_assoc($result)){
			$old_id = $row['id'] - $max_posts;
			$sql = "DELETE FROM chat WHERE id < $old_id;";
			mysqli_query($conn, $sql);
		}
	}

?>