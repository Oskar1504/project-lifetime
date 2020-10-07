<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="speicher.js"></script>
	<title>Dragonquest 9.1</title>
</head>
<body onkeypress="get_input(event);">
	<center>
		<canvas id = "spielfeld" width="512" height="512"></canvas><br>
		<canvas id = "minimap" width="512" height="512" class = "minimap"></canvas>
	</center>
</body>
<script>
	var render_size = 14;
	//zieht und convertiert die ganzen map editor strings 
	var map_data_array_editor = test(welt);
	//legt fest wieviel module es gibt
	var modules_x = map_data_array_editor.length;
	var modules_y = map_data_array_editor[0].length;
	//erstellt welt map array
	var map_data_array = create_map_array(modules_x,modules_y,render_size);
	//legt fest wo der player startet und wie schnell er auft
	var player_pos_x = 4, player_pos_y = 4,stepsize = 1;
	//ugibt an n welchen modul er startet
	var factor_y =0,factor_x=0;

	
	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	function get_input(event){

		//console.log(event.key)

		let data = map_data_array[factor_x][factor_y];

		if(event.key == "w"  && player_pos_y > 0 && data[player_pos_x][player_pos_y-stepsize].walkable == true){
			player_pos_y-=stepsize;
		}else if(event.key == "w" && player_pos_y == 0 && factor_y > 0){
			//checkt if he can change to upper module
			if(map_data_array[factor_x][factor_y-1][player_pos_x][render_size-1].walkable == true){
				factor_y-=1;
				player_pos_y = render_size-1;
			}
		}
		if(event.key == "s" && player_pos_y < render_size-1 && data[player_pos_x][player_pos_y+stepsize].walkable == true){
			player_pos_y+=stepsize;
		}else if(event.key == "s" && player_pos_y == render_size-1 && factor_y < modules_y){
			//checkt if he can change to downer module
			if(map_data_array[factor_x][factor_y+1][player_pos_x][0].walkable == true){
				factor_y+=1;
				player_pos_y = 0;
			}
		}

		//left right
		if(event.key == "d"  && player_pos_x < render_size-1 && data[player_pos_x+stepsize][player_pos_y].walkable == true){
			player_pos_x+=stepsize;
		}else if(event.key == "d" && player_pos_x == render_size-1 && factor_x < modules_x){
			//checkt if he can change to upper module
			if(map_data_array[factor_x+1][factor_y][0][player_pos_y].walkable == true){
				factor_x+=1;
				player_pos_x = 0;
			}
		}
		if(event.key == "a" && player_pos_x > 0 && data[player_pos_x-stepsize][player_pos_y].walkable == true){
			player_pos_x-=stepsize;
		}else if(event.key == "a" && player_pos_x == 0 && factor_x > 0){
			//checkt if he can change to upper module
			//console.log(map_data_array[factor_x-1][factor_y][render_size-1][player_pos_y]);
			if(map_data_array[factor_x-1][factor_y][render_size-1][player_pos_y].walkable == true){
				factor_x-=1;
				player_pos_x = render_size-1;
			}
		}

		if(event.key == "Enter" || event.key == " " && data[player_pos_x][player_pos_y].type == "dungeon"){
			console.log("enter dungeon")
		}

		//console.log(map_data_array[player_pos_x][player_pos_y]);
		//console.log(player_pos_x,player_pos_y);
		render_map(factor_x,factor_y,render_size,player_pos_x,player_pos_y);
	}

	//zeichnet map
	function render_map(modul_x,modul_y,render_size,player_pos_x_render,player_pos_y_render){
		let canvas = document.getElementById("spielfeld");
		let ctx = canvas.getContext('2d');
		let size = 64;
		canvas.width = render_size*size;
		canvas.height = render_size*size;
		let map_data = map_data_array[modul_x][modul_y];
		//render map data
		for (var i = 0; i < render_size; i++) {
			for (var j = 0; j < render_size; j++) {
				let img = new Image();
				img.src = "textures/"+map_data[i][j].texture;

				ctx.drawImage(img,map_data[i][j].x*size,map_data[i][j].y*size,size,size);
				if(i == player_pos_x && j == player_pos_y){
					let img = new Image();
					img.src = "textures/player2.png";
					ctx.drawImage(img,map_data[i][j].x*size,map_data[i][j].y*size,size,size);
				}
			}
		}

		let canvas2 = document.getElementById("minimap");
		let ctx2 = canvas2.getContext('2d');
		let minimap_size = 15;
		canvas2.width = (modules_x)*minimap_size;
		canvas2.height = (modules_y)*minimap_size;
		ctx2.fillStyle = "white";
		ctx2.fillRect(0,0,canvas2.width,canvas2.height);
		for(var i = 0; i < map_data_array.length;i++){
			for(var j= 0;j < map_data_array[i].length;j++){
				if(i == modul_x && j == modul_y){

					ctx2.fillStyle = "red";
					ctx2.fillRect(i*minimap_size,j*minimap_size,minimap_size,minimap_size);
				}
			}
		}


		
	}
	
	function create_map_array(rows,cells,modul_size){
		let output = [],row = [];
			for(var i = 0; i < rows; i++){
				row = [];
				for(var j = 0; j < cells; j++){
					row.push(create_map_modul(i,j,modul_size));
				}
				output.push(row);
			}
		console.log(output);
		return output;
	}

	function create_map_modul(s,h,modul_size){
		let output2 = [],row = [];
			for(var k = 0; k < modul_size; k++){
				row = [];
				for(var l = 0; l < modul_size; l++){
					row.push(create_map_cell(s,h,k,l));
				}
				output2.push(row);
			}
		console.log(output2);
		return output2;
	}

	function create_map_cell(s,h,di,dj){
		let walkable = true;
		let type = "none";
			// switch (getRandomInt(4)){
			// 	case 0:
			// 		texture = "wasser.png";
			// 		walkable = false;
			// 		break;
			// 	case 1:
			// 		texture = "sand.png";
			// 		walkable = true;

			// 		break;
			// 	case 2:
			// 		texture = "wiese.png";
			// 		walkable = true;
			// 		break;
			// 	case 3:
			// 		texture = "berg.png";
			// 		type = "dungeon";
			// 		walkable = true;
			// 		break;
			// }
		//kopiert die texturen von dem array welcher aus dem map editor kommt into this
		texture = map_data_array_editor[s][h][di][dj].texture;
		//checkt anhnad der texture ob es walkable ist oder nicht
		walkable = check_walkable(texture);
		return {
			"id" : (di*8)+dj,
			"x":di,
			"y":dj,
			"walkable":walkable,
			"type":type,
			"texture" : texture
		}
	
	}

	function check_walkable(texture){
		let output = true;
		switch(texture){
			case "wasser.png":
			case "berg.png":
			case "ecke_1.png":
			case "ecke_2.png":
			case "ecke_3.png":
			case "ecke_4.png":
			case "wall_1.png":
			case "wall_2.png":
			case "house.png":
			case "baum.png":
			case "iron_ore.png":
			case "gold_ore.png":
				output = false;
				break;
		}
		return output;
	}
</script>
</html>