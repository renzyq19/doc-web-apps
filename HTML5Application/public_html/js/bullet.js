/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Bullet(shooter){
    this.shooter = shooter;
    this.speed = shooter.bulletSpeed;
    this.hasHit = false;
    
    var bulletHeight = 8;
    var bulletWidth = 20;
    var gunEndCoordX = gunEndCoord(shooter)[0];
    var gunEndCoordY = gunEndCoord(shooter)[1];
    var rotation = shooter.model.getRotationDeg();
    
    this.model = new Kinetic.Rect({
        x: gunEndCoordX,
        y: gunEndCoordY ,
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
    debugText.setText(gunship.model.getX() + "," + gunship.model.getY());
    gunship.timeToFire = gunship.fireRate;
    var bullet = new Bullet(gunship);
    layer.add(bullet.model);
    gunship.model.moveToTop();
    updateBullet(bullet);
}


function updateBullet (bullet){
    var animation = new Kinetic.Animation(function (frame) {
        advance(bullet.model, bullet.speed);
        if (!inBounds(bullet.model)) {
            if (bullet.hasHit) {
                stopBullet(bullet, animation);
            }
            else {
                bullet.hasHit = true;
                bullet.model.setRotationDeg((bullet.model.getRotationDeg() + 180) % 360);
                bullet.model.setFill("#5F5F5F");
                bullet.speed *= 2;
            }
        }
    }, layer);
    animation.start();
}

function stopBullet (bullet, animation) {
	bullet.model.hide();
        bullet.model.destroy();
	bullet = null;
	animation.stop();
}

function advance (model, speed) {
    var rotation = model.getRotationDeg();
    var x = model.getX();
    var y = model.getY();
    var combined_speed = speed + _default.spaceSpeed;
    switch (rotation){
        case 0:
            model.setX(x+combined_speed);
            break;
        case 90:
            model.setY(y+combined_speed);
            break;
        case 180:
            model.setX(x-combined_speed);
            break;
        case 270:
            model.setY(y-combined_speed);
            break;

    }
}

function inBounds(bullet) {
    return !(bullet.getX() < -bullet.getWidth() ||
            bullet.getY() < -bullet.getHeight() ||
            bullet.getX() > stage.getWidth() || 
            bullet.getY() > stage.getHeight());
}