#pragma strict

private var spaceship : GameObject;
private var pos : Transform;

function Start () {
	spaceship = transform.parent.gameObject;
	pos = spaceship.transform;
}

function Update () {
	pos = spaceship.transform;
}