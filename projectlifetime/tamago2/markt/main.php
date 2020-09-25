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
	<title>
		Globaler Markt
	</title>
	<table>
		<td id = "username_info"></td>
		<script >document.getElementById("username_info").innerHTML = "<b>"+localStorage.getItem('username')+"</b>";</script>

		<td id="gold_value" ><b>Gold: 0</td>
		<script >document.getElementById("gold_value").innerHTML = "<b>Gold: "+localStorage.getItem('gold')+"</b>";</script>
		<td>
		<form action="meine_anzeigen.php" method="POST">
			<input type="text" name="user" id = "user" readonly><br>
			<script >document.getElementById("user").value = localStorage.getItem('username');</script>
			<button type="submit" name = "submit">Meine Anzeigen / Items einsammeln</button>
		</form>
		</td>

	</table>
</head>
<body>
	<div>
		Hier findes du alle Anzeigen die aktuell Spieler stellen.Um zu aktualisieren refreshe die seite.
		<p class = "button"><b><a href="erstelle_anzeige.php">Eigene Anzeige erstellen</a></b></p>
		<p id = "swag"></p>
	</div>
		<div class = "markt_anzeigen float_left" >
		<?php
			$sql = "SELECT * FROM markt";
			$result = mysqli_query($conn, $sql);
			$resultCheck = mysqli_num_rows($result);
			if ($resultCheck > 0){
				while ($row = mysqli_fetch_assoc($result)){
					if($row['amount']>= 1){
						echo "<table class = 'markt_button test' onClick = 'field_selection(this);'>";
						echo "<td class = 'unsichtbar'>Id</td><td>Titel</td><td>Nutzer</td><td>Ware</td><td>Benoetigt</td><td>Preis</td>";
						echo "<tr><td class= 'anzeige_id unsichtbar'>" . $row['id'] . "</td><td>" . $row['name'] . "</td><td>" . $row['user'] ."</td><td>" . $row['item'] ."</td><td class = 'anzeige_amount'>" . $row['amount'] ."</td><td>" . $row['preis'] ."</td></tr>";
						//echo "<tr><td>Info</td><td>" . $row['info']. "</td><td></td><td class = 'markt_button ' onClick = 'field_selection(this);'>Auswählen</td><td></td></tr>";
						echo "</table>";
					}	
				}
			}
		?>
		</div>
		<div class = " markt_info float_left">
			<label for = "markt_info"><b>Anzeige</b></label>
			<table id = "markt_info">
			</table><br>
			<label for = "lager_info"><b>Eigenes Lager</b></label>
			<table id = "lager_info">
				<th>Item</th>
				<th>Anzahl im Lager</th>
				<tr>
					<td id = "item_id"></td>
					<td id = "item_anzahl"></td>
				</tr>
			</table><br>
			<form action="push_verkaufen.php" method="POST">
				<input class = "unsichtbar" type="number" name="id3" id = "id3"  style='width:4em' readonly>
				<label for = "amount"><b>Anzahl: </b></label><br>
				<input onchange="anzahl_test(this);" type="number" name="amount" id = "amount"  style='width:4em' autocomplete="off"><br>

				<button type="submit" name = "submit">Verkaufen</button>
			</form>
		</div>
</body>
<script >
	wo_bin_ich = "markt"; // bestimmt fariable um selection funckton ordentlch zu runnnen
	copy_data_to_array();//speichert alle anuzeigen ausm server innen array
	lade_spiel();//hohlt die data aus dem speicher da beim neu laden alle verloren gehen
	show_anzeige_info_2(0); // zeigt die erste anzeige genau damit es ncith aakcke aussieht beim alden
</script>
</html>

