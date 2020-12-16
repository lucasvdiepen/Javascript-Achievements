class Enemy{
    sprite = null;
    normalSprite = null;
    walkSprite = null;
    pointsToGive = 0;
    x = -1;
    y = -1;
    walkAnimation = false;

    constructor(_normalSprite, _walkSprite, _pointsToGive, _x, _y)
    {
        this.sprite = _normalSprite;
        this.normalSprite = _normalSprite;
        this.walkSprite = _walkSprite;
        this.pointsToGive = _pointsToGive;
        this.x = _x;
        this.y = _y;
    }

    Shoot()
    {
        bullets.push(new Bullet(this.x + (enemyWidth / 2), this.y + enemyHeight, 1));
    }

    Update()
    {
        //Do step
        this.x += 50 * enemyDirection;

        //Do walk animation
        if(this.walkAnimation) { this.sprite = this.normalSprite; this.walkAnimation = false}
        else { this.sprite = this.walkSprite; this.walkAnimation = true;}

        //check if at border
        if(this.x <= 100 || this.x >= (screenWidth - 100)) return true;
    }

    Draw()
    {
        this.sprite.resize(enemyWidth, enemyHeight);
        image(this.sprite, this.x, this.y);
    }
}