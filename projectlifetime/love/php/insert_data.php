<?php
	include_once 'dbh.inc.php';

	$name = $_POST['name'];
	$wert_1 = $_POST['wert_1'];
	$wert_2 = $_POST['wert_2'];
	$wert_3 = $_POST['wert_3'];

	$sql = "SELECT * FROM love";
	$result = mysqli_query($conn, $sql);
	$resultCheck = mysqli_num_rows($result);
	if ($resultCheck > 0){
		while ($row = mysqli_fetch_assoc($result)){
			if($row['name']==$name){
				if($row['wert_1'] !== $wert_1 || $row['wert_2'] !== $wert_2 || $row['wert_3'] !== $wert_3){
					$sql = "UPDATE love set wert_1= '$wert_1',wert_2= '$wert_2',wert_3= '$wert_3' WHERE name = '$name'";
					mysqli_query($conn,$sql);
				}
				header("Location: ../index.php");
				exit();
			}
			
		}
	}

	$sql = "INSERT INTO love (name,wert_1,wert_2,wert_3) VALUES ('$name','$wert_1','$wert_2','$wert_3');";
	mysqli_query($conn,$sql);

	if (!headers_sent($filename, $linenum)) {
    header('Location: http://projectlifetime/love/index.php');
    exit;

// You would most likely trigger an error here.
} else {

    echo "<b>" .
          "Cannot redirect, for now please click this <a " .
          "href=\"http://projectlifetime/love/index.php\">link</a> instead\n";
    exit;
}
