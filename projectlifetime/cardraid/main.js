var kartenspeicher = create_cards(25);
var all_cards = shuffle(create_cards(25));
var hand_cards = [];
var all_monsters = shuffle(create_monsters(10));

function create_monsters(amount) {
	let output = [];
	for (var i = 0; i < amount; i++) {

		output.push(create_monster(i));
	}
	return output;
}
function create_monster(id){

	return {
		info:{
			id:"monster_"+id,
			name:"Monster"+id,
			beschreibung:"Böses Monster"
		},
		values:{
			leben:500*id,
			atk:100*id,
			def:10*id
		}
	}
}


function create_cards(amount) {
	let output = [];
	for (var i = 0; i < amount; i++) {

		output.push(create_card(i));
	}
	return output;
}
function create_card(id){
	let def = 0;
	if(id >= 10 && id <= 15){
		def = 100*id;
	}

	return {
		info:{
			id:"card_"+id,
			name:"Karte"+id,
			beschreibung:"Ehrenkarte"
		},
		values:{
			atk:100*id,
			def:def
		}
	}
}

function render_monster(array){
	for(var i = 0; i < array.length;i++ ){
		if(array[i].values.leben > 0){
			document.getElementById("monster_name").innerText = array[i].info.name;
			document.getElementById("monster_leben").innerText = array[i].values.leben;
			document.getElementById("monster_atk").innerText = array[i].values.atk;
			document.getElementById("monster_def").innerText = array[i].values.def;
			return
		}

	}
}

function render_stack(array){
	let target = document.getElementById("stapel");
	if(array.length >= 1){
		target.style.backgroundColor = "green";
	}else{
		target.style.backgroundColor = "white";
	}

	document.getElementById("stapel_amount").innerText = array.length;
}

function render_hand(array){
	let target = document.getElementById("handkarten");
	let string = "";
	for(var i = 0; i < array.length; i++){
		string += "<td id ='"+array[i][0].info.id+"' class = 'handkarte' draggable= 'true' ondragstart='drag(event)'>";
		string += "<span>Name: "+array[i][0].info.name+"</span><br>";
		string += "<span>Atk: "+array[i][0].values.atk+"</span><br>";
		string += "<span>Def:: "+array[i][0].values.def+"</span><br>";
		string += "</td>";
	}
	target.innerHTML = string;
}

function draw_card(array,start){
	
	//prevent karten cloning
	spielfeld_clear();


	if(hand_cards.length <= 5 || start == true){
		//added letzte karte von array der hadn
		hand_cards.push(array.slice(array.length-1));
		//lscht letzte karte aus stapen
		array.pop();
		//rendert alles neu
		render_stack(array);
		render_hand(hand_cards);
	}

	if(hand_cards.length >= 5){
		document.getElementById("draw_button").innerHTML = "Man kann nicht mehr als 5 Karten haben.";
	}else{
		document.getElementById("draw_button").innerHTML = "";
	}
	
}



function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  //let cln = document.getElementById(data).cloneNode(true);
  ev.target.appendChild(document.getElementById(data));

  document.getElementById("spielfeld_clear").innerHTML = "<button onclick = 'spielfeld_clear()'>Zurueck</button>";
  show_spielzug();
}

function spielfeld_clear(){
	let string = "";
	for(var i =0; i < 5 ;i++){
		string += '<td class = "spielfeld" ondrop="drop(event)" ondragover="allowDrop(event)"></td>';
	}
	render_hand(hand_cards);
	document.getElementById("spielfeld").innerHTML = string;
	document.getElementById("spielfeld_clear").innerHTML = "";
}

function show_spielzug(){
	let sf_cards = document.getElementsByClassName("spielfeld"),gesamt_atk = 0,gesamt_def = 0;
	for (var i = 0; i < sf_cards.length; i++) {
		if(sf_cards[i].childNodes.length >= 1){
			if(sf_cards[i].childNodes[0].classList.contains("handkarte") == true){
				gesamt_atk += get_card_data(sf_cards[i].childNodes[0].id).values.atk;
				gesamt_def += get_card_data(sf_cards[i].childNodes[0].id).values.def;
				
			}
		}
	}
	document.getElementById("spielzug").innerHTML = "Gesamtschaden: "+gesamt_atk+"<br>Verteidigung: "+gesamt_def;
}

function zug_spielen(){
	//berehcnet alles
	let sf_cards = document.getElementsByClassName("spielfeld"),gesamt_atk = 0,gesamt_def = 0;
	for (var i = 0; i < sf_cards.length; i++) {
		if(sf_cards[i].childNodes.length >= 1){
			if(sf_cards[i].childNodes[0].classList.contains("handkarte") == true){
				gesamt_atk += get_card_data(sf_cards[i].childNodes[0].id).values.atk;
				gesamt_def += get_card_data(sf_cards[i].childNodes[0].id).values.def;
				
			}
		}
	}
	document.getElementById("player_def").innerText = JSON.parse(document.getElementById("player_def").innerText) + gesamt_def;
	
	let schaden = 0;
	//schaden an monster
	for (var j = 0; j < all_monsters.length; j++) {
		if(all_monsters[j].info.name == document.getElementById("monster_name").innerText){
			schaden = gesamt_atk - all_monsters[j].values.def;
			if(schaden>0){all_monsters[j].values.leben -= schaden;}
			//speichert atk für nachste berechnung
			monster_atk = all_monsters[j].values.atk;
		}
	}

	//schaden an player
	let player_def = JSON.parse(document.getElementById("player_def").innerText)
	schaden = monster_atk-player_def;
	if(schaden > 0){

		document.getElementById("player_leben").innerText = JSON.parse(document.getElementById("player_leben").innerText) - schaden;
	}

 	render_monster(all_monsters);

	//löscht karten
	for (var j = 0; j < sf_cards.length; j++) {
		if(sf_cards[j].childNodes.length >= 1){
			for(var k = 0; k < hand_cards.length;k++){
				if(get_card_data(sf_cards[j].childNodes[0].id).info.id == hand_cards[k][0].info.id){
					console.log("remove"+(k+1))
					hand_cards.splice(k,1);
				}
			}
		}
	}
	//ermöglicht ziehen
	document.getElementById("draw_button").innerHTML = '<button onclick="draw_card(all_cards,false);">Draw Card</button>';
	render_hand(hand_cards);
	spielfeld_clear();
}

function get_card_data(id){
	for (var y = 0; y < kartenspeicher.length; y++) {
		if(kartenspeicher[y].info.id == id){
			return kartenspeicher[y];
		}	
	}
}


function shuffle(array){
	for (var j = 0; j < array.length; j++) {
		//new random ncedex
		let index = Math.floor(Math.random() * j);

		//tauscht die um
		let temp = array[j];
		array[j] = array[index];
		array[index] = temp;
	}
	return array;	
}	