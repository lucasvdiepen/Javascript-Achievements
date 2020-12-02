class Bullet{
    speed = 10;
    x = -1;
    y = playerStartHeight;

    constructor(_x)
    {
        this.x = _x;
    }

    Update()
    {
        //check for collision with enemy
        for(var i = enemies.length - 1; i>=0; i--)
        {
            if(this.x >= enemies[i].x && this.y >= enemies[i].y && this.x <= (enemies[i].x + 50) && this.y <= (enemies[i].y + 50)) //bullet collision with enemy
            {
                enemies.splice(i, 1);
                return true;
            }
        }

        if(this.y <= -100) return true; //removes this bullet
        else this.y -= this.speed;
    }

    Draw()
    {
        line(this.x, this.y, this.x, this.y - 10);
    }
}