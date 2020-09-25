<!DOCTYPE html>
<html>
<head>
	<link rel = "stylesheet" href = "../style.css" type = "text/css">
	<title>Anzeige erstellen</title>
</head>
<body>
	<center>
		<?php
	include_once '../php/dbh.inc.php';

	$user = $_POST['user'];
	$pswd = $_POST['pswd'];
	$data = $_POST['data'];


	//checkt ob der username schon vergeben ist
			$sql = "SELECT * FROM spieldata";
			$result = mysqli_query($conn, $sql);
			$resultCheck = mysqli_num_rows($result);
			if ($resultCheck > 0){
				while ($row = mysqli_fetch_assoc($result)){
					if($row['username']==$user && $row['pswd']==$pswd){
						echo "Erfolgreich gespeichert.<br><p><b><a href='../site.php'>Zurück zum Spiel</a></b></p>";
						$sql = "UPDATE spieldata SET spielinfo = '$data' WHERE username='$user';";
						mysqli_query($conn,$sql);
						exit();
					}
				}
			}
			echo "Password stimmt nicht mit account überein.<br><p><b><a href='../site.php'>Zurück zum Spiel</a></b></p>"
	
?>

		
	</center>
</body>
</html>