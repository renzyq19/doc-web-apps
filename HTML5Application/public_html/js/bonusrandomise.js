
/*************************************************************************
**************************************************************************
****************************** DO NOT TOUCH ******************************
**************************************************************************
*************************************************************************/






var bonusAnimation = new Kinetic.Animation (function (frame) {
	timeSinceLastBonus += frame.timeDiff;
	if (timeSinceLastBonus > config.minimumTimeBetweenBonuses) {
		var randomNumber = Math.random() * 1000;
		/* The next formula is such that each second, there is a certain probability to create
		 * a new bonus. This probability is increasing exponentially, following an x^2-like 
		 * curve, and is equal to 10% at 9 seconds (over the whole second) after the last bonus
		 */
		if (randomNumber < (probability(timeSinceLastBonus / 1000) * frame.timeDiff / 1000)) {
			debugText.setText("BONUS!");
			timeSinceLastBonus = 0;
			instantiateBonus();
		}
	}
}, layer);

bonusAnimation.start();

/* Returns a number such that it stands between 0 and 1000 if
 * x stands between 0 and 30 (seconds)
 */
function probabilityFunction (x) {
	return ((x/3)^2) * 10;
}

function instantiateBonus () {
	var check = new Invincibility();
}

function isPlacementOK (bonus) {
	for (var i = 0; i < gunships.length; i++) {
		if (detectCollisionBetweenTwoRectangles(gunships[i], bonus)
			return false;
	}
	for (i = 0; i < allBullets.length; i++) {
		if (detectCollisionBetweenTwoRectangles(allBullets[i].length, bonus)
			return false;
	}
	return true;
}

function Invincibility () {
	
	// Random X and Y inside the stage
	var randomX = Math.floor(Math.random() * (stage.getWidth() - 100) + 50);
	var randomY = Math.floor(Math.random() * (stage.getHeight() - 100) + 50);
	
	var relativeOffsetX = 25;
	var relativeOffsetY = 25;
	
	this.model = new Kinetic.Rectangle({
		x: randomX,
		y: randomY,
		width: 50,
		height: 50,
		fill: "white"
	});
	
	while (!isPlacementOK(this)) {
		this.model.setX(Math.floor(Math.random() * (stage.getWidth() - 100) + 50));
		this.model.setY(Math.floor(Math.random() * (stage.getHeight() - 100) + 50));
	}
	
	layer.add(model);
}