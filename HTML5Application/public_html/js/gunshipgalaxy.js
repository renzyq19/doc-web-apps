/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var timeSinceLastBonus = 0;


$(document).ready(function(){
    
	for (var i = 1; i <= 4; i++)
		controlInit(i);
    
    stage.add(layer);
    
    layer.add(border);
    border.moveToBottom();
    layer.add(debugText);
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
	timeSinceLastBonus += frame.timeDiff;
	/*if (timeSinceLastBonus > config.minimumTimeBetweenBonuses) {
		var randomNumber = Math.random() * 1000;
		/* The next formula is such that each second, there is a certain probability to create
		 * a new bonus. This probability is increasing exponentially, following an x^2-like 
		 * curve, and is equal to 10% at 9 seconds (over the whole second) after the last bonus
		 *
		 //(probabilityFunction(timeSinceLastBonus / 1000) * frame.timeDiff / 1000)
		if (randomNumber < 100) {
			debugText.setText("BONUS!");
			timeSinceLastBonus = 0;
			instantiateBonus();
		}
	}*/
	if (gameOver()) {
		this.stop();
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
	if (gunship.invincibleTimeLeft == 1) {
		gunship.invincibleTimeLeft = 0;
		gunship.model.setFill(gunship.mainColor);
	}
	else if (gunship.invincibleTimeLeft > 0) {
		gunship.invincibleTimeLeft--;
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
 
//BONUSES

/*************************************************************************
**************************************************************************
****************************** DO NOT TOUCH ******************************
**************************************************************************
*************************************************************************/
 
function probabilityFunction (x) {
	return ((x/3)^2) * 10;
}

function instantiateBonus () {
	var check = new Invincibility();
}
/*
function isPlacementOK (bonus) {
	for (var i = 0; i < gunships.length; i++) {
		if (detectCollisionBetweenTwoRectangles2(gunships[i], gunships[i]) {
			return false;
		}
	}
	i = 0;
	for (; i < allBullets.length; i++) {
		if (detectCollisionBetweenTwoRectangles(allBullets[i], bonus)
			return false;
	}
	return true;
}

function detectCollisionBetweenTwoRectangles2 (r1, r2) {
	var extremeCoordinates1 = workOutExtremeCoordinates(r1);
	var extremeCoordinates2 = workOutExtremeCoordinates(r2);
	return intersects(extremeCoordinates1, extremeCoordinates2);
}

function Invincibility () {
	
	// Random X and Y inside the stage
	var randomX = Math.floor(Math.random() * (stage.getWidth() - 100) + 50);
	var randomY = Math.floor(Math.random() * (stage.getHeight() - 100) + 50);
	
	var relativeOffsetX = 25;
	var relativeOffsetY = 25;
	
	this.model = new Kinetic.Rectangle({
		x: randomX,
		y: randomY,
		width: 50,
		height: 50,
		fill: "white"
	});
	
	while (!isPlacementOK(this)) {
		this.model.setX(Math.floor(Math.random() * (stage.getWidth() - 100) + 50));
		this.model.setY(Math.floor(Math.random() * (stage.getHeight() - 100) + 50));
	}
	
	layer.add(model);
}*/