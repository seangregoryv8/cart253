let waveIndex = 0;
/**
 * This draws all the waves that the player rides upon
 */
function drawWaves(opacity = 255) {
    push();
    noStroke();
    fill(135, 206, 235, opacity);

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
function drawMoon(opacity = 255)
{
    push();
    noStroke();
    fill(255, 255, 255, opacity);
    ellipse(MAXWIDTH - 100, 100, 115);
    fill(90, 90, 90, opacity);
    ellipse(MAXWIDTH - 120, 100, 115);
    pop();
}

/**
 * 
 * @param {The opacity of the biome (used for the fade in)} opacity 
 * @param {The opacity of the first guy (used for the fade in)} opacityGuy 
 * @param {The opacity of the first guy (used for the fade in and changes if coop is selected)} opacityGuy2 
 */
function drawLandscape(opacity = 255, opacityGuy = 0, opacityGuy2 = 0)
{
    push();
    noStroke();
    fill(6, 64, 43, opacity);
    ellipse(100, MAXHEIGHT - 20, 600, 300)
    fill(44, 107, 79, opacity)
    ellipse(MAXWIDTH, MAXHEIGHT - 50, 600, 200)
    fill(59, 111, 65, opacity)
    ellipse(MAXWIDTH / 2, MAXHEIGHT + 40, 600, 300)

    drawHouse(100, 600, opacity);
    drawHouse(MAXWIDTH - 100, 630, opacity);
    drawGuy(220, 680, opacityGuy, hunter.color);
    drawGuy(MAXWIDTH - 160, 720, opacityGuy2, hunter2.color);

    pop();
}

/**
 * This draws all the stars in the sky in a beautiful fashion
 * @param {*} opacity 
 */
function drawStars(opacity = 255)
{
    push();
    noStroke();
    fill(255, 255, 255, opacity);
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

/**
 * Little function I made to make a random integer
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function ranInt(min, max)
{
    return Math.round(random(min, max))
}

/**
 * Taken directly from my first challenge, this draws the exact house that I drew back then
 * @param {*} x 
 * @param {*} y 
 * @param {*} opacity 
 */
function drawHouse(x, y, opacity)
{
    push();
    translate(x, y);
    let size = 75;
    fill(200, 125, 0, opacity);
    noStroke();
    rect(0, 0, size, size);
    fill(50, 50, 50, opacity);
    noStroke();
    triangle(-10, 0, size / 2, -(size / 2), size + 10, 0);
    fill(130, 130, 255, opacity);
    rect(5, 15, size / 4, size / 4)
    fill(100, 50, 0, opacity);
    rect(35, 30, size / 3, size - 30);
    pop();
}

/**
 * Taken directly from my first challenge, this draws the same guy from last time, this time
 * with an opacity for fade in and a color to detect which hunter it is
 * @param {*} x 
 * @param {*} y 
 * @param {*} opacity 
 */
function drawGuy(x, y, opacity, color1)
{
    let mult = 1;
    push();
    translate(x, y);
    noStroke();
    fill(187, 187, 187, opacity)
    arc(0, 0, 30 * mult, 75 * mult, radians(180), 0)
    let c = color(color1)
    fill(red(c), green(c), blue(c), opacity)
    circle(0, -45, 25 * mult)
    circle(-20, -25, 10 * mult)
    circle(20, -25, 10 * mult)
    pop();
}