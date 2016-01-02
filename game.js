var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;	
var ballRadius = 10; 
var rightPressed = false;
var leftPressed = false;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

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

	function drawPaddle() {
	    ctx.beginPath();
	    // x and y for initial starting point, width, height 
	    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	    ctx.fillStyle = "#0095DD";
	    ctx.fill();
	    ctx.closePath();
	}

	
	function draw() {
    	
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBall();
		drawPaddle();  
		x+= dx; 
		y+= dy; 

		//Top and Bottom edges, counting starts at top left corner 
		if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
			dy = -dy
		}

		if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
	    	dx = -dx;
		}

		if(rightPressed && paddleX < canvas.width-paddleWidth) {
    		paddleX += 7;
		}
		else if(leftPressed && paddleX > 0) {
    		paddleX -= 7;
		}
	}
	
	
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

	function keyDownHandler(e) {
	    if(e.keyCode == 39) {
	        rightPressed = true;
	    }
	    else if(e.keyCode == 37) {
	        leftPressed = true;
	    }
	}

	function keyUpHandler(e) {
	    if(e.keyCode == 39) {
	        rightPressed = false;
	    }
	    else if(e.keyCode == 37) {
	        leftPressed = false;
	    }
	}
	

setInterval(draw, 10);


