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
        let x = this.x + (playerWidth / 2);
        if((x <= 100 && this.moveDirection != 1) || (x >= screenWidth - 100 && this.moveDirection != -1))
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
        playerSprite.resize(enemyHeight, enemyWidth);
        image(player.sprite, player.x, playerStartHeight);
    }

    Shoot()
    {
        bullets.push(new Bullet(this.x + (enemyWidth / 2)));
    }
}