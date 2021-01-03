class Player {
    speed = 5;
    x = 0;
    sprite = null;
    moveDirection = 0;
    lives = 3;
    points = 0;
    isDead = false;
    deadTime = -3000;
    shootTime = -3000;

    constructor(_lives = startingLives, _sprite = playerSprite, _speed = playerSpeed)
    {
        this.sprite = _sprite;
        this.x = screenWidth / 2;
        this.lives = _lives;
        this.speed = _speed;
    }

    Respawn()
    {
        this.isDead = false;
        this.x = screenWidth / 2;
    }

    Hit()
    {
        this.lives -= 1;
        this.isDead = true;
        this.deadTime = Millis();
    }

    Reset()
    {
        this.lives = startingLives;
        this.x = screenWidth / 2;
        this.points = 0;
        this.moveDirection = 0;
        this.isDead = false;
        this.deadTime = -3000;
    }

    Update()
    {
        if(!this.isDead)
        {
            let x = this.x + (playerWidth / 2);
            if((x <= 100 && this.moveDirection != 1) || (x >= screenWidth - 100 && this.moveDirection != -1))
            {
                //freeze movement
            }
            else
            {
                this.x += this.moveDirection * this.speed * deltaTime;
            }
        }
    }

    Draw()
    {
        if(!this.isDead)
        {
            playerSprite.resize(enemyHeight, enemyWidth);
            image(player.sprite, player.x, playerStartHeight);
        }
    }

    Shoot()
    {
        if(!this.isDead)
        {
            if(Millis() > (this.shootTime + playerShootDelay))
            {
                bullets.push(new Bullet(this.x + (playerWidth / 2), playerStartHeight, -1));
                this.shootTime = Millis();
            }
            
        }
    }
}