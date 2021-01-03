class Ufo{
    sprite = null;
    speed = 15;
    x = -1;
    moveDirection = 1;
    wallTouches = 0;

    constructor(_x = ufoStartWidth, _speed = defaultUfoSpeed, _sprite = ufoSprite)
    {
        this.x = _x;
        this.sprite = _sprite;
        this.speed = _speed;
    }

    Update()
    {
        let x = this.x + (ufoWidth / 2);
        if(x <= 100 || x >= (screenWidth - 100)) {
            this.moveDirection *= -1;
            this.wallTouches += 1;

            if(this.wallTouches >= ufoWallTouches) return true; //removes this ufo
        }

        this.x += this.speed * this.moveDirection * deltaTime;
    }

    Draw()
    {
        this.sprite.resize(ufoWidth, ufoHeight);
        image(this.sprite, this.x, ufoStartHeight);
    }
}

class UfoText{
    text = "";
    x = -1;
    startTime = -3000;

    constructor(_text, _x)
    {
        this.text = _text;
        this.x = _x;
        this.startTime = Millis();
    }

    Draw()
    {
        textSize(25);
        textAlign(CENTER);
        fill(255, 0, 0);
        text(this.text, this.x + (ufoWidth / 2), ufoStartHeight + (ufoHeight / 2));
    }
}