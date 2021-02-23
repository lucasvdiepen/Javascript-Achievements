    class Explosion{
    x = -1;
    y = -1;
    end = -1;
    sprite = null;
    width = -1;
    height = -1;

    constructor(_sprite, _x, _y, _width, _height){
        this.x = _x;
        this.y = _y;
        this.sprite = _sprite;
        this.width = _width;
        this.height = _height;
        this.sprite.resize(this.width, this.height);
        this.end = Millis() + explosionTime;
    }

    Update()
    {
        if(Millis() > this.end) return true;
    }

    Draw()
    {
        image(this.sprite, this.x, this.y);
    }
}