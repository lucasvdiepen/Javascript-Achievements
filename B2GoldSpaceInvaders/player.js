class Player {
    speed = 5;
    x = 0;
    sprite = null;
    moveDirection = 0;

    constructor(_sprite = playerSprite)
    {
        this.sprite = _sprite;
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
        playerSprite.resize(50, 50);
        image(player.sprite, player.x, playerStartHeight);
    }

    Shoot()
    {
        bullets.push(new Bullet(this.x + 25));
    }
}