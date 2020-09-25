<!DOCTYPE html>
<html>
<head>	
	<link rel="shortcut icon" type="image/png" href="favicon.png">
	<link rel = "stylesheet" href = "style.css" type = "text/css">
	<title id = "title">Chatroom</title>
</head>
<body onload = "create_username();">
	<br><br><br>
	
		<center>
		<div class="chat">
			<div id = "output">Output<br></div>
			<div id = "info"><br></div>

			<label for = "username">Username</label><br>
			<input id = "username" maxlength="10" value="Bot" readonly style='width:5em'><br>
			<label for = "msg">Message</label><br>
			<input onChange = "html_detection(this);" id = "msg" maxlength="64"><br><br>
			<button onClick = "insert_data();" id = "post"> Post</button><br><br>
			<!--<p>Ai trigger: Hey | hallo | hi | moin | ....</p><br>
			<label for="ai_checkbox">Ai response</label>
			<input type="checkbox" id="ai_checkbox" checked style='width:5em'><br>
			-->

			
		</div>
	
			<center>
				
			<div id = "user_list"><br></div>
			</center>
		

</body>
<script>
	function create_username() {
		var username = prompt("Please enter your username", "Bot");
		if (username != null) {
			document.getElementById("username").value =username;
		}
	}
	function show_data(){
		var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				  document.getElementById("output").innerHTML = this.responseText;
				  mentioned();
				}
			};
		xhttp.open("GET", "info.php",true);
		xhttp.send();

		var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				  document.getElementById("user_list").innerHTML = this.responseText;
				  mentioned();
				}
			};
		xhttp.open("GET", "chat_user_info.php",true);
		xhttp.send();

	}
	function insert_data(){
		let user = document.getElementById("username").value;
		let msg = document.getElementById("msg").value;
		let time = getTime();

		var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("info").innerHTML = this.responseText;
					delete_old_posts();
					show_data();
					input.value = "";
				}
			};
		xhttp.open("GET", "insert_data.php?user="+user+"&msg= "+msg+" &time="+time,true);
		xhttp.send();
	}

	function delete_old_posts(){
		var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("info").innerHTML = this.responseText;
					show_data();
				}
			};
		xhttp.open("GET", "delete_old_posts.php",true);
		xhttp.send();
	}



	function update_post(msg,old_msg){
		var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("info").innerHTML = this.responseText;
					show_data();
				}
			};
		xhttp.open("GET", "update.php?user=command&msg="+msg+"&old_msg="+old_msg,true);
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

	function get_user(element){
		document.getElementById("msg").value = "@"+element.innerHTML+" ";
		document.getElementById("msg").focus();
	}

	function mentioned(){
		for(var j = 0; j < document.getElementsByClassName("msg").length ; j++){
			 if(test_mentioned(document.getElementsByClassName("msg")[j].innerHTML)){
			 	document.getElementsByClassName("msg")[j].style = "background-color:#8ccbcb;font-weight: bold;";
			 }
		
		}
	}

	function ai_trigger(){
		let last_user = document.getElementsByClassName("user")[document.getElementsByClassName("user").length-1].innerHTML;
		if(word_scan(["Hey","hey","jo","hallo","Hallo","moin","Moin","hi","Hi","hhi","Hhi"]) && last_user != "AI"){
			js_response("AI","Hey");
		}else if(word_scan(["Ehre","ehre"]) && last_user != "AI"){
			js_response("AI","EEHHHHHHRE");
		}
	}

	function js_response(user,response) {
		let last_user = document.getElementsByClassName("user")[document.getElementsByClassName("user").length-1].innerHTML;
		let msg = "@"+last_user + " " +response;
		let time = getTime();

		var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("info").innerHTML = this.responseText;
					delete_old_posts();
					show_data();
					input.value = "";
				}
			};
			
			if(last_user != "AI"){
			xhttp.open("GET", "insert_data.php?user="+user+"&msg= "+msg+" &time="+time,true);
			xhttp.send();
			}
	}

	function html_detection(element){
		for(var i =0; i < element.value.length;i++) {
			if(element.value[i] == "<" ||element.value[i] == ">"){
				element.value = "no html code allowed";
			}
		}
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

	function test_mentioned(string){
		let output = false;
		let new_string = "";
		for(var i =0; i< string.length;i++) {
			if(string[i] == "@"){
				
				for(var j = 1; string[i+j] != " "; j++){
					new_string += string[i+j];
				}
			}
		}
		if(new_string == document.getElementById("username").value){
			output = true;
		}
		return output;
	}

	function check_online(offline){
		let user = document.getElementById("username").value;
		let status = "abwesend/Tab im Hintergrund";
		if(document.hasFocus()){status="online/im Tab"}
		if(offline){status="offline"}
		var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("info").innerHTML = this.responseText;
				}
			};
		xhttp.open("GET", "insert_chat_user.php?user="+user+"&status= "+status,true);
		xhttp.send();
	}

	var input = document.getElementById("msg");

	// Execute a function when the user releases a key on the keyboard
	input.addEventListener("keyup", function(event) {
	  // Number 13 is the "Enter" key on the keyboard
	  if (event.keyCode === 13) {
	    // Cancel the default action, if needed
	    event.preventDefault();
	    // Trigger the button element with a click
	    document.getElementById("post").click();
	  }
	});

	window.onbeforeunload = function () {
    return check_online("offline");
	};

	function clock(){
		setTimeout(function(){
			show_data();
			clock();
			if(!document.hasFocus() && document.getElementsByClassName("user")[document.getElementsByClassName("user").length-1].innerHTML != document.getElementById("username").value){
																				//http://localhost/ajax/favicon3.png
				if(document.querySelector("link[rel='shortcut icon']").href == "http://projectlifetime.de/ajax/favicon3.png"){
					document.querySelector("link[rel='shortcut icon']").href = "favicon2.png";
					document.getElementById("title").innerHTML = "New Message !1!";
				}else{
					document.querySelector("link[rel='shortcut icon']").href = "favicon3.png";
					document.getElementById("title").innerHTML = "New Message 1!1";
				}
			}else{
				document.querySelector("link[rel='shortcut icon']").href = "favicon.png";
					document.getElementById("title").innerHTML = "Chatroom";
			}

			check_online();
		},1000);
	}
	function ai_clock(){
		setTimeout(function(){
			show_data();
			ai_clock();
			if(document.getElementById("ai_checkbox").checked){


			ai_trigger();
			}
		},5000);
	}
	clock();
	//ai_clock();
	//zeigt data beim star
	show_data();
</script>
</html>