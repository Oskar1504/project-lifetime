<!DOCTYPE html>
<html>
<head>
	<title>Bild changen</title>
</head>
<body onkeypress="update_map2(event)">
	<img src="wall.png" id = "img">
	<img src="wall2.png" id = "img2">
	<img src="wall4.png" id = "wall_img">
	<img src="player.png" id = "player">
	<img src="map2.png" id = "map">
	<img src="ehre.png" id = "img3"><br><br>
	<canvas id ="canvas2" width="64" height="64"></canvas>
	<canvas id ="canvas3" width="64" height="64"></canvas>
	<canvas id ="canvas" width="64" height="64"></canvas>
	<br><br><br><center>
		<canvas id ="wall" width="64" height="64"></canvas><br>
		<input focus type="range" id="range" name="range" value = "256" min="-768" max="0" onInput="update_wall(this);" onChange="update_wall(this);">
	</center>
	<br><br><br><center>
		<span>Press w,a,s,d to move the image</span><br>
		<canvas id ="canvas_map" width="512" height="512"></canvas>
	</center>
	
</body>
<script >

	function update_wall(elemt){
		console.log(elemt.value);
		var wall = document.getElementById('wall_img');
		var canvas_wall = document.getElementById('wall');
		canvas_wall.height = wall.height;
		canvas_wall.width = wall.height;
		canvas_wall.getContext('2d').drawImage(wall, elemt.value,0, wall.width, wall.height);
	}

	function update_map(dx,dy){
		
		console.log(x +"|"+y);
		var map = document.getElementById('map');
		var player = document.getElementById('player');
		var canvas_map = document.getElementById('canvas_map');

		canvas_map.getContext('2d').drawImage(map, dx,dy, map.width, map.height);
		canvas_map.getContext('2d').drawImage(player, (canvas_map.width/2)-player.width/2,(canvas_map.height/2)-player.height/2,player.width, player.height);

		console.log("updated map")
	}

	update_map(2,2);

	var x = 2;
	var y = 2;
	var stepsize = 10;

	function update_map2(event){

		console.log(event.key)
		if(event.key == "w"){
			y+=stepsize;
		}
		if(event.key == "s"){
			y-=stepsize;
		}
		if(event.key == "d"){
			x-=stepsize;
		}
		if(event.key == "a"){
			x+=stepsize;
		}

		update_map(x,y);
	}

	function drawImage_in_canvas(){
		var img = document.getElementById('img');
		var canvas2 = document.getElementById('canvas2');
		canvas2.getContext('2d').drawImage(img, 0,0, img.width, img.height);

		var img3 = document.getElementById('img3');
		var canvas3 = document.getElementById('canvas3');
		canvas3.getContext('2d').drawImage(img3, -32,0 , 128,128);
	}

	function convert_image(){
		let zeile= [],output_array = [];
		for(var i = 0; i < document.getElementById("img").height; i++){
			zeile = [];
			for(var j = 0; j < document.getElementById("img").width;j++){
				zeile.push(document.getElementById('canvas2').getContext('2d').getImageData(i,j,1,1).data);
			}
			output_array.push(zeile);
		}
		return output_array;
	}

	drawImage_in_canvas();
	convert_image();
</script>
</html>