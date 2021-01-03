class Bullet{
    speed = 10;
    x = -1;
    y = -1;
    direction = 0;
    pointsToGive = 0;

    constructor(_x, _y, _direction, _pointsToGive, _speed = 10)
    {
        this.x = _x;
        this.y = _y;
        this.direction = _direction;
        this.speed = _speed;
        this.pointsToGive = _pointsToGive;
    }

    Update()
    {
        //check for collision with obstacle
        for(var i = 0; i < obstacles.length; i++)
        {
            if(this.x >= obstacles[i].startX && this.x <= obstacles[i].endX)
            {
                let hit = false;
                let above = false;
                if(this.direction == -1)
                {
                    if(this.y <= obstacleStartHeight){ hit = true; above = false; }
                }
                else if(this.direction == 1)
                {
                    if(this.y >= obstacleStartHeight){ hit = true; above = true; }
                }

                if(hit)
                {
                    if(obstacles[i].Hit(this.x, above))
                    {
                        return true; //removes this bullet
                    }
                }
            }
        }

        if(this.direction == -1)
        {
            //check for collision with enemy
            for(var i = enemies.length - 1; i>=0; i--)
            {
                if(this.x >= enemies[i].x && this.y >= enemies[i].y && this.x <= (enemies[i].x + enemyWidth) && this.y <= (enemies[i].y + enemyHeight)) //bullet collided with enemy
                {
                    //spawn explosion effect
                    explosions.push(new Explosion(explosionSprite, enemies[i].x, enemies[i].y, explosionWidth, explosionHeight));
                    
                    //add points
                    player.points += enemies[i].pointsToAdd;

                    //remove enemy
                    enemies.splice(i, 1);
                    return true; //removes this bullet
                }
            }

            //check for collision with ufo
            for(var i = ufos.length - 1; i>=0; i--)
            {
                if(this.x >= ufos[i].x && this.y >= ufoStartHeight && this.x <= (ufos[i].x + ufoWidth) && this.y <= (ufoStartHeight + ufoHeight))
                {
                    explosions.push(new Explosion(ufoExplosionSprite, ufos[i].x, ufoStartHeight, ufoWidth, ufoHeight));

                    let ufoPointsToAdd = ChooseRandom(ufoPoints);

                    ufoText.push(new UfoText(ufoPointsToAdd.toString(), ufos[i].x));

                    player.points += ufoPointsToAdd;

                    ufos.splice(i, 1);
                    return true; //removes this bullet
                }
            }
        }
        
        if(this.direction == 1)
        {
            //check for collision with player
            if(this.x >= player.x && this.y >= playerStartHeight && this.x <= (player.x + playerWidth) && this.y <= (playerStartHeight + playerHeight)) //bullet collided with player
            {
                if(!player.isDead)
                {
                    explosions.push(new Explosion(explosionSprite, player.x, playerStartHeight, explosionWidth, explosionHeight));

                    player.Hit();
                    return true; //removes this bullet
                }
            }
        }

        if(this.y <= -100 || this.y >= screenHeight + 100) return true; //removes this bullet
        else this.y += this.direction * this.speed;
    }

    Draw()
    {
        stroke(0);
        line(this.x, this.y, this.x, this.y - 10);
    }
}