
var keyboard;

function initInput() {
	keyboard = new THREEx.KeyboardState();
}

function updateInput() {
	if(keyboard.pressed('left')) {
		keyboard.clear('left');
		player.rotateLeft();
	}
	if(keyboard.pressed('right')) {
		keyboard.clear('right');
		player.rotateRight();
	}
	if(keyboard.pressed('down')) {
		keyboard.clear('down');
		player.rotateBack();
	}

	if(keyboard.pressed('up')) {
		keyboard.clear('up');
		switch(player.direction[0]) {
			case Direction.North:
				if(player.gridy > 0)
					player.gridy--;
				break;
			case Direction.South:
				if(player.gridy < 19)
					player.gridy++;
				break;
			case Direction.West:
	   			if(player.gridx > 0)
					player.gridx--;
				break;
			case Direction.East:
				if(player.gridx < 19)
					player.gridx++;
				break;
		}
	}

	if(keyboard.pressed('a')) {
		keyboard.clear('a');
		camera.position.x = -tw;
		camera.position.z = -tw;
	}
	if(keyboard.pressed('d')) {
		keyboard.clear('d');
		camera.position.x = tw;
		camera.position.z = tw;
	}
	if(keyboard.pressed('w')) {
		keyboard.clear('w');
		camera.position.x = tw;
		camera.position.z = -tw;
	}
	if(keyboard.pressed('s')) {
		keyboard.clear('s');
		camera.position.x = -tw;
		camera.position.z = tw;
	}
	camera.updateProjectionMatrix();

}

