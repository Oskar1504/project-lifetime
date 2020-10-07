var map = create_map_array(4,4,14,32);
	var ehre = create_map2_array(4,4,14,32);
	var factor_x = 0, factor_y = 0;



	function generate_string(){
	
		for (var i = 0; i < map.length; i++) {
			for (var j = 0; j < map[i].length; j++) {
				for (var k = 0; k < map[i][j].length; k++) {
					for (var l = 0; l < map[i][j][k].length; l++) {
						ehre[i][j][k][l].tid = map[i][j][k][l].texture;
					}
				}
			}
		}
		document.getElementById("output").innerText = JSON.stringify(ehre);
	}

	function convertname(name){
		let output = 0;
		switch(name){
			case "wasser.png":
				output = 1;
				break;
			case "berg.png":
				output = 2;
				break;
			case "wiese.png":
				output = 3;
				break;
			case "sand.png":
				output = 4;
				break;
		}
		return output;
	}

	function reset(elemt){
		elemt.value = "";
	}

	function resize(){
		 map = create_map_array(document.getElementById("size_x").value,document.getElementById("size_y").value,document.getElementById("size_modul").value,32);
		 ehre = create_map2_array(document.getElementById("size_x").value,document.getElementById("size_y").value,document.getElementById("size_modul").value,32);
		 draw_grid(factor_x,factor_y);
	}

	function load_string(){
		let data = JSON.parse(document.getElementById("load_input").value);
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < data[i].length; j++) {
				for (var k = 0; k < data[i][j].length; k++) {
					for (var l = 0; l < data[i][j][k].length; l++) {
						map[i][j][k][l].texture = data[i][j][k][l].tid;
					}
				}
			}
		}
		draw_grid(0,0);
	}

	//donwloaded map
	function test(){
		 var link = document.createElement('a');
		  link.download = 'filename.png';
		  link.href = document.getElementById('map').toDataURL()
		  link.click();
	}

	function arrow(facing){
		if(facing == "left" || facing == "ArrowLeft" && factor_x > 0){
			factor_x-=1;
		}
		if(facing == "right" || facing == "ArrowRight" && factor_x < map[0].length-1){
			factor_x+=1;
		}
		if(facing == "up" || facing == "ArrowUp" && factor_y > 0){
			factor_y-=1;
		}
		if(facing == "down" || facing == "ArrowDown" && factor_y < map.length-1){
			factor_y+=1;
		}
		draw_grid(factor_x,factor_y);
	}

	function map_click(canvas_el, event) { 
		//sconsole.log(event);

		var canvas = canvas_el;
		var ctx = canvas.getContext('2d');
		let rect = canvas.getBoundingClientRect(); 
		var x = event.clientX - rect.left; 
		var y = event.clientY - rect.top; 

		let map_data = map[factor_x][factor_y];
		
		for(var i = 0; i < map_data.length;i++){
			for(var  j= 0; j < map_data[i].length; j++){
				if(x >= map_data[i][j].x && x <= map_data[i][j].x+map_data[i][j].size && y >= map_data[i][j].y && y <= map_data[i][j].y+map_data[i][j].size ){
					//mit shift ist löschen ansosntsd das uzeoichnen was er da hat
					if(event.shiftKey == false){
						map_data[i][j].texture = document.getElementById("feld").value;
						if(map_data[i][j].texture ==""){
							map_data[i][j].texture = "none.png";
						}
						
						if(map_data[i][j].texture != "none.png"){
							let img = new Image();
							img.src = "textures/"+map_data[i][j].texture;
							ctx.drawImage(img,map_data[i][j].x,map_data[i][j].y,map_data[i][j].size,map_data[i][j].size);
						}
					}else{
						map_data[i][j].texture = "none.png";
						let img = new Image();
						img.src = "textures/"+map_data[i][j].texture;
						ctx.drawImage(img,map_data[i][j].x,map_data[i][j].y,map_data[i][j].size,map_data[i][j].size);	
					}	
				}
			}
		}
		//draw_grid();	
		
	}


	function create_map_array(modul_x,modul_y,modul_size,img_size){
		let output2  =[],row2 = [];
		for(var i = 0; i < modul_x;i++){
			row2 = [];
			for(var j = 0; j < modul_y; j++){
				row2.push(create_modul_array(modul_size,img_size));
			}
			output2.push(row2);
		}
		return output2;
	}

	function create_modul_array(modul_size,img_size){
		let output  =[],row = [];
		for(var k = 0; k < modul_size;k++){
			row = [];
			for(var l = 0; l < modul_size; l++){
				row.push(create_cell(k,l,img_size));
			}
			output.push(row);
		}
		return output;
	}

	function create_cell(i,j,size){
		return {
			"x":i*size,
			"y":j*size,
			"size":size,
			"texture":"none.png"
		}
	}

	function create_map2_array(modul_x,modul_y,modul_size,img_size){
		let output2  =[],row2 = [];
		for(var i = 0; i < modul_x;i++){
			row2 = [];
			for(var j = 0; j < modul_y; j++){
				row2.push(create_modul2_array(modul_size,img_size));
			}
			output2.push(row2);
		}
		return output2;
	}

	function create_modul2_array(modul_size,img_size){
		let output  =[],row = [];
		for(var k = 0; k < modul_size;k++){
			row = [];
			for(var l = 0; l < modul_size; l++){
				row.push(create_cell2(k,l,img_size));
			}
			output.push(row);
		}
		return output;
	}

	function create_cell2(i,j,size){
		return {
			"tid":0
		}
	}


	function draw_grid(mx,my){
		//debug
		document.getElementById("debug_modul").innerText = "Modul: "+factor_x +" | "+factor_y;
		//draw grid

		let canvas = document.getElementById("map");

		canvas.width = map[0][0].length*map[0][0][0][0].size;
		canvas.height = map[0][0][0].length*map[0][0][0][0].size;
		let ctx = canvas.getContext("2d");

		for(var i = 0; i < map[mx][my].length;i++){
			for(var j = 0; j < map[mx][my][i].length; j++){
				stroke_rect(ctx,i,j,map[mx][my][i][j].size);
				
				let img = new Image();
				img.src = "textures/"+map[mx][my][i][j].texture;
				ctx.drawImage(img,map[mx][my][i][j].x,map[mx][my][i][j].y,map[mx][my][i][j].size,map[mx][my][i][j].size);
				
			}
		}
	}

	function stroke_rect(ctx,i,j,size){
		ctx.moveTo(i*size,j*size);
		ctx.lineTo(i*size+size,j*size);
		ctx.lineTo(i*size+size,j*size+size);
		ctx.lineTo(i*size,j*size+size);
		ctx.lineTo(i*size,j*size);
		ctx.stroke();
	}

	function key_press(event){
		//console.log(event.key);

		arrow(event.key);
		switch(event.key){
			case "1":
				document.getElementById("feld").value = "wiese.png";
				break;
			case "2":
				document.getElementById("feld").value = "sand.png";
				break;
			case "3":
				document.getElementById("feld").value = "wasser.png";
				break;
			case "4":
				document.getElementById("feld").value = "kies.png";
				break;
			case "5":
				document.getElementById("feld").value = "berg.png";
				break;
		}
	}
function show_images(){
		var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				  document.getElementById("images").innerHTML = this.responseText;
				  //create_array();
				  fill_datalist();
				}
			};
		xhttp.open("GET", "load_images.php",true);
		xhttp.send();
	}
function fill_datalist(){
	let data = document.getElementsByClassName("image");
	for (var i = 0; i < data.length; i++) {
		if(data[i].innerText != "player.png"){
			document.getElementById("felder").innerHTML+= "<option value = '"+data[i].innerText+"'>"
		}
	}
}

function select_img(elemt){
	if(elemt.children[1].innerText != "player.png"){
		document.getElementById("feld").value = elemt.children[1].innerText;
	}
}



