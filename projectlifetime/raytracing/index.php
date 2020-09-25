<!DOCTYPE html>
<html>
<head>
	<title>Raytracing</title>
</head>
<body>
	<center>
		<canvas id = "canvas" width="512" height="512"></canvas><br>
		<input type="range" id="x_range" min="0" max = "512" onChange="update_canvas();" ><br>
		<input type="range" id="y_range" min="0" max = "512" onChange="update_canvas();" ><br>
	</center>

</body>
<script >
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');

	var hinderniss_lf = [],ray_lf = [];
	function setup_canvas(){
		ctx.rect(0,0,canvas.width,canvas.height);
		ctx.fillStyle =  "black";
		ctx.fill();
		setup_hindernisse(100,100,150,450);
	}

	function setup_hindernisse(x,y,dx,dy){
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(dx,dy);
		ctx.strokeStyle = "red";
		ctx.stroke();
		ctx.closePath();

		hinderniss_lf = get_lfunction(x,y,dx,dy);

	}

	function create_ray(x,y,dx,dy){
		ctx.beginPath();
		ctx.moveTo(x,y);
		ray_lf = [];
		ray_lf = get_lfunction(x,y,dx,dy);
		let sp = get_sp(hinderniss_lf[0],hinderniss_lf[1],ray_lf[0],ray_lf[1]);
		//console.log(sp);
		if(check_pixels(sp)){

			ctx.lineTo(sp[0],sp[1]);
		}else{
			ctx.lineTo(dx,dy);
		}
		if(ray_lf[1]==0){
			ctx.strokeStyle= "blue";
		}else{

		ctx.strokeStyle = "white";
		}
		ctx.stroke();
		ctx.closePath();
		
		//draw_sp();

	}

	function check_pixels(sp){
		for(var i = 0; i < ctx.getImageData(sp[0],sp[1],3,3).data.length; i ++){
			if(ctx.getImageData(sp[0],sp[1],3,3).data[i] != 0 && ctx.getImageData(sp[0],sp[1],3,3).data[i] != 255){
				return true;
			}
		}
		return false;
	}

	function get_lfunction(x1,y1,x2,y2){
		let m = 0,b=0;
		m = (y2-y1)/(x2-x1);

		for(var i = -262145; i < 262145;i++){
			if(Math.floor(i+m*x1) == y1){
				b = i;
			}
		}


		return [m,b];
	}

	function get_sp(m1,b1,m2,b2){
		let x = 0;
		for(var i = -1; i < 512;i+=0.1){
			if(Math.floor(m1*i+b1) == Math.floor(m2*i+b2)){
				x = i;
			}
		}
		y = m1*x+b1;
		return [x,y];
	}

	function draw_sp(){
		let sp = get_sp(hinderniss_lf[0],hinderniss_lf[1],ray_lf[0],ray_lf[1]);
		ctx.beginPath();
		ctx.moveTo(sp[0],sp[1]);
		ctx.lineTo(sp[0]+100,sp[1]);
		ctx.strokeStyle = "blue";
		ctx.stroke();
		ctx.closePath();
	}

	function update_canvas(){
		var x_range = document.getElementById("x_range").value;
		var y_range = document.getElementById("y_range").value;
		
		//console.log("updated");

		let xx = 0;
		let yy = 0;
		setup_canvas();

		for(var y = 0; y < 1000; y+=25){
			create_ray(x_range,y_range,xx,yy+(y*1));
		}

		for(var y = 0; y < 500; y+=25){
			create_ray(x_range,y_range,xx+(y*1),yy);
		}
		


	}

	setup_canvas();
	
</script>
</html>