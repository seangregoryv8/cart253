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
}