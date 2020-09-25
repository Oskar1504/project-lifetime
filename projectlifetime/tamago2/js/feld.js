function setup_farm_spielfeld(){
	//erstellt canvas in main content
	 document.getElementById("main_content").innerHTML = "<td><canvas width='450' height='420' id = 'canvas2'></td><td><table id = 'frucht_shop'  class = 'main_content'></table></td><td><table id = 'frucht_lager_info' class = 'main_content'></table></td><td><table class = 'main_content'><td id = 'farm_frucht_spiel_info'></td></table><tr><table><td  id = 'farm_feld_spiel_info'></td></table></tr></td>";
	
	//stellt alle früchte dar
	for(var i = 1; i < feld_frucht.length;i++){
		document.getElementById("frucht_shop").innerHTML += "<td class = 'frucht_shop_button "+i+"' onClick = 'field_selection(this);'>"+feld_frucht[i].name+"</td>"
	}
	//selected die erste frucht
	document.getElementsByClassName("frucht_shop_button")[0].classList.add("selected");
	//zeichnet frucht lager 
	for(var i = 0; i < feld_frucht_lager.length;i++){
		document.getElementById("frucht_lager_info").innerHTML += "<td class = 'frucht_lager_button "+i+"' onClick = 'field_selection(this);'>"+feld_frucht_lager[i].name+"</td>"
	}
	//zeichent info vomersten feld
	render_sechseck_feld_info("farm_feld_spiel_info",spielfeld_feld_elemente,0,0);
	//zeichnet info vom weizen im shop
	//show_farm_frucht_info(feld_frucht[1]);
	//erstellt fillstyle
	var canvas=document.getElementById("canvas2");
	var ctx = canvas.getContext('2d');
	var my_gradient=ctx.createLinearGradient(0, 0, canvas.width,canvas.height);
		my_gradient.addColorStop(0.1, "saddlebrown");
		my_gradient.addColorStop(0.3, "sienna");
		my_gradient.addColorStop(0.5, "saddlebrown");
		my_gradient.addColorStop(0.7, "peru");
		my_gradient.addColorStop(1, "sienna");
		ctx.fillStyle = my_gradient;
	//fügt click funktion hinzu
	canvas.addEventListener("mousedown", function(e) 
	{ 
		getMousePosition(canvas, e, spielfeld_feld_elemente); 

	}); 
	render_farm_spielfeld();
	
}

function render_farm_spielfeld(){
	document.getElementById("main_content").innerHTML = "<td><canvas width='450' height='420' id = 'canvas2'></td>";
	var canvas=document.getElementById("canvas2");
	var ctx = canvas.getContext('2d');


	render_sechseck("canvas2","stadt");

			/*if(spielfeld_feld_elemente[1][i][j].content.harvestable == true){	
				ctx.lineWidth = 6;
				ctx.strokeStyle = "YellowGreen";
			}else{
				ctx.lineWidth = 1;
				ctx.strokeStyle = "black";
			}
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
			*/
			//zeichnet texture

}
	


function kaufe_frucht(){
	if(gold_value >= feld_frucht[feld_frucht_index].wert/2){
		remove_gold(feld_frucht[feld_frucht_index].wert/2)

		//setzt copie form object im frucht arary in feld
		spielfeld_feld_elemente[1][feld_x_index][feld_y_index].content = JSON.parse(JSON.stringify(feld_frucht[feld_frucht_index]));
		
		//changed growstart von gepflanzter frucht
		spielfeld_feld_elemente[1][feld_x_index][feld_y_index].content.grow_start = clock_value;
	}

		//set texture
		render_sechseck_feld_info("farm_feld_spiel_info",spielfeld_feld_elemente,feld_x_index,feld_y_index);
		render_sechseck(document.getElementById("canvas2"),spielfeld_feld_elemente,feld_x_index,feld_y_index);
}
function pflanze_frucht(){
	if(feld_frucht_lager[feld_frucht_lager_index].amount > 0){

	//setzt copie form object im frucht arary in feld
	spielfeld_feld_elemente[1][feld_x_index][feld_y_index].content = JSON.parse(JSON.stringify(feld_frucht_lager[feld_frucht_lager_index]));
	
	//remove one from frucht lager
	feld_frucht_lager[feld_frucht_lager_index].amount -= 1;

	//changed growstart von gepflanzter frucht
	spielfeld_feld_elemente[1][feld_x_index][feld_y_index].content.grow_start = clock_value;

	//set texture
	//document.getElementById(feld_map[feld_x_index][feld_y_index].id).style.backgroundImage = "url('texture/farm/"+feld_map[feld_x_index][feld_y_index].frucht[0].name+".png'),url('texture/farm/feld.png')";
	
	//zeichnet lager ifno neu
	document.getElementById("frucht_lager_info").innerHTML = "";
	for(var i = 0; i < feld_frucht_lager.length;i++){
		if(feld_frucht_lager[i].amount > 0){
			document.getElementById("frucht_lager_info").innerHTML += "<td class = 'frucht_lager_button "+i+"' onClick = 'field_selection(this);'>"+feld_frucht_lager[i].name+"</td>"
		}
	}
	show_farm_frucht_info(feld_frucht_lager[feld_frucht_lager_index]);
		render_sechseck_feld_info("farm_feld_spiel_info",spielfeld_feld_elemente,feld_x_index,feld_y_index);
		render_sechseck(document.getElementById("canvas2"),spielfeld_feld_elemente,feld_x_index,feld_y_index);
	}
}


function harvest_sell_frucht(){
	if(spielfeld_feld_elemente[1][feld_x_index][feld_y_index].content.harvestable == true){
		//fügt gold hinzu	
		add_gold(spielfeld_feld_elemente[1][feld_x_index][feld_y_index].content.wert);

	
		//ersetzt feld frucht mit none
		spielfeld_feld_elemente[1][feld_x_index][feld_y_index].content = JSON.parse(JSON.stringify(feld_frucht[0]));
	};
		render_sechseck(document.getElementById("canvas2"),spielfeld_feld_elemente,feld_x_index,feld_y_index);
}


function harvest_store_frucht(){
	let data = spielfeld_feld_elemente[1][feld_x_index][feld_y_index];
	if(data.content.harvestable == true){
		//fügt frucht lager hinzu
		//checkt ob es da is tund gibt es aus wenn ja dann noch index dazu
		var info = find_in_array(feld_frucht_lager,data.content.name);
		if(info[0] == true){
			feld_frucht_lager[info[1]].amount += 2;
		}else{
			feld_frucht_lager.push(JSON.parse(JSON.stringify(data.content)));
			feld_frucht_lager[feld_frucht_lager.length-1].harvestable = false;
		}

		//ersetzt feld frucht mit none
		data.content = JSON.parse(JSON.stringify(feld_frucht[0]));
		data.content.harvestable = false;
	}
	//zeichnet lager ifno neu
	document.getElementById("frucht_lager_info").innerHTML = "";
	for(var i = 0; i < feld_frucht_lager.length;i++){
		document.getElementById("frucht_lager_info").innerHTML += "<td class = 'frucht_lager_button "+i+"' onClick = 'field_selection(this);'>"+feld_frucht_lager[i].name+"</td>"
	}
	show_farm_frucht_info(feld_frucht_lager[feld_frucht_lager.length-1]);
	render_sechseck(document.getElementById("canvas2"),spielfeld_feld_elemente,feld_x_index,feld_y_index);

}

function check_harvestable(){
	for(var i = 0; i < spielfeld_feld_elemente[1].length;i++){
		for(var j = 0; j < spielfeld_feld_elemente[1][i].length;j++){
			//schaut ob bei allen pflanzenn die noch nciht reif sind sie reif sind
			if((spielfeld_feld_elemente[1][i][j].content.grow_start+spielfeld_feld_elemente[1][i][j].content.grow_duration) <= clock_value && spielfeld_feld_elemente[1][i][j].content.harvestable == false ){
				spielfeld_feld_elemente[1][i][j].content.harvestable = true;
				if(document.getElementById("canvas2")){
				render_sechseck(document.getElementById("canvas2"),spielfeld_feld_elemente,feld_x_index,feld_y_index);
			}
			}
		}	
	}

}