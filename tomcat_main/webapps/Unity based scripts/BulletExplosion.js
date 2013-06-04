#pragma strict

private var hasBeenTriggered : boolean;
private var hasHitTheWall : boolean;
private var sender : GameObject;

var newMesh : Material;

function Start () {
	hasBeenTriggered = false;
	hasHitTheWall = false;
}

function Update () {

}

function OnTriggerEnter (other : Collider) {
	if (!hasBeenTriggered && other.renderer.enabled) {
		hasBeenTriggered = true;
		GameObject.Find("Main Camera").GetComponent(Controller).BulletOn(this.gameObject, other, sender);
		hasHitTheWall = true;
	}
}

function HasHitTheWall () : boolean {
	return hasHitTheWall;
}

function NotTriggered () {
	hasBeenTriggered = false;
}

function UpdateSender (go : GameObject) {
	sender = go;
}

function ChangeMesh () {
	this.renderer.material = newMesh;
}