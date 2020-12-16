class ObstacleRow{
    startX = -1;
    skipAbove = 0;
    skipBelow = 0;

    blocks = -1;
    startingBlocks = -1;

    constructor(_startX, _blocks){
        this.startX = _startX;
        this.blocks = _blocks;
        this.startingBlocks = _blocks;
    }

    Hit(above)
    {
        if(this.blocks > 0)
        {
            this.blocks -= 1;
            if(above) this.skipAbove += 1;
            else this.skipBelow += 1;
            return true;
        }
        else return false;
    }

    Draw()
    {
        let startY = obstacleStartHeight + (this.skipAbove * blockHeight);
        let height = (this.startingBlocks * blockHeight) - (this.skipBelow * blockHeight) - (this.skipAbove * blockHeight);
        fill(0, 255, 0);
        noStroke();
        rect(this.startX, startY, blockWidth, height);
    }
}

class Obstacle{
    startX = -1;
    endX = -1;
    rows = [];

    constructor(_startX)
    {
        this.startX = _startX;
        this.endX = this.startX + (blockWidth * blocksInRow);
        //Generate obstacle
        for(var i = 0; i < blocksInRow; i++)
        {
            let blocks = 5;
            if(i >= 0 && i <= 1 || i >= 8 && i <= 9) blocks = 7;
            this.rows.push(new ObstacleRow(this.startX + (i * blockWidth), blocks));
        }
    }

    Hit(x, above)
    {
        for(var i = 0; i < this.rows.length; i++)
        {
            if(x >= this.rows[i].startX && x <= this.rows[i].startX + blockWidth)
            {
                return this.rows[i].Hit(above);
            }
        }
    }

    Draw()
    {
        for(var i = 0; i < this.rows.length; i++)
        {
            this.rows[i].Draw();
        }
    }
}