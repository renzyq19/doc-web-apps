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
			var random = (Math.floor(Math.random() * 3) + 1) * 90;
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
		//TODO: Last case with difficulty = 2 (check for all rotations)
	}
	// No else because of the stupid easy AI that can "move" without changing rotation
	if (gunship.timeSinceLastMove > 2000) {
		rotation += (Math.floor(Math.random() * 3) + 1) * 90;
		rotation = rotation % 360;
		turnGunship(gunship, rotation);
	}
}

function workOutMove (gunship) {
	if (gunship.difficulty == 0 && gunship.timeSinceLastCheck > 800) {
		checkGunship(gunship);
	}
	else if (gunship.difficulty == 1 && gunship.timeSinceLastCheck > 500) {
		checkGunship(gunship);
	}
	else if (gunship.difficulty == 2 && gunship.timeSinceLastCheck > 200) {
		checkGunship(gunship);
	}
}

function checkGunship(gunship) {
	gunship.timeSinceLastCheck = 0;
	changeRotation(gunship);
}

function turnGunship(gunship, rotation) {
	gunship.model.setRotationDeg(rotation);
	gunship.timeSinceLastMove = 0;
}