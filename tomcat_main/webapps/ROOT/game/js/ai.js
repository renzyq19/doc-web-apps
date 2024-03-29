function whatAreTheThreats (gunship) {
	var result = new Array();
	for (var i = 0;i < allBullets.length;i++) {
		if (willCollide(allBullets[i], gunship)) {
			result.push(allBullets[i]);
		}
	}
	return result;
}

function changeRotation (gunship) {
	var threats = whatAreTheThreats(gunship);
	var rotation = gunship.model.getRotationDeg();
	var random;
	if (threats.length > 0) {
		if (gunship.difficulty == 0) {
			rotation += (Math.floor(Math.random() * 4) + 1) * 90;
			rotation %= 360;
			if (rotation != gunship.model.getRotationDeg()) {
				turnGunship(gunship, rotation);
			}
		}
		else if (gunship.difficulty == 1) {
			var originalRotation = rotation;
			random = (Math.floor(Math.random() * 3) + 1) * 90;
			rotation += random;
			rotation %= 360;
			turnGunship(gunship, rotation);
			if (whatAreTheThreats(gunship).length > 0) {
				while (rotation == originalRotation
					|| rotation == ((originalRotation + random) % 360)) {
					rotation += (Math.floor(Math.random() * 3) + 1) * 90;
					rotation %= 360;
				}
				turnGunship(gunship, rotation);
			}
		}
		else if (gunship.difficulty == 2) {
			var threatsLengths = [threats.length];
			var possibleRotations = [];
			possibleRotations.push((rotation + 90) % 360);
			possibleRotations.push((rotation + 180) % 360);
			possibleRotations.push((rotation + 270) % 360);
			var i = 0;
			while (i < possibleRotations.length) {
				gunship.model.setRotationDeg(possibleRotations[i]);
				if (whatAreTheThreats(gunship).length > 0) {
					threatsLengths.push(possibleRotations[i]);
					possibleRotations.splice(i, 1);
				}
				else
					i++;
			}
			if (possibleRotations.length > 0) {
				var toTurn = possibleRotations[Math.floor(Math.random() * possibleRotations.length)];
				turnGunship(gunship, toTurn);
			}
			else {
				var index = indexMin(threatsLengths);
				if (index != 0)
					turnGunship(gunship, (rotation + 90 * index) % 360);
			}
		}
	}
	// No else because of the "stupid" easy AI that can "move" without changing rotation
	if (gunship.timeSinceLastMove > 2000 || (isThereABonus && gunship.timeSinceLastMove > 500)) {
		rotation += (Math.floor(Math.random() * 3) + 1) * 90;
		rotation = rotation % 360;
		if (isThereABonus) {
			rotation = workOutDirectionFrom(gunship, bonus);
		}
		turnGunship(gunship, rotation);
	}
}

function workOutDirectionFrom(gunship, bonus) {
	var upDown = 90;
	var leftRight = 0;
	if (gunship.model.getX() < bonus.model.getX())
		leftRight = 0;
	else if (gunship.model.getX() > bonus.model.getX())
		leftRight = 180;
	if (gunship.model.getY() < bonus.model.getY())
		upDown = 90;
	else if (gunship.model.getY() > bonus.model.getY())
		upDown = 270;
	var distanceOnX = 0;
	var distanceOnY = 0;
	distanceOnX = Math.abs(gunship.model.getX() - bonus.model.getX());
	distanceOnY = Math.abs(gunship.model.getY() - bonus.model.getY());
	if (distanceOnX > distanceOnY)
		return leftRight;
	else
		return upDown;
}

function indexMin(array) {
	var result = 0;
	for (var i = 0;i < array.length;i++) {
		if (array[i] <= array[result])
			result = i;
	}
	return result;
}

function workOutMove (gunship) {
	if (gunship.timeSinceLastCheck > difficultyCheckTimes[gunship.difficulty])
		checkGunship(gunship);
	if (gunship.timeSinceLastShootCheck > shootCheckTimes[gunship.difficulty])
		checkShoot(gunship);
}

function checkGunship(gunship) {
	gunship.timeSinceLastCheck = 0;
	changeRotation(gunship);
}

function checkShoot(gunship) {
	gunship.timeSinceLastShootCheck = 0;
	shoot(gunship);
}

function shoot(gunship) {
	if (gunship.gunEnabled && (gunship.timeToFire == 0)) {
		shootBullet(gunship);
	}
}

function turnGunship(gunship, rotation) {
	gunship.model.setRotationDeg(rotation);
	gunship.timeSinceLastMove = 0;
}