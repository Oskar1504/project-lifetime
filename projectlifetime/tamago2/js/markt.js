var data_anzeige = [], data_markt = [];

function copy_data_to_array(){
	var data = document.getElementsByClassName("test");
	
	for(var i = 0; i <  data.length; i++){
		data_anzeige = [];
		for(var j = 0; j < data[i].childNodes[0].childNodes[1].cells.length;j++){

			data_anzeige.push(data[i].childNodes[0].childNodes[1].cells[j].textContent);
		}
		data_markt
	}
	console.log(data_markt);
}

function show_anzeige_info(index){
	var org = document.getElementsByClassName("test")[index].childNodes[0];
	var cln = org.cloneNode(true);
	var element = document.getElementById("markt_info");
	element.innerHTML = "";
	element.appendChild(cln);

	//zeigt item info
	document.getElementById("item_id").innerHTML = document.getElementById("markt_info").childNodes[0].childNodes[1].cells[3].textContent;
	if(feld_frucht_lager.length == 0){
		document.getElementById("item_anzahl").innerHTML = "<b><a href='../site.php'>Besuche das Feld</a> kaufe samen und lager sie ein.</b>";
	}
	//schreibt das hin wennn es nciht vorhanden ist
	document.getElementById("item_anzahl").innerHTML = 0;
	document.getElementById("amount").value = 0;
	document.getElementById("id3").value = document.getElementsByClassName("anzeige_id")[document.getElementsByClassName("anzeige_id").length-1].textContent;

	//übershreibt werte wenn vorhanden ist
	for(var i = 0; i < feld_frucht_lager.length;i++){
		if(feld_frucht_lager[i].name ==  document.getElementById("markt_info").childNodes[0].childNodes[1].cells[3].textContent){
			document.getElementById("item_anzahl").innerHTML = feld_frucht_lager[i].amount;
			document.getElementById("amount").value = JSON.parse(document.getElementsByClassName("anzeige_amount")[document.getElementsByClassName("anzeige_amount").length-1].textContent);
			anzahl_test(document.getElementById("amount"));
		}
	}
	//übershreibt werte wenn vorhanden ist
	for(var j = 0; j < item_lager.length;j++){
		if(item_lager[j].name ==  document.getElementById("markt_info").childNodes[0].childNodes[1].cells[3].textContent){
			document.getElementById("item_anzahl").innerHTML = item_lager[j].amount;
			document.getElementById("amount").value = JSON.parse(document.getElementsByClassName("anzeige_amount")[document.getElementsByClassName("anzeige_amount").length-1].textContent);
			anzahl_test(document.getElementById("amount"));
		}
	}
	anzahl_test(document.getElementById("amount"));

}

function anzahl_test(elm){
	var lol = JSON.parse(document.getElementById("item_anzahl").innerHTML);
	if(elm.value >= lol || elm.value <= 0  ){
		elm.value = lol;
	}
	if( elm.value > JSON.parse(document.getElementsByClassName("anzeige_amount")[document.getElementsByClassName("anzeige_amount").length-1].textContent) ){
		elm.value = JSON.parse(document.getElementsByClassName("anzeige_amount")[document.getElementsByClassName("anzeige_amount").length-1].textContent);
	}
}
function verkauf_berechnen(){
	let item_amount = JSON.parse(document.getElementById("item_amount").innerHTML);
	document.getElementById("gesamt").innerHTML = "<b>"+ (document.getElementById("item_amount").innerHTML*document.getElementById("item_preis").innerHTML) + "</b>";
	

	add_gold(document.getElementById("item_amount").innerHTML*document.getElementById("item_preis").innerHTML);

	//checkt früchte durch und removed anzahl
	let info = find_in_array(feld_frucht_lager,document.getElementById("item_id").textContent);
	if(info[0] == true){
		feld_frucht_lager[info[1]].amount -= item_amount;
	}
	//checkt item lager
	let info2 = find_in_array(item_lager,document.getElementById("item_id").textContent);
	if(info2[0] == true){
		item_lager[info2[1]].amount -= item_amount;
	}

	speichern();

}

function get_kosten() {
	document.getElementById("kosten").value = document.getElementById("amount").value*document.getElementById("preis").value;
}


function show_anzeige_info_2(index){
	var org = document.getElementsByClassName("test")[index].childNodes[0];
	var cln = org.cloneNode(true);
	var element = document.getElementById("markt_info");
	element.innerHTML = "";
	element.appendChild(cln);

	//zeigt item info
	document.getElementById("item_id").innerHTML = document.getElementById("markt_info").childNodes[0].childNodes[1].cells[3].textContent;
	if(feld_frucht_lager.length == 0){
		document.getElementById("item_anzahl").innerHTML = 0;
	}
	//schreibt das hin wennn es nciht vorhanden ist
	document.getElementById("item_anzahl").innerHTML = 0;
	document.getElementById("amount").value = 0;


	//übershreibt werte wenn vorhanden ist
	for(var i = 0; i < feld_frucht_lager.length;i++){
		if(feld_frucht_lager[i].name ==  document.getElementById("markt_info").childNodes[0].childNodes[1].cells[3].textContent){
			document.getElementById("item_anzahl").innerHTML = feld_frucht_lager[i].amount;
			
		}
	}
	//übershreibt werte wenn vorhanden ist
	for(var j = 0; j < item_lager.length;j++){
		if(item_lager[j].name ==  document.getElementById("markt_info").childNodes[0].childNodes[1].cells[3].textContent){
			document.getElementById("item_anzahl").innerHTML = item_lager[j].amount;
			
		}
	}
	document.getElementById("amount").value = JSON.parse(document.getElementsByClassName("erhalten")[document.getElementsByClassName("erhalten").length-1].textContent);
	document.getElementById("id3").value = JSON.parse(document.getElementsByClassName("anzeige_id")[document.getElementsByClassName("anzeige_id").length-1].textContent);
			

}

function sammeln_berechnen() {
	let item_amount = JSON.parse(document.getElementById("item_amount").innerHTML);

	//checkt früchte durch und removed anzahl
	let info = find_in_array(feld_frucht_lager,document.getElementById("item_id").textContent);
	if(info[0] == true){
		feld_frucht_lager[info[1]].amount += item_amount;
	}
	//checkt item lager
	let info2 = find_in_array(item_lager,document.getElementById("item_id").textContent);
	if(info2[0] == true){
		item_lager[info2[1]].amount += item_amount;
	}

	speichern();
}