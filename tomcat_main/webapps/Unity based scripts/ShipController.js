#pragma strict

private var lives : int;
private var width : int;
private var height : int;
private var score : int;
private var myStyle : GUIStyle;

function Start () {
	InitialiseMyStyle();
	lives = Global.numberOfLives;
	score = 0;
	width = Screen.width;
	height = Screen.height;
}

function Update () {
	
}

function LoseLife () {
	lives--;
	CheckAlive();
}

function IncrementScore () {
	score++;
}

function GetScore () : int {
	return score;
}

function GetLives () : int {
	return lives;
}

function CheckAlive () {
	if (lives <= 0)
		Destroy(this.gameObject);
}

function OnGUI () {
	var screenPos : Vector3 = Camera.allCameras[0].WorldToScreenPoint(transform.position);
	GUI.Label(Rect(screenPos.x - 10, Screen.height - screenPos.y - 10, 20, 20), lives.ToString(), myStyle);
}

function InitialiseMyStyle () {
	myStyle = new GUIStyle();
	myStyle.fontSize = 16;
	myStyle.normal.textColor = Color.cyan;
}