let playerImage;
let playerDirection = 50;

//document.onkeydown = keys;

function preload()
{
    playerImage = loadImage("Art/player.png");
}

function setup() {
    createCanvas(800, 800);
}
  
function draw() {
    background(220);
    playerImage.resize(50, 50);
    image(playerImage, playerDirection, 100);
}

function keyPressed()
{
    if(keyCode == LEFT_ARROW) playerDirection = -1;
    else if(keyCode == RIGHT_ARROW) playerDirection = 1;
}