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

	this.difficulty 	= difficulty;

	var player = new Player(board_width/2, board_height/2, 0, difficulty);

	function init() {


	}

	document.addEventListener('keydown', checkKeyDown, false);
    document.addEventListener('keyup', checkKeyUp, false);

	function Player (x, y, radius, difficulty) {
		console.log("Difficulty: " + difficulty);
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
		
		this.path_cords		= [];

		this.player_img 	= new Image();
		this.player_img.src = "./resources/images/arrow-black-left.png";
		
		this.x 				= x;
	    this.y 				= y;
	    this.radius 		= radius;

	    this.is_thrusting 	= true;
	    this.angle 			= 0;
	   
	    this.is_right_key 	= false;
	    this.is_left_key 	= false;
	}

	Player.prototype.turn = function(dir) {
	    this.angle += this.turn_speed * dir;
	};

/*	Player.prototype.update = function () {
	    
	    var radians = this.angle/Math.PI*180;
	    
	    if ( this.is_thrusting ) {

	      this.velX = Math.cos(radians) * this.thrust;
	      this.velY = Math.sin(radians) * this.thrust;
	    
	    }
	    
	    // bounds check    
	    if (this.x < this.radius) {
	        this.x = board_width;   
	    }

	    if (this.x > board_width) {
	        this.x = this.radius;   
	    }

	    if (this.y < this.radius) {
	        this.y = board_height;   
	    }

	    if (this.y > board_height) {
	        this.y = this.radius;   
	    }
	    
	    // apply friction
	    this.velX *= 1;
	    this.velY *= 1;
	    
	    // apply velocities    
	    this.x -= this.velX;
	    this.y -= this.velY;
	};*/

	Player.prototype.getAngle = function () {
		return this.angle;
	}

	Player.prototype.render = function (angle) {
	    
	    drawPlayerImg(this.player_img, this.x, this.y, 0, 6, 9, 12, angle);
	   
	};

	function drawPlayerImg(img, pX, pY, oX, oY, w, h, rot) {
		ctx_player.save();
		ctx_player.translate(pX+oX, pY+oY);
		ctx_player.rotate(rot);
		ctx_player.drawImage(img, 0, 0, w, h, -(oX), -(oY), w, h);
		ctx_player.restore();
	}

	function clearCtxPlayer() {
    	ctx_player.clearRect(0, 0, board_width, board_height);
	}

	Player.prototype.updateScore = function(points) {
    	this.score += points;
	};

	Player.prototype.getPath = function() {
		return this.path_cords;
	};

	function render() {
	    // check keys
	    // up arrow or space
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
	    
	    player.path_cords.push(player.angle); //save players path

	    update(player);
	    player.render(player.getAngle() * 180 / Math.PI);

	    requestAnimationFrame(render);
	}

	function clearCtxMirrors() {
    	ctx_mirrors.clearRect(0, 0, board_width, board_height);
	}

	Game.prototype.play = function() {
		render();
	};

	Game.prototype.getDifficulty = function() {
		return this.difficulty;
	};

	function update( obj ) {

		var radians = obj.angle/Math.PI*180;
	    
	    if ( obj.is_thrusting ) {

	      obj.velX = Math.cos(radians) * obj.thrust;
	      obj.velY = Math.sin(radians) * obj.thrust;
	    
	    }
	    
	    // bounds check    
	    if (obj.x < obj.radius) {
	        obj.x = board_width;   
	    }

	    if (obj.x > board_width) {
	        obj.x = obj.radius;   
	    }

	    if (obj.y < obj.radius) {
	        obj.y = board_height;   
	    }

	    if (obj.y > board_height) {
	        obj.y = obj.radius;   
	    }
	    
	    // apply friction
	    obj.velX *= 1;
	    obj.velY *= 1;
	    
	    // apply velocities    
	    obj.x -= obj.velX;
	    obj.y -= obj.velY;
	}

	function checkKeyDown(e) {

	    var keyID = e.keyCode || e.which;

	    if (keyID === 39 || keyID === 68) { //right arrow or D key
	        player.is_right_key = true;
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



