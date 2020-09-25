<!DOCTYPE html>
<html>
<head>
	<script src="main.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
	<title>Card Raid</title>
</head>
<body>
	<center>
		<div class = "monster">
			<span>Name:</span><span id = "monster_name"></span><br>
			<span>Leben:</span><span id = "monster_leben"></span><br>
			<span>Angriffschaden:</span><span id = "monster_atk"></span><br>
			<span>Verteidigung:</span><span id = "monster_def"></span>
		</div>
		<br>
		<div>
			<p>Spielzug Uebersicht</p>
			<span id ="spielzug"></span><br>
			<button onclick="zug_spielen()">Zug beenden</button>
		</div>
		<br>
		<div class = "spielfeld_bereich">
			<p>Spielfeld</p>
			<table id = "spielfeld">
				<td class = "spielfeld" ondrop="drop(event)" ondragover="allowDrop(event)"></td>
				<td class = "spielfeld" ondrop="drop(event)" ondragover="allowDrop(event)"></td>
				<td class = "spielfeld" ondrop="drop(event)" ondragover="allowDrop(event)"></td>
				<td class = "spielfeld" ondrop="drop(event)" ondragover="allowDrop(event)"></td>
				<td class = "spielfeld" ondrop="drop(event)" ondragover="allowDrop(event)"></td>
			</table>
			<div id = "spielfeld_clear"></div>
		</div>
		<br>
		<div class = "player">
			<span>Leben:</span><span id="player_leben">1000</span>
			<span>Verteidigung:</span><span id="player_def">100</span>
			<table id = "handkarten"></table>
		</div>
		<div class = "kartenstapel">
			<p>Kartenstapel</p>
			<p class = "stapel" id = "stapel"><span id = "stapel_amount"></span></p>
			<span id = "draw_button"><button onclick="draw_card(all_cards);">Draw Card</button></span>
		</div>
		<br>
	</center>
</body>
<script>
	if(hand_cards.length == 0){
		for (var i = 0; i < 5; i++) {
			draw_card(all_cards,true);
		}
	}
	render_monster(all_monsters,2);
	render_stack(all_cards);
</script>
</html>