#pragma strict

private var middleHead : GameObject;
private var timeToNextBullet : float;
private var shoot : KeyCode;
private var timeBetweenBullets = 0.6;

var bulletPrefab : Transform;

function Start () {
	timeToNextBullet = timeBetweenBullets;
	GetKeyCode();
	middleHead = GameObject.Find(this.name + "/Middle head");
}

function Update () {
	UpdateNextBullet();
	GetInput();
}

function GetKeyCode () {
	if (this.gameObject.name == "Spaceship 1")
		shoot = KeyCode.Space;
	else if (this.gameObject.name == "Spaceship 2")
		shoot = KeyCode.Q;
	else if (this.gameObject.name == "Spaceship 3")
		shoot = KeyCode.R;
	else if (this.gameObject.name == "Spaceship 4")
		shoot = KeyCode.U;
}

function UpdateNextBullet () {
	if (timeToNextBullet > 0)
		timeToNextBullet -= Global.deltaTime;
	if (timeToNextBullet < 0)
		timeToNextBullet = 0;
}

function Shoot () {
	if (timeToNextBullet == 0) {
		var bullet : Transform;
		bullet = Instantiate(bulletPrefab, middleHead.transform.position + middleHead.transform.localScale.x * transform.TransformDirection(Vector3.right), Quaternion.identity);
		bullet.rotation = transform.rotation;
		bullet.GetComponent(BulletExplosion).UpdateSender(this.gameObject);
		timeToNextBullet = timeBetweenBullets;
	}
}

function GetInput () {
	if (Input.GetKeyDown(shoot))
		Shoot();
}

function DisableScript () {
	this.enabled = false;
}