#pragma strict

private var width : int;
private var height : int;
private var myStyle : GUIStyle;
private var replay : Rect;

function Start () {
	InitialiseMyStyle();
	width = Screen.width;
	height = Screen.height;
	replay = Rect(width/2 - 50, height/2 - 50, 100, 50);
}

function Update () {

}

function OnGUI () {
	for (var i : int = 0; i <= 3;i++) {
		var display : String;
		display = "SCORE " + Global.scores[i] + "\t HIT " + Global.hasBeenHit[i] + " TIMES";
		if (i == 0)
			GUI.Label(Rect(width/15, height/6, width/4, height/8), display, myStyle);
		else if (i == 1)
			GUI.Label(Rect(14*width/15 - width/4, height/6, width/4, height/8), display, myStyle);
		else if (i == 2)
			GUI.Label(Rect(width/15, 3*height/4, width/4, height/8), display, myStyle);
		else
			GUI.Label(Rect(14*width/15 - width/4, 3*height/4, width/4, height/8), display, myStyle);
	}
	GUI.Box(replay, "REPLAY", myStyle);
	CheckReplay();
}

function InitialiseMyStyle () {
	myStyle = new GUIStyle();
	myStyle.fontSize = 16;
	myStyle.normal.textColor = Color.cyan;
}

function CheckReplay () {
	var e : Event = Event.current;
	if (e.type == EventType.MouseDown && e.button == 0 && replay.Contains(e.mousePosition))
		Application.LoadLevel("Menu");
}