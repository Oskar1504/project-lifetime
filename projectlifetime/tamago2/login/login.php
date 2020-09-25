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
	<title>Anmelden</title>
</head>
<body>
	<center>
		<div>
			<br><br><br><br><br><br>
			<label>

				<b>
					Mit jeder neuen Version werden alle Accounts<br>
					sowohl lokal als auch auf dem Server geloescht.<br><br>
				</b>
				Melde dich an um dein Spielstand zu laden.<br>
				Wenn du noch kein Account hast kannst du  <br>
				<a href="acc_erstellen.php">hier einen erstellen.</a><br>
			</label><br>
		</div>
		<form action="anmelden.php" method="POST">
			<label for = "user">Username: </label><br>
			<input type="text" name="user" id = "user" onClick = "versionstest();"><br>
			<label for = "pswd">Password: </label><br>
			<input type="text" name="pswd" id = "pswd"><br>
			<input class = "unsichtbar" type="text" name="data" id = "data" value = "[]" readonly ><br>
			
			<button type="submit" name = "submit">Anmelden</button>
		</form>
		<br>
		<a href="acc_erstellen.php">Neuen Account erstellen</a>
		<p id = "version"></p>
	</center>
</body>
<script >
		versionstest();</script>
</html>