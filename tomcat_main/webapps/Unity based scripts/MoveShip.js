#pragma strict

private var cumulatedDeltaTime : float;
private var speed : int;
private var down : KeyCode;
private var left : KeyCode;
private var right : KeyCode;
private var up : KeyCode;
private var forcedRotate : boolean;
private var initialRotation : int;
private var initialPosition : int;

var currentRotation : int;

function Start () {
	InitialiseKeys();
	cumulatedDeltaTime = 0;
	speed = 5;
	currentRotation = transform.localEulerAngles.z;
}

function Update () {
	GetInput();
	CheckRotation();
	CheckCollision();
	Move();
	ExactRotation();
}

function InitialiseKeys () {
	if (this.gameObject.name == "Spaceship 1") {
		up = KeyCode.UpArrow;
		down = KeyCode.DownArrow;
		left = KeyCode.LeftArrow;
		right = KeyCode.RightArrow;
	}
	else if (this.gameObject.name == "Spaceship 2") {
		up = KeyCode.W;
		down = KeyCode.S;
		left = KeyCode.A;
		right = KeyCode.D;
	}
	else if (this.gameObject.name == "Spaceship 3") {
		up = KeyCode.T;
		down = KeyCode.G;
		left = KeyCode.F;
		right = KeyCode.H;
	}
	else if (this.gameObject.name == "Spaceship 4") {
		up = KeyCode.I;
		down = KeyCode.K;
		left = KeyCode.J;
		right = KeyCode.L;
	}
}

function GetInput () {
	if (Input.GetKeyDown(left))
		NormalRotation(180 - currentRotation);
	else if (Input.GetKeyDown(right))
		NormalRotation(-currentRotation);
	else if (Input.GetKeyDown(up))
		NormalRotation(90 - currentRotation);
	else if (Input.GetKeyDown(down))
		NormalRotation(-90 - currentRotation);
}

function GetDirection (rotation : int) : Vector3 {
	if (rotation == 0 || rotation == 360)
		return Vector3(1, 0, 0);
	else if (rotation == 90 || rotation == -270)
		return Vector3(0, 1, 0);
	else if (rotation == 180 || rotation == -180)
		return Vector3(-1, 0, 0);
	else if (rotation == -90 || rotation == 270)
		return Vector3(0, -1, 0);
	else {
		Debug.LogError("MoveShip@GetDirection(rotation : int). Invalid rotation: " + rotation);
		return Vector3.zero;
	}
}

function Move () {
	transform.Translate(Vector3.right * Global.deltaTime * speed);
}

function UpdateRotation (toAdd : int) {
	currentRotation += toAdd;
	if (currentRotation >= 360)
		currentRotation -= 360;
	else if (currentRotation < 0)
		currentRotation += 360;
}

function CheckNotNear (extra : String) {
	if (!forcedRotate) {
		var hit : RaycastHit;
		if (Physics.Raycast(GameObject.Find(this.name + extra).transform.position, GetDirection(currentRotation), hit, 0.4)) {
			if ((hit.rigidbody.gameObject.tag == "Bound" || hit.rigidbody.gameObject.tag == "Player") && hit.rigidbody.gameObject.name != gameObject.name) {
				forcedRotate = true;
				if (hit.rigidbody.gameObject.tag == "Player" && hit.rigidbody.gameObject.GetComponent(MoveShip).IsDirectionParallelTo(currentRotation)) {
					hit.rigidbody.gameObject.SendMessage("ChangeDirection");
				}
			}
		}
	}
}

function CheckRotation () {
	CheckNotNear("/Top right extra");
	CheckNotNear("/Bottom right extra");
	if (forcedRotate)
		ForcedRotation();
}

function ChangeDirection () {
	forcedRotate = true;
}

function ForcedRotation () {
	transform.Rotate(0, 0, 180);
	UpdateRotation(180);
	forcedRotate = false;
}

function NormalRotation (rotation : int) {
	transform.Rotate(0, 0, rotation);
	UpdateRotation(rotation);
}

function DisableScript () {
	this.enabled = false;
}

function ExactRotation () {
	if (transform.localEulerAngles.z > -20 && transform.localEulerAngles.z < 20)
		transform.localEulerAngles.z = 0;
	else if (transform.localEulerAngles.z > 70 && transform.localEulerAngles.z < 110)
		transform.localEulerAngles.z = 90;
	else if (transform.localEulerAngles.z > 160 && transform.localEulerAngles.z < 200)
		transform.localEulerAngles.z = 180;
	else if (transform.localEulerAngles.z > 250 && transform.localEulerAngles.z < 290)
		transform.localEulerAngles.z = 270;
}

function IsDirectionParallelTo (rotation : int) : boolean {
	if (Mathf.Abs(rotation - currentRotation)/90 % 2 == 0)
		return true;
	else
		return false;
}

function CheckCollision () {
	transform.position.z = 0;
	transform.localEulerAngles.x = 0;
	transform.localEulerAngles.y = 0;
	rigidbody.velocity = Vector3.zero;
	rigidbody.angularVelocity = Vector3.zero;
}