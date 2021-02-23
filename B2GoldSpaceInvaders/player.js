class Player {
    speed = 5;
    x = 0;
    sprite = null;
    lives = 3;
    points = 0;
    isDead = false;
    deadTime = -3000;
    shootTime = -3000;
    leftPressed = false;
    rightPressed = false;

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
        explosionSound.play();
        this.lives -= 1;
        this.isDead = true;
        this.deadTime = Millis();
    }

    Reset()
    {
        this.lives = startingLives;
        this.x = screenWidth / 2;
        this.points = 0;
        this.isDead = false;
        this.deadTime = -3000;
    }

    Update()
    {
        let moveDirection = 0;

        //set movement direction
        if(this.leftPressed && this.rightPressed)
        {
            
        }
        else
        {
            if(this.leftPressed) moveDirection = -1;
            if(this.rightPressed) moveDirection = 1;
        }

        if(!this.isDead)
        {
            let x = this.x + (playerWidth / 2);
            if((x <= 100 && moveDirection != 1) || (x >= screenWidth - 100 && moveDirection != -1))
            {
                //freeze movement
            }
            else
            {
                this.x += moveDirection * this.speed * deltaTime;
            }
        }
    }

    Draw()
    {
        if(!this.isDead)
        {
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
                shootSound.play();
                this.shootTime = Millis();
            }
        }
    }
}