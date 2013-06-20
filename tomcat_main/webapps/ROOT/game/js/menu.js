/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var buttonSpacing = 40;
var plusMinButtonSize = 40;

var menuSubSquare = new Kinetic.Rect({
    x: stage.getWidth()/2-buttonSpacing/2 - plusMinButtonSize,
    y: stage.getHeight()*0.55,
    width: plusMinButtonSize,
    height: plusMinButtonSize,
    fill: '#111111',
    stroke: '#777777',
    strokeWidth: 4,
    cornerRadius: 10
});

var menuSubText = new Kinetic.Text({
    x: menuSubSquare.getX(),
    y: menuSubSquare.getY()+3,
    width: menuSubSquare.getWidth(),
    fontSize: 30,
    fontFamily: "Helvetica",
    fill: "White",
    text: "-",
    align: "center"
});

var menuSubButton = new Kinetic.Group({
    x: 0,
    y: 0
});

menuSubButton.add(menuSubSquare);
menuSubButton.add(menuSubText);

var menuAddSquare = new Kinetic.Rect({
    x: stage.getWidth()/2+buttonSpacing/2,
    y: stage.getHeight()*0.55,
    width: plusMinButtonSize,
    height: plusMinButtonSize,
    fill: '#111111',
    stroke: '#777777',
    strokeWidth: 4,
    cornerRadius: 10
});

var menuAddText = new Kinetic.Text({
    x: menuAddSquare.getX(),
    y: menuAddSquare.getY()+4,
    width: menuAddSquare.getWidth(),
    fontSize: 30,
    fontFamily: "Helvetica",
    fill: "White",
    text: "+",
    align: "center"
});

var menuAddButton = new Kinetic.Group({
    x: 0,
    y: 0
});

menuAddButton.add(menuAddSquare);
menuAddButton.add(menuAddText);


var menuHeader = new Kinetic.Text({
    x: 0,
    y: stage.getHeight()*0.25,
    width:stage.getWidth(),
    fontSize: 40,
    fontFamily: 'Arial',
    fill: "white",
    text: "Gunship Galaxy",
    align: "center"
});

var menuBackdrop = new Kinetic.Rect({
    x:0,
    y:0,
    width: stage.getWidth(),
    height: stage.getHeight(),
    stroke:"black",
    strokeWidth:"1",
    fill:"black",
    opacity: 0.80,
    filter: Kinetic.Filters.Blur,
    filterRadius: 20
});

var menuPlayerNum = new Kinetic.Text({
    x:0,
    y:stage.getHeight()*0.4,
    width: stage.getWidth(),
    fontSize: 40,
    fontFamily: 'Arial',
    fill:"red",
    text: "Players: 1",
    align: "center"
});

var menuPlayButton = new Kinetic.Text({
    x: 365,
    y: stage.getHeight()*0.75,
    fontSize: 40,
    fontFamily: 'Arial',
    fill: "white",
    text: "Play",
    align: "center"
});

menuPlayButton.on('mouseover', function(){
    this.setFill("red");
    menu.draw();
});

menuPlayButton.on('mouseout', function(){
    this.setFill("white");
    menu.draw();
});

menuPlayButton.on('click', function(){
    if (playerNum>1){
        menu.remove();
        initGame();
    }
});

menuAddButton.on('mouseover', function(){
    this.get('Rect')[0].setFill("#222222");
    menu.draw();
});

menuAddButton.on('mouseout', function(){
    this.get('Rect')[0].setFill("#111111");
    menu.draw();
});

menuAddButton.on('click',function(){
    if(playerNum < 4){
        playerNum++;
        menuPlayerNum.setFill(colourMappings[playerNum-1]);
        menuPlayerNum.setText("Players: " + playerNum);
        menu.draw();
        addGunship(playerNum);
    }
});


menuSubButton.on('mouseover', function(){
    this.get('Rect')[0].setFill("#222222");
    menu.draw();
});

menuSubButton.on('mouseout', function(){
    this.get('Rect')[0].setFill("#111111");
    menu.draw();
});

menuSubButton.on('click',function(){
    if(playerNum>1){
        menu.get('#'+playerNum)[0].remove();
        playerNum--;
        menuPlayerNum.setFill(colourMappings[playerNum-1]);
        menuPlayerNum.setText("Players: " + playerNum);
        menu.draw();
    }
});

var menuDifficultyButtonSquare = new Kinetic.Rect({
    x: stage.getWidth() / 2 - 100,
    y: 380,
    width: 200,
    height: 50,
    fill: '#111111',
    stroke: '#777777',
    strokeWidth: 4,
    cornerRadius: 10
});

var menuDifficultyButtonText = new Kinetic.Text({
    x: menuDifficultyButtonSquare.getX(),
    y: menuDifficultyButtonSquare.getY() + 11,
    width: menuDifficultyButtonSquare.getWidth(),
    fontSize: 30,
    fontFamily: "Helvetica",
    fill: "White",
    text: "EASY",
    align: "center"
});

var menuDifficultyButton = new Kinetic.Group({
    x: 0,
    y: 0
});

menuDifficultyButton.add(menuDifficultyButtonSquare);
menuDifficultyButton.add(menuDifficultyButtonText);

menuDifficultyButton.on('mouseover', function(){
    this.get('Rect')[0].setFill("#222222");
    menu.draw();
});

menuDifficultyButton.on('mouseout', function(){
    this.get('Rect')[0].setFill("#111111");
    menu.draw();
});

menuDifficultyButton.on('click', function(){
	if (gameDifficulty == 0) {
		gameDifficulty = 1;
		menuDifficultyButtonText.setText("MEDIUM");
	}
	else if (gameDifficulty == 1) {
		gameDifficulty = 2;
		menuDifficultyButtonText.setText("HARD");
	}
	else if (gameDifficulty == 2) {
		gameDifficulty = 0;
		menuDifficultyButtonText.setText("EASY");
	}
    menu.draw();
});

var shudder_rotation = [5,2,-2,-4,-3,-1,0,1,2,1,0];

function addGunship(playerNum){
    var gunship = gunships[playerNum-1];
    var opX = gunship.model.getX();
    var opY = gunship.model.getY();
    var mpX = stage.getWidth()/2;
    var mpY = stage.getHeight()/2;
    gunship.model.setScale(6);
    gunship.model.setPosition(mpX,mpY);
    menu.add(gunship.model);
    var tween = new Kinetic.Tween({
        node: gunship.model,
        duration: 0.6,
        easing: Kinetic.Easings.EaseIn,
        x: opX,
        y: opY,
        scaleX: 1,
        scaleY: 1,
        onFinish: function(){
            shudder.start();
        }
    });
    tween.play();
    createjs.Sound.play("ship_add");
}

menu.setOffset(400,300);
menu.setPosition(400,300);
var count = 0;
var shudder_length = shudder_rotation.length;
var shudder = new Kinetic.Animation(function(frame) {
    if (count < shudder_length){
        menu.setRotation(shudder_rotation[count]*Math.PI/180);
        count++;
    } else {
        this.stop();
        count = 0;
    }
}, menu);