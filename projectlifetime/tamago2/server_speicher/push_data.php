<?php
	include_once '../php/dbh.inc.php';

	$user = $_POST['user'];
	$pswd = $_POST['pswd'];
	$data = $_POST['data'];


		$sql = "INSERT INTO spieldata (username,pswd,spielinfo) VALUES ('$user','$pswd','$data');";
		mysqli_query($conn,$sql);
	
?>
<!DOCTYPE html>
<html>
<head>
	<link rel = "stylesheet" href = "../style.css" type = "text/css">
	<title>Anzeige erstellen</title>
</head>
<body>
	<center>
		<p><b><a href="index.php">Zurück zum Markt</a></b></p>
	</center>
</body>
</html>