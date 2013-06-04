#pragma strict

private var bulletSpeed : int = 10;

function Start () {

}

function Update () {
	Move();
}

function Move () {
	transform.Translate(Vector3.right * bulletSpeed * Global.deltaTime);
}

function DoubleSpeed () {
	bulletSpeed *= 2;
}