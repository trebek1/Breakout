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

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0; 
var lives = 3;

var bricks = [];
	for(c=0; c<brickColumnCount; c++) {
    	bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

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

	function drawBricks() {
	    for(c=0; c<brickColumnCount; c++) {
	        for(r=0; r<brickRowCount; r++) {
	        	if(bricks[c][r].status == 1) {
		        	var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
					var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
		            bricks[c][r].x = brickX;
		            bricks[c][r].y = brickY;
		            ctx.beginPath();
		            ctx.rect(brickX, brickY, brickWidth, brickHeight);
		            ctx.fillStyle = "#0095DD";
		            ctx.fill();
		            ctx.closePath();
	        	}
	        }
	    }
	}

	function collisionDetection() {
	    for(c=0; c<brickColumnCount; c++) {
	        for(r=0; r<brickRowCount; r++) {
	            var b = bricks[c][r];
	            if(b.status == 1) {
		            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
	                	dy = -dy;
	                	score++; 
	                	b.status = 0; 
	            	}
	            	if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
            	}
	        }
	    }
	}

	function drawScore() {
	    ctx.font = "16px Arial";
	    ctx.fillStyle = "#0095DD";
	    ctx.fillText("Score: " + score, 8, 20);
	}

	function drawLives() {
    	ctx.font = "16px Arial";
    	ctx.fillStyle = "#0095DD";
    	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
	}
		
	function draw() {
    	
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBall();
		drawPaddle(); 
		drawBricks(); 
		drawLives();
		collisionDetection(); 
		drawScore();  
		x+= dx; 
		y+= dy; 

		//Top and Bottom edges, counting starts at top left corner 
		if(y + dy < ballRadius) {
		    dy = -dy;
		} else if(y + dy > canvas.height-ballRadius) {
		    if(x > paddleX && x < paddleX + paddleWidth) {
		        dy = -dy;
		    }
		    else {
		        lives--;
				if(!lives) {
				    alert("GAME OVER");
				    document.location.reload();
				}else{
				    x = canvas.width/2;
				    y = canvas.height-30;
				    dx = 2;
				    dy = -2;
				    paddleX = (canvas.width-paddleWidth)/2;
				}
		    }
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
		// Call the draw function over and over allowing the browser to control rendering 
		requestAnimationFrame(draw);
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
	

draw(); 


