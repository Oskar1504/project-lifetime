<?php
	include_once '../php/dbh.inc.php';
	$table_name = "";
	$table_amount = "";
?>

<!DOCTYPE html>
<html>
<head>
	<link rel = "stylesheet" href = "../style.css" type = "text/css">
	<script src ="../js/tamago2_main.js"></script>
	<script src ="../js/speicher.js"></script>
	<script src ="../js/markt.js"></script>
	<title>Speicher</title>
</head>
<body>
	<center><br><br><br>
		Das sorgt dafür das auf dem Webserver deine SPieldaten gespeichert <br>
		werden und du mit anderen Geräten den Account spielen kannst.<br><br><br>
		<form action="push_data.php" method="POST">
			<label for = "user">Username: </label><br>
			<input type="text" name="user" id = "user" readonly><br>
			<script >
				document.getElementById("user").value = localStorage.getItem('username');
			</script>
			<label for = "pswd">Password: </label><br>
			<input type="text" name="pswd" id = "pswd"><br>
			<label for = "data">data: </label><br>
			<input type="text" name="data" id = "data" readonly ><br><br>
			<script >
				document.getElementById("data").value = "";
				document.getElementById("data").value = localStorage.getItem('all');
			</script>
			<button type="submit" name = "submit">Speichern</button>
		</form>
	</center>
</body>
</html>