//Sprites
let playerSprite;
let enemySprite;
let enemyWalkSprite;
let enemy2Sprite;
let enemy2WalkSprite;
let enemy3Sprite;
let enemy3WalkSprite;
let explosionSprite;
let ufoSprite;
let ufoExplosionSprite;

//Game values
let gameRunning = false;

let highscore = 0;

let startingLives = 3;

let lastTime = 0;
let deltaTime = 0;

//Player values
let player;
let playerStartHeight = 620;
let playerWidth = 50;
let playerHeight = 50;
let playerDeadDelay = 2000;
let playerShootDelay = 500;
let playerSpeed = 0.45;

//Bullet values
let bullets = [];

let defaultBulletSpeed = 0.7;

//Explosion values
let explosions = [];
let explosionTime = 500;
let explosionWidth = 40;
let explosionHeight = 40;

//Enemy values
let enemies = [];
let enemyStartingHeight = 100;
let enemyDirection = 1;
let enemyDown = false;
let enemyStartingStepDelay = 1500;
let enemyStepDelay = 1500;
let enemyShootDelay = 1000;
let enemySideStep = 50;
let enemyDownStep = 15;
let enemyWidth = 40;
let enemyHeight = 40;

let lastEnemyMove = -3000;
let lastEnemyShoot = -3000;

//Ufo values
let ufos = [];
let ufoWidth = 60;
let ufoHeight = 40;
let defaultUfoSpeed = 0.15;
let ufoStartHeight = 50;
let ufoStartWidth = 150;
let ufoPoints = [100, 200, 300, 400, 500];
let ufoWallTouches = 2;
let ufoSpawnDelay = 45000;

let lastUfoSpawn = 0;

//Screen values
let screenWidth = 1200;
let screenHeight = 700;

//Obstacle values
let obstacles = [];

let obstacleStartHeight = 500;
let blockWidth = 12;
let blockHeight = 7;

let blocksInRow = 10;

//ufo text values
let ufoText = [];
let ufoTextDelay = 2000;

function SpawnEnemies(){
    enemyStepDelay = enemyStartingStepDelay;
    x = 200;
    y = enemyStartingHeight;
    for(var j = 0; j < 5; j++)
    {
        let sprite = null;
        let walkSprite = null;
        let pointsToAdd = 0;
        if(j == 0) {sprite = enemy3Sprite; walkSprite = enemy3WalkSprite; pointsToAdd = 30;}
        else if(j == 1 || j == 2) {sprite = enemySprite; walkSprite = enemyWalkSprite; pointsToAdd = 20;}
        else if(j == 3 || j == 4){sprite = enemy2Sprite; walkSprite = enemy2WalkSprite; pointsToAdd = 10;}
        for(var i = 0; i < 11; i++)
        {
            enemies.push(new Enemy(sprite, walkSprite, pointsToAdd, x, y));
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

function ChooseRandom(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
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
    ufoSprite = loadImage("Art/ufo.png");
    ufoExplosionSprite = loadImage("Art/ufoExplosion.png");
}

function setup() {
    createCanvas(screenWidth, screenHeight);

    frameRate(60);

    player = new Player();

    highscore = localStorage.getItem("highscore");
    if(highscore == null) highscore = 0;

    StartGame();
}

function StartGame()
{
    //remove all
    enemies = [];
    obstacles = [];
    bullets = [];
    explosions = [];
    ufos = [];
    ufoText = [];

    SpawnEnemies();

    //ufos.push(new Ufo());

    SpawnObstacles();

    enemyStepDelay = enemyStartingStepDelay;

    player.Reset();

    lastUfoSpawn = Millis();

    gameRunning = true;
}

function GameOver()
{
    gameRunning = false;
}

function SpawnObstacles()
{
    obstacles.push(new Obstacle(270));
    obstacles.push(new Obstacle(570));
    obstacles.push(new Obstacle(870));
}

function RespawnObjects()
{
    SpawnEnemies();
    obstacles = [];
    SpawnObstacles();
}

function update(){
    //Update all game objects

    let millis = Millis();

    deltaTime = millis - lastTime;

    lastTime = millis;

    //Update player
    player.Update();

    //Check if player should be respawned
    if(player.isDead)
    {
        if(millis > (player.deadTime + playerDeadDelay))
        {
            if(player.lives <= 0)
            {
                console.log("Game over!");

                if(player.points > highscore)
                {
                    console.log("New highscore!");
                    highscore = player.points;
                    localStorage.setItem("highscore", player.points);
                }

                StartGame();
            }
            else
            {
                player.Respawn();
            }
        }
    }
    else
    {
        if(enemies.length <= 0)
        {
            RespawnObjects();
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
    for(var i = 0; i < ufos.length; i++)
    {
        ufos[i].Update();
    }

    //Enemy move
    if(millis > (lastEnemyMove + enemyStepDelay))
    {
        let switchDirection = false;

        for(var i = 0; i < enemies.length; i++)
        {
            if(enemies[i].Update() && !enemyDown) switchDirection = true; //Update return true if one of the enemies hit the wall
        }

        if(switchDirection)
        {
            enemyDown = true;
            enemyDirection *= -1;
            if(enemyStepDelay > 200)
            {
                enemyStepDelay -= 100;
            }
        }
        else enemyDown = false;
        lastEnemyMove = millis;
    }

    //Ufo move
    for(var i = ufos.length - 1; i>=0; i--)
    {
        if(ufos[i].Update()) ufos.splice(i, 1);
    }

    //spawn ufo
    if(millis > (lastUfoSpawn + ufoSpawnDelay))
    {
        ufos.push(new Ufo());
        lastUfoSpawn = millis;
    }

    //Ufo text
    for(var i = ufoText.length - 1; i>=0; i--)
    {
        if(millis > (ufoText[i].startTime + ufoTextDelay)) ufoText.splice(i, 1);
    }

    //Enemy shoot
    if(millis > (lastEnemyShoot + enemyShootDelay))
    {
        if(enemies.length > 0)
        {
            let randomIndex = getRandomInt(enemies.length);

            enemies[randomIndex].Shoot();
    
            lastEnemyShoot = millis;
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

    //Draw ufos
    for(var i = 0; i < ufos.length; i++)
    {
        ufos[i].Draw();
    }

    //Draw explosions
    for(var i = 0; i < explosions.length; i++)
    {
        explosions[i].Draw();
    }

    //Draw obstacles
    for(var i = 0; i < obstacles.length; i++)
    {
        obstacles[i].Draw();
    }

    //Draw ufo text
    for(var i = 0; i < ufoText.length; i++)
    {
        ufoText[i].Draw();
    }

    //Draw text
    textSize(25);
    fill(0);
    textAlign(LEFT);
    text("Lives: " + player.lives, 10, 27);
    text("Points: " + player.points, 10, 55);

    textAlign(RIGHT);
    text("Highscore: " + highscore, 1190, 27);
}

function keyPressed()
{
    if(keyCode == LEFT_ARROW) player.leftPressed = true;
    else if(keyCode == RIGHT_ARROW) player.rightPressed = true;
    else if(keyCode == 32) player.Shoot();
    else if(keyCode == UP_ARROW) obstacles[0].rows[0].skipAbove += 1;
    else if(keyCode == DOWN_ARROW) obstacles[0].rows[0].skipBelow += 1;
}

function keyReleased()
{
    if(keyCode == LEFT_ARROW) player.leftPressed = false;
    if(keyCode == RIGHT_ARROW) player.rightPressed = false;
}