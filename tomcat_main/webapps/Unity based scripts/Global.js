#pragma strict

static var deltaTime : float;
static var scores : int[];
static var hasBeenHit : int[];
static var numberOfLives = 5;

function Start () {
	scores = new int[4];
	hasBeenHit = new int[4];
}

function Update () {
	deltaTime = Time.deltaTime;
}

function HasHit (hitBy : GameObject, hit : GameObject) {
	scores[GetNumber(hitBy)]++;
	hasBeenHit[GetNumber(hit)]++;
	if (hasBeenHit[GetNumber(hit)] >= numberOfLives) {
		GetComponent(Controller).DecrementShips();
	}
}

function HitItself (ship : GameObject) {
	hasBeenHit[GetNumber(ship)]++;
	if (hasBeenHit[GetNumber(ship)] >= numberOfLives) {
		GetComponent(Controller).DecrementShips();
	}
}

function GetNumber (ship : GameObject) {
	if (ship.name == "Spaceship 1")
		return 0;
	else if (ship.name == "Spaceship 2")
		return 1;
	else if (ship.name == "Spaceship 3")
		return 2;
	else if (ship.name == "Spaceship 4")
		return 3;
	else {
		print("Could not find spaceship named " + ship);
		return -1;
	}
}