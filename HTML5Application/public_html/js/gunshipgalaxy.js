/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var timeSinceLastBonus = 0;
var isThereABonus = false;


$(document).ready(function(){
    
    
    
	for (var i = 1; i <= 4; i++)
		controlInit(i);
    
    stage.add(layer);
    
    layer.add(border);
    border.moveToBottom();
    //layer.add(debugText);
    layer.draw();
    
    anim.start();
});

var stage = new Kinetic.Stage({
    container: 'container',
    width: 800,
    height: 600
});

var layer = new Kinetic.Layer();
var border = new Kinetic.Rect({
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

function newGame() {
	gunship1 = new Gunship(50,  50,  1, 0);
	gunship2 = new Gunship(750, 50,  2, 180);
	gunship3 = new Gunship(50,  550, 3, 0);
	gunship4 = new Gunship(750, 550, 4, 180);

	gunships = [gunship1, gunship2, gunship3, gunship4];
}

function goDirection(model, timeSinceLastFrame){
    var rotation = model.getRotation();
    var x = model.getX();
    var y = model.getY();
    model.setX(x + Math.round(Math.cos(rotation) * config.spaceSpeed) * timeSinceLastFrame);
    model.setY(y + Math.round(Math.sin(rotation) * config.spaceSpeed) * timeSinceLastFrame);
}

var anim = new Kinetic.Animation(function(frame) {
    for (var i = 0; i < gunships.length;i++)
	updateShip(gunships[i], frame.timeDiff);
	if (!isThereABonus) {
		timeSinceLastBonus += frame.timeDiff;
		if (timeSinceLastBonus > config.minimumTimeBetweenBonuses) {
				var randomNumber = Math.random() * 1000;
				if (randomNumber < frame.timeDiff/6) {
						debugText.setText("BONUS!");
						timeSinceLastBonus = 0;
						isThereABonus = true;
						instantiateBonus();
				}
		}
	}
    if (gameOver()) {
            this.stop();
            createjs.Sound.play("victory");
            finalDisplay.setText("GAME OVER!\nTHE WINNER IS... PLAYER " + gunships[0].playerNum + "!\nCONGRATULATIONS");
            finalDisplay.setFill(gunships[0].model.getFill());
            layer.add(finalDisplay);
    }
},layer);

function gameOver () {
	return gunships.length == 1;
}


function updateShip(gunship, timeSinceLastFrameMS){
    if (gunship.timeToFire > 0)
        gunship.timeToFire -= Math.min(timeSinceLastFrameMS, gunship.timeToFire);
    goDirection(gunship.model, timeSinceLastFrameMS/1000);
    boundaryCheck(gunship);
	drawLives(gunship);
	if (gunship.invincibleTimeLeft == 0 && gunship.model.getFill() != gunship.mainColor) {
		gunship.model.setFill(gunship.mainColor);
	}
	else if (gunship.invincibleTimeLeft > 0) {
		gunship.invincibleTimeLeft -= Math.min(timeSinceLastFrameMS, gunship.invincibleTimeLeft);
		if (gunship.timeToNextChangeOfColour > 0)
			gunship.timeToNextChangeOfColour--;
		else {
			gunship.timeToNextChangeOfColour = 5;
			if (gunship.model.getFill() == gunship.mainColor)
				gunship.model.setFill(gunship.invincibleColor);
			else
				gunship.model.setFill(gunship.mainColor);
		}
	}
}