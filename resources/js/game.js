function Game(difficulty) {
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

	this.difficulty 	= difficulty;

	function init() {


	}

	document.addEventListener('keydown', checkKeyDown, false);
    document.addEventListener('keyup', checkKeyUp, false);

	function Player (x, y, radius, difficulty) {
		console.log(difficulty);
		if (difficulty == 1) {
	    	this.thrust = 1;
	    	this.turn_speed = 0.0005;
	    }

	    if (difficulty == 2) {
	    	this.thrust = 2;
	    	this.turn_speed = 0.001;
	    }
	    
	    if (difficulty == 3) {
	    	this.thrust = 3;
	    	this.turn_speed = 0.002;
	    }

	    if (difficulty == 4) {
	    	this.thrust = 4;
	    	this.turn_speed = 0.003;
	    }

		this.score 			= 0;
		
		this.player_img 	= new Image();
		this.player_img.src = "./resources/images/arrow-black-left.png";
		
		this.x 				= x || 0;
	    this.y 				= y || 0;
	    this.radius 		= radius || 10;

	    this.is_thrusting 	= false;
	    this.angle 			= 0;
	   
	    this.is_right_key 	= false;
	    this.is_left_key 	= false;
	}

	Player.prototype.turn = function(dir) {
	    this.angle += this.turn_speed * dir;
	};

	Player.prototype.update = function () {
	    
	    var radians = this.angle/Math.PI*180;
	    
	    if(this.is_thrusting) {

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

	var player = new Player(board_width/2, board_height/2, 0, difficulty);

	function render() {
	    // check keys
	    // up arrow or space
	    player.is_thrusting = true;

	    if (player.is_right_key) {
	        // right arrow
	        player.is_left_key = false;
	        player.turn(1);
	    }

	    if (player.is_left_key) {
	        // left arrow
	       player.is_right_key = false;
	       player.turn(-1);
	    }
	   
	    clearCtxPlayer();
	    player.update();
	    player.render(player.getAngle() * 180 / Math.PI);
	    requestAnimationFrame(render);
	}

	function clearCtxPlayer() {
    	ctx_player.clearRect(0, 0, board_width, board_height);
	}

	Player.prototype.updateScore = function(points) {
    	this.score += points;
	};

	Game.prototype.play = function() {
		render();
	};

	Game.prototype.getDifficulty = function() {
		console.log(this.difficulty);
	};

	function checkKeyDown(e) {

	    var keyID = e.keyCode || e.which;

	    if (keyID === 38 || keyID === 87) { //up arrow or W key
	        e.preventDefault();
	    }

	    if (keyID === 39 || keyID === 68) { //right arrow or D key
	        player.is_right_key = true;
	        e.preventDefault();
	    }

	    if (keyID === 40 || keyID === 83) { //down arrow or S key
	        e.preventDefault();
	    }

	    if (keyID === 37 || keyID === 65) { //left arrow or A key
	        player.is_left_key = true;
	        e.preventDefault();
	    }

	}

	function checkKeyUp(e) {

	    var keyID = e.keyCode || e.which;

	    if (keyID === 39 || keyID === 68) { //right arrow or D key
	        player.is_right_key = false;
	        e.preventDefault();
	    }

	    if (keyID === 37 || keyID === 65) { //left arrow or A key
	        player.is_left_key = false;
	        e.preventDefault();
	    }

	}

}



