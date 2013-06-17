/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function boundaryCheck(gunship){
    var gunEndCoordX = gunEndCoord(gunship)[0];
    var gunEndCoordY = gunEndCoord(gunship)[1];
    layer.draw();
    var rotation = gunship.model.getRotationDeg();
    if (gunEndCoordX < 0 || gunEndCoordY < 0
        || gunEndCoordX > stage.getWidth() || gunEndCoordY > stage.getHeight())
              gunship.model.setRotationDeg((rotation + 180)%360);
}

function gunEndCoord (gunship) {
   var gunLength = 48;
   var x = gunship.model.getX();
   var y = gunship.model.getY();
   var rotation = gunship.model.getRotation();
   x += Math.round(Math.cos(rotation)) * gunLength;
   y += Math.round(Math.sin(rotation)) * gunLength;
   return [x,y];
}

var clone = (function(){ 
  return function (obj) { Clone.prototype=obj; return new Clone() };
  function Clone(){}
}());

function willCollide(originalBullet, originalGunship) {
	var bullet = new Bullet(gunship1);
	bullet.model = originalBullet.model.clone();
	var gunship = new Gunship(0, 0, 0, 0);
	gunship.speed = originalGunship.speed;
	gunship.model = originalGunship.model.clone();
	for (var i = 0; i < 10; i++) {
		advance(bullet.model, 50);
		advance(gunship.model, 50 * gunship.speed / bullet.speed);
		if (!inBounds(bullet.model)) {
			bullet.speed *= 2;
			bullet.model.setRotationDeg((bullet.model.getRotationDeg() + 180) % 360);
		}
		boundaryCheck(gunship);
		if (detectCollisionBetweenTwoRectangles(bullet, gunship))
			return true;
	}
	return false;
}

function detectCollisionGunshipAndBullet (gunship, bullet) {
	//Array of 4: [left, bottom, right, top]
	if (detectCollisionBetweenTwoRectangles(gunship, bullet)) {
		hitByBullet(gunship);
		hitAShip(bullet);
	}
}

//rectangle must be a variable containing a model and a relative offset on x and y
function detectCollisionBetweenTwoRectangles (r1, r2) {
	var extremeCoordinates1 = workOutExtremeCoordinates(r1);
	var extremeCoordinates2 = workOutExtremeCoordinates(r2);
	return intersects(extremeCoordinates1, extremeCoordinates2);
}

//Arrays of 4: [left, bottom, right, top]
function intersects (coorsR1, coorsR2) {
	return !(coorsR2[0] > coorsR1[2]
		  || coorsR2[2] < coorsR1[0]
		  || coorsR2[3] > coorsR1[1]
		  || coorsR2[1] < coorsR1[3]);
}

//rectangle must be a variable containing a model and a relative offset on x and y
function workOutExtremeCoordinates(rectangle) {
	var model = rectangle.model;
	var right = 0;
	var left = 0;
	var top = 0;
	var bottom = 0;
	var rotation = model.getRotationDeg();
	switch (rotation) {
		case 0:
			left = model.getX() - rectangle.relativeOffsetX;
			top = model.getY() - rectangle.relativeOffsetY;
			right = left + model.getWidth();
			bottom = top + model.getHeight();
			break;
		case 90:
			left = model.getX() + rectangle.relativeOffsetY - model.getHeight();
			top = model.getY() - rectangle.relativeOffsetX;
			right = left + model.getHeight();
			bottom = top + model.getWidth();
			break;
		case 180:
			left = model.getX() + rectangle.relativeOffsetX - model.getWidth();
			top = model.getY() + rectangle.relativeOffsetY - model.getHeight();
			right = left + model.getWidth();
			bottom = top + model.getHeight();
			break;
		case 270:
			left = model.getX() - rectangle.relativeOffsetY;
			top = model.getY() + rectangle.relativeOffsetX - model.getWidth();
			right = left + model.getHeight();
			bottom = top + model.getWidth();
			break;
	}
	return [left, bottom, right, top];
}