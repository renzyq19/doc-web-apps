/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Bullet(shooter){
    this.shooter = shooter;
    this.speed = shooter.bulletSpeed;
    this.hasHit = false;
	this.anim = null;
    
    var bulletHeight = 8;
    var bulletWidth = 20;
    var gunEndCoordX = gunEndCoord(shooter)[0];
    var gunEndCoordY = gunEndCoord(shooter)[1];
    var rotation = shooter.model.getRotationDeg();
	
	/* The bullet needs to advance a bit on the local scale X to
	 * prevent from exploding rightaway due to the collision with
	 * the sender
	 */
	var actualX = gunEndCoordX + (bulletWidth * 3/5 * Math.cos(shooter.model.getRotation()));
	var actualY = gunEndCoordY + (bulletWidth * 3/5 * Math.sin(shooter.model.getRotation()));
	
	this.relativeOffsetX = bulletWidth/2;
	this.relativeOffsetY = bulletHeight/2;
    
    this.model = new Kinetic.Rect({
        x: actualX,
        y: actualY,
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

function shootBullet (gunship) {
    gunship.timeToFire = gunship.fireRate;
    var bullet = new Bullet(gunship);
    layer.add(bullet.model);
    gunship.model.moveToTop();
	gunship.liveDisplay.moveToTop();
    updateBullet(bullet);
}


function updateBullet (bullet){
    var animation = new Kinetic.Animation(function (frame) {
        advance(bullet.model, bullet.speed);
		for (var i = 0; i < gunships.length;i++)
			detectCollision(gunships[i], bullet);
        if (!inBounds(bullet.model)) {
            if (bullet.hasHit) {
                stopBullet(bullet);
            }
            else {
                bullet.hasHit = true;
                bullet.model.setRotationDeg((bullet.model.getRotationDeg() + 180) % 360);
                bullet.model.setFill("#5F5F5F");
                bullet.speed *= 2;
            }
        }
    }, layer);
	bullet.anim = animation;
    animation.start();
}

function stopBullet (bullet) {
	bullet.anim.stop();
	removeObjectWithModel(bullet);
}

function removeObjectWithModel(object) {
	object.model.hide();
	object.model.destroy();
	object = null;
}

function advance (model, speed) {
    var rotation = model.getRotationDeg();
    var x = model.getX();
    var y = model.getY();
    
    switch (rotation){
        case 0:
            model.setX(x+speed);
            break;
        case 90:
            model.setY(y+speed);
            break;
        case 180:
            model.setX(x-speed);
            break;
        case 270:
            model.setY(y-speed);
            break;

    }
}

function inBounds(bullet) {
    return !(bullet.getX() < -bullet.getWidth() ||
            bullet.getY() < -bullet.getHeight() ||
            bullet.getX() > stage.getWidth() || 
            bullet.getY() > stage.getHeight());
}