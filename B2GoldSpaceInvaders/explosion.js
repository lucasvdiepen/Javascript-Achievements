class Explosion{
    x = -1;
    y = -1;
    end = -1;

    constructor(_x, _y){
        this.x = _x;
        this.y = _y;
        this.end = Millis() + explosionTime;
    }

    Update()
    {
        if(Millis() > this.end) return true;
    }

    Draw()
    {
        explosionSprite.resize(explosionHeight, explosionWidth);
        image(explosionSprite, this.x, this.y);
    }
}