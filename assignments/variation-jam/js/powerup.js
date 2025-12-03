class Powerup
{
    constructor(x, y, sprite)
    {
        this.x = x;
        this.y = y;
        this.sprite = sprite
    }

    powerDraw()
    {
        this.powerFall();
        image(this.sprite, this.x, this.y)
    }

    powerFall()
    {
        this.y++;
    }
}