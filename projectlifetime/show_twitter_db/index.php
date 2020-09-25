<!DOCTYPE html>
<html>
<head>	
	<link rel="shortcut icon" type="image/png" href="favicon.png">
	<link rel = "stylesheet" href = "style.css" type = "text/css">
	<title id = "title">Twitter Daten</title>
</head>
<body>
	<br><br>
	
		<center>
			<div id = "info" class = "info">
				<p>
					Ich habe mir als Ziel gesetzt Websites auslesen zukönnen und deren Informationen<br>
					in meiner eigenen Datenbank zu speichern. Ich nutze eine selbstgeschriebene <br>
					Browser (Opera) Extension um Tweets von Twitter auf meine Website zu kopieren <br>
					um sie dann in der Datenbank zuspeichern.<br>
					Aktuell muss man noch manuell die zu scannende website auswählen und scrollen und <br>
					den Kopiervorgang einleiten. Ich habe jedoch geplant auch das zu automatiesieren bzw <br>
					als Tool einzubauen sodass jeder Nutzer dieser Website aussuchen kann welche Tweets man <br>
					kopiert.
				</p>
			</div><br>
			<div id = "data" class = "data">
				
			</div><br>
			<div id = "msql_info" class = "msql_info">
				
			</div>

		</center>
		

</body>
<script>

	function show_data(){
		var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				   document.getElementById("data").innerHTML = this.responseText;
				  
				}
			};
		xhttp.open("GET", "info.php",true);
		xhttp.send();

	}

	function delete_old_posts(){
		var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("msql_info").innerHTML = this.responseText;
					show_data();
				}
			};
		xhttp.open("GET", "delete_old_posts.php",true);
		xhttp.send();
	}

	function getTime() {
		let d = new Date();
		let n = d.getHours();
		let m = d.getMinutes();
		let s = d.getSeconds();
		let output = n + ":"+m +":"+s;
		return output;
	}

	
	


	function word_scan(array,var_string){
		let string = document.getElementsByClassName("msg")[document.getElementsByClassName("msg").length-1].innerHTML;
		if(var_string){string = var_string;}
		let output = false, new_string = "", msg_words = [];
		for(var i =0; i< string.length;i++) {
			if(string[i] == " " && string[i+1]){
				new_string = "";
				for(var j = 1; string[i+j] != " "; j++){
					new_string += string[i+j];
				}
				msg_words.push(new_string);
			}
		}
		for(var j = 0; j < msg_words.length-1; j++){
			for(var y = 0; y < array.length; y++){
				if(msg_words[j] == array[y]){
					output = true;
				}
			}
		}
		return output;
	}

	//zeigt data beim star
	show_data();
</script>
</html>