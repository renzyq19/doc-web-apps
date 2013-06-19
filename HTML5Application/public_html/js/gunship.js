/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var config = _default;

function Gunship(_x, _y, playerNum, rotation) {
    this.playerNum    = playerNum;
	this.speed        = config.spaceSpeed;
    this.gunEnabled   = config.gunEnabled;
    this.fireRate     = config.fireRate;
    this.timeToFire   = config.fireRate;
    this.lives        = 3;
    this.bulletSpeed  = config.bulletSpeed;
    this.relativeOffsetX = 20;
    this.relativeOffsetY = 20;
    this.mainColor = colourMappings[playerNum - 1];
    this.invincibleColor = colourInvincibleMappings[playerNum - 1];
    this.isInvincible = false;
    this.timeToNextChangeOfColour = 0;
	
	//The following are only used in case the gunship is controlled by an AI
	this.isComputer = false;
	this.difficulty = 0;
	this.timeSinceLastMove = 0;
	this.timeSinceLastCheck = 0;
	this.timeSinceLastShootCheck = 0;

    /*this.model = new Kinetic.Polygon({
        points:[_x,_y,
        _x+56,_y,
        _x+56,_y+8,
        _x+40,_y+8,
        _x+40,_y+13,
        _x+68,_y+13,
        _x+68,_y+27,
        _x+40,_y+27,
        _x+40,_y+32,
        _x+56,_y+32,
        _x+56,_y+40,
        _x,_y+40],
        x: _x,
        y: _y,
        id: playerNum,
        name: "gunship" + playerNum,
        fill: this.mainColor,
        strokeWidth:0,
        offsetX: _x+20,
        offsetY: _y+20,
        width: 68,
        height:40,
        rotationDeg: rotation
    });
	*/  
    this.model = new Kinetic.Image({
        image: models[playerNum-1],
        x: _x,
        y: _y,
        id: playerNum,
        name: "gunship" + playerNum,
        offsetX: 20,
        offsetY: 20,
        width: 68,
        height:40,
        rotationDeg: rotation
    });
    
    this.square = new Kinetic.Rect({
        x:_x,
        y:_y,
        offsetX: 14,
        offsetY: 14,
        fill: "black",
        width:28,
        height: 28
    });
//    this.liveDisplay = new Kinetic.Text({
//            x: _x - 4,
//            y: _y - 7,
//            text: this.lives,
//            fontSize: 14,
//            fontFamily: 'Calibri',
//            fill: 'white'
//    });

    this.liveDisplay = new Kinetic.Sprite({
        x: _x - 4,
        y: _y - 7,
        image: numSprite,
        animation: "num",
        animations: numAnimations,
        frameRate: 1,
        index: this.lives
    });
    
    this.gun = new Kinetic.Polygon({
        points:[_x+40,_y+12,
            _x+69,_y+12,
            _x+69,_y+28,
            _x+40,_y+28],
        x: _x,
        y: _y,
        fill: "black",
        strokeWidth:0,
        offsetX: _x+20,
        offsetY: _y+20,
        rotationDeg: rotation
    });
};

function drawGunship(gunship) {
    layer.add(gunship.model);
    layer.add(gunship.liveDisplay);
    layer.add(gunship.square);
    gunship.square.moveToTop();
    gunship.liveDisplay.moveToTop();
    layer.add(gunship.gun);
    gunship.gun.setVisible(false);
    layer.draw();
}

function hitByBullet(gunship) {
	if (!gunship.isInvincible){
        createjs.Sound.play("impact");
		if (!gunship.isComputer)
			gunship.lives--;
		else
			gunship.lives++;
    }
	if (gunship.lives == 0 && !gunship.isComputer){
		createjs.Sound.play("destruction");
		destroy(gunship);
    }
}

function makeComputer(gunship, difficulty) {
	gunship.lives = 0;
	gunship.isComputer = true;
	gunship.difficulty = difficulty;
}

function incrementLives(gunship) {
	if (!gunship.isComputer && gunship.lives<10)
		gunship.lives++;
	else
		gunship.lives--;
}

function destroy (gunship) {
	var index = gunships.indexOf(gunship);
	gunships.splice(index, 1);
	gunship.liveDisplay.destroy();
        gunship.square.destroy();
	gunship.gunEnabled = false;
	removeObjectWithModel(gunship);
}

function drawLives(gunship) {
	gunship.liveDisplay.setX(gunship.model.getX() - 4);
	gunship.liveDisplay.setY(gunship.model.getY() - 7);
	gunship.liveDisplay.setIndex(gunship.lives);
        gunship.square.setX(gunship.model.getX());
        gunship.square.setY(gunship.model.getY());
        
}
