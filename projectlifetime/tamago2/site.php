<?php
	include_once 'php/dbh.inc.php';
	$table_name = "";
	$table_amount = "";
?>


<!DOCTYPE html>
<html>
<head>
	<link rel = "stylesheet" href = "style.css" type = "text/css">
	<script src ="js/tamago2_main.js"></script>
	<script src ="js/speicher.js"></script>
	<script src ="js/feld.js"></script>
	<script src ="js/stadt.js"></script>
	<title>Project Lifetime Spiel</title>
	<table class = "center">
		<td id = "username_info"></td>
		<td onclick="render_spielfeld();"> <b>Main Menu</td>
		<td onclick="render_stadt();"> <b>render stadt</td>
		<td id="gold_value" ><b>Gold: 0</td>
		<td id="clock_value" ><b>Clock: 0</td>
		<td onclick="speichern();"><b>Lokal Speichern</td>
		<td onclick="lade_spiel();"><b>Lokal Laden</td>
		<td><b><a href="php/server_speichern.php">Serverseitiges Speichern</a></td>

	</table>
</head>

<body>
	<table id = "main_content" class = "center" ></table>
	<script >
		create_spielfeld(6);
		start();
	</script>
</body>
</html>