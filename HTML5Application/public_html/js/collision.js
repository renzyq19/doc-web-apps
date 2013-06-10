/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function boundaryCheck(gunship){
    var gunEndCoordX = gunEndCoord(gunship)[0];
    var gunEndCoordY = gunEndCoord(gunship)[1];
    layer.draw();
    var rotation = gunship.model.getRotationDeg();
    if (gunEndCoordX < 0 || gunEndCoordY <0
        || gunEndCoordX >stage.getWidth() || gunEndCoordY >stage.getHeight())
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
function intersects (shipCoors, bulletCoors) {
	return !(bulletCoors[0] > shipCoors[2]
		  || bulletCoors[2] < shipCoors[0]
		  || bulletCoors[3] > shipCoors[1]
		  || bulletCoors[1] < shipCoors[3]);
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