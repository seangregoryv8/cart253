let waveIndex = 0;
/**
 * This draws all the waves that the player rides upon
 */
function drawWaves(opacity) {
    push();
    noStroke();
    fill("rgba(135, 206, 235, " + opacity / 100 + ")");

    for (let i = -60; i <= MAXWIDTH; i += 30)
    {
        let waveX = i + waveIndex;
        triangle(waveX, MAXHEIGHT, waveX + 90, MAXHEIGHT, waveX + 45, MAXHEIGHT - 30);
    }

    pop();

    waveIndex -= 0.5;
    if (waveIndex <= -30 || waveIndex >= 30) waveIndex = 0;
}

/**
 * This draws the little moon in the night sky
 */
function drawMoon(opacity)
{
    push();
    noStroke();
    fill("rgba(255, 255, 255, " + opacity / 100 + ")");
    ellipse(MAXWIDTH - 100, 100, 115);
    fill("rgba(90, 90, 90, " + opacity / 100 + ")");
    ellipse(MAXWIDTH - 120, 100, 115);
    pop();
}

function drawLandscape(opacity)
{
    push();
    noStroke();
    fill("rgba(6, 64, 43, " + opacity / 100 + ")");
    ellipse(100, MAXHEIGHT - 20, 600, 300)
    fill("rgba(44, 107, 79, " + opacity / 100 + ")");
    ellipse(MAXWIDTH, MAXHEIGHT - 50, 600, 200)
    fill("rgba(59, 111, 65, " + opacity / 100 + ")");
    ellipse(MAXWIDTH / 2, MAXHEIGHT + 40, 600, 300)
    pop();
}

function drawStars(opacity)
{
    push();
    noStroke();
    fill("rgba(255, 255, 255, " + opacity / 100 + ")");
    for (const star of stars)
        ellipse(star.x, star.y, star.size)
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