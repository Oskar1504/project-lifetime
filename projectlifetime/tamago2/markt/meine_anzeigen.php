
<!DOCTYPE html>
<html>
<head>
	<link rel = "stylesheet" href = "../style.css" type = "text/css">
	<script src ="../js/tamago2_main.js"></script>
	<script src ="../js/speicher.js"></script>
	<script src ="../js/markt.js"></script>
	<script src ="../js/feld.js"></script>
	<script src ="../js/stadt.js"></script>
	<title>Meine Anzeigen</title>
</head>
<body>
	<div class = "markt_anzeigen float_left" >
		<?php
		include_once '../php/dbh.inc.php';

		$user = $_POST['user'];

		$sql = "SELECT * FROM markt";
			$result = mysqli_query($conn, $sql);
			$resultCheck = mysqli_num_rows($result);
			if ($resultCheck > 0){
				while ($row = mysqli_fetch_assoc($result)){
					if($row['user'] == $user){
						echo "<table class = 'markt_button2 test' onClick = 'field_selection(this);'>";
						echo "<td>Id</td><td>Titel</td><td>Nutzer</td><td>Ware</td><td>Benoetigt</td><td>Preis/Stück</td><td>Erhaltene Waren</td>";
						echo "<tr><td class= 'anzeige_id'>" . $row['id'] . "</td><td>" . $row['name'] . "</td><td>" . $row['user'] ."</td><td>" . $row['item'] ."</td><td class = 'anzeige_amount'>" . $row['amount'] ."</td><td>" . $row['preis'] ."</td><td class = 'erhalten'>" . $row['erhalten'] ."</td></tr>";
						//echo "<tr><td>Info</td><td>" . $row['info']. "</td><td></td><td class = 'markt_button ' onClick = 'field_selection(this);'>Auswählen</td><td></td></tr>";
						echo "</table>";
					}	
				}
			}

		?>
	</div>
	<div class = "markt_info float_left" >
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
			<form action="sammeln.php" method="POST">
				<input class = "" type="number" name="id3" id = "id3"  style='width:4em' readonly>
				<label for = "amount"><b>Anzahl: </b></label><br>
				<input  type="number" name="amount" id = "amount"  style='width:4em' autocomplete="off" readonly><br>
				<script >autofill_sammeln();</script>
				<button type="submit" name = "submit" >Sammeln</button>
			</form>

		<p><b><a href="main.php">Zurück zum Markt</a></b></p>
	</div>
</body>
<script >
	wo_bin_ich = "markt"; // bestimmt fariable um selection funckton ordentlch zu runnnen
	copy_data_to_array();//speichert alle anuzeigen ausm server innen array
	lade_spiel();//hohlt die data aus dem speicher da beim neu laden alle verloren gehen
	show_anzeige_info(0); // zeigt die erste anzeige genau damit es ncith aakcke aussieht beim alden
</script>
</html>