<?php

// Sort in ascending order - this is default
$a = scandir("./sounds/Claps");
$b = scandir("./sounds/FX");
$c = scandir("./sounds/Kicks");
$d = scandir("./sounds/Percs");
$e = scandir("./sounds/Percs/Toms");
$f = scandir("./sounds/Snares");
$g = scandir("./sounds/Hats/Open");
$h = scandir("./sounds/Hats/Closed");
$j = scandir("./sounds/Hats/Cymbals");
echo "<tr><th>Claps</th>";
for($i = 2; $i < count($a);$i++){
	echo "<td onclick = 'play_list(this);' class = 'sound Claps' >".$a[$i]."</td>";
}
echo "<tr><th>FX</th>";
for($i = 2; $i < count($b);$i++){
	echo "<td onclick = 'play_list(this);' class = 'sound FX' >".$b[$i]."</td>";
}
echo "<tr><th>Kicks</th>";
for($i = 2; $i < count($c);$i++){
	echo "<td onclick = 'play_list(this);' class = 'sound Kicks' >".$c[$i]."</td>";
}
echo "<tr><th>Percs</th>";
for($i = 2; $i < count($d);$i++){
	echo "<td onclick = 'play_list(this);' class = 'sound Percs' >".$d[$i]."</td>";
}
echo "<tr><th>Percs Toms</th>";
for($i = 2; $i < count($e);$i++){
	echo "<td onclick = 'play_list(this);' class = 'sound Percs/Toms' >".$e[$i]."</td>";
}
echo "<tr><th>Snares</th>";
for($i = 2; $i < count($f);$i++){
	echo "<td onclick = 'play_list(this);' class = 'sound Snares' >".$f[$i]."</td>";
}
echo "<tr><th>Hats Open</th>";
for($i = 2; $i < count($g);$i++){
	echo "<td onclick = 'play_list(this);' class = 'sound Hats/Open' >".$g[$i]."</td>";
}
echo "<tr><th>Hats Closed</th>";
for($i = 2; $i < count($g);$i++){
	echo "<td onclick = 'play_list(this);' class = 'sound Hats/Closed' >".$h[$i]."</td>";
}
echo "<tr><th>Cymbals</th>";
for($i = 2; $i < count($j);$i++){
	echo "<td onclick = 'play_list(this);' class = 'sound Hats/Cymbals' >".$j[$i]."</td>";
}

?>