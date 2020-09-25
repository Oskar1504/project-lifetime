
<!DOCTYPE html>
<html>
<head>
	<link rel = "stylesheet" href = "../style.css" type = "text/css">
	<title>Anzeige erstellen</title>
</head>
<body>
	<?php
	include_once '../php/dbh.inc.php';

	$name = $_POST['name'];
	$user = $_POST['user'];
	$item = $_POST['item'];
	$amount = $_POST['amount'];
	$preis = $_POST['preis'];
	$info = $_POST['info'];
	$kosten = $_POST['kosten'];
	$gold = $_POST['gold'];

	if ($kosten > $gold) {
		echo "<br><br><center>Du hast leider nicht genug Geld.<br><br><b><a href='erstelle_anzeige.php'>Anzeige erstellen</a></b><br><p><b><a href='main.php'>Zurück zum Markt</a></b></p></center>";
		exit();
	}

	if($name&& $user && $item){
		$sql = "INSERT INTO markt (name,user,item,amount,preis,info) VALUES ('$name','$user','$item','$amount','$preis','$info');";
		mysqli_query($conn,$sql);
		echo "<br><br><center>Anzeige wurde erfolgreich erstellt.</center>";
	}else{
		echo "<center>Alle Felder müssen ausgefüllt werden.<br><b><a href='erstelle_anzeige.php'>Anzeige erstellen</a></b></center>";
	}
?>
	<center>
		<p><b><a href="main.php">Zurück zum Markt</a></b></p>
	</center>
</body>
</html>