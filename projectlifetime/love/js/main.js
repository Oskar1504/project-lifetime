var element_wert_1 = document.getElementsByClassName("wert_1");
var element_wert_2 = document.getElementsByClassName("wert_2");
var element_wert_3 = document.getElementsByClassName("wert_3");
var element_name = document.getElementsByClassName("name");

function vergleichen(){
	var in_wert_1 = document.getElementById("vergleich_in_wert_1").innerHTML;
	var in_wert_2 = document.getElementById("vergleich_in_wert_2").innerHTML;
	var in_wert_3 = document.getElementById("vergleich_in_wert_3").innerHTML;

	var delta_wert = 300;
	var output = 0;


	for(var i = 0; i <= element_wert_1.length-1; i++){
		console.log("wert_1: "+element_wert_1[i].innerHTML+" wert_2: "+element_wert_2[i].innerHTML+" wert_3: "+element_wert_3[i].innerHTML);
		var delta_pre = (element_wert_1[i].innerHTML-in_wert_1)+(element_wert_2[i].innerHTML-in_wert_2)+(element_wert_3[i].innerHTML-in_wert_3);
		if(delta_pre < 0){
				delta_pre = delta_pre * -1;
		}
		console.log("delta_pre: "+delta_pre);
		if(delta_pre <= delta_wert){
			delta_wert = delta_pre;
			var element_name_index = i;
			console.log("delta_wert: "+delta_wert);
		}
	}
	document.getElementById("vergleich_out_wert_1").innerHTML = delta_wert;
	document.getElementById("vergleich_out_2").innerHTML = element_name[element_name_index].innerHTML;
}

function get_input(){
	var success = false;
	var filter_name = document.getElementById("get_input").value;
	for (var i = 0; i <= element_name.length-1; i++) {

		console.log("name: "+element_name[i].innerHTML + " FIlter name: "+filter_name);
		if(element_name[i].innerHTML == filter_name){
			success = true;
			console.log("changed alues");
			document.getElementById("get_input_wert_1").innerHTML = element_wert_1[i].innerHTML;
			document.getElementById("get_input_wert_2").innerHTML = element_wert_2[i].innerHTML;
			document.getElementById("get_input_wert_3").innerHTML = element_wert_3[i].innerHTML;
		}else if(success == false && i == element_name.length-1){
			alert("User dos not exist in database. Check spelling and try again.");
		}
	}
}