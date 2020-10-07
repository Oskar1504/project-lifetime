<?php


	// Sort in ascending order - this is default

	$a = scandir("./textures/");


		for($j = 2; $j < count($a);$j++){
			echo "<span onclick = 'select_img(this)'><img src = textures/".$a[$j]." width = '32' height = '32'><span class = 'image'>".$a[$j]."</span></span><br>";
		}
	
		

	


?>