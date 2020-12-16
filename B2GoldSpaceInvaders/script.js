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

//Game values
let highscore = 0;

let startingLives = 3;
let defaultSpeed = 5;

//Player values
let player;
let playerStartHeight = 620;
let playerWidth = 50;
let playerHeight = 50;
let playerDeadDelay = 2000;
let playerShootDelay = 500;

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
let enemyStartingStepDelay = 1500;
let enemyStepDelay = 1500;
let enemyShootDelay = 1000;
let enemyWidth = 40;
let enemyHeight = 40;

let lastEnemyMove = -3000;
let lastEnemyShoot = -3000;

//Ufo values
let ufos = [];
let ufoWidth = 40;
let ufoHeight = 40;
let defaultUfoSpeed = 5;
let ufoStartHeight = 100;

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
}

function setup() {
    createCanvas(screenWidth, screenHeight);

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

    SpawnEnemies();

    ufos.push(new Ufo(150));

    obstacles.push(new Obstacle(270));
    obstacles.push(new Obstacle(570));
    obstacles.push(new Obstacle(870));

    enemyStepDelay = enemyStartingStepDelay;

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
            enemyStepDelay = enemyStartingStepDelay;
            SpawnEnemies();
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
    if(Millis() > (lastEnemyMove + enemyStepDelay))
    {
        let switchDirection = false;

        for(var i = 0; i < enemies.length; i++)
        {
            if(enemies[i].Update()) switchDirection = true; //Update return true if one of the enemies hit the wall
        }

        if(switchDirection)
        {
            enemyDirection *= -1;
            if(enemyStepDelay > 200)
            {
                enemyStepDelay -= 100;
            }
        }
        lastEnemyMove = Millis();
    }

    //Ufo move
    for(var i = 0; i < ufos.length; i++)
    {
        ufos[i].Update();
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

    //Draw text
    textSize(25);
    fill(0);
    text("Lives: " + player.lives, 10, 27);
    text("Points: " + player.points, 10, 55);
    text("Highscore: " + highscore, 970, 27);
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