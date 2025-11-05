class Hunter
{
    /**
     * 
     * @param {BigInteger} x 
     * @param {BigInteger} y 
     * @param {BigInteger} size 
     * @param {string} count 
     * @param {object} controls 
     */
    constructor(x, y, size, count, controls, color, eyeColor)
    {
        this.body = {
            x: x,
            y: y,
            size: size,
            count: count,
        };
        this.net = {
            x: undefined,
            y: MAXHEIGHT - 150,
            maxHeight: MAXHEIGHT - 150,
            size: 15,
            speed: 20,
            // Determines how the tongue moves each frame
            state: "idle" // State can be: idle, outbound, inbound
        }
        this.acceleration = 0;
        this.maxAcceleration = 6;
        this.controls = controls;
        this.caughtGhost = false;
        this.score = gameOptions[difficulty].startScore;
        this.color = color;
        this.eyeColor = eyeColor;
    }

    setScore()
    {
        this.score = gameOptions[difficulty].startScore;
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

        waveIndex -= (this.acceleration / 4)
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
                if (gameState != "win") this.caughtGhost = false;
            }
        }
    }

    draw()
    {
        this.drawHunter();
        this.drawBoat();
    }


    /**
     * If a ghost is caught, draw it in the little net
     */
    drawCaughtGhost()
    {
        noStroke();
        fill(255);
        push();
        translate(this.net.x + 20, this.net.y - 35);
        let netGhostSize = this.net.size * 2.5;
        ellipse(0, 0, netGhostSize);
        fill(0)
        ellipse(-8, 0, netGhostSize / 4)
        ellipse(8, 0, netGhostSize / 4)
        ellipse(0, 10, netGhostSize / 4)
        pop();
    }

    /**
     * This draws the net that the hunter wields
     */
    drawNet()
    {
        // Draw the rest of the net
        push();
        stroke("#8a7362");
        strokeWeight(this.net.size);
        line(this.net.x + 20, this.net.y, this.body.x + 20, this.body.y);
        pop();

        if (this.caughtGhost) this.drawCaughtGhost();

        // Draw the net tip
        push();
        noStroke();
        let netOffset = this.net.size * 2.3
        fill(0, 80);
        ellipse(this.net.x + 47, this.net.y - netOffset, this.net.size * 8, 60);

        stroke("#8a7362");
        strokeWeight(10);  // Border thickness
        noFill();  // No fill for the outer circle, it's hollow
        ellipse(this.net.x + 20, this.net.y - netOffset, this.net.size * 4);
        pop();
    }

    /**
     * Draws the ghostbusters logo in the guys shirt
     */
    drawGhostbusterLogo()
    {
        // Draw his funny shirt
        noStroke();
        fill("#ff0000")
        ellipse(this.body.x - 50, this.body.y - this.body.size + 20, this.body.size * 0.5);

        push();
        noStroke();
        fill(255);
        translate(this.body.x - 55, this.body.y - 98)
        let shirtGhostSize = this.body.size / 4;
        ellipse(10, 20, shirtGhostSize);
        rect(-10, 10, 40, 10);
        ellipse(0, 0, shirtGhostSize);
        fill(0);
        ellipse(-6, 0, shirtGhostSize / 4)
        ellipse(6, 0, shirtGhostSize / 4)
        ellipse(0, 7, shirtGhostSize / 4)
        pop();

        push();
        noStroke();
        translate(this.body.x - 50, this.body.y - this.body.size + 20)
        rectMode(CENTER);
        fill(255);
        fill("#ff0000");
        rotate(4);
        rect(0, 0, 10, 40);
        pop();
    }

    /**
     * Displays the net (tip and line connection) and the hunter (body)
     */
    drawHunter()
    {
        this.drawNet();
        let twisted = gameState == "over" && ending == "sad";
        // Draw the hunter's body
        push();
        stroke(0);
        fill("#bbbbbb")
        ellipse(this.body.x - (this.body.size / 2), this.body.y, this.body.size, (this.body.size * 3));
        if (!twisted) ellipse(this.body.x + 20, this.body.y - 80, this.body.size / 3);
        fill(this.color);
        translate(this.body.x - (this.body.size / 2), this.body.y - this.body.size * 1.5)
        ellipse(0, 0, this.body.size * 0.75)

        stroke(0);

        fill(255);
        translate(0, 15)
        // Now we draw his eyes
        ellipse(-15, -15, 20, 30)
        ellipse(15, -15, 20, 30)
        fill(this.eyeColor)
        noStroke();
        ellipse(-20, -19, 10);
        ellipse(10, -19, 10);
        fill(0)
        noStroke();
        ellipse(-21, -19, 5);
        ellipse(9, -19, 5);
        fill(255)
        noStroke();
        ellipse(-20, -19, 2);
        ellipse(10, -19, 2);
        
        if (twisted)
        {
            fill(0);
            ellipse(-15, -15, 20, 30)
            ellipse(15, -15, 20, 30)
        }

        fill(0)
        textSize(24);
        text(this.body.count, -15, 115)

        pop();

        this.drawGhostbusterLogo();
    }

    /**
     * Draws a boat for the hunter to swim in
     */
    drawBoat()
    {
        push();
        noStroke();
        fill("#8a7362");
        // Now for the boat
        translate(this.body.x - 200, MAXHEIGHT - 60);
        rect(-1, 0, 305, 70);
        triangle(0, 0, -40, 0, 0, 61);
        triangle(300, 0, 440, 0, 300, 61);
        pop();
    }


    /**
     * Handles the net overlapping the ghost
     */
    checkNetGhostOverlap()
    {
        for (const ghost of ghosts)
        {
            // Get distance from net to ghost
            const d = dist(this.net.x, this.net.y, ghost.x, ghost.y);
            // Check if it's an overlap
            const eaten = (d < this.net.size / 2 + ghost.size);
            if (eaten)
            {
                ghost.toRemove = true;
                let addedScore = scorePlayer(ghost, !(this.net.state == "inbound"));
                this.score += addedScore;
                // Bring back the net
                this.net.state = "inbound";
                this.caughtGhost = true;
            }
        }
    }
}