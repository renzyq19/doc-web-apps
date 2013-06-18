var currentBonus = "";
var timeSinceLastBonus = 0;
var isThereABonus = false;
var timeLeftForCurrentBonus = 0;

var bonus;

function instantiateBonus () {
	var random = Math.floor(Math.random() * 3);
	if (random == 0)
		bonus = new GunDisabledBonus();
	else if (random == 1)
		bonus = new InvincibilityBonus();
	else
		bonus = new LifeBonus();
	layer.add(bonus.model);
	layer.add(bonus.display);
	bonus.display.moveToTop();
	
	while (!isPlacementOK(bonus)) {
		var randomX = Math.floor(Math.random() * (stage.getWidth() - 100) + 50);
		var randomY = Math.floor(Math.random() * (stage.getHeight() - 100) + 50);
		bonus.model.setX(randomX);
		bonus.model.setY(randomY);
		bonus.display.setX(randomX);
		bonus.display.setY(randomY);
	}
	
	startAnimationToPickUp(bonus);
	
}

function bonusRandomise (timeDiff) {
	if (!isThereABonus) {
		timeSinceLastBonus += timeDiff;
		if (timeSinceLastBonus > config.minimumTimeBetweenBonuses) {
			var randomNumber = Math.random() * 1000;
			if (randomNumber < timeDiff/6) {
					timeSinceLastBonus = 0;
					isThereABonus = true;
					instantiateBonus();
			}
		}
	}
}

function bonusInProgress (gunship) {
	var animation = new Kinetic.Animation(function (frame) {
		if (timeLeftForCurrentBonus == 0) {
			endOfBonus(gunship);
			currentBonus = "";
			this.stop();
		}
		else {
			timeLeftForCurrentBonus -= Math.min(frame.timeDiff, timeLeftForCurrentBonus);
			updateBonus(gunship);
		}
	}, layer);
	
	animation.start();
}

function updateBonus(gunship) {
	if (currentBonus == "invincibility") {
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
	else if (currentBonus == "gunDisabled") {
		for (var i = 0; i < gunships.length; i++) {
				if (gunships[i].model.getName() != gunship.model.getName()) {
					gunships[i].gun.setRotation(gunships[i].model.getRotation());
					gunships[i].gun.setX(gunships[i].model.getX());
					gunships[i].gun.setY(gunships[i].model.getY());
				}
			}
	}
}

function endOfBonus(gunship) {
	gunship.model.setFill(gunship.mainColor);
	if (currentBonus == "invincibility")
		gunship.isInvincible = false;
	else if (currentBonus == "gunDisabled") {
		for (var i = 0; i < gunships.length; i++) {
			if (gunships[i] != gunship) {
				gunships[i].gunEnabled = true;
				gunships[i].gun.setVisible(false);
			}
		}
	}
}

function startAnimationToPickUp(bonus) {
	var animation = new Kinetic.Animation(function (frame) {
		for (var i = 0; i < gunships.length; i++) {
			if (detectCollisionBetweenTwoRectangles(gunships[i], bonus)) {
				isThereABonus = false;
				currentBonus = bonus.name;
				bonus.display.destroy();
				removeObjectWithModel(bonus);
				bonusPickedUp(gunships[i]);
				bonusInProgress(gunships[i]);
				this.stop();
			}
		}
	}, layer);
	
	animation.start();
}

function bonusPickedUp (gunship) {
	if (currentBonus == "invincibility") {
		gunship.isInvincible = true;
		timeLeftForCurrentBonus = 4000;
	}
	else if (currentBonus == "gunDisabled") {
		for (var i = 0; i < gunships.length;i++) {
			if (gunships[i] != gunship) {
				gunships[i].gun.setRotation(gunships[i].model.getRotation());
				gunships[i].gun.setX(gunships[i].model.getX());
				gunships[i].gun.setY(gunships[i].model.getY());
				gunships[i].gunEnabled = false;
				gunships[i].gun.setVisible(true);
				gunships[i].gun.moveToTop();
			}
		}
		timeLeftForCurrentBonus = 4000;
	}
	else if (currentBonus == "life")
		incrementLives(gunship);
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

function bonusModelDisplay(_x, _y) {
	return new Kinetic.Rect({
		x: _x,
		y: _y,
		width: 50,
		height: 50,
		fill: 'black',
		strokeWidth: 2,
		stroke: 'white'
    });
}

function InvincibilityBonus () {

    // Random X and Y inside the stage
    var randomX = Math.floor(Math.random() * (stage.getWidth() - 100) + 50);
    var randomY = Math.floor(Math.random() * (stage.getHeight() - 100) + 50);
	
	this.name = "invincibility";

    this.relativeOffsetX = 0;
    this.relativeOffsetY = 0;

    this.model = bonusModelDisplay(randomX, randomY);
    
    this.display = new Kinetic.Star({
        x: randomX,
        y: randomY,
        numPoints:5,
        innerRadius: 10,
        outerRadius: 26.18,
        fill: 'yellow',
        strokeWidth:0,
        offsetX: -25,
        offsetY: -25
    });
}

function GunDisabledBonus () {
	var randomX = Math.floor(Math.random() * (stage.getWidth() - 100) + 50);
    var randomY = Math.floor(Math.random() * (stage.getHeight() - 100) + 50);
	
	this.name = "gunDisabled";

    this.relativeOffsetX = 0;
    this.relativeOffsetY = 0;
	
	this.model = bonusModelDisplay(randomX, randomY);
	
	var gunship = new Kinetic.Polygon({
		x: 0,
		y: 0,
		points:[ 0,  -1,
				28,  -1,
				28,  3,
				20,  3,
				20,  6,
				34,  6,
				34, 13,
				20, 13,
				20, 16,
				28, 16,
				28, 20,
				 0, 20],
		fill: 'yellow',
		strokeWidth:0,
        offsetX: -8,
        offsetY: -15
	});
	
	var line1 = new Kinetic.Line({
		x: 0,
		y: 0,
		points: [34, 4,
				 21, 15],
		stroke: 'red',
		offsetX: -8,
        offsetY: -15
	});
	
	var line2 = new Kinetic.Line({
		x: 0,
		y: 0,
		points: [34, 15,
				 21, 4],
		stroke: 'red',
		offsetX: -8,
        offsetY: -15
	});
	
	this.display = new Kinetic.Group({
		x: randomX,
		y: randomY
	});
	
	this.display.add(gunship);
	this.display.add(line1);
	this.display.add(line2);
}

function LifeBonus () {
	var randomX = Math.floor(Math.random() * (stage.getWidth() - 100) + 50);
    var randomY = Math.floor(Math.random() * (stage.getHeight() - 100) + 50);
	
	this.name = "life";

    this.relativeOffsetX = 0;
    this.relativeOffsetY = 0;
	
	this.model = bonusModelDisplay(randomX, randomY);
	
	this.display = new Kinetic.Text({
		x: randomX + 5,
		y: randomY + 5,
		text: "+1",
		fontSize:40,
		stroke: 'pink',
		fill: 'pink'
	});
	
}