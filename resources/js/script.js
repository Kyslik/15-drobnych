 $(function(){
	$('ul#difficulty li').click(function() {
		$('li.active').removeClass('active');
		$(this).addClass('active');
	});
});

var pulse_on = true;
var actual_screen = "menu";

function pulse() {
	//if (!pulse_on) return;
    $('button.heartbeat').stop().animate({
        width: 200, height: 200, 
        'font-size': 50,
        top: 50,
        opacity: 0.5
    }, 700, function() {
        $('button.heartbeat').stop().animate({
            width: 220, height: 220, 
            'font-size': 55,
            top: 40,
            opacity: 1
        }, 700, function() {
            if (pulse_on) pulse();
        });
    }); 
};

function displayGameMenu(display) {

	actual_screen = display;

	if (display == "menu") {
		$('.round-btn.heartbeat').html("GO 15!");
	}

	if (display == "repeat") {
		$('.round-btn.heartbeat').html("Try Again!");
	}
	

	$('#game-menu').css("display", "block");

	hideGame();

	pulse_on = true;
	pulse();
}

function hideGameMenu() {

	pulse_on = false;

	$('#game-menu').css("display", "none");
	$('button.spacebar-btn').removeClass('active'); //deactivates spacebar "pressed" effect.
}

function displayGame() {

	actual_screen = "game";

	$('#game-board').css("display", "block");
	$('#game-player').css("display", "block");
	$('#game-mirrors').css("display", "block");

	hideGameMenu();

	game = new Game(findDifficulty());
	game.play();
	
}

function hideGame() {

	$('#game-board').css("display", "none");
	$('#game-player').css("display", "none");
	$('#game-mirrors').css("display", "none");

	//game = null;
}

function changeScreen(display) {
	$('#game-menu-change').css("display", "block");
	$('#game-menu-change').stop().animate({
		opacity: 1,
	}, 600, function() {

		if (display == "game") displayGame();
		if (display == "menu") displayGameMenu(display);
		if (display == "repeat") displayGameMenu(display);
		
		$(this).stop().animate({
			opacity: 0,
		}, 600, function() {
			$('#game-menu-change').css("display", "none");
		});
	});
}

function findDifficulty() {
	return $('li.active').data('id');
}

$( document ).ready(function() {
    pulse();

    $('button.go, button.spacebar-btn').click(function() {
    	pulse_on = false;
    	changeScreen('game');
	});

});

/*if (actual_screen == "menu" || actual_screen == "repeat") {*/
$(window).keyup(function(e) {
  if (e.keyCode == 32) {
  	e.preventDefault();
  	if (actual_screen == "menu" || actual_screen == "repeat") {
  		$('button.spacebar-btn').addClass('active').click();
  	}

  	if (actual_screen == "game") {
  		game.restart();
  	}
    
  }
});
/*}*/
