/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */




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

function goDirection(model){
    var rotation = model.getRotation();
    var x = model.getX();
    var y = model.getY();
    model.setX(x + Math.round(Math.cos(rotation)*config.spaceSpeed));
    model.setY(y + Math.round(Math.sin(rotation)*config.spaceSpeed));
}

var anim = new Kinetic.Animation(function(frame) {
    for (var i = 0; i < gunships.length;i++)
		advanceShip(gunships[i]);
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


function advanceShip(gunship){
    if (gunship.timeToFire > 0)
        gunship.timeToFire--;
    goDirection(gunship.model);
    boundaryCheck(gunship);
	drawLives(gunship);
 }