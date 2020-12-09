//Sprites
let playerSprite;
let enemySprite;
let enemyWalkSprite;
let enemy2Sprite;
let enemy2WalkSprite;
let enemy3Sprite;
let enemy3WalkSprite;

//Player values
let player;
let playerStartHeight = 620;
let playerWidth = 50;
let playerHeight = 50;

//Bullet values
let bullets = [];

//Enemy values
let enemies = [];
let enemyDirection = 1;
let enemyStepDelay = 1500;
let enemyWidth = 40;
let enemyHeight = 40;

let lastEnemyMove = -3000;

//Screen values
let screenWidth = 1200;
let screenHeight = 700;

function SpawnEnemies(){
    x = 200;
    y = 50;
    for(var j = 0; j < 5; j++)
    {
        let sprite = null;
        let walkSprite = null;
        if(j == 0) {sprite = enemy3Sprite; walkSprite = enemy3WalkSprite;}
        else if(j == 1 || j == 2) {sprite = enemySprite; walkSprite = enemyWalkSprite;}
        else if(j == 3 || j == 4){sprite = enemy2Sprite; walkSprite = enemy2WalkSprite;}
        for(var i = 0; i < 11; i++)
        {
            enemies.push(new Enemy(sprite, walkSprite, 20, x, y));
            x += 60;
        }
        x = 200;
        y += 50;
    }
    
}

function Millis(){ return performance.now();}

function preload()
{
    playerSprite = loadImage("Art/player.png");
    enemySprite = loadImage("Art/enemy1.png");
    enemyWalkSprite = loadImage("Art/enemy1Walk.png");
    enemy2Sprite = loadImage("Art/enemy2.png");
    enemy2WalkSprite = loadImage("Art/enemy2Walk.png");
    enemy3Sprite = loadImage("Art/enemy3.png");
    enemy3WalkSprite = loadImage("Art/enemy3Walk.png");
}

function setup() {
    createCanvas(screenWidth, screenHeight);
    player = new Player();
    SpawnEnemies();
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
    else if(keyCode == UP_ARROW) SpawnEnemies();
}

function keyReleased()
{
    if(keyCode == LEFT_ARROW) player.moveDirection = 0;
    if(keyCode == RIGHT_ARROW) player.moveDirection = 0;
}