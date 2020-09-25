
function create_field(id_nummer) {
  return {
	 "id":"field_"+id_nummer,
	 "growstart":0,
	 "preis":id_nummer*100,
	 "fruit":{
		"preis":0,
		"wert":0,
		"id":"none",
		"growduration":5
	 }
	 
	};
};

var alle_felder = document.getElementsByClassName("field");
var selected_field = "field_0";
var selected_field_array_index = 0;

var alle_shop_button = document.getElementsByClassName("shop_button");
var selected_shop_item = "none";

var clock_value = 0,
	autosave_last = 10,
	autosave_delay =60,
    gold = 1000;


function start(){
	
	arraytest();
	clock();
	
	autosave_delay =60;
	
}
function load_game_frage(){
	if(localStorage.getItem('clock_value')){
		var r = confirm("Do you want to load last savegame?");
		if(r == true){
			load_game();
		}else{
			alert("No savegame loaded. \nYou can load savegame in the setting menu.");
		}
	}
}


function arraytest(){
	for(var i =0;i<=9;i++){
		var id_nummer = fields.length;
		fields.push(create_field(id_nummer));
	}
}

function autosave_delay_f(smeng){
	if(smeng.value>=1){
	autosave_delay  = parseInt(smeng.value);
	}else{
		smeng.value = 1;
	}
}

function clock(){
	setTimeout(function(){
		// checks if harvestable
		check_harvestable();
		//autosave
		if(autosave_checkbox.checked == true){
			if(clock_value>= autosave_last+autosave_delay){
				autosave();
				
			}
		}
		//zählt clock hoch
		clock_value++;
		//zeigtr alle values
		show_values();
		//endless loop
		clock();
	
	},1000);
}

function autosave(){
	save_game();
	autosave_last = clock_value;
}

function check_harvestable(){
	for(var i = 0; i< alle_felder.length; i++){
		
		if( fields[i].growstart + fields[i].fruit.growduration <= clock_value){
			
			if(alle_felder[i].classList.contains("harvestable")==false&&fields[i].fruit.id != "none"){
			alle_felder[i].classList.add("harvestable");
			
			
			}
		}
	}
}
	 

function field_select(field){
	
	for(var i = 0; i < alle_felder.length; i++){
		alle_felder[i].classList.remove("selected");
		
	}
	field.classList.add("selected");
	selected_field = field.id;
	
	for(var i = 0; i< alle_felder.length; i++){
		if(alle_felder[i].classList.contains("selected") == true){
			selected_field_array_index = i;
		}
	}
	

	//zeigtr alle values
	show_values();
	show_details();
}


function shop_select_item(item){
	
	for(var i = 0; i < alle_shop_button.length; i++){
		alle_shop_button[i].classList.remove("selected");
		
	}
	item.classList.add("selected");
	selected_shop_item = item.classList[1];
	shop_table_info();

}

function plant(){
	
	if(document.getElementById(selected_field).classList.contains("locked") == false&&fields[selected_field_array_index].fruit.id == "none"&&gold >=jsonPathToValue(fruit, selected_shop_item +".preis")){
		
		//stores fruit values into select field storage
		fields[selected_field_array_index].fruit.id = jsonPathToValue(fruit, selected_shop_item +".id");
		fields[selected_field_array_index].fruit.preis = jsonPathToValue(fruit, selected_shop_item +".preis");
		fields[selected_field_array_index].fruit.wert = jsonPathToValue(fruit, selected_shop_item +".wert");
		fields[selected_field_array_index].fruit.growduration = jsonPathToValue(fruit, selected_shop_item +".growduration");
		// removes cost from gold
		gold = gold-fields[selected_field_array_index].fruit.preis;
		//stores clock_value
		fields[selected_field_array_index].growstart = clock_value;
		//add class to render
		document.getElementById(selected_field).classList.add(fields[selected_field_array_index].fruit.id);
		
	}else if(document.getElementById(selected_field).classList.contains("locked") == true){
		alert("You cant plant on locked fields.");
	}else if(fields[selected_field_array_index].fruit.id != "none"){
		alert("You cant plant on already used fields.");
	}else if(gold <=jsonPathToValue(fruit, selected_shop_item +".preis")){
		alert("You don't have enough gold.");
	}
	show_details();
}

function kaufen(){

	if(gold >= fields[selected_field_array_index].preis && document.getElementById(selected_field).classList.contains("locked") ==true  ){
		gold = gold-fields[selected_field_array_index].preis;
		document.getElementById(selected_field).classList.remove("locked");
		document.getElementById(selected_field).classList.add("gekauft");
	}else if(document.getElementById(selected_field).classList.contains("locked") ==false ){
		alert("Field is already your's.");
	}else if(gold <= fields[selected_field_array_index].preis ){
		alert("U dont have enough gold..");
	}
	
}

function ernten(){
	if(document.getElementById(selected_field).classList.contains("harvestable") == true){
		//removes harvestable grafik
		document.getElementById(selected_field).className = '';
		document.getElementById(selected_field).classList.add("selected");
		document.getElementById(selected_field).classList.add("field");
		//adds gold
		gold = gold + parseInt(fields[selected_field_array_index].fruit.wert);
		//resets fields fruit values
		fields[selected_field_array_index].fruit.id = "none";
		fields[selected_field_array_index].fruit.preis = 0;
		fields[selected_field_array_index].fruit.wert = 0;
		fields[selected_field_array_index].fruit.growduration = 0;
		show_details();
	}else if (document.getElementById(selected_field).classList.contains("harvestable") == false){
		alert("Field already isn't harvestable.");
	}
}

function show_values(){
	//zeigt alle werte 
	document.getElementById("clock_value").value = "Clock: " + clock_value;
	document.getElementById("gold").value = "Gold: " + gold;
	document.getElementById("autosave_last").value = "Autosave: " + autosave_last;
	
}

function show_details(){
	if(document.getElementById("detail_checkbox").checked == true){
		document.getElementById("field_info").innerHTML ="Field Info \n"+"Field id: "+fields[selected_field_array_index].id + "\nField price:" + fields[selected_field_array_index].preis +"\nField fruit: " +fields[selected_field_array_index].fruit.id+"\nFruit value: " +fields[selected_field_array_index].fruit.wert +"\nGrowstart: " + fields[selected_field_array_index].growstart +"\nHarvestable: " + (fields[selected_field_array_index].growstart+fields[selected_field_array_index].fruit.growduration) ;
	}
	
}


function change_opasity(iziel){
	ziel = document.getElementById(iziel);
	if(ziel.classList.contains("hide") == true){
		ziel.classList.remove("hide");
	}else{
		ziel.classList.add("hide");
	}
	
}


function change_function(ziel){
	document.getElementById(ziel).setAttribute("onclick","debug(\"swag\")");
}

function debug(output){
	console.log(output);
}

function shop_table_info(){
	document.getElementById("shop_table_info").innerHTML = "Id:" + jsonPathToValue(fruit, selected_shop_item +".id") +"\n" +"Preis:"+jsonPathToValue(fruit, selected_shop_item +".preis")+"\n" +"Wert:"+jsonPathToValue(fruit, selected_shop_item +".wert")+"\n" +"Growduration:"+jsonPathToValue(fruit, selected_shop_item +".growduration");
}



function save_game(){
	localStorage.setItem('gold',gold);
	localStorage.setItem('clock_value',clock_value);
	localStorage.setItem('fields',JSON.stringify(fields));
	

}

function save_game_alert(){
	alert("Saved game.");
}


function remove_game(){
	localStorage.clear();
	alert("Removed save game.");
}

function load_game(){
	
	if(localStorage.getItem('clock_value')){
		clock_value = localStorage.getItem('clock_value');
		gold = parseInt(localStorage.getItem('gold'));
		speicher_fields = JSON.parse(localStorage.getItem('fields'));
		
		for(var i = 0; i <= 9;i++){
			fields[i].growstart = speicher_fields[i].growstart;
			fields[i].fruit.id = speicher_fields[i].fruit.id;
			fields[i].fruit.preis = speicher_fields[i].fruit.preis;
			fields[i].fruit.wert = JSON.parse(speicher_fields[i].fruit.wert);
			fields[i].fruit.growduration = speicher_fields[i].fruit.growduration;
			
			if(speicher_fields[i].fruit.id != "none"){
				alle_felder[i].classList.remove("locked");
				alle_felder[i].classList.add(speicher_fields[i].fruit.id);
			}
			
		}
		show_values();
		show_details();
	}else{
		alert("No save game available.");
	}
}

function jsonPathToValue(jsonData, path) {
	//function created by George Siggouroglou https://stackoverflow.com/questions/8790607/javascript-json-get-path-to-given-subnode
    if (!(jsonData instanceof Object) || typeof (path) === "undefined") {
        throw "Not valid argument:jsonData:" + jsonData + ", path:" + path;
    }
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, ''); // strip a leading dot
    var pathArray = path.split('.');
    for (var i = 0, n = pathArray.length; i < n; ++i) {
        var key = pathArray[i];
        if (key in jsonData) {
            if (jsonData[key] !== null) {
                jsonData = jsonData[key];
            } else {
                return null;
            }
        } else {
            return key;
        }
    }
    return jsonData;
}  
