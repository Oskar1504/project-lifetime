<?php
	include_once 'php/dbh.inc.php';
	$table_name = "";
	$table_amount = "";
?>


<!DOCTYPE html>
<html>
<head>
	<link rel = "stylesheet" href = "style.css" type = "text/css">
	<script src ="js/main.js"></script>
	<title>lovometer</title>
</head>

<body>
	<section>
		
		<div>
			<table>
				<tr>
					<td></td>
					<td onclick="vergleichen();">Vergleichen</td>
				</tr>
				<tr>
					<td>Input</td>
				</tr>
				<tr>
					<td id = "vergleich_in_wert_1">85</td>
					<td id = "vergleich_in_wert_2">70</td>
					<td id = "vergleich_in_wert_3">50</td>
				</tr>
				<tr>
					<td>Output</td>
				</tr>
				<tr>
					<td id = "vergleich_out_wert_1">oiutput</td>
					<td id = "vergleich_out_wert_2">oiutput</td>
					<td id = "vergleich_out_wert_3">oiutput</td>
				</tr>
				<tr>
					<td id = "vergleich_out_2">output</td>
				</tr>
				<tr>
					<td onclick="get_input();">Get Input</td>
					<td>Enter Name:</td>
					<td><input type="text" id="get_input" value="none"></td>
				</tr>
				<tr>
					<td id = "get_input_wert_1">0</td>
					<td id = "get_input_wert_2">0</td>
					<td id = "get_input_wert_3">0</td>
				</tr>
			</table>
		</div>
		<br><br><br><br><br><br><br>
		<form action="php/insert_data.php" method="POST" oninput="x.value=parseInt(wert_1.value);y.value=parseInt(wert_2.value);z.value=parseInt(wert_3.value);">
			<input type="text" name="name" id = "name" value = "enter_name">
			<br>
			<label>0</label>
		    <input name="wert_1" id="wert_1" type="range" min="0" value="50" max="100" >
		    <label>100 | </label>
		    <output name="x" for="wert_1" id = "output_wert_1">50</output>
		    <br>
		    <label>0</label>
		    <input name="wert_2" id="wert_2" type="range" min="0" value="50" max="100" >
		    <label>100 | </label>
		    <output name="y" for="wert_2" id = "output_wert_2">50</output>
		    <br>
		    <label>0</label>
		    <input name="wert_3" id="wert_3" type="range" min="0" value="50" max="100" >
		    <label>100 | </label>
		    <output name="z" for="wert_3" id = "output_wert_3">50</output>
		    <br>
			<button type="submit" name = "submit">Submit</button>
		</form>
	</section>




	<aside>

		<?php
			$sql = "SELECT * FROM love ORDER BY wert_1 DESC";


			$result = mysqli_query($conn, $sql);
			$resultCheck = mysqli_num_rows($result);
			if ($resultCheck > 0){
				echo "<table>";
				echo "<td>Name</td><td>Wert 1</td><td>Wert 2</td><td>Wert 3</td>";
				while ($row = mysqli_fetch_assoc($result)){
					echo "<tr><td class = 'name'>" . $row['name'] . "</td><td class = 'wert_1'>" . $row['wert_1'] ."</td><td class = 'wert_2'>" . $row['wert_2'] . "</td><td class = 'wert_3'>" . $row['wert_3'] ."</td>"."</tr>";
					
				}
				echo "</table>";
			}

		?>
	</aside>
</body>
</html>