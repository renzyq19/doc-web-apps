#pragma strict

var numberOfShips : int;
var numberPlayers : int;

function Start () {
	numberOfShips = 4;
	numberPlayers = Mathf.Max(Players.numberPlayers, 4);
	DisableScripts();
}

function Update () {
	IsGameStillOn();
}

function BulletOn (bullet : GameObject, other : Collider, sender : GameObject) {
	var obj : GameObject;
	obj = other.gameObject;
	while (obj.transform.parent != null)
		obj = obj.transform.parent.gameObject;
	if (obj.tag == "Player") {
		obj.GetComponent(ShipController).LoseLife();
		if (obj.name != sender.name) {
			sender.GetComponent(ShipController).IncrementScore();
			GetComponent(Global).HasHit(sender, obj);
		}
		else
			GetComponent(Global).HitItself(sender);
		Destroy(bullet);
	}
	else {
		var script : BulletExplosion;
		script = bullet.GetComponent(BulletExplosion);
		script.NotTriggered();
		if (script.HasHitTheWall())
			Destroy(bullet);
		else {
			bullet.transform.Rotate(Vector3(0, 0, 180));
			bullet.GetComponent(MoveBullet).DoubleSpeed();
			script.ChangeMesh();
		}
	}
}

function IsGameStillOn () {
	if (numberOfShips <= 1) {
		Application.LoadLevel("End Game");
	}
}

function DecrementShips () {
	numberOfShips--;
}

function DisableScripts () {
	if (numberPlayers <= 3)
		DisableScript(4);
	if (numberPlayers <= 2)
		DisableScript(3);
	if (numberPlayers == 1)
		DisableScript(2);
}

function DisableScript(scriptNum : int) {
	var name : String = "Spaceship ";
	name += scriptNum.ToString();
	GameObject.Find(name).GetComponent("MoveShip").SendMessage("DisableScript");
	GameObject.Find(name).GetComponent("ShootBullet").SendMessage("DisableScript");
}