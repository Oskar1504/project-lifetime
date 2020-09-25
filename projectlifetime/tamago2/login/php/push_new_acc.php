
<!DOCTYPE html>
<html>
<head>
	<link rel = "stylesheet" href = "../../style.css" type = "text/css">
	<script src ="../../js/tamago2_main.js"></script>
	<script src ="../../js/speicher.js"></script>
	<script src ="../../js/markt.js"></script>
	<script src ="../../js/feld.js"></script>
	<script src ="../../js/stadt.js"></script>
	<title>Account speichern</title>
</head>
<body>
	<center>
		<?php
			include_once '../../php/dbh.inc.php';

			$user = $_POST['user'];
			$pswd = $_POST['pswd'];
			$pswd2 = $_POST['pswd2'];
			$data = $_POST['data'];


			//checkt ob der username schon vergeben ist
			$sql = "SELECT * FROM spieldata";
			$result = mysqli_query($conn, $sql);
			$resultCheck = mysqli_num_rows($result);
			if ($resultCheck > 0){
				while ($row = mysqli_fetch_assoc($result)){
					if($row['username']==$user){
						echo("<br><br>Den Username gibt es leider schon.<br><a href='../acc_erstellen.php'>Zurück zur Account erstellung</a>");
						exit();
					}
				}
			}
			
			if($user && $pswd==$pswd2){
				$sql = "INSERT INTO spieldata (username,pswd,spielinfo) VALUES ('$user','$pswd','$data');";
				mysqli_query($conn,$sql);
				echo("<br><br>Account <p id = 'username_data'>".$user."</p> wurde erfolgreich erstellt.<br><a href='../../site.php'>Spielen</a><br><br>Account <p id = 'spiel' class = 'unsichtbar'>".$data."</p>");
			}else{
				echo("<br><br>Das Passwort stimmt nicht überein.<br><a href='../acc_erstellen.php'>Zurück zur Account erstellung</a>");
			}
		?>
	</center>
	<script >

		 localStorage.setItem('username',document.getElementById("username_data").innerHTML);
		 localStorage.setItem('all',document.getElementById("spiel").innerHTML);
		 
	</script>
</body>
</html>