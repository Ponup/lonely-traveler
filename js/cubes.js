function drawCubes(scene, world, data) {
	var material = new THREE.MeshLambertMaterial( { color: world.cubeColor, overdraw: 0.5 } );

	var group = new THREE.Group();

	for(var i = 0;  i < data.length; i++) {
		var row = data[i];
		for(var j = 0; j < row.length; j++) {
			var geometry = new THREE.BoxGeometry( 50, row[j], 50 );
			var cube = new THREE.Mesh( geometry, material );
//			cube.scale.y = row[j];

			cube.position.x = (i * 50) - 475;
			cube.position.y = row[j]>>1;
			cube.position.z = (j * 50) - 475;

			group.add( cube );
		}
	}

	return group;
}

