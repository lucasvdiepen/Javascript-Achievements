// voeg controls toe (teleport & WASD controls)
const controls = new Controls(50);
controls.enableMovement();

// create a model
const minecraftModel = new Model('assets/models/minecraft/scene.gltf');
minecraftModel.setPosition(-1.48877, 1.54, -2.46949);
minecraftModel.setScale(0.1, 0.1, 0.1);
minecraftModel.setRotation(0, -36.95, 0);

const cuberoom = new Model("assets/models/cube-room/cube-room.gltf");
cuberoom.setPosition(-2.50535, 0.91001, -3.21484);
cuberoom.setScale(0.33668, 0.44443, 0.16213);
cuberoom.setRotation(0, -36.95, 0);

// create a primitive (sphere)
const sphere = new Sphere();
sphere.setColor('green');
sphere.setRadius(0.5);
sphere.setPosition(-3, 0, -5);

// create some text
const testText = new Text('Javascript les 4');
testText.setPosition(1.5, 0, -5);
testText.setFontsize(20);
testText.setColor("white");

// create an image
const image = new XRImage('assets/images/sampleImage.jpg');
image.setPosition(-1.48819, 2.45839, -5);

// create a 360 image
const image360 = new Sky('assets/360_world.jpg');

const spotLight = new SpotLight();
spotLight.setPosition(-3.39382, 4.72931, 1.37905);
spotLight.setTarget(minecraftModel);

// listen for an event
minecraftModel.addEventListener('click', () => console.log('je klikt op mij'));