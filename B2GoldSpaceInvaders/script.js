//Sprites
let playerSprite;
let enemySprite;

//Player values
let player;
let playerStartHeight = 620;

//Bullet values
let bullets = [];

//Enemy values
let enemies = [];
let enemyDirection = 1;
let enemyStepDelay = 1500;

let lastEnemyMove = -3000;

//Screen values
let screenWidth = 1200;
let screenHeight = 700;

function Millis(){ return performance.now();}

function preload()
{
    playerSprite = loadImage("Art/player.png");
    enemySprite = loadImage("Art/enemy_black.png");
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
        if(bullets[i].Update()) bullets.splice(i, 1);
    }

    //Update enemies
    if(Millis() > (lastEnemyMove + enemyStepDelay))
    {
        let switchDirection = false;

        for(var i = 0; i < enemies.length; i++)
        {
            if(enemies[i].Update()) switchDirection = true; //Update return true if one of the enemies hit the wall
        }

        if(switchDirection) enemyDirection *= -1;
        lastEnemyMove = Millis();
    }
}

function draw() {
    //Update game logic
    update()

    //Draw
    background(220);
    
    //Draw player
    player.Draw();

    //Draw bullets
    for(var i = 0; i < bullets.length; i++)
    {
        bullets[i].Draw();
    }

    //Draw enemies
    for(var i = 0; i < enemies.length; i++)
    {
        enemies[i].Draw();
    }
}

function keyPressed()
{
    if(keyCode == LEFT_ARROW) player.moveDirection = -1;
    else if(keyCode == RIGHT_ARROW) player.moveDirection = 1;
    else if(keyCode == 32) player.Shoot();
    else if(keyCode == UP_ARROW) enemies.push(new Enemy(enemySprite, 250, 50));
}

function keyReleased()
{
    if(keyCode == LEFT_ARROW) player.moveDirection = 0;
    if(keyCode == RIGHT_ARROW) player.moveDirection = 0;
}