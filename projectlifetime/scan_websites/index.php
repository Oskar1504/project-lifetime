<!DOCTYPE html>
<html>
<head>
    <title>Scan</title>
</head>
<body>
    <center>
    	<div id = "erkennungschluessel" class = "unsichtbar">oskarderkrassedatenangler</div><br>
        <h1>Scan Websites</h1><br>
        <div id = "data"></div><br>
        <div id = "trigger"></div><br>
        <div id = "msqli_info"></div><br>
        <button onclick="insert_data();">Insert</button><br><br>
        <button onclick="location.reload();">Refresh</button><br><br><br>
        <input type="text" id="trigger2" value="test">
        <button onclick="trigger();">Insert trigger</button>
    </center>
</body>
<script>
	console.log("load");
show_server_trigger();
	function show_server_trigger(){
		send_post('trigger','show_trigger');

	}

	function insert_data(){
		let data = document.getElementsByClassName("tweet");
		for(var i = 0; i < data.length; i++){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.log(this.responseText);
				}
			};
			xhttp.open("GET", "insert_data.php?data="+data[i].innerText,true);
			xhttp.send();
		}
		
	}

	function trigger(){
		let trigger2 = document.getElementById("trigger2").value;
		send_post('trigger','insert_trigger',[{id:'trigger',value:trigger2}]);
	}

	function send_post(outputtagid, phpfile, params, refresh){
		let file_string = phpfile+".php";

		//params is an array of objekts
		if(params){
			file_string += "?";
			for(var i  = 0; i < params.length; i++){
				file_string += params[i].id +"="+params[i].value;
				if(params[i+1]){
					file_string += "&";
				}
			}
		}

		console.log("runned: "+file_string);

		let xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				  document.getElementById(outputtagid).innerHTML = this.responseText;
				  	
				}
			};
		xhttp.open("GET", file_string ,true);
		xhttp.send();
}



</script>
</html>