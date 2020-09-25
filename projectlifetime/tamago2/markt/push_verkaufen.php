
<!DOCTYPE html>
<html>
<head>
	<script src ="../js/markt.js"></script>
	<script src ="../js/tamago2_main.js"></script>
	<script src ="../js/feld.js"></script>
	<script src ="../js/stadt.js"></script>
	<link rel = "stylesheet" href = "../../style.css" type = "text/css">
	<title>Erfolgreich Verkauft</title>
</head>
<body>
	<center>
		<div>
			<?php
				include_once '../php/dbh.inc.php';

				$id = $_POST['id3'];
				$amount = $_POST['amount'];
				if($amount == ""){
					echo "<br><br><div>Du hast leider keine Items die der Spieler sucht.</div><br><p><b><a href='main.php'>Zurück zum Markt</a></b></p>";
					exit();
				}		
				$sql = "SELECT * FROM markt";
				$result = mysqli_query($conn, $sql);
				$resultCheck = mysqli_num_rows($result);
				if ($resultCheck > 0){
					while ($row = mysqli_fetch_assoc($result)){
						if($row['id']==$id){
							$new_amount = $row['amount']-$amount;
							$new_erhalten = $row['erhalten']+$amount;
							$sql = "UPDATE markt set amount= '$new_amount',erhalten = '$new_erhalten' WHERE id = '$id'";
							mysqli_query($conn,$sql);
							echo "<table>";
							echo "<th>Transaktionsbescheid</th>";
							echo "<tr><td>Item verkauft</td><td>Anzahl</td><td>Preis/Stueck</td></tr>";
							echo "<tr><td id = 'item_id'>".$row['item']."</td><td id ='item_amount'>".$amount."</td><td id ='item_preis'>".$row['preis']."</td></tr>";
							echo "<tr><td><b>Gewinn: </b></td><td id = 'gesamt'></td></tr>";
							echo "</table>";

						}
					}
				}
			?>
		</div>
		<p><b><a href="main.php">Zurück zum Markt</a></b></p>
	</center>
	<script >
	lade_spiel();
	verkauf_berechnen();</script>
</body>
</html>