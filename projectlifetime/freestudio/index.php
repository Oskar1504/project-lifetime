<!DOCTYPE html>
<html>
<head>	
	<link rel="shortcut icon" type="image/png" href="favicon.png">
	<link rel = "stylesheet" href = "style.css" type = "text/css">
	<title>Free Studio</title>
</head>
<body onkeydown ="test(event)" onkeyup="test2(event)">
	<center>
		<div class = "ehre">
			<input type="number" name="bpm" onchange="set_bpm(this)" value="180">
			<span id = "show_bpm">BPM: 180</span><br>
			<button onclick="spielen2(true);">Play</button>
			<button onclick="spielen2(false);">Stopp</button>
		</div>
		<div>
			<table id = "pattern"></table>
		</div>

		<div>
			<span class = "info">Auswaehlen und oben per Klick einfuegen. Mittlerer Mausbutton loescht Sound.</span>
			<table id = "php_info"></table>
		</div>
	</center>
</body>
<script >
	var pressed_key = "";
	var bpm = 180;
	var tempo = 333;
	var spielen = false;
	var spalten = 16;

	function spielen2(status){
		if(spielen == true && status == true){spielen == false}
		spielen = status;
		scan_pattern();

		//removes alll play classes when stopp
		if(status == false){
			let elemt =  document.getElementsByClassName("play");

			for(var i = 0; i < elemt.length;i++){
				elemt[i].classList.remove("play");
			}
			for(var i = 0; i < elemt.length;i++){
				elemt[i].classList.remove("play");
			}
			for(var i = 0; i < elemt.length;i++){
				elemt[i].classList.remove("play");
			}
			for(var i = 0; i < elemt.length;i++){
				elemt[i].classList.remove("play");
			}
		}
	}

	function set_bpm(elemt){
		bpm = elemt.value;
		document.getElementById("show_bpm").innerText = "BPM: "+ bpm;
		tempo = 1000/(bpm/60);
			console.log(tempo);
	}

	function test(event){
		if(pressed_key != event.code){
			pressed_key = event.code;
			console.log(pressed_key);
		}
	}

	function test2(event){
		pressed_key = "";
		console.log(pressed_key);
	}

	function play_list(elemt){
		if(elemt.classList.contains("sound")){
			//setzt selected
			let sounds = document.getElementsByClassName("sound");
			for(var i = 0 ; i < sounds.length; i++){
				sounds[i].classList.remove("selected");
			}
			elemt.classList.add("selected");

		}

		//spielt sound
		let real_file = "sounds/" + elemt.classList[1]+ "/" + elemt.innerText;
		let audio = new Audio(real_file);
		audio.play();
	}

	function load_sounds(){

		let xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				  document.getElementById("php_info").innerHTML = this.responseText;
				  
				}
			};
		xhttp.open("GET", "scan.php" ,true);
		xhttp.send();
	}

	function pattern_f(event){
		spielen2(false);
		let sound = document.getElementsByClassName("selected");
		if(sound.length != 0 && event.button == 0 ){
			event.target.innerText = sound[0].innerText;
			event.target.classList.add(sound[0].classList[1]);
		}else if(sound.length != 0 && event.button == 1 ){
			event.target.innerText = "";
			event.target.classList.remove(event.target.classList[1]);
		}
		pressed_key = "";
	}


	function setup_pattern(){
		let target = document.getElementById("pattern");
		let inhalt = "";
		for(var j = 0; j < 8; j++){
			target.innerHTML += "<tr class = 'spalte'></tr>";
		}
		let zeilen = document.getElementsByClassName("spalte");
		for (var i = 0; i < zeilen.length;i++){
			for(var y = 0; y < spalten;y++){
				zeilen[i].innerHTML += "<td  class = 'zeile_"+y+"' onclick = 'play_list(this)' onmousedown='pattern_f(event)'></td>";
			}
		}
	}

	function scan_pattern(){
		let array_1 = [], array_2 = [];
			for(var i = 0 ; i < spalten; i++){
					array_2 = [];
					for(var j = 0; j < document.getElementsByClassName("zeile_"+i).length;j++){
						if( document.getElementsByClassName("zeile_"+i)[j].classList.length >= 2){
						let filename = "sounds/" + document.getElementsByClassName("zeile_"+i)[j].classList[1] + "/"+document.getElementsByClassName("zeile_"+i)[j].innerText;
						array_2.push(filename)
						}
					}
					array_1.push(array_2);
					
	
			}

			play_pattern(array_1,0);
	}

	function play_pattern(array,i){
		if(spielen == true){

			
			//grafische darstellung
			for(var k = 0; k < document.getElementsByClassName("zeile_"+i).length; k++ ){
				
				if(i >= 1){document.getElementsByClassName("zeile_"+(i-1))[k].classList.remove("play");}
				
				document.getElementsByClassName("zeile_"+i)[k].classList.add("play");

				if(i == 0){document.getElementsByClassName("zeile_"+(spalten-1))[k].classList.remove("play");}
			}
			//abspielen
			setTimeout(function(){

				play_array(array[i]);

				if(i < spalten){i+=1;}
				if(i == spalten){i = 0;}
				console.log(i);
				play_pattern(array,i);
				
			},tempo);
		}
	}

	function play_array(array){
		for(var y = 0; y < array.length; y++){
			let real_file = array[y];
			let audio = new Audio(real_file);
			audio.play();

		}
	}

	setup_pattern();
	load_sounds();
</script>

</html>