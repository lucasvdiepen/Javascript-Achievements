//Player values
let playerImage;
let player;
let playerStartHeight = 820;

//Bullet values
let bullets = [];

let screenWidth = 1200;
let screenHeight = 900;

class Bullet{
    speed = 10;
    x = -1;
    y = playerStartHeight;

    constructor(_x)
    {
        x = _x;
    }

    Update()
    {

    }

    Draw()
    {

    }
}

class Player {
    speed = 5;
    x = 0;
    sprite = null;
    moveDirection = 0;

    constructor(_playerImage = playerImage)
    {
        this.sprite = _playerImage;
        this.x = screenWidth / 2;
    }

    Update()
    {
        if((this.x <= 100 && this.moveDirection != 1) || (this.x >= screenWidth - 100 && this.moveDirection != -1))
        {
            //freeze movement
        }
        else
        {
            this.x += this.moveDirection * this.speed;
        }
        
        
    }

    Draw()
    {
        playerImage.resize(50, 50);
        image(player.sprite, player.x, playerStartHeight);
    }

    Shoot()
    {
        bullets.push(Bullet(this.x));
    }
}

function preload()
{
    playerImage = loadImage("Art/player.png");
}

function setup() {
    createCanvas(screenWidth, screenHeight);
    player = new Player();
}

function update(){
    //Update all game objects

    //Update player
    player.Update();

    //Update bullets
    for(var i = bullets.length - 1; i>=0; i--)
    {
        bullets[i].Update();
    }
}

function draw() {
    //Update game logic
    update()

    //Draw
    background(220);
    
    //draw player
    player.Draw();

    for(var i = 0; i < bullets.length; i++)
    {
        bullets[i].Draw();
    }
}

function keyPressed()
{
    if(keyCode == LEFT_ARROW) player.moveDirection = -1;
    else if(keyCode == RIGHT_ARROW) player.moveDirection = 1;
}

function keyReleased()
{
    if(keyCode == LEFT_ARROW) player.moveDirection = 0;
    if(keyCode == RIGHT_ARROW) player.moveDirection = 0;
}