/**
 * This draws all the waves that the player rides upon
 */
function drawWaves()
{
    push();
    fill("#87ceeb")
    for (let i = -60; i <= MAXWIDTH; i += 30)
        triangle(i, MAXHEIGHT, i + 90, MAXHEIGHT, i + 45, MAXHEIGHT - 30);
    pop();     
}

/**
 * This draws the little moon in the night sky
 */
function drawMoon()
{
    fill(255);
    ellipse(MAXWIDTH - 100, 100, 115)
    fill(90);
    ellipse(MAXWIDTH - 120, 100, 115)
}

function drawLandscape()
{
    fill("#06402B")
    ellipse(100, MAXHEIGHT - 60, 600, 300)
    fill("#2C6B4F")
    ellipse(MAXWIDTH, MAXHEIGHT - 100, 600, 200)
    fill("#3B6F41")
    ellipse(MAXWIDTH / 2, MAXHEIGHT + 40, 600, 300)
}

function drawStars()
{
    push();
    fill(255);
    for (const star of stars)
        ellipse(star.x, star.y, star.size)
    pop();
}

/**
 * If a ghost is caught, draw it in the little net
 */
function drawCaughtGhost()
{
    noStroke();
    fill(255);
    push();
    translate(hunter.net.x, hunter.net.y - 35);
    let netGhostSize = hunter.net.size * 2.5;
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
function drawNet()
{
    // Draw the rest of the net
    push();
    stroke("#8a7362");
    strokeWeight(hunter.net.size);
    line(hunter.net.x, hunter.net.y, hunter.body.x, hunter.body.y);
    pop();

    if (caughtGhost) drawCaughtGhost();

    // Draw the net tip
    push();
    noStroke();
    let netOffset = hunter.net.size * 2.3
    fill(0, 80);
    ellipse(hunter.net.x + 27, hunter.net.y - netOffset, hunter.net.size * 8, 60);

    stroke("#8a7362");
    strokeWeight(10);  // Border thickness
    noFill();  // No fill for the outer circle, it's hollow
    ellipse(hunter.net.x, hunter.net.y - netOffset, hunter.net.size * 4);
    pop();
}

/**
 * Draws the ghostbusters logo in the guys shirt
 */
function drawGhostbusterLogo()
{
    // Draw his funny shirt
    noStroke();
    fill("#ff0000")
    ellipse(hunter.body.x - 50, hunter.body.y - hunter.body.size + 20, hunter.body.size * 0.5);

    push();
    noStroke();
    fill(255);
    translate(hunter.body.x - 55, hunter.body.y - 98)
    let shirtGhostSize = hunter.body.size / 4;
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
    translate(hunter.body.x - 50, hunter.body.y - hunter.body.size + 20)
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
function drawHunter()
{
    drawNet();

    // Draw the hunter's body
    push();
    stroke(0);
    fill("#bbbbbb")
    ellipse(hunter.body.x - 50, hunter.body.y, hunter.body.size, 300);
    fill("#ffe2c9");
    ellipse(hunter.body.x - 50, hunter.body.y - hunter.body.size * 1.5, hunter.body.size * 0.75)
    pop();

    drawGhostbusterLogo();

    drawBoat();
}

/**
 * Draws a boat for the hunter to swim in
 */
function drawBoat()
{
    push();
    noStroke();
    fill("#8a7362");
    // Now for the boat
    translate(hunter.body.x - 200, MAXHEIGHT - 60);
    rect(-1, 0, 305, 70);
    triangle(0, 0, -40, 0, 0, 61);
    triangle(300, 0, 440, 0, 300, 61);
    pop();
}

/**
 * Draws the ghost, complete with its tail
 */
function drawGhost(ghost) {
    push();
    noStroke();
    ghost.tail.unshift({x: ghost.x, y: ghost.y})
    if (ghost.tail.length > 30) ghost.tail.pop();

    // draw the tail
    for (let i = 0; i < ghost.tail.length; i++)
    {
        const tailPoint = ghost.tail[i];
        const pointSize = ghost.size * (ghost.tail.length - i) / ghost.tail.length;
        const pointAlpha = 255 * (ghost.tail.length - i) / ghost.tail.length;
        fill(ghost.color, pointAlpha)
        ellipse(tailPoint.x, tailPoint.y, pointSize)
    }

    translate(ghost.x, ghost.y)
    fill("#000000");
    ellipse(-8, -3, ghost.size / 4)
    ellipse(8, -3, ghost.size / 4)
    ellipse(0, 10, ghost.size / 4)

    pop();
}