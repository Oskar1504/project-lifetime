

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
	<script src ="../js/feld.js"></script>
	<script src ="../js/stadt.js"></script>
	<script src ="../js/markt.js"></script>
	<title>
		Umformen
	</title>
</head>
<body>
	<?php
				$sql = "SELECT * FROM spieldata";
				$result = mysqli_query($conn, $sql);
				$resultCheck = mysqli_num_rows($result);
				if ($resultCheck > 0){
					while ($row = mysqli_fetch_assoc($result)){
						echo "<table class = 'markt_button test'>";
						echo "<td>User</td><td>Item</td><td>Data</td>";
						echo "<tr><td>" . $row['username'] . "</td><td>" . $row['pswd'] ."</td><td id = 'data'>" . $row['spielinfo'] ."</td></tr>";
						//echo "<tr><td>Info</td><td>" . $row['info']. "</td><td></td><td class = 'markt_button ' onClick = 'field_selection(this);'>Auswählen</td><td></td></tr>";
						echo "</table>";
					}
				}
			?>

</body>
<script >
	
</script>
</html>