class Enemy{
    sprite = null;
    x = -1;
    y = -1;

    constructor(_sprite, _x, _y)
    {
        this.sprite = _sprite;
        this.x = _x;
        this.y = _y;
    }

    Update()
    {
        //Do step
        this.x += 50 * enemyDirection;
        //check if at border
        if(this.x <= 100 || this.x >= (screenWidth - 100)) return true;
    }

    Draw()
    {
        this.sprite.resize(enemyWidth, enemyHeight);
        image(this.sprite, this.x, this.y);
    }
}