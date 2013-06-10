/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var config = _default;

function Gunship(_x,_y,playerNum, rotation) {
	this.playerNum    = playerNum;
    this.gunEnabled   = config.gunEnabled;
    this.fireRate     = config.fireRate;
    this.timeToFire   = config.fireRate;
    this.lives        = config.lives;
    this.bulletSpeed  = config.bulletSpeed;
    this.relativeOffsetX = 20;
    this.relativeOffsetY = 20;
    this.mainColor = colourMappings[playerNum - 1];
    this.invincibleColor = colourInvincibleMappings[playerNum - 1];
    this.invincibleTimeLeft = 0;
    this.timeToNextChangeOfColour = 0;

    var model = new Kinetic.Polygon({
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
        fill: this.mainColor,
        strokeWidth:0,
        offsetX: _x+20,
        offsetY: _y+20,
        width: 68,
        height:40,
		rotationDeg: rotation
    });
    
    this.model = model;
    var liveDisplay = new Kinetic.Text({
            x: _x - 4,
            y: _y - 7,
            text: this.lives,
            fontSize: 14,
            fontFamily: 'Calibri',
            fill: 'white'
    });
    this.liveDisplay = liveDisplay;

    layer.add(model);
    layer.add(liveDisplay);
    layer.draw();
	
};

function hitByBullet(gunship) {
	if (gunship.invincibleTimeLeft == 0)
		gunship.lives--;
	if (gunship.lives == 0)
		destroy(gunship);
}

function destroy (gunship) {
	var index = gunships.indexOf(gunship);
	gunships.splice(index, 1);
	gunship.liveDisplay.destroy();
	gunship.gunEnabled = false;
	removeObjectWithModel(gunship);
}

function drawLives(gunship) {
	gunship.liveDisplay.setX(gunship.model.getX() - 4);
	gunship.liveDisplay.setY(gunship.model.getY() - 7);
	gunship.liveDisplay.setText(gunship.lives);
}
