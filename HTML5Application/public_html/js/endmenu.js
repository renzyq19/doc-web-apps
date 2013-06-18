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
    fill: gunship1.model.getFill(),
    text: "CONGRATULATIONS! YOU SCORED " + getBestScore(),
    align: "center"
});

function getBestScore() {
	var result = 0;
	for (var i = 0; i < gunships.length;i++) {
		if (gunships[i].lives > result)
			result = gunships[i].lives;
	}
	return result;
}

var replaySquare = new Kinetic.Rect({
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
	x: replaySquare.getX(),
	y: replaySquare.getY() + 6,
	width: 200,
	heigh: 50,
	text: 'REPLAY',
	fill: 'white',
	align: 'center',
	fontFamily: 'Arial',
	fontSize: 40,
});

var replayButton = new Kinetic.Group({
	x: 0,
	y: 0
});

replayButton.add(replaySquare);
replayButton.add(replayText);

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
    this.get('Rect')[0].setFill("#222222");
    endMenu.draw();
});

replayButton.on('mouseout', function(){
    this.get('Rect')[0].setFill("#111111");
    endMenu.draw();
});

replayButton.on('click',function(){
    location.reload();
});