
Direction = {
	North: 0,
	South: 1,
	East: 2,
	West: 3
};

function drawPlayerArrow() {

	var geometry = new THREE.Geometry();
	var vertices = [];
	vertices.push( new THREE.Vector3(  0, 0,0 ) );
	vertices.push( new THREE.Vector3(  0, 0,10 ) );
	vertices.push( new THREE.Vector3( -5, 0,10 ) );
	vertices.push( new THREE.Vector3(  5, 0,20 ) );
	vertices.push( new THREE.Vector3(  15,0, 10 ) );
	vertices.push( new THREE.Vector3(  10,0, 10 ) );
	vertices.push( new THREE.Vector3(  10,0, 0 ) );
	vertices.push( new THREE.Vector3(  0,0, 0 ) );
	vertices.forEach(function(vert) {
		geometry.vertices.push(vert);
	});


	var material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } );

	var line = new THREE.Line( geometry, material );
	var scale = 4;
	line.scale.set(scale, scale, scale);
	return line;
}

function drawPlayer(scene, model) {
	var player = {
		direction: [ Direction.South, Direction.East, Direction.North, Direction.West ],
		gridx: 0,
		gridy: 0,
		rotateLeft: function() {
			var dir = this.direction.shift();
			this.direction.push(dir);
			this.mesh.rotateY(Math.PI/2);
		},
		rotateRight: function() {
			var dir = this.direction.pop();
			this.direction.unshift(dir);
			this.mesh.rotateY(-(Math.PI/2));
		},
		rotateBack: function() {
			this.rotateRight();
			this.rotateRight();
		}
	};
	var arrow = drawPlayerArrow();
	var container = new THREE.Group();
	player.mesh = model; 
	player.mesh.name = 'traveler';
	player.mesh.add(container);
	container.add(arrow);
	var material  = new THREE.MeshNormalMaterial()
	model.scale.set(100,100,100);
	container.scale.divideScalar(20);
//	player.mesh.scale.set(20,20,20);
	arrow.scale.set(1,1,1);
	arrow.position.set(-5, 0, -5);
	player.mesh.position.y = 10;
	return player;
}

