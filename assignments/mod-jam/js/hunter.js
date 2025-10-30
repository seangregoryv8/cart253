class Hunter
{
    constructor(x, y, size, controls)
    {
        this.body = {
            x: x,
            y: y,
            size: size
        };
        this.net = {
            x: undefined,
            y: MAXHEIGHT - 100,
            maxHeight: MAXHEIGHT - 100,
            size: 15,
            speed: 20,
            // Determines how the tongue moves each frame
            state: "idle" // State can be: idle, outbound, inbound
        }
        this.acceleration = 0;
        this.maxAcceleration = 6;
        this.controls = controls;
        this.caughtGhost = false;
    }

    move()
    {
        if (keyIsDown(this.controls.left)) {
            this.acceleration -= 0.05;
            if (this.acceleration >= 0) this.acceleration -= 0.05;
        }
        else if (keyIsDown(this.controls.right)) {
            this.acceleration += 0.05;
            if (this.acceleration <= 0) this.acceleration += 0.05;
        }
        else this.acceleration = (this.acceleration === 0) ? 0 : (this.acceleration > 0) ? this.acceleration - 0.03 : this.acceleration + 0.03;

        if (this.body.x - this.body.size <= 0) this.acceleration += 0.3;
        if (this.body.x >= MAXWIDTH) this.acceleration -= 0.3;
        if (this.acceleration > this.maxAcceleration) this.acceleration = this.maxAcceleration;

        if (this.acceleration < 0.05 && this.acceleration > -0.05) this.acceleration = 0;

        waveIndex -= (acceleration / 4)
        this.body.x += this.acceleration;
    }

    moveNet()
    {
        this.net.x = this.body.x;
        if (this.net.state === "outbound") {
            this.net.y -= this.net.speed;
            if (this.net.y <= 0) {
                this.net.state = "inbound";
            }
        }
        else if (this.net.state === "inbound") {
            this.net.y += this.net.speed;
            if (this.net.y >= this.net.maxHeight) {
                this.net.state = "idle";
                this.caughtGhost = false;
            }
        }
    }

    draw()
    {
        this.drawNet();
        this.drawBody();
        this.drawBoat();
    }
}