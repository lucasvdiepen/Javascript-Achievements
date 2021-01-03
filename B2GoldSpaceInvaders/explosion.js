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
        this.end = Millis() + explosionTime;
    }

    Update()
    {
        if(Millis() > this.end) return true;
    }

    Draw()
    {
        this.sprite.resize(this.width, this.height);
        image(this.sprite, this.x, this.y);
    }
}