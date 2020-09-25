var spielfeld = [], spielfeld_index = 0;

var abenteuer_map = [], abenteuer_map_index = 0;

var spielfeld_stadt = [], stadt_map = [], stadt_map_index = 0;

var eggs = [];

var monsters = [],own_monsters = [], own_monsters_index = 0;

var abt_level = [], abt_level_schritt = 0, abt_level_fillings = [];

var item_lager = [] , item_lager_index = 0, feld_frucht_lager = [], feld_frucht_lager_index = 0;

var wo_bin_ich = "map";

var username;

var gold_value = 100, clock_value = 0, autosave_last = 1, autosave_intervall = 30;

var element_felder = document.getElementsByClassName("field");

var feld_map = [];

var version = 25;


var size = 6;

var spielfeld_feld_elemente= [], feld_x_index = 0, feld_y_index = 0, feld_frucht = [], feld_frucht_index = 1;

var hex_spielfeld = create_sechseck_map();

var neu_item_lager = [];



//disclaimed das er speichern sollte
/*window.onbeforeunload = function () {
    return speichern();
};*/

//sinnvolle funktionen
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function remove_gold(remove){
	gold_value = JSON.parse(localStorage.getItem('gold'))-remove;
	localStorage.setItem('gold',gold_value);

}

function add_gold(add){
	gold_value = JSON.parse(localStorage.getItem('gold'))+add;
	localStorage.setItem('gold',gold_value);
}

function find_in_array(arr,id){
	let x = false,index = 0;
	for(var i = 0; i < arr.length;i++){
		if(id == arr[i].name){
			x = true;
			index = i;
		}
	}
	return [x,index];
}
function lol(){
var xhr = new XMLHttpRequest();
xhr.open("GET", "/projectlifetime/tamago2/texture/bac", true);
xhr.responseType = 'document';
xhr.onload = () => {
  if (xhr.status === 200) {
    var elements = xhr.response.getElementsByTagName("a");
    for (x of elements) {
      if ( x.href.match(/\.(jpe?g|png|gif)$/) ) { 
          let img = document.createElement("img");
          img.src = x.href;
      } 
    };
  } 
  else {
    alert('Request failed. Returned status of ' + xhr.status);
  }
}
xhr.send();
}
function start(){

	document.getElementById("username_info").innerHTML = "<b>"+localStorage.getItem('username')+"</b>";

	create_monsters();
	create_eggs();
	create_abt_level_fillings();

	create_abenteuer_map(6);
	create_stadt_map(7);

	create_feld_frucht();
	create_item_lager();

	spielfeld_stadt.push(create_sechseck_map("stadt")[0],create_sechseck_map("stadt")[1]);

	//kreiert lager item wenn keins vorhanden ist
	if(item_lager.length == 0){
		create_item_lager();
	}
	if(localStorage.getItem('all') && JSON.parse(localStorage.getItem('all'))[0] == localStorage.getItem('username')){
		lade_spiel();
	}
	//erstellt farm spiel speicher da in der clock drauf zugegriffen wird
	//macht es nur wenn ein neuer account erstellt wird und kein feld daata vorhanden sit
	if(spielfeld_feld_elemente.length == 0){
		spielfeld_feld_elemente.push(create_sechseck_map("farm")[0],create_sechseck_map("farm")[1]);
	}

	localStorage.setItem('gold',gold_value);
	localStorage.setItem('clock',clock_value);

	clock();
}
//löscht alle local sotrage daten wenn neue veriosn da ist
function versionstest(){
	if(!localStorage.getItem('version')){
		localStorage.setItem('version',version-1);
	}

	if(localStorage.getItem('version') != version){
		localStorage.clear();
		localStorage.setItem('version',version);
	}
	document.getElementById("version").innerHTML = "Version: "+version;
}

function clock(){
	setTimeout(function(){
		//chekct pflazne
		check_harvestable();
		//zählt clock hoch
		clock_value++;
		//zeigtr alle values
		document.getElementById("clock_value").innerHTML = "<b>Clock: "+clock_value;
		document.getElementById("gold_value").innerHTML = "<b>Gold: "+gold_value;
		//speichert gold und clock local 
		gold_value = localStorage.getItem('gold');
		localStorage.setItem('gold',gold_value);
		localStorage.setItem('clock',clock_value);
		//endless loop

		clock();
		if(autosave_last + autosave_intervall < clock_value){speichern();autosave_last = clock_value;}
		
	},1000);
}

function speichern(){
	var alle_arrays = [];
	alle_arrays.push(localStorage.getItem('username'), gold_value, clock_value, own_monsters, item_lager, feld_frucht_lager, spielfeld_feld_elemente);

	localStorage.setItem('all',JSON.stringify(alle_arrays));

}

function lade_spiel(){
	var speicher_arrays = JSON.parse(localStorage.getItem('all'));
	username = speicher_arrays[0];
	gold_value = speicher_arrays[1];
	clock_value  = speicher_arrays[2];
	own_monsters = speicher_arrays[3];
	item_lager = speicher_arrays[4];
	feld_frucht_lager = speicher_arrays[5];
	spielfeld_feld_elemente = speicher_arrays[6];
}

function server_laden(){
	var speicher_arrays = JSON.parse(document.getElementById("server_daten").innerHTML);
	username = speicher_arrays[0];
	gold_value = speicher_arrays[1];
	clock_value  = speicher_arrays[2];
	own_monsters = speicher_arrays[3];
	item_lager = speicher_arrays[4];
	feld_frucht_lager = speicher_arrays[5];
	spielfeld_feld_elemente = speicher_arrays[6];
	localStorage.setItem('username',document.getElementById("username_info").innerHTML);
	speichern();
	window.open("../site.php");
}

function anmelden(){
		var r = confirm("Nutzt du ein neues Gerät und möchtest die auf dem Server\n gespeicherten daten nutzen?");
		if(r == true){
			localStorage.setItem("username",document.getElementById("username_info").innerHTML);
	 		localStorage.setItem("all",document.getElementById("server_daten").innerHTML);
			console.log("nicht lokal");
		}else{
			alert("Der Lokale Spielstand wird geladen.");
			lade_spiel();
			console.log("lokat");
		}
}

function array_length(array){
	let output = 0;
	for(var i = 0; i < array.length;i++){
		for(var j = 0; j < array[i].length;j++){
			output ++;
		}
	}
	return output;
}


function render_spielfeld(){
	wo_bin_ich = "map";
	var main_content = document.getElementById("main_content");
	main_content.innerHTML= "";
	main_content.innerHTML += '<td class = "main_content"><table id = "button"></table></td><td class = "main_content"><table id = "content_button" class = "content_button"></table></td><td class = "main_content"><table id = "info" class = "menu_info"></table></td>';
	//zeichnet info raum
	document.getElementById("info").innerHTML += '<td >Klicke auf die buttons um genauere Informationen über die Orte zu erhalten. </td>';
	//zeichnet button
	for(var i = 0; i < spielfeld.length;i++){

		document.getElementById("button").innerHTML += '<td onClick = "field_selection(this);" ondblclick = "enter_'+spielfeld[i].name+'();" class = "menu_button '+ i +'" id ="'+spielfeld[i].id+'">'+spielfeld[i].name+'</td>';
	}
}

function find_element(feld){
	return document.getElementsByClassName(feld.classList[0]);
}

function field_selection(feld){
		//löscht die selceted fiel dclasse welche den roten rahmen darstellt
		for(var i = 0;i<find_element(feld).length;i++){
			find_element(feld)[i].classList.remove("selected");
		}
		//fügt sleected class hinzu
		feld.classList.add("selected");
		//jenachdem welcher button speichert er unterschiedliche sacehn
		if(feld.classList[0] == "menu_button"){
			spielfeld_index = feld.classList[1];
		}else if(feld.classList[0] == "content_menu_button"){
			spielfeld_content_index = feld.classList[1];
			abenteuer_map_index = feld.classList[1];
		}else if(feld.classList[0] == "scheune"){
			if(feld.classList[1] == "item"){
				render_item_scheune(item_lager,feld.classList[2],"item");
			}else if(feld.classList[1] == "frucht"){
				render_item_scheune(feld_frucht_lager,feld.classList[2],"farm");
			}
		}else if(feld.classList[0] == "frucht_shop_button"){
			 feld_frucht_index= feld.classList[1];
			 show_farm_frucht_info(feld_frucht[feld_frucht_index]);
		}else if(feld.classList[0] == "frucht_lager_button"){
			 feld_frucht_lager_index= feld.classList[1];
			 show_farm_frucht_info(feld_frucht_lager[feld_frucht_lager_index]);
		}else if(feld.classList[0] == "markt_button"){
			for(var i = 0; i < document.getElementsByClassName("markt_button").length;i++){
				if(document.getElementsByClassName("markt_button")[i].classList.contains("selected")){
					show_anzeige_info(i);
				}
			}
		}else if(feld.classList[0] == "markt_button2"){
			for(var i = 0; i < document.getElementsByClassName("markt_button2").length;i++){
				if(document.getElementsByClassName("markt_button2")[i].classList.contains("selected")){
					show_anzeige_info_2(i);
				}
			}
		}

		show_field_info(feld);


	 if(wo_bin_ich == "abenteuer"){
		//löscht die selceted fiel dclasse welche den roten rahmen darstellt
		for(var i = 0;i<element_felder.length;i++){
			element_felder[i].classList.remove("selected");
		}
		//fügt sleected class hinzu
		feld.classList.add("selected");
		abenteuer_x_index =feld.classList[1];
		abenteuer_y_index = (feld.classList[2]-10);

		show_field_info_abenteuer();
	}else if(wo_bin_ich == "haus"){
		//löscht die selceted fiel dclasse welche den roten rahmen darstellt
		for(var i = 0;i<element_felder.length;i++){
			element_felder[i].classList.remove("selected");
		}
		//fügt sleected class hinzu
		feld.classList.add("selected");
		own_monsters_index = feld.classList[2];
		show_own_monster_info();
	}
	
}



function show_field_info(feld){
	var info_content = document.getElementById("info");

	//rendert info und content anhand der button art
	if(feld.classList[0] == "menu_button"){
		//schreibt die gnazen infos der ausgewähltren buttons 
		var data = spielfeld[spielfeld_index];
		info_content.innerHTML = data.name + "<br>Info: " + data.info;
		info_content.innerHTML += '<table><td onClick = enter_'+data.name+'();>Betritt '+data.name+'</td></table>';
		//macht die content button anzeige unsochtbar wenn kein contetn vorhanden ist
		if(spielfeld[spielfeld_index].content.length == 0){
			 document.getElementById("content_button").classList.add("content_button");
			 document.getElementById("content_button").innerHTML = "";
		}
		//zeichnet content button wenn menu button contentn beinhaltet
		if(spielfeld[spielfeld_index].content.length > 0){
			render_button_content();
		}
	}else if(feld.classList[0] == "content_menu_button"){
		var content_data = spielfeld[spielfeld_index].content[spielfeld_content_index];
		info_content.innerHTML = content_data.name + "<br>Info: " + content_data.info;
		info_content.innerHTML += '<table><td onClick = enter_'+content_data.type+'();>Betritt '+content_data.name+'</td></table>';
	}else if(feld.classList[0] == "item"){
		var data = item_lager[item_lager_index];
		document.getElementById("item_bild").style.backgroundImage = "url('texture/item/"+data.name+".png')";
		document.getElementById("item_lager_info").innerHTML = "Name: "+ data.name +"<br>Anzahl: "+data.amount+"<br>Wert: "+data.wert;
	}
}

function render_button_content(){
	var content_element = document.getElementById("content_button");
	content_element.classList.remove("content_button");
	var data = spielfeld[spielfeld_index];
	content_element.innerHTML = "";
	for(var i = 1; i < data.content.length;i++){

		content_element.innerHTML += '<td onClick = "field_selection(this);" ondblclick = "enter_'+data.content[i].type+'();" class = "content_menu_button '+ i +'" id ="'+data.content[i].name+'">'+data.content[i].name+'</td>';
	}
}


//setzt bestimmte anzahl an monstern dessen stufe gleich der des eis ist in das ei. wählt random aus
function set_egg_content(stufe, amount){
	var arr = [];
		 for(var j = 0; j < amount; j++){
				var factor = getRandomInRange(find_index_stufe(stufe)-(find_anzahl_stufe(stufe)-1),find_index_stufe(stufe)+1)
				arr = JSON.parse(JSON.stringify(arr.concat(monsters.slice(factor,factor+1))));			
		
	}
	return arr;
	}
//findet die anzhal der vorhandenen monster dessen stufe gleich der stufe des eies ist
function find_anzahl_stufe(stufe){
	var x = 0;
	for(var j = 0; j < monsters.length; j++){
	if(monsters[j].stufe == stufe){
				x +=1;	
		}
	}
	return x;

}
// findet den letzten eintrag im monster speicher dssen stufe gleich der stufe des eies ist
function find_index_stufe(stufe){
	var x = 0;
	for(var j = 0; j < monsters.length; j++){
	if(monsters[j].stufe == stufe){
				x = j;	
		}
	}
	return x;
}


function enter_abenteuer(){
	//ändert main contetn und zeichenet neue welt
	var main_content = document.getElementById("main_content");
	var data_welt = abenteuer_map[abenteuer_map_index];
	main_content.innerHTML ="<td><table id = 'background' class = 'welt_background' ><tr><td id = 'welt_entity_name'>welt_entity_name</td></tr><tr><td id = 'welt_interface' class = 'welt' onClick = 'welt_interaction();'></td></tr></table><table class = 'center'><tr><td class = 'egg_health' id = 'egg_health'></td></tr><tr><td id = 'welt_button' class = 'egg_health' onClick = 'welt_erkunden();'>Erkunden</td></tr></table></td>";
	
	var background = document.getElementById("background");
	background.style.backgroundImage = "url('texture/background_welt/"+data_welt.name+".png')";
	document.getElementById("welt_entity_name").innerHTML = "<b>"+data_welt.name+"</b>";

	//generietrt abenteielr levber
	create_abenteuer_level();
	//zeichnet das ersten inhalt im abenteuer_level
	var welt_interface = document.getElementById("welt_interface");
	if(abt_level[0].type == "filling"){
		welt_interface.classList.add("egg");
		welt_interface.style.backgroundImage = "url('texture/item/"+abt_level[0].name+".png'),url('texture/loot.gif')";
		document.getElementById("egg_health").innerHTML = "<b> Gefunden: "+abt_level[0].name+"<br>Anzahl: "+abt_level[0].amount;
			document.getElementById("egg_health").innerHTML += "<br><b>Stufe: "+abt_level_schritt+"/"+abt_level.length;
	}else if(abt_level[0].type == "egg"){
		welt_interface.classList.add("egg");
		welt_interface.style.backgroundImage = "url('texture/eggs/"+abt_level[0].name+".png'),url('texture/nest.png')";
		document.getElementById("egg_health").innerHTML = "<b>"+abt_level[abt_level_schritt].name+"<br> Leben: "+abt_level[abt_level_schritt].health;
		document.getElementById("egg_health").innerHTML += "<br><b>Stufe: "+abt_level_schritt+"/"+abt_level.length;
	}
}


function create_abenteuer_level(){
	//löscht altes level
	abt_level = [];
	//generietrt nach anzahl der stages anzahl an eier
	//egg min und egg max ist der index welche eieer aus dem ei speicher array genommen werden durfen
	var temp_level = abenteuer_map[abenteuer_map_index];
	for(var i = 0; i < temp_level.stages; i++){
		var factor2 = getRandomInt(2);
		if(factor2 == 0){
			var factor = getRandomInRange(temp_level.egg_min_index,temp_level.egg_max_index);
			abt_level =  JSON.parse( JSON.stringify(abt_level.concat( eggs.slice(factor,factor+1))));

			//ändert den content jedes eis sodass es sich nicht wiederholt
			abt_level[i].content = set_egg_content(abt_level[i].stufe,3);
		}else if (factor2 == 1){
			//setzt fillings random
			var factor = getRandomInRange(0,3);
			abt_level =  JSON.parse( JSON.stringify(abt_level.concat( abt_level_fillings.slice(factor,factor+1))));
			abt_level[i].amount = getRandomInRange(10,30);
		}
	}
}

function welt_interaction(){
	var welt_interface = document.getElementById("welt_interface");
		//zieht leben ab und shcriebt neu hin
		if(abt_level[abt_level_schritt].health >= 1){
		abt_level[abt_level_schritt].health = abt_level[abt_level_schritt].health-1;
		document.getElementById("egg_health").innerHTML = "<b> "+abt_level[abt_level_schritt].name+"<br> Leben: "+abt_level[abt_level_schritt].health;
		document.getElementById("egg_health").innerHTML += "<br><b>Stufe: "+abt_level_schritt+"/"+abt_level.length;
		}
		// sucht ranodm monster au content und zeichenrt es und pushed es in own monsters
		if(abt_level[abt_level_schritt].health == 0){
			abt_level[abt_level_schritt].health = -1;

			//sucht random monster aus dem ei raus und stacked sie in own monsters rein
			var factor = getRandomInt(3);
			loot_monster(abt_level_schritt,factor);
			
			//stellt das grafisch dar
			welt_interface.style.backgroundImage = "url('texture/monster/"+abt_level[abt_level_schritt].content[factor].id+".png'),url('texture/loot.gif'),url('texture/eggs/"+abt_level[abt_level_schritt].name+"_cracked.png'),url('texture/nest.png')";
		}
	
}

function loot_monster(abt_index,factor){
	var arr = abt_level[abt_index];
	//checkt ob es da is tund gibt es aus wenn ja dann noch index dazu
	var info = find_in_own_monster(arr.content[factor].id);
	//wenn da dannn add otherwise psuh new
	if(info[0] == true){
		own_monsters[info[1]].amount += 1;
	}else{
		own_monsters.push(arr.content[factor]);
	} 
	
}

function find_in_own_monster(id){
	var x = false,index = 0;
	for(var i = 0; i < own_monsters.length;i++){

	if(id == own_monsters[i].id){
		x = true;
		index = i;
	}
	}
	return [x,index];
}

function loot_item(item_amount,id){
	for(var i = 0; i < item_lager.length;i++){
		if(id == item_lager[i].name){
			item_lager[i].amount += item_amount;
		}
	}
}

function welt_erkunden(){
	var welt_interface = document.getElementById("welt_interface");

		if(abt_level[abt_level_schritt].health == -1 && abt_level_schritt < abt_level.length-1){
			abt_level_schritt += 1;

		//stellt grafisches dar
			welt_interface.classList.add("egg");
			welt_interface.style.backgroundImage = "url('texture/eggs/"+abt_level[abt_level_schritt].name+".png'),url('texture/nest.png')";
			
		//updated lebensanzeige
			document.getElementById("egg_health").innerHTML = "<b> "+abt_level[abt_level_schritt].name+"<br> Leben: "+abt_level[abt_level_schritt].health;
			document.getElementById("egg_health").innerHTML += "<br><b>Stufe: "+abt_level_schritt+"/"+abt_level.length;

		//wenn es nen filling ist stellt es dieses dar und added es 
			if(abt_level[abt_level_schritt].type == "filling"){
			welt_interface.style.backgroundImage = "url('texture/item/"+abt_level[abt_level_schritt].name+".png'),url('texture/loot.gif')";
			document.getElementById("egg_health").innerHTML = "<b>Gefunden: " + abt_level[abt_level_schritt].name + "<br> Anzahl: " + abt_level[abt_level_schritt].amount;
			document.getElementById("egg_health").innerHTML += "<br><b>Stufe: "+abt_level_schritt+"/"+abt_level.length;
			loot_item(abt_level[abt_level_schritt].amount,abt_level[abt_level_schritt].name);
			}
		}else if(abt_level_schritt == abt_level.length-1){
			abt_level_schritt = 0;
			render_spielfeld();
			abt_level = [];
		}
	

}

function enter_Scheune(){
	var main_content = document.getElementById("main_content");
	main_content.style.backgroundImage = "";
	main_content.innerHTML = "<td><table id = 'item_lager_list'  class = 'float_left'></table><table id = 'frucht_lager_list'  class = 'float_left'></table><table><td id = 'item_bild' class = 'monster_bild'></td></tr><tr><td id = 'item_lager_info'></td></tr><tr onClick = 'item_verkaufen(1);'><td><b>Verkaufen</td></tr><tr onClick = 'item_verkaufen(10);'><td><b>10x Verkaufen</td></tr></table></td>";

	for(var i = 0; i< item_lager.length;i++){
		document.getElementById("item_lager_list").innerHTML += '<tr><td class = " scheune item '+i+'" onClick = "field_selection(this);">'+item_lager[i].name+'</td></tr>';
	}
	for(var i = 0; i< feld_frucht_lager.length;i++){
		document.getElementById("frucht_lager_list").innerHTML += '<tr><td class = " scheune frucht '+i+'" onClick = "field_selection(this);">'+feld_frucht_lager[i].name+'</td></tr>';
	}

	
}

function render_item_scheune(array,index,where){
	let data = array[index];
	document.getElementById("item_bild").style.backgroundImage = "url('texture/"+where+"/"+data.name+".png')";
	document.getElementById("item_lager_info").innerHTML = "Name: "+ data.name +"<br>Anzahl: "+data.amount+"<br>Wert: "+data.wert;
}


function item_verkaufen(x){
	for(var i = 0; i< document.getElementsByClassName("scheune").length;i++){
		if(document.getElementsByClassName("scheune")[i].classList.contains("item") && document.getElementsByClassName("scheune")[i].classList.contains("selected")){
			
			var data = item_lager[document.getElementsByClassName("scheune")[i].classList[2]];
			if(data.amount > x){
				add_gold(x*data.wert);
				data.amount -= x;
				render_item_scheune(item_lager,document.getElementsByClassName("scheune")[i].classList[2],"item");
				
			}
		}else if(document.getElementsByClassName("scheune")[i].classList.contains("frucht") && document.getElementsByClassName("scheune")[i].classList.contains("selected")){
			var data = feld_frucht_lager[document.getElementsByClassName("scheune")[i].classList[2]];
			if(data.amount > x){
				add_gold(x*data.wert);
				console.log("added"+data.wert*x);
				data.amount -= x;
				render_item_scheune(feld_frucht_lager,document.getElementsByClassName("scheune")[i].classList[2],"farm");
			}
				
		}
	}
	
	document.getElementById("gold_value").innerHTML = "<b>Gold: "+gold_value;

}


function enter_Stall(){
	wo_bin_ich = "haus";
	var main_content = document.getElementById("main_content");
	main_content.style.backgroundImage = "";
	main_content.innerHTML = "<td><table id = 'monster_list' class = 'float_left'></table><table><tr><td id = 'monster_bild' class = 'monster_bild'>Sammle Monster in Abenteuerwelten damit sie hier angezeigt werden</td></tr><tr id = 'monster_info'></tr><tr onClick = 'monster_verkaufen();'><td><b>Verkaufen</td></tr></table></td>";
	for(var i = 0; i< own_monsters.length;i++){
		document.getElementById("monster_list").innerHTML = document.getElementById("monster_list").innerHTML + '<tr><td class = "field haus_field '+i+'" onClick = "field_selection(this);">'+own_monsters[i].id+'</td></tr>';
	}
}


function show_own_monster_info(){
	var data = own_monsters[own_monsters_index];
	document.getElementById("monster_bild").style.backgroundImage = "url('texture/monster/"+data.id+".png')";
	document.getElementById("monster_bild").innerHTML = "";
	document.getElementById("monster_info").innerHTML = "Name: "+ data.name +"<br>Stufe: "+data.stufe+ "<br>Leben: "+data.health+"<br>Damage: "+data.damage+"<br>Anzahl: "+data.amount+"<br>Wert: "+data.wert;
}

function monster_verkaufen(){
	var data = own_monsters[own_monsters_index];
	if(data.amount > 1){
		add_gold(data.wert);
		data.amount -= 1;
	}
	show_own_monster_info();
	document.getElementById("gold_value").innerHTML = "Gold: "+gold_value;
}


function enter_Feld(){
	wo_bin_ich = "farm";
	render_farm_spielfeld();
}




function enter_stadt(){
	if(spielfeld_content_index == 0){
	var win = window.open("markt/main.php", '_blank');
 	 win.focus();
	}
	 if(spielfeld_content_index == 2){
	var win = window.open("rathaus/main.php", '_blank');
 	 win.focus();
	}
}


// alles zum thema canvas

function create_poly(dx,dy){
	//defininert startpubkjt
	x=dx;y=dy;
	//sechseck vverähtlnis ist 7 zu 8 also x7 und y8 wobei die punkte der seiten höhen 4 sind 2/8
	return [  x,y+(8*size), x+(7*size),y+((8/2)*size), x+(7*size),y-((8/2)*size), x,y-(8*size), x-(7*size),y-((8/2)*size),x-(7*size),y+((8/2)*size)];
}


function create_sechseck_map(){
	//farm spiel zeichnungne
	let chords = [], zeilen_elemte = [];
		//erstellt alle sechsecke specihert in array
	for(j = 0; j < 5 ; j++){
		zeilen_elemte = [];
		let zeilen_anzahl = 3,x_versatz = 0,abstand = 6;
		//ändert anzahl der elemte in zieel und deren versatz
		if(j == 1 || j == 3){
			zeilen_anzahl += 1;
			x_versatz = -1*7*size-abstand/2;
		}
		if(j == 2){
			zeilen_anzahl += 2;
			x_versatz = (-1*(7*2*size)-(abstand));	
		}
		for(i = 0; i < zeilen_anzahl ; i++){
			zeilen_elemte.push(create_poly(((i+1.5)*(7*2*size+abstand))+x_versatz,(j+0.8)*((8*2*size)-3.3*size)));
		}
		chords.push(zeilen_elemte);
	}
	return chords;
}

function render_sechseck(canvas_el,background_image){
	var canvas=document.getElementById(canvas_el);
	var ctx = canvas.getContext('2d');
	//cleared canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//render background image
	let texture = new Image();
	texture.src = 'texture/spielfeld_background/'+background_image+'.png';
	ctx.drawImage(texture,0,0);

	//zeichnet sechsecke aus hex chords array
	for(var i=0;i<hex_spielfeld.length;i++){
		for(var j=0;j<hex_spielfeld[i].length;j++){

			ctx.beginPath();
			ctx.moveTo(hex_spielfeld[i][j][0], hex_spielfeld[i][j][1]);
			for( punkt=2 ; punkt < hex_spielfeld[i][j].length-1 ; punkt+=2 ){
				ctx.lineTo( hex_spielfeld[i][j][punkt] ,  hex_spielfeld[i][j][punkt+1] );
			}

			//finsihing
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			ctx.closePath();
			ctx.stroke();

			//zeichnet feld texture
			var my_gradient=ctx.createLinearGradient(0, 0, canvas.width,canvas.height);
			my_gradient.addColorStop(0.1, "saddlebrown");
			my_gradient.addColorStop(0.3, "sienna");
			my_gradient.addColorStop(0.5, "saddlebrown");
			my_gradient.addColorStop(0.7, "peru");
			my_gradient.addColorStop(1, "sienna");
			ctx.fillStyle = my_gradient;
			ctx.fill();
		}
	}
}


function render_sechseck_feld_info(element_ziel,array,i,j){
	let data = array[1][i][j];
	document.getElementById(element_ziel).innerHTML = "";
	document.getElementById(element_ziel).innerHTML = "Feld Info <br>Type: "+ data.name +" | Frucht: "+ data.content.name+ " | harvestable: "+ data.content.harvestable+"<br>Amount: "+data.content.amount+" | Wert: "+data.content.wert+" | grow_duration: "+data.content.grow_duration +"<br>Zeile: "+data.zeile+" | Platz: "+data.platz ;

}

function getMousePosition(canvas_el, event, array) { 
	var canvas = canvas_el;
	var ctx = canvas.getContext('2d');
	let rect = canvas.getBoundingClientRect(); 
	var x = event.clientX - rect.left; 
	var y = event.clientY - rect.top; 

		render_sechseck(canvas_el,array,i,j);
		//click detection leider nur viereck
		for(var i = 0;i < spielfeld_feld_elemente[0].length;i++){
			
			for(var j = 0; j < spielfeld_feld_elemente[0][i].length;j++){
				let data =  spielfeld_feld_elemente[0][i][j];

				if(x > data[10] && x < data[2] && y > data[9] && y < data[3]){
					//speichert ausgewählte feld indexes 
					feld_x_index = i;
					feld_y_index = j;
					//rendert alles neu
					render_sechseck_feld_info("farm_feld_spiel_info",array,i,j);
					render_sechseck(canvas_el,array,i,j);
				}
			}
		}

} 





function render_sechseck_selected(i,j){
	//zeichnet eienn roten rahmen um ausgewähltes feld
	var canvas=document.getElementById("canvas2");
	var ctx = canvas.getContext('2d');
	//cleared canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//zeichnet komplettes feld neu
	render_farm_spielfeld();
	//zeichnet roten ramen
	ctx.beginPath();
	ctx.moveTo(spielfeld_feld_elemente[0][i][j][0], spielfeld_feld_elemente[0][i][j][1]);
	for( punkt=2 ; punkt < spielfeld_feld_elemente[0][i][j].length-1 ; punkt+=2 ){
		ctx.lineTo( spielfeld_feld_elemente[0][i][j][punkt] ,  spielfeld_feld_elemente[0][i][j][punkt+1] );
	}
	ctx.closePath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = "red";
	ctx.stroke();
}



//wird in erstelle anzieg =>markt benutzt
function draw_select_anzeige(){
	create_feld_frucht();
	create_item_lager();
	var element = document.getElementById("itemlist");
	for(var i = 1; i < feld_frucht.length; i++){
		element.innerHTML += "<option value = "+feld_frucht[i].name+">"+feld_frucht[i].name+"</option>";
	}
	for(var i = 1; i < item_lager.length; i++){
		element.innerHTML += "<option value = "+item_lager[i].name+">"+item_lager[i].name+"</option>";
	}
}

