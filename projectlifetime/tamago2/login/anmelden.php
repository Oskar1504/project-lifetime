<!DOCTYPE html>
<html>
<head>
	<script src ="../js/tamago2_main.js"></script>
	<script src ="../js/speicher.js"></script>
	<script src ="../js/markt.js"></script>
	<script src ="../js/feld.js"></script>
	<script src ="../js/stadt.js"></script>
	<link rel = "stylesheet" href = "../style.css" type = "text/css">
	<title>Vorbereiten</title>
</head>
<body>
	<center>
		<?php
	include_once '../php/dbh.inc.php';

	$user = $_POST['user'];
	$pswd = $_POST['pswd'];
	$data_alt = $_POST['data'];


	//checkt ob der username schon vergeben ist
			$sql = "SELECT * FROM spieldata";
			$result = mysqli_query($conn, $sql);
			$resultCheck = mysqli_num_rows($result);
			if ($resultCheck > 0){
				while ($row = mysqli_fetch_assoc($result)){
					if($row['username']==$user && $row['pswd']==$pswd){
						echo "<table><td onClick = 'server_laden();'>Spielen</td></table><p class = 'unsichtbar' id = 'server_daten'>". $row['spielinfo']."</p><p class = '' id = 'username_info'>". $row['username']."</p>";

							echo	'<script > anmelden();</script>';
						exit();
					}
				}
			}
			echo "Password stimmt nicht mit account überein.<br><p><b><a href='login.php'>Zurück zum login</a></b></p>"
	
	?>
	</center>
</body>
</html>