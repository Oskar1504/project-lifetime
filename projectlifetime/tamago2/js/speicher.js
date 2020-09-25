function debug_eggs_stufe(){
	for(var i = 0; i < eggs.length; i ++){
		console.log(eggs[i].stufe);
	}
}

function debug_haus(){
	own_monsters.push(monsters[0]);
	own_monsters.push(monsters[1]);
}

//spielfeld 
function create_spielfeld(x){
	
	for (var i = 0; i < x; i++){

			spielfeld[i]= create_field(i);
		}
	
	render_spielfeld();
}


function create_field(array_index){
	var name = "none";
	switch (array_index){
		case 0:
			name = "Scheune";
			info = "In der Scheune werden alle Items und Waren die du besitzt angezeigt.";
			content = [];
			break;
		case 1:
			name = "Stall";
			info = "Im Stall werden all deine gesammelten Monster angezeigt,welche man in der Abenteuerwelt finden kann.";
			content = [];
			break;
		case 2:
			name = "Feld";
			info = "Auf dem Feld kannst du Früchte anbauen und ernten.";
			content = [];
			break;
		case 3:
			name = "Abenteuer";
			info = "In verschiedenen Abenteuerwelten kannst du gegen Monster kämpfen und wertvolle Schätze erbeuten.";
			content = abenteuer_map;
			break;
		case 4:
			name = "Stadt";
			info = "In der Stadt kannst du Waren verkaufen, aus Rohstoffen Waren erstellen, auf Expedition gehen und dein Rang auf dem Globalen Markt erfahren.";
			content = stadt_map;
			break;
		case 5:
			name = "Mine";
			info = "In der Mine kannst du verschiedenste Ressourcen sammeln, welche du in der Stadt zu wertvollen Waren verarbeiten kannst.";
			content = [];
			break;
	}
	return {
		"id":"id_"+array_index,
		"name":name,
		"info":info,
		"content":content
	}
}

//abenteuer map

function create_abenteuer_map(x){
	for (var i = 0; i < x; i++){
		abenteuer_map[i] = [];
			abenteuer_map[i] = create_abenteuer_map_field(i);
	}
}


function create_abenteuer_map_field(array_index){
	var egg_min_index = 0, egg_max_index = 1, stages = 5;
	switch (array_index){
		case 0:
			name = "Himmelspalast";
			info = "Im Himmelspalast kämpft man gegen gefallene Engel welche versuchen den Palast für sich zu sichern.";
			stages = 30;
			egg_min_index = 0;
			egg_max_index = 3;
			break;
		case 1:
			name = "Nebelwald";
			info = "Hier tümmeln sich Banditen,Gesindel und allerlei kribblig krabblges Ungetier.";
			stages = 5;
			egg_min_index = 0;
			egg_max_index = 1;
			break;
		case 2:
			name = "Feuertal";
			info = "In diesen auf einen Lavasee schwimmenden Bereich findet man Monster welche sich bei enormer Hitze am wohlsten fühlen.";
			stages = 25;
			egg_min_index = 1;
			egg_max_index = 2;
			break;
		case 3:
			name = "Stromschnellen";
			info = "Ohne ein gutes Schwimmtraining geht man hier wortwörtlich den Bach runter.";
			stages = 10;
			egg_min_index = 1;
			egg_max_index = 2;
			break;
		case 4:
			name = "Höhlen";
			info = "Ohen eine Fackel wird dir hier kein Licht aufgehen und du wirst gnadenlos zerfetzt.";
			stages = 20;
			egg_min_index = 0;
			egg_max_index = 3;
			break;
		case 5:
			name = "Hochebenen";
			info = "Hier kannst du deinen Drachen steigen lassen doch sei nicht verwundert wenn es aufeinmal zwei Drachen am Himmel sind.";
			stages = 15;
			egg_min_index = 2;
			egg_max_index = 3;
			break;
	}
	return {
		"name":name,
		"type":"abenteuer",
		"info":info,
		"stages":stages,
		"egg_min_index":egg_min_index,
		"egg_max_index": egg_max_index,
		"boss":"boss"


	}
}


//stadt map

function create_stadt_map(x){
	for (var i = 0; i < x; i++){
		stadt_map[i] = [];
			stadt_map[i] = create_stadt_map_field(i);
	}
}


function create_stadt_map_field(array_index){
	switch (array_index){
		case 0:
			name = "None";
			info = "None";
			break;
		case 1:
			name = "Markt";
			info = "Du willst deine Waren für etwas Gold an den meist bietenden loswerden? Dann bist du hier genau richtig.";
			break;
		case 2:
			name = "Hafen";
			info = "Von hier aus kannst du Expedition anführen um neue Inseln zu erkunden.";
			break;
		case 3:
			name = "Rathaus";
			info = "Hier kannst du ein globales Ranking sehen.";
			break;
		case 4:
			name = "Giesserei";
			info = "Schmelze Erze oder Gold ein um es weiter verarbeiten zu können.";
			break;
		case 5:
			name = "Werkstatt";
			info = "Verarbeite Werkstoffe zu Waren.";
			break;
		case 6:
			name = "Saegewerk";
			info = "Verarbeite Holz zu Brettern und anderen Werkstoffen.";
			break;
		case 7:
			name = "Steinmetz";
			info = "Verarbeite Stein zu Baustein und anderen Werkstoffen.";
			break;
	}
	return {
		"name":name,
		"type":"stadt",
		"info":info


	}
}


// alles was mit eggs zutun hat
function create_eggs(){
	for(var i = 0; i < 4;i++){
		eggs.push(create_egg(i));
	}
	console.log(eggs);
}

function create_egg(i){
	switch (i){
		case 0:
			name = "grassland_egg";
			health = 3;
			stufe = 1;
			break;
		case 1:
			name = "waterland_egg";
			health = 12;
			stufe = 2;
			break;
		case 2:
			name = "airland_egg";
			health = 9;
			stufe = 3;
			break;
		case 3:
			name = "fireland_egg";
			health = 6;
			stufe = 4;
			break;
		}
	
	return {
		"type": "egg",
		"name":name,
		"health":health,
		"stufe": stufe,
		"content":set_egg_content(stufe,3)
	}
}


function create_abt_level_fillings(){
	for(var i = 0; i < 3; i++){
		abt_level_fillings.push(create_abt_level_filling(i));
	}
}

function create_abt_level_filling(i){
	switch (i){
		case 0:
			name = "Nahrung";
			amount = getRandomInRange(10,50);
			break;
		case 1:
			name = "Felsen";
			amount = getRandomInRange(10,50);
			break;
		case 2:
			name = "Geld";
			amount = getRandomInRange(10,50);
			break;
	}
	return {
		"type":"filling",
		"health":-1,
		"name": name,
		"amount":amount
	}
}
//erschafft monster speicher array
function create_monsters(){
	for(var i = 0; i < 12;i++){
		monsters.push(create_monster(i));
	}
}
// erstellt Monster objekt. Setzt abhängig vom array index stufe und id
function create_monster(id){
		if(id <= 2){
			stufe = 1;
		}else if (id <= 5){
			stufe = 2;
		}else if (id <= 8){
			stufe = 3;
		}else if (id <= 11){
			stufe = 4;
		}
	return {
		"id":"Monster_"+id,
		"name":"Monster-name",
		"stufe": stufe,
		"health":100,
		"damage":100,
		"wert":100+(100*id),
		"amount": 1
	}
}

function create_item_lager(){
	for(var i = 0; i < 10; i++){
		item_lager.push(create_item(i));
	}
}

function create_item(i){
	switch (i){
		case 0:
			name = "Holz";
			amount = 0;
			wert = 100;
			break;
		case 1:
			name = "Brett";
			amount = 0;
			wert = 100;
			break;
		case 2:
			name = "Lehm";
			amount = 0;
			wert = 100;
			break;
		case 3:
			name = "Ziegel";
			amount = 0;
			wert = 100;
			break;
		case 4:
			name = "Felsen";
			amount = 0;
			wert = 100;
			break;
		case 5:
			name = "Stein";
			amount = 0;
			wert = 100;
			break;
		case 6:
			name = "Kupfererz";
			amount = 0;
			wert = 100;
			break;
		case 7:
			name = "Eisenerz";
			amount = 0;
			wert = 100;
			break;
		case 8:
			name = "Nahrung";
			amount = 0;
			wert = 100;
			break;
		case 9:
			name = "Geld";
			amount = 0;
			wert = 100;
			break;
	};
	return {
		"name":name,
		"amount":amount,
		"wert": wert
	}
}

function create_feld_frucht(){
	for(var i = 0; i < 8;i++){
		feld_frucht.push(create_frucht(i));
	}
	feld_frucht[0].amount = 0;
	feld_frucht[0].wert = 0;
	feld_frucht[0].grow_duration = 99999;

}


function create_frucht(i){
	switch (i){
		case 0:
			name = "none";
			break;
		case 1:
			name = "weizen";
			break;
		case 2:
			name = "bohne";
			break;
		case 3:
			name = "Gurke";
			break;
		case 4:
			name = "Kuerbis";
			break;
		case 5:
			name = "Paprika";
			break;
		case 6:
			name = "Zwiebel";
			break;
		case 7:
			name = "Moehre";
			break;
	};
	return {
		"name":name,
		"type":"farm",
		"amount":1,
		"wert":25*i,
		"grow_duration":10*i,
		"grow_start":0,
		"harvestable":false
	}
}

//data für farm spiel
function create_spielfeld_feld_elemente_data(type,i,j){
	let randomInt = getRandomInt(5), output = {};
	if(type == "farm"){
		//erstllt kurzeituig neuen array damit das objekt eigenstädnig ist
		let clone_f_frucht = JSON.parse(JSON.stringify(feld_frucht[0]));
		output = {
			"name":"feld",
			"zeile":j,
			"platz":i,
			"content": clone_f_frucht
		};
	}else if (type == "stadt"){
		let clone_haus = JSON.parse(JSON.stringify(stadt_map[4]));
		output = {
			"name":"stadt",
			"zeile":j,
			"platz":i,
			"content": clone_haus
		};
	}else if(type == "dorf"){
		switch (randomInt){
			case 0:
				biom_name = "wald";
				biom_color = "green";
				break;
			case 1:
				biom_name = "ocean";
				biom_color = "mediumblue";
				break;
			case 2:
				biom_name = "lehm";
				biom_color = "maroon";
				break;
			case 3:
				biom_name = "wiese";
				biom_color = "goldenrod";
				break;
			case 4:
				biom_name = "berg";
				biom_color = "dimgray";
				break;

				};
		output = {
			"haus":{
				"name":"none",
				"info":"im haus kann man sacen machen",
				"required_biom":"wald",
				"level": 1,
				"item":{
					"produce_item":"planks",
					"produce_amount":2,
					"consume_item":"wood",
					"consume_amount":1
				}
			},
			"biom":{
				"name":biom_name,
				"color":biom_color
			}
		};
	}
	return output
}

