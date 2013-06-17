var endHeader = new Kinetic.Text({
    x: 0,
    y: stage.getHeight()*0.25,
    width:stage.getWidth(),
    fontSize: 40,
    fontFamily: 'Arial',
    fill: "white",
    text: "GAME OVER",
    align: "center"
});

var winnerDisplay = new Kinetic.Text({
	x:0,
    y:stage.getHeight()*0.4,
    width: stage.getWidth(),
    fontSize: 40,
    fontFamily: 'Arial',
    fill: "white",
    text: "GAME WITH A WINNER LENGTH DIFFERENT FROM 0 OR 1!!",
    align: "center"
});

function display() {
	displayWinner();
}

function displayWinner() {
	if (gunships.length == 1) {
		winnerDisplay.setText("THE WINNER IS... PLAYER " + gunships[0].playerNum + "!\nCONGRATULATIONS");
		winnerDisplay.setText("The number of player is " + playerNum);
		winnerDisplay.setFill(gunships[0].model.getFill());
	}
	else
		winnerDisplay.setText("THIS IS A DRAW");
}

var replayButton = new Kinetic.Rect({
    x: stage.getWidth() / 2 - 100,
    y: stage.getHeight() * 3/4,
	width: 200,
	height: 50,
	fill: '#111111',
    stroke: '#777777',
	strokeWidth: 4,
    cornerRadius: 10
});

var replayText = new Kinetic.Text({
	x: replayButton.getX(),
	y: replayButton.getY() + 6,
	width: 200,
	heigh: 50,
	text: 'REPLAY',
	fill: 'white',
	align: 'center',
	fontFamily: 'Arial',
	fontSize: 40,
});

var replayTextTime = 0;
var replayTextAnimation = new Kinetic.Animation(function (frame) {
	if (replayTextTime > 200) {
		replayTextTime = 0;
		if (replayText.getFill() == 'white')
			replayText.setFill('black');
		else
			replayText.setFill('white');
	}
	else
		replayTextTime += frame.timeDiff;
}, endMenu);

replayButton.on('mouseover', function(){
    this.setFill("#222222");
    endMenu.draw();
});

replayButton.on('mouseout', function(){
    this.setFill("#111111");
    endMenu.draw();
});

replayButton.on('click',function(){
    endMenu.remove();
	replayTextAnimation.stop();
	playerNum = 1;
	initMenu();
});

replayText.on('mouseover', function(){
    replayButton.setFill("#222222");
    endMenu.draw();
});

replayText.on('mouseout', function(){
    replayButton.setFill("#111111");
    endMenu.draw();
});

replayText.on('click',function(){
    endMenu.remove();
	replayTextAnimation.stop();
	playerNum = 1;
	initMenu();
});