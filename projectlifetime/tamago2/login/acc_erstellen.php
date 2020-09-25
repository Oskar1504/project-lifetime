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
	<script src ="../js/feld.js"></script>
	<script src ="../js/stadt.js"></script>
	<title>Account erstellen</title>
</head>
<body>
	<center>
		<div>
			<br><br><br><br><br><br>
			Nutze bitte keinen beleidigenden Username.
			<br><br>
		</div>
		<form action="php/push_new_acc.php" method="POST">
			<label for = "user">Username: </label><br>
			<input type="text" name="user" id = "user"><br>
			<label for = "pswd">Password: </label><br>
			<input type="text" name="pswd" id = "pswd"><br>
			<label for = "pswd2">Password wiederholen: </label><br>
			<input type="text" name="pswd2" id = "pswd2"><br>
			<input class = "unsichtbar" type="text" name="data" id = "data" readonly ><br>
			<script > document.getElementById("data").value = '["username",100,1,[],[],[],[]]';</script>
			<button type="submit" name = "submit">Neuen Account erstellen</button>
		</form>
		<br>
		<a href="login.php">Zurück zum login</a>
	</center>
</body>
</html>