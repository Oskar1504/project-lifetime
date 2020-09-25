

function render_stadt(){
	wo_bin_ich = "stadt";
	document.getElementById("main_content").innerHTML = "<td><canvas width='450' height='420' id = 'canvas2'></td>";

	var canvas=document.getElementById("canvas2");
	var ctx = canvas.getContext('2d');
	
	//zeichnet sechsecke aus speicher array
	for(var i=0;i<spielfeld_stadt[0].length;i++){
		for(var j=0;j<spielfeld_stadt[0][i].length;j++){

			ctx.beginPath();
			ctx.moveTo(spielfeld_stadt[0][i][j][0], spielfeld_stadt[0][i][j][1]);
			for( punkt=2 ; punkt < spielfeld_stadt[0][i][j].length-1 ; punkt+=2 ){
				ctx.lineTo( spielfeld_stadt[0][i][j][punkt] ,  spielfeld_stadt[0][i][j][punkt+1] );
			}
				ctx.lineWidth = 2;
				ctx.strokeStyle = "red";
			
			ctx.closePath();
			ctx.stroke();
			ctx.fill();

			//zeichnet texture
			let texture = new Image();
			texture.src = 'texture/stadt/'+spielfeld_stadt[1][i][j].content.name+'.png';
			ctx.drawImage(texture,spielfeld_stadt[0][i][j][0]-45,spielfeld_stadt[0][i][j][1]-90,85,85);
		}
	}
	//fügt click funktion hinzu
	canvas.addEventListener("mousedown", function(e) 
	{ 
		getMousePosition(canvas, e); 

	}); 
}