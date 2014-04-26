function Game() {
	console.log("Game loaded");

	var canvas_board 	= 	document.getElementById('game-board');
	var canvas_player 	= 	document.getElementById('game-player');
	var canvas_mirrors 	= 	document.getElementById('game-mirrors');

	var ctx_board 		= 	canvas_board.getContext('2d');
	var ctx_player 		= 	canvas_player.getContext('2d');
	var ctx_mirrors 	= 	canvas_mirrors.getContext('2d');

	var frame_rate 		=   window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.oRequestAnimationFrame ||
							window.msRequestAnimationFrame ||
							function(callback) {
								window.setTimeout(callback, 1000 / 60);
							};

	var board_width 	= canvas_board.width;
	var board_height 	= canvas_board.height;

	var mirrors 		= [];
	var path_cords		= [];

	var difficulty 		= 1; //1,2,3,4

	function init() {


	}

	document.addEventListener('keydown', checkKeyDown, false);
    document.addEventListener('keyup', checkKeyUp, false);

	function Player (x, y, radius) {
		this.score = 0;
		this.player_img = new Image();
		this.player_img.src = "./resources/images/arrow-black-left.png";
		this.x = x || 0;
	    this.y = y || 0;
	    this.radius = radius || 10;

	    this.isThrusting = false;
	    this.thrust = 1;
	    this.turnSpeed = 0.001;
	    this.angle = 0;
	    
	    this.isRightKey = false;
	    this.isLeftKey 	= false;
	}

	Player.prototype.turn = function(dir) {
	    this.angle += this.turnSpeed * dir;
	};

	Player.prototype.update = function () {
	    /* 
	    * Get the direction we are facing
	    */
	    var radians = this.angle/Math.PI*180;
	    
	    if(this.isThrusting){
	      this.velX = Math.cos(radians) * this.thrust;
	      this.velY = Math.sin(radians) * this.thrust;
	    }
	    
	    // bounds check    
	    if(this.x < this.radius) {
	        this.x = board_width;   
	    }

	    if(this.x > board_width) {
	        this.x = this.radius;   
	    }

	    if(this.y < this.radius) {
	        this.y = board_height;   
	    }

	    if(this.y > board_height) {
	        this.y = this.radius;   
	    }
	    
	  
	    // apply friction
	    this.velX *= 1.00;
	    this.velY *= 1.0;
	    
	    // apply velocities    
	    this.x -= this.velX;
	    this.y -= this.velY;
	};

	Player.prototype.getAngle = function () {
		return this.angle;
	}

	Player.prototype.render = function (angle) {
	    
	    drawImg(this.player_img, this.x, this.y, 0, 6, 9, 12, angle);
	   
	};

	function drawImg(img, pX, pY, oX, oY, w, h, rot) {
		ctx_player.save();
		ctx_player.translate(pX+oX, pY+oY);
		ctx_player.rotate(rot); //  * Math.PI / 180
		ctx_player.drawImage(img, 0, 0, w, h, -(oX), -(oY), w, h);
		ctx_player.restore();
	}

	var player = new Player(board_width/2, board_height/2, 0);

	function render() {
	    // check keys
	    // up arrow or space
	    player.isThrusting = true;

	    if (player.isRightKey) {
	        // right arrow
	        player.isLeftKey = false;
	        player.turn(1);
	    }

	    if (player.isLeftKey) {
	        // left arrow
	       player.isRightKey = false;
	       player.turn(-1);
	    }
	   
	    
	    clearCtxPlayer();
	    player.update();
	    player.render(player.getAngle()*180/Math.PI);
	    requestAnimationFrame(render);
	}

	function clearCtxPlayer() {
    	ctx_player.clearRect(0, 0, board_width, board_height);
	}

	Player.prototype.updateScore = function(points) {
    	this.score += points;
	};

	function checkKeyDown(e) {

	    var keyID = e.keyCode || e.which;

	    if (keyID === 38 || keyID === 87) { //up arrow or W key
	        e.preventDefault();
	    }

	    if (keyID === 39 || keyID === 68) { //right arrow or D key
	        player.isRightKey = true;
	        e.preventDefault();
	    }

	    if (keyID === 40 || keyID === 83) { //down arrow or S key
	        e.preventDefault();
	    }

	    if (keyID === 37 || keyID === 65) { //left arrow or A key
	        player.isLeftKey = true;
	        e.preventDefault();
	    }
	}

	function checkKeyUp(e) {

	    var keyID = e.keyCode || e.which;

	/*    if (keyID === 38 || keyID === 87) { //up arrow or W key
	        isUpKey = false;
	        e.preventDefault();
	    }*/

	    if (keyID === 39 || keyID === 68) { //right arrow or D key
	        player.isRightKey = false;
	        e.preventDefault();
	    }

	/*    if (keyID === 40 || keyID === 83) { //down arrow or S key
	        isDownKey = false;
	        e.preventDefault();
	    }*/

	    if (keyID === 37 || keyID === 65) { //left arrow or A key
	        player.isLeftKey = false;
	        e.preventDefault();
	    }

	/*    if (keyID === 32) { //spacebar
	        isSpacebar = false;
	        e.preventDefault();
	    }*/

	}

	Game.prototype.play = function() {
		render();
	};

}



Game.prototype.setDifficulty = function(difficulty) {
	this.difficulty = difficulty;
};

Game.prototype.getDifficulty = function() {
	console.log(this.difficulty);
};