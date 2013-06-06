/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var bullets = new Array();

function shootBullet (gunship) {
    debugText.setText("SHOOOOOT");
    var gunEndCoordX = gunEndCoord(gunship)[0];
    var gunEndCoordY = gunEndCoord(gunship)[1];
    var rotation = gunship.getRotationDeg();
    var bullet = newBullet(gunEndCoordX, gunEndCoordY, rotation);
	var speed = spaceSpeed * 2;
	var hasHit = false;
    layer.add(bullet);
    bullets.push(bullet);
    var animation = new Kinetic.Animation(function (frame) {
            advance(bullet, speed);
			if (!inBounds(bullet)) {
				if (hasHit) {
					stopBullet(bullet, animation);
				}
				else {
					hasHit = true;
					rotation += 180;
					rotation %= 360;
					bullet.setRotationDeg(rotation);
					speed *= 2;
				}
			}
        }, layer);
    animation.start();
}

var debugText = new Kinetic.Text({
    x: stage.getWidth() / 2,
    y: 15,
    text: "NOTHING TO SHOW",
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'green'
});


layer.add(debugText);

function stopBullet (bullet, animation) {
	debugText.setText(bullet.getX() + "," + bullet.getY() + "/" + bullet.getRotationDeg());
	bullet.destroy();
	bullet = null;
	delete bullet;
	animation.stop();
}

function newBullet(_x, _y, rotation) {
        var bulletHeight = 8;
		var bulletWidth = 20;
        return new Kinetic.Rect({
           x: _x,
           y: _y ,
           width: bulletWidth,
           height: bulletHeight,
           stroke: 'none',
           rotationDeg: rotation,
           strokeWidth: 0,
           fill: 'cyan',
		   offsetX: bulletWidth/2,
		   offsetY: bulletHeight/2
        });
}

function advance (bullet, speed) {
    var rotation = bullet.getRotationDeg();
    var x = bullet.getX();
    var y = bullet.getY();
    switch (rotation){
        case 0:
            bullet.setX(x+speed);
            break;
        case 90:
            bullet.setY(y+speed);
            break;
        case 180:
            bullet.setX(x-speed);
            break;
        case 270:
            bullet.setY(y-speed);
            break;

    }
}

function inBounds(bullet) {
    return !(bullet.getX() < -bullet.getWidth() || bullet.getY() < -bullet.getHeight() || bullet.getX() > stage.getWidth() || bullet.getY() > stage.getHeight());
}