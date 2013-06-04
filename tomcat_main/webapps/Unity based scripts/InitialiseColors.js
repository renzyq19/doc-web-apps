#pragma strict

function Start () {
	for (var child in transform) {
		var childTyped : Transform = child as Transform;
		if (childTyped.renderer != null) {
			if (gameObject.name == "Spaceship 1")
				childTyped.renderer.material.color = Color.red;
			else if (gameObject.name == "Spaceship 2")
				childTyped.renderer.material.color = Color.blue;
			else if (gameObject.name == "Spaceship 3")
				childTyped.renderer.material.color = Color.white;
			else if (gameObject.name == "Spaceship 4")
				childTyped.renderer.material.color = Color.green;
		}
	}
}

function Update () {

}