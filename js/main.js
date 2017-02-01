var worlds = {
	heaven: {
		id: 'heaven',
		bgColor: 0x1FCBD0,
		cubeColor: 0x0C7C8A,
		bgMusicId: 'heaven'
	},
	hell: {
		id: 'hell',
		bgColor: 0xF99155,
		cubeColor: 0xAD0C0C,
		bgMusicId: 'hell'
	}
};
var world = worlds.heaven;

function loadMusic() {
	createjs.Sound.addEventListener("fileload", onMusicLoaded);
	createjs.Sound.registerSounds([
		{id: 'heaven', src: 'heaven.wav'},
    	{id: 'hell', src: 'hell.wav'}
	]
	, 'sounds/');
}

var musicLoaded = 0;

function onMusicLoaded() {
	if(++musicLoaded === 2)
		initScene();
}

function initScene() {
	initInput();

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth - 50, window.innerHeight - 50 );

	container = document.getElementById('container');
	container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

	loadModels();
}

function loadModels() {
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'models/traveler.dae', onModelsLoaded,
		function ( xhr ) {
			//console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		}
	);
}

var playerModel = null;

function onModelsLoaded(collada) {
	playerModel = collada.scene;
	renderScene();
	drawWorld();
	animate();
}

function degreesToRadians(degrees) { return degrees * ( Math.PI/180); }
		
var container;
var camera, scene, renderer;
var tw = 200;

var cubes = null;
var cubeSize = 50;
		
function generateTerrain() {
	var data = [];
	for(var i = 0; i < 20; i++) {
		var row = [];
		for(var j = 0; j < 20; j++) {
			row.push(Math.floor(Math.random() * (j * i) + 1));
		}
		data.push(row);
	}
	return data;
}

function findMaxHeight(terrain) {
	var max = {x: 0, y: 0, value: 0};
	for(var i = 0; i < terrain.length; i++) {
		for(var j = 0; j < terrain[i].length; j++) {
			if(terrain[i][j] > max.value) {
				max = {x:i,y:j,value:terrain[i][j]};
			}
		}
	}
	
	return max;
}

var model = null;
var terrain = null, maxHeight = null;

function renderScene() {
	camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );
	camera.position.set(tw, 100, tw);
	camera.updateProjectionMatrix();

	scene = new THREE.Scene();
	scene.name = 'world';

	var axisHelper = new THREE.AxisHelper( 500 );
	axisHelper.name = 'axisHelper';
	axisHelper.visible = false;
	scene.add( axisHelper );

	var size = 1000;
	var step = 100;

	var gridHelper = new THREE.GridHelper( size, step );
	scene.add( gridHelper );

	var ambientLight = new THREE.AmbientLight( 0x30 );
	scene.add( ambientLight );

	var directionalLight = new THREE.DirectionalLight(0xF99155);
	directionalLight.position.x = 330;
	directionalLight.position.y = 0;
	directionalLight.position.z = 540;
	directionalLight.position.normalize();
	scene.add( directionalLight );
	var directionalLight2 = new THREE.DirectionalLight(0x00ffff);
	directionalLight2.position.x = 140;
	directionalLight2.position.y = 160;
	directionalLight2.position.z = 560;
	directionalLight2.position.normalize();
	scene.add( directionalLight2 );
	
	drawGrid(scene, cubeSize);

	player = drawPlayer(scene, playerModel);
	scene.add(player.mesh);
}

function drawWorld() {
	terrain = generateTerrain();
	maxHeight = findMaxHeight(terrain);

	player.gridx = player.gridy = 0;

	renderer.setClearColor( world.bgColor );
	if(cubes) { scene.remove(cubes); cubes = null; }

	cubes = drawCubes(scene, world, terrain);
	scene.add(cubes);

	setTimeout(function() {
		  createjs.Sound.play(world.bgMusicId);
	}, 3000);

}

function onWindowResize() {
	camera.left = window.innerWidth / - 2;
	camera.right = window.innerWidth / 2;
	camera.top = window.innerHeight / 2;
	camera.bottom = window.innerHeight / - 2;

	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	updateWorld();
	render();
}

function updateWorld() {
	updateInput();

	player.mesh.position.x = (player.gridx * 50)-475;
	player.mesh.position.z = (player.gridy * 50)-475;
	player.mesh.position.y = terrain[player.gridx][player.gridy];

	if(maxHeight.value <= player.mesh.position.y) {
		alert('You reached the top of the mountain! In this prototype no question is asked. You are going to go to the next world regardless.');
		world = world.id == 'heaven' ? world = worlds.hell : worlds.heaven;
		drawWorld();			
	}
}

function render() {
	camera.lookAt( scene.position );

	renderer.render( scene, camera );
}

