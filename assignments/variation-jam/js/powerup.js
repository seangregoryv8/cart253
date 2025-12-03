class Powerup
{
    constructor(x, y, sprite)
    {
        this.x = x;
        this.y = y;
        this.size = px(5);
        this.sprite = sprite;
        this.tagged = false;
        this.speed = random(1, 2.5)
    }

    powerDraw()
    {
        this.powerFall();
        image(this.sprite, this.x, this.y)
        this.paddleCollide();
    }

    powerFall()
    {
        this.y += this.speed;
        if (this.y >= paddle.y + px(1))
            this.tagged = true;
    }

    paddleCollide()
    {
        if (this.y >= paddle.y - px(1))
        {
            if (this.x <= paddle.x + paddle.size && this.x + paddle.size >= paddle.x)
            {
                switch (this.sprite)
                {
                    case powerupSprites.bigPaddle:
                        if (paddle.size < px(8)) paddle.size += px(1);
                        break;
                    case powerupSprites.smallPaddle:
                        if (paddle.size > px(1)) paddle.size -= px(1);
                        break;
                    case powerupSprites.faster:
                        if (paddle.multiplier < 2) paddle.multiplier += 0.25;
                        break;
                    case powerupSprites.slower:
                        if (paddle.multiplier > 0.25) paddle.multiplier -= 0.25;
                        break;
                    case powerupSprites.sticky:
                        paddle.sticky = true;
                        break;
                    case powerupSprites.nonstick:
                        paddle.sticky = false;
                        break;
                    case powerupSprites.invincible:
                        ball.powered = true;
                        ball.y = ballResetY;
                        ball.state = ballState.START;
                        break;
                }
                this.tagged = true;
            }
        }
    }
}