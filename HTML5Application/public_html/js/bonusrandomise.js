function instantiateBonus () {
	var bonus = new InvincibilityBonus();
	layer.add(bonus.model);
	layer.add(bonus.star);
	bonus.star.moveToTop();
	
	while (!isPlacementOK(bonus)) {
		var randomX = Math.floor(Math.random() * (stage.getWidth() - 100) + 50);
		var randomY = Math.floor(Math.random() * (stage.getHeight() - 100) + 50);
		bonus.model.setX(randomX);
		bonus.model.setY(randomY);
		bonus.star.setX(randomX);
		bonus.star.setY(randomY);
	}
	
	
	
	var animation = new Kinetic.Animation(function (frame) {
		for (var i = 0; i < gunships.length; i++) {
		if (detectCollisionBetweenTwoRectangles(gunships[i], bonus)) {
			gunships[i].invincibleTimeLeft = 4000;
			bonus.star.destroy();
			removeObjectWithModel(bonus);
			isThereABonus = false;
			this.stop();
		}
	}
	});
	animation.start();
	
}

function checkLastBonus (gunship) {
    if (lastBonus == invincibility)
        invincibility_pickup(gunship);
    
}

function isPlacementOK (bonus) {
	for (var i = 0; i < gunships.length; i++) {
		if (detectCollisionBetweenTwoRectangles(gunships[i], bonus)) {
			return false;
		}
	}
	i = 0;
	for (; i < allBullets.length; i++) {
		if (detectCollisionBetweenTwoRectangles(allBullets[i], bonus))
			return false;
	}
	return true;
}

function InvincibilityBonus () {

    // Random X and Y inside the stage
    var randomX = Math.floor(Math.random() * (stage.getWidth() - 100) + 50);
    var randomY = Math.floor(Math.random() * (stage.getHeight() - 100) + 50);

    this.relativeOffsetX = 0;
    this.relativeOffsetY = 0;

    this.model = new Kinetic.Rect({
    x: randomX,
    y: randomY,
    width: 50,
    height: 50,
    fill: 'black',
            strokeWidth: 2,
            stroke: 'white'
    });
    
    var iR = 25*((3-Math.sqrt(5))/2);
    this.star = new Kinetic.Star({
        x: randomX,
        y: randomY,
        numPoints:5,
        innerRadius: 10,
        outerRadius: 26.18,
        fill: 'yellow',
        strokeWidth:0,
        offsetX: -25,
        offsetY: -26
        
     });
	  
	
}
function invincibilityPickup(gunship){
    if (gunship.invincibleTimeLeft == 0 && gunship.model.getFill() != gunship.mainColor) {
            gunship.model.setFill(gunship.mainColor);
    }
    else if (gunship.invincibleTimeLeft > 0) {
        gunship.invincibleTimeLeft -= Math.min(timeSinceLastFrameMS, gunship.invincibleTimeLeft);
        if (gunship.timeToNextChangeOfColour > 0)
                gunship.timeToNextChangeOfColour--;
        else {
                gunship.timeToNextChangeOfColour = 5;
                if (gunship.model.getFill() == gunship.mainColor)
                        gunship.model.setFill(gunship.invincibleColor);
                else
                        gunship.model.setFill(gunship.mainColor);
        }
    }
    
}