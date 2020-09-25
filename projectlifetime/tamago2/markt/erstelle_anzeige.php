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
	<title>Erstelle Anzeige</title>
</head>
<body>
	<center>
		<form action="push_anzeige.php" method="POST">
			<label for = "name">Titel der Anzeige: </label><br>
			<input type="text" name="name" id = "name" value = "kaufe"><br>
			<label for = "user">Nutzername: </label><br>
			<input type="text" name="user" id = "user" readonly><br>
			<script >document.getElementById("user").value = localStorage.getItem('username');</script>
			<label for = "item">Name des zu kaufenden Items: </label><br>
			<input list = "itemlist" name = "item" id = "item">
			<datalist id = "itemlist">
				<script>draw_select_anzeige();</script>
			</datalist><br>
			<label for = "amount">Anzahl: </label><br>
			<input onChange="get_kosten();" type="number" name="amount" id = "amount" value = "1"><br>
			<label  for = "preis">Preis pro Stück: </label><br>
			<input onChange="get_kosten();" type="number" name="preis" id = "preis" value="1"><br>
			<label for = "info">Zusaetzliche Info: </label><br>
			<input type="text" name="info" id = "info" value="none"><br>
			<label for = "kosten">Kosten: </label><br>
			<input type="text" name="kosten" id = "kosten" readonly><br>
			<script >get_kosten();</script>
			<label for = "gold">Gold: </label><br>
			<input type="text" name="gold" id = "gold" readonly><br>
			<script >document.getElementById("gold").value = localStorage.getItem('gold');</script>
			
			
			<button type="submit" name = "submit">Anzeige erstellen</button>
		</form>
	</center>
</body>
</html>