var game_background = document.getElementById('game-background');
var game_menu = document.getElementById('game-menu');
var game_menu_repeat = document.getElementById('game-menu-repeat');





function checkKeyDown(e) {

    var keyID = e.keyCode || e.which;

/*    if (keyID === 38 || keyID === 87) { //up arrow or W key
        isUpKey = true;
        e.preventDefault();
    }*/

    if (keyID === 39 || keyID === 68) { //right arrow or D key
        isRightKey = true;
        e.preventDefault();
    }

/*    if (keyID === 40 || keyID === 83) { //down arrow or S key
        isDownKey = true;
        e.preventDefault();
    }*/

    if (keyID === 37 || keyID === 65) { //left arrow or A key
        isLeftKey = true;
        e.preventDefault();
    }

/*    if (keyID === 32) { //spacebar
        isSpacebar = true;
        e.preventDefault();
    }*/

}

function checkKeyUp(e) {

    var keyID = e.keyCode || e.which;

/*    if (keyID === 38 || keyID === 87) { //up arrow or W key
        isUpKey = false;
        e.preventDefault();
    }*/

    if (keyID === 39 || keyID === 68) { //right arrow or D key
        isRightKey = false;
        e.preventDefault();
    }

/*    if (keyID === 40 || keyID === 83) { //down arrow or S key
        isDownKey = false;
        e.preventDefault();
    }*/

    if (keyID === 37 || keyID === 65) { //left arrow or A key
        isLeftKey = false;
        e.preventDefault();
    }

/*    if (keyID === 32) { //spacebar
        isSpacebar = false;
        e.preventDefault();
    }*/

}
