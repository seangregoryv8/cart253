/**
 * Circle Master
 * Pippin Barr
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
    x: 200,
    y: 200,
    size: 100,
    fill: "#000000"
};

const target = {
    x: 350,
    y: 350,
    size: 50,
    fill: "#ffff00",
    fills: {
      noOverlap: "#ffff00", // red for no overlap
      overlap: "#00ff00" // green for overlap
    }
};

const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 75,
    fill: "#ff0000"
};

/**
 * Create the canvas
 */
function setup()
{
    createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw()
{
    background("#aaaaaa");
    
    // Move user circle
    moveUser();
    
    // Draw the user and puck
    drawUser();
    drawPuck();
    drawTarget();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser()
{
    user.x = mouseX;
    user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser()
{
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
}

/**
 * Displays the target
 */
function drawTarget()
{
    push();
    noStroke();
    fill(target.fill);
    ellipse(target.x, target.y, target.size);
    pop();
}

/**
 * Displays the puck circle
 */
function drawPuck()
{
    movePuck();

    push();
    noStroke();
    fill(puck.fill);
    ellipse(puck.x, puck.y, puck.size);
    pop();
}

/**
 * Move the puck
 */
function movePuck()
{
    let d = dist(user.x, user.y, puck.x, puck.y);
    // Check if that distance is smaller than their two radii, 
    // because if it is, they are overlapping by the amazing
    // power of geometry!

    let overlap = (d < user.size / 2 + puck.size / 2);
    // Set fill based on whether they overlap
    if (overlap)
    {
        const dx = puck.x - user.x;
        const dy = puck.y - user.y;

        
        if (Math.abs(dx) > Math.abs(dy))
            puck.x = dx > 0 ? puck.x + 1 : puck.x - 1;
        else
            puck.y = dy > 0 ? puck.y + 1 : puck.y - 1;
    }

    d = dist(puck.x, puck.y, target.x, target.y);

    overlap = (d < puck.size / 2 + target.size / 2);

    if (overlap) target.fill = target.fills.overlap;
    else target.fill = target.fills.noOverlap;

}