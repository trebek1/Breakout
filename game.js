var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;	
var ballRadius = 10; 

	// 20 from the left, 40 from the top, 50 wide, 50 high 
	// ctx.rect(20, 40, 50, 50);
	// ctx.fillStyle = "#FF0000";
	// ctx.fill();
	// ctx.closePath();

	// ctx.beginPath();
	// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
	// ctx.fillStyle = "green";
	// // fills entire object 
	// ctx.fill();
	// ctx.closePath();

	// ctx.beginPath();
	// ctx.rect(160, 10, 100, 40);
	// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
	// // only fills outer border 
	// ctx.stroke();
	// ctx.closePath();
	
	function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
	}

	
	function draw() {
    	
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBall(); 
		x+= dx; 
		y+= dy; 

		//Top and Bottom edges, counting starts at top left corner 
		if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
			dy = -dy
		}

		if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
	    	dx = -dx;
		}
	}
	
	
	

setInterval(draw, 10);