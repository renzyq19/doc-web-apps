/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var stage = new Kinetic.Stage({
    container: 'container',
    width: 800,
    height: 600
});

var playerNum = 1;

$(document).ready(function(){
    initMenu();
    
});

function initGame(){
    for (var i = 1; i <= playerNum; i++)
        controlInit(i);
    if (playerNum < 4)
        gunships.splice(playerNum, 4 - playerNum);
    for (var i = 0; i < gunships.length; i++)
        drawGunship(gunships[i]);
	gunship2.isComputer = true;
	gunship2.difficulty = 1;
    stage.add(layer);
    layer.add(backdrop);
    layer.moveToBottom();
    backdrop.moveToBottom();
	layer.add(debugText);
    layer.draw();
    anim.start();
}

function initMenu(){
    
    stage.add(menu);
    menu.add(menuBackdrop);
    menu.add(menuHeader);
    menu.add(menuAddButton);
    menu.add(menuSubButton);
    menu.add(menuPlayButton);
    menu.add(menuPlayerNum);
    setTimeout(function(){
        addGunship(1);
    }, 100);
    menu.draw();
}
var menu = new Kinetic.Layer();
var layer = new Kinetic.Layer();

var backdrop = new Kinetic.Rect({
    x:0,
    y:0,
    width: stage.getWidth(),
    height: stage.getHeight(),
    stroke:"black",
    strokeWidth:"1",
    fill:"black"
});



var gunship1 = new Gunship(50,  50,  1, 0);
var gunship2 = new Gunship(750, 50,  2, 180);
var gunship3 = new Gunship(50,  550, 3, 0);
var gunship4 = new Gunship(750, 550, 4, 180);

var gunships = [gunship1, gunship2, gunship3, gunship4];

var finalDisplay = new Kinetic.Text({
	x: 200,
	y: 200,
	fontSize: 40,
	fontFamily: 'Calibri',
	fill: "white",
	text: "THE GAME IS NOT DONE. THIS SHOULD NOT BE SHOWN"
});

var debugText = new Kinetic.Text({
    x: 200,
    y: 15,
    text: "NOTHING TO SHOW",
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'green'
});

function advance (model, distance) {
    var rotation = model.getRotation();
    var x = model.getX();
    var y = model.getY();
    model.setX(x + Math.round(Math.cos(rotation) * distance));
    model.setY(y + Math.round(Math.sin(rotation) * distance));
}

var anim = new Kinetic.Animation(function(frame) {
    for (var i = 0; i < gunships.length;i++)
	updateShip(gunships[i], frame.timeDiff);
    bonusRandomise(frame.timeDiff);
    if (gameOver()) {
        createjs.Sound.play("victory");
        if (gunships.length == 1) {
            finalDisplay.setText("GAME OVER!\nTHE WINNER IS... PLAYER " + gunships[0].playerNum + "!\nCONGRATULATIONS");
            finalDisplay.setFill(gunships[0].model.getFill());
        }
        else
			finalDisplay.setText("THIS IS A DRAW");
        layer.add(finalDisplay);
        this.stop();
	}
},layer);

function gameOver () {
	return gunships.length <= 1;
}


function updateShip(gunship, timeSinceLastFrameMS){
    if (gunship.timeToFire > 0)
        gunship.timeToFire -= Math.min(timeSinceLastFrameMS, gunship.timeToFire);
	advance(gunship.model, gunship.speed * timeSinceLastFrameMS/1000);
	if (gunship.isComputer) {
		gunship.timeSinceLastMove += timeSinceLastFrameMS;
		gunship.timeSinceLastCheck += timeSinceLastFrameMS;
		workOutMove(gunship);
	}
    boundaryCheck(gunship);
    drawLives(gunship);
}