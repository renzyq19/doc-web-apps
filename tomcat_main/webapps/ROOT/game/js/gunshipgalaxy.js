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
var level = 1;
$(document).ready(function(){
    initMenu();
    
});

function initGame(){
	while (gunships.length > 0)
		destroy(gunships.pop());
	gunships = [];
	initGunships();
	gunships = [gunship1, gunship2, gunship3, gunship4];
    if (playerNum < 4 && gunships.length == 4)
        gunships.splice(playerNum, 4 - playerNum);
	for (var i = 1;i < gunships.length;i++)
		makeComputer(gunships[i], gameDifficulty);
    for (var i = 0; i < gunships.length; i++) {
		if (!gunships[i].isComputer)
			controlInit(i+1);
		drawGunship(gunships[i]);
	}
    stage.add(layer);
    layer.add(backdrop);
    layer.moveToBottom();
    backdrop.moveToBottom();
    layer.draw();
    initLevelTimer();
    anim.start();
}

function initGunships () {
	gunship1 = new Gunship(50,  50,  1, 0);
	gunship2 = new Gunship(750, 50,  2, 180);
	gunship3 = new Gunship(50,  550, 3, 0);
	gunship4 = new Gunship(750, 550, 4, 180);
}

function initMenu(){
	initGunships();
	gunships = [gunship1, gunship2, gunship3, gunship4];
	playerNum = 1;
	menuPlayerNum.setFill(colourMappings[playerNum-1]);
	menuPlayerNum.setText("Players: " + playerNum);
    stage.add(menu);
    menu.add(menuBackdrop);
    menu.add(menuHeader);
    menu.add(menuAddButton);
    menu.add(menuSubButton);
    menu.add(menuPlayButton);
    menu.add(menuPlayerNum);
	menu.add(menuDifficultyButton);
    setTimeout(function(){
        addGunship(1);
    }, 100);
    menu.draw();
}

function initEndOfGame() {
	layer.remove();
	stage.add(endMenu);
	endMenu.add(endHeader);
	endMenu.add(winnerDisplay);
	endMenu.add(backdrop);
	backdrop.moveToBottom();
	endMenu.add(replayButton);
	var score = getBestScore();
	winnerDisplay.setText("CONGRATULATIONS!! YOU SCORED " + score);
	//sendDataToTheServer(score, id, numberOfOpponents, difficulty);
	replayTextAnimation.start();
	endMenu.draw();
}

var endMenu = new Kinetic.Layer();
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

function advance (model, distance) {
    var rotation = model.getRotation();
    var x = model.getX();
    var y = model.getY();
    model.setX(x + Math.round(Math.cos(rotation) * distance));
    model.setY(y + Math.round(Math.sin(rotation) * distance));
}

function initLevelTimer(){
    setTimeout(function(){
        levelUp(level);
        initLevelTimer();
    }, 2000);
}

function levelUp(level){
    level++;
    //_default.spaceSpeed+=20;
}
var anim = new Kinetic.Animation(function(frame) {
    for (var i = 0; i < gunships.length;i++)
		updateShip(gunships[i], frame.timeDiff);
    bonusRandomise(frame.timeDiff);
    if (gameOver()) {
		this.stop();
        createjs.Sound.play("victory");
		initEndOfGame();
	}
},layer);

function gameOver () {
	return (gunship1.lives <= 0);
}

function updateShip(gunship, timeSinceLastFrameMS){
    if (gunship.timeToFire > 0)
        gunship.timeToFire -= Math.min(timeSinceLastFrameMS, gunship.timeToFire);
	advance(gunship.model, gunship.speed * timeSinceLastFrameMS/1000);
	if (gunship.isComputer) {
		gunship.timeSinceLastMove += timeSinceLastFrameMS;
		gunship.timeSinceLastCheck += timeSinceLastFrameMS;
		gunship.timeSinceLastShootCheck += timeSinceLastFrameMS;
		workOutMove(gunship);
	}
    boundaryCheck(gunship);
    drawLives(gunship);
}
