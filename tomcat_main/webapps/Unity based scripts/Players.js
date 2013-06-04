#pragma strict

static var numberPlayers : int;
static var width : int;
static var height : int;

private var myStyle : GUIStyle;
private var myBoxStyle : GUIStyle;
private var addPlayerRect : Rect;
private var removePlayerRect : Rect;
private var play : Rect;

function Start () {
	numberPlayers = 1;
	width = Screen.width;
	height = Screen.height;
	addPlayerRect = Rect(width/2 - 50, 5*height/11 - 50, 100, 20);
	removePlayerRect = Rect(width/2 - 25, 6*height/11 - 20, 50, 20);
	play = Rect(width/2 - 50, 11*height/12, 100, 50);
	InitialiseMyStyle();
	InitialiseMyBoxStyle();
}

function Update () {

}

function OnGUI () {
	DisplayNumberPlayers();
	DisplayPlayers();
	GUI.Box(addPlayerRect, "ADD A PLAYER", myBoxStyle);
	GUI.Box(removePlayerRect, "REMOVE A PLAYER", myBoxStyle);
	GUI.Box(play, "PLAY", myStyle);
	UpdatePlayersWindow();
}

function DisplayNumberPlayers () {
	GUI.Label(Rect(width/2 - 50, height/2 - 50, 100, 50), numberPlayers + " PLAYER" + (numberPlayers > 1 ? "S" : ""), myStyle);
}

function DisplayPlayers () {
	DisplayPlayerOne();
	DisplayPlayerTwo();
	DisplayPlayerThree();
	DisplayPlayerFour();
}

function DisplayPlayerOne () {
	GUI.Label(Rect(width/15, height/6, width/4, height/8), "UP\nLEFT\t\t\tSPACE\t\t\tRIGHT\nDOWN", myStyle);
}

function DisplayPlayerTwo () {
	if (numberPlayers >= 2) {
		GUI.Label(Rect(14*width/15 - width/4, height/6, width/4, height/8), "W\nA\t\t\tQ\t\t\tD\nS", myStyle);
	}
}

function DisplayPlayerThree () {
	if (numberPlayers >= 3) {
		GUI.Label(Rect(width/15, 5*height/6 - height/8, width/4, height/8), "T\nF\t\t\tR\t\t\tH\nG", myStyle);
	}
}

function DisplayPlayerFour () {
	if (numberPlayers >= 4) {
		GUI.Label(Rect(14*width/15 - width/4, 5*height/6 - height/8, width/4, height/8), "I\nJ\t\t\tU\t\t\tL\nK", myStyle);
	}
}

function InitialiseMyStyle () {
	myStyle = new GUIStyle();
	myStyle.normal.textColor = Color.red;
	myStyle.fontSize = width/50;
	myStyle.alignment = TextAnchor.MiddleCenter;
}

function InitialiseMyBoxStyle () {
	myBoxStyle = new GUIStyle();
	myBoxStyle.normal.textColor = Color.blue;
	myBoxStyle.fontSize = width/50;
	myBoxStyle.alignment = TextAnchor.UpperCenter;
}

function UpdatePlayersWindow () {
	var e : Event = Event.current;
	if (e.type == EventType.MouseDown && e.button == 0 && addPlayerRect.Contains(e.mousePosition)) {
		if (numberPlayers < 4)
			numberPlayers++;
	}
	else if (e.type == EventType.MouseDown && e.button == 0 && removePlayerRect.Contains(e.mousePosition)) {
		if (numberPlayers > 1)
			numberPlayers--;
	}
	else if (e.type == EventType.MouseDown && e.button == 0 && play.Contains(e.mousePosition)) {
		Application.LoadLevel("Play");
	}
}