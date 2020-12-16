//Sprites
let playerSprite;
let enemySprite;
let enemyWalkSprite;
let enemy2Sprite;
let enemy2WalkSprite;
let enemy3Sprite;
let enemy3WalkSprite;
let explosionSprite;

//Game values
let startingLives = 3;
let defaultSpeed = 5;

//Player values
let player;
let playerStartHeight = 620;
let playerWidth = 50;
let playerHeight = 50;
let playerDeadDelay = 2000;

//Bullet values
let bullets = [];

//Explosion values
let explosions = [];
let explosionTime = 500;
let explosionWidth = 40;
let explosionHeight = 40;

//Enemy values
let enemies = [];
let enemyDirection = 1;
let enemyStepDelay = 1500;
let enemyShootDelay = 500;
let enemyWidth = 40;
let enemyHeight = 40;

let lastEnemyMove = -3000;
let lastEnemyShoot = -3000;

//Screen values
let screenWidth = 1200;
let screenHeight = 700;

//Obstacle values
let obstacles = [];

let obstacleStartHeight = 500;
let blockWidth = 12;
let blockHeight = 7;

let blocksInRow = 10;

function SpawnEnemies(){
    x = 200;
    y = 50;
    for(var j = 0; j < 5; j++)
    {
        let sprite = null;
        let walkSprite = null;
        let pointsToGive = 0;
        if(j == 0) {sprite = enemy3Sprite; walkSprite = enemy3WalkSprite; pointsToGive = 30;}
        else if(j == 1 || j == 2) {sprite = enemySprite; walkSprite = enemyWalkSprite; pointsToGive = 20;}
        else if(j == 3 || j == 4){sprite = enemy2Sprite; walkSprite = enemy2WalkSprite; pointsToGive = 10;}
        for(var i = 0; i < 11; i++)
        {
            enemies.push(new Enemy(sprite, walkSprite, pointsToGive, x, y));
            x += 60;
        }
        x = 200;
        y += 50;
    }
    
}

function Millis(){ return performance.now();}

function getRandomInt(max)
{
    return Math.floor(Math.random() * Math.floor(max));
}

function preload()
{
    playerSprite = loadImage("Art/player.png");
    enemySprite = loadImage("Art/enemy1.png");
    enemyWalkSprite = loadImage("Art/enemy1Walk.png");
    enemy2Sprite = loadImage("Art/enemy2.png");
    enemy2WalkSprite = loadImage("Art/enemy2Walk.png");
    enemy3Sprite = loadImage("Art/enemy3.png");
    enemy3WalkSprite = loadImage("Art/enemy3Walk.png");
    explosionSprite = loadImage("Art/explosion.png");
}

function setup() {
    createCanvas(screenWidth, screenHeight);

    player = new Player();

    StartGame();
}

function StartGame()
{
    //remove all
    enemies = [];
    obstacles = [];
    bullets = [];
    explosions = [];

    SpawnEnemies();

    obstacles.push(new Obstacle(270));
    obstacles.push(new Obstacle(570));
    obstacles.push(new Obstacle(870));

    player.Reset();
}

function update(){
    //Update all game objects

    //Update player
    player.Update();

    //Check if player should be respawned
    if(player.isDead)
    {
        if(Millis() > (player.deadTime + playerDeadDelay))
        {
            player.Respawn();
        }
    }

    //Update bullets
    for(var i = bullets.length - 1; i>=0; i--)
    {
        if(bullets[i].Update()) bullets.splice(i, 1);
    }

    //Update explosions
    for(var i = explosions.length -1; i >= 0; i--)
    {
        if(explosions[i].Update()) explosions.splice(i, 1);
    }

    //Update enemies

    //Enemy move
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

    //Enemy shoot
    if(Millis() > (lastEnemyShoot + enemyShootDelay))
    {
        if(enemies.length > 0)
        {
            let randomIndex = getRandomInt(enemies.length);

            enemies[randomIndex].Shoot();
    
            lastEnemyShoot = Millis();
        }
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

    for(var i = 0; i < explosions.length; i++)
    {
        explosions[i].Draw();
    }

    //Draw obstacles
    for(var i = 0; i < obstacles.length; i++)
    {
        obstacles[i].Draw();
    }
}

function keyPressed()
{
    if(keyCode == LEFT_ARROW) player.moveDirection = -1;
    else if(keyCode == RIGHT_ARROW) player.moveDirection = 1;
    else if(keyCode == 32) player.Shoot();
    else if(keyCode == UP_ARROW) obstacles[0].rows[0].skipAbove += 1;
    else if(keyCode == DOWN_ARROW) obstacles[0].rows[0].skipBelow += 1;
}

function keyReleased()
{
    if(keyCode == LEFT_ARROW) player.moveDirection = 0;
    if(keyCode == RIGHT_ARROW) player.moveDirection = 0;
}