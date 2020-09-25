<!DOCTYPE html>
<html>
<head>
	<link rel = "stylesheet" href = "../style.css" type = "text/css">
	<title>Eintragen</title>
</head>
<body>
	<?php
	include_once '../php/dbh.inc.php';

	$user = $_POST['user'];
	$score = $_POST['score'];

	$sql = "SELECT * FROM highscore";
	$result = mysqli_query($conn, $sql);
	$resultCheck = mysqli_num_rows($result);
	if ($resultCheck > 0){
		
		while ($row = mysqli_fetch_assoc($result)){
			if($row['name']==$user){
				if($row['score'] <= $score){
					$sql = "UPDATE highscore set score= '$score' WHERE name = '$user'";
					mysqli_query($conn,$sql);
					echo "<center>Erfolgreich eingetragen.<p><b><a href='main.php'>Zurück zum Rathaus</a></b></p></center>";
					exit();
				}
			}
			
		}
	}

	$sql = "INSERT INTO highscore (name,score) VALUES ('$user','$score');";
	mysqli_query($conn,$sql);
	echo "<center>Erfolgreich eingetragen.<p><b><a href='main.php'>Zurück zum Rathaus</a></b></p></center>";
	
?>
	
</body>
</html>