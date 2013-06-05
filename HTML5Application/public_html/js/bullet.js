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
    layer.add(bullet);
    bullets.push(bullet);
    var animation = new Kinetic.Animation(function (frame) {
            advance(bullet);
            //checkInBounds(bullet);
          //  debugText.setText(bullets.length);
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
function newBullet(_x, _y, rotation) {
        var bulletHeight = 8;
        switch(rotation) {
                case 0:
                        _y -= bulletHeight/2; break;
                case 90:
                        _x += bulletHeight/2; break;
                case 180:
                        _y += bulletHeight/2; break;
                case 270:
                        _x -= bulletHeight/2; break;
        }
        return new Kinetic.Rect({
           x: _x,
           y: _y,
           width: 20,
           height: bulletHeight,
           stroke: 'none',
           rotationDeg: rotation,
           strokeWidth: 0,
           fill: 'cyan'
        });
}

function advance (bullet) {
    var rotation = bullet.getRotationDeg();
    var x = bullet.getX();

    var y = bullet.getY();
    var speed = spaceSpeed*2;
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

function checkInBounds(bullet) {
    if (bullet.getX() < 0 || bullet.getY() < 0 || bullet.getX() > stage.getWidth() || bullet.getY() > stage.getHeight()) {
        bullet.destroy();
        layer.draw();
        debugText.setText("BULLET DELETED");
    }
}