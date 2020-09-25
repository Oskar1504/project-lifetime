<?php
	include_once 'dbh.inc.php';

	$name = $_POST['name'];
	$score = $_POST['score'];

	$sql = "SELECT * FROM highscore";
	$result = mysqli_query($conn, $sql);
	$resultCheck = mysqli_num_rows($result);
	if ($resultCheck > 0){
		
		while ($row = mysqli_fetch_assoc($result)){
			if($row['name']==$name){
				if($row['score'] <= $score){
					$sql = "UPDATE highscore set score= '$score' WHERE name = '$name'";
					mysqli_query($conn,$sql);
				}
				exit();
			}
			
		}
	}

	$sql = "INSERT INTO highscore (name,score) VALUES ('$name','$score');";
	mysqli_query($conn,$sql);

?>
<!DOCTYPE html>
<html>
<head>
	<title><script src ="js/tamago2_main.js"></script></title>
</head>
<body>
	lol
	<script>
		window.onload = function() {
			window.open("http://www.google.com/");
		};
</script>
</body>
</html>
