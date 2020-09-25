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
		Rathaus
	</title>
	<center>
		<form action="push_highscore.php" method="POST">
			<label for = "user">Nutzername: </label><br>
			<input type="text" name="user" id = "user" readonly style='width:4em' ><br>
			<script >document.getElementById("user").value = localStorage.getItem('username');</script>
			<label for = "score">Score: </label><br>
			<input type="text" name="score" id = "score" readonly style='width:4em' ><br>
			<script >document.getElementById("score").value = localStorage.getItem('gold');</script>
			
			<button type="submit" name = "submit">Eintragen</button>
		</form>
	</center>
</head>
<body>
	<center>
		<div class = "leaderboard" >
		<?php
			$sql = "SELECT * FROM highscore ORDER BY score DESC ";
			$result = mysqli_query($conn, $sql);
			$resultCheck = mysqli_num_rows($result);
			if ($resultCheck > 0){
					echo "<table>";
					echo "<th>Nutzer</th><th>Score</th>";
				while ($row = mysqli_fetch_assoc($result)){
					if($row['score']>= 1){
						echo "<tr><td>" . $row['name'] ."</td><td>" . $row['score'] ."</td></tr>";
					}	
				}
					echo "</table>";
			}
		?>
		</div>
	</center>
</body>
<script >
	wo_bin_ich = "rathaus"; // bestimmt variable um selection funckton ordentlch zu runnnen
</script>
</html>

