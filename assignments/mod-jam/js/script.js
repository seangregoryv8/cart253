/**
 * hunterhunterhunter
 * Pippin Barr
 * 
 * A game of catching flies with your hunter-tongue
 * 
 * Instructions:
 * - Move the hunter with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

const MAXWIDTH = 640;
const MAXHEIGHT = 800;

// Our hunter
const hunter = {
    // The hunter's body has a position and size
    body: {
        x: MAXWIDTH / 2,
        y: MAXHEIGHT - 40,
        size: 100
    },
    // The hunter's tongue has a position, size, speed, and state
    net: {
        x: undefined,
        y: MAXHEIGHT - 100,
        maxHeight: MAXHEIGHT - 100,
        size: 15,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

let ghosts = [];
let lastFlyTime = 0;
let spawnInterval = 1000;

let acceleration = 0;
let maxAccelertaion = 6;

let keyState = {
    a: false,
    d: false,
}

let caughtGhost = false;

/**
 * This returns a new ghost
 * @returns A new ghost object with:
 * x: Its X value starting point (always -50 for off-screen)
 * y: Its Y value, which can be anywhere on screen with a 200 pixel grace area
 * size: Always 40, size of the circle
 * speed: how fast it moves off-screen
 * toRemove: When its caught, it will notify the array when to remove it
 * tail: a small array for the tail class, that makes 30 instances of the circle to act as the "spooky" tail
 * wave: the phases between its waves
 * movement: How much it waves across the screen
 * color: what shade of gray it is
 */
function makeGhost()
{
    return {
        x: -50,
        y: random(200, MAXHEIGHT - 200),
        size: 40,
        speed: random(1, 6),
        toRemove: false,
        tail: [],
        wave: random(3, 15),
        movement: random(1, 7),
        color: random(160, 255)
    }
}

/**
 * This is for the stars in the sky
 */
let stars = [];

/**
 * Creates the canvas and initializes the fly
 */
function setup()
{
    createCanvas(MAXWIDTH, MAXHEIGHT);

    // Draw a bunch of stars in the top half of the canvas
    for (let i = 0; i < 100; i++)
        stars.push({x: random(width), y: random(height / 1.5), size: random(2, 5)})

    drawMoon();
}

function draw()
{
    background(90);

    drawMoon();
    drawLandscape();
    drawStars();

    drawHunter();
    moveHunter();
    moveNet();

    for (const ghost of ghosts)
    {
        moveGhost(ghost);
        drawGhost(ghost);
    }
    checkNetGhostOverlap();

    drawWaves();

    ghosts = ghosts.filter(ghost => !ghost.toRemove);

    spawnGhosts();
}

function spawnGhosts()
{
    const currentTime = millis();  // Get current time in milliseconds
    if (currentTime - lastFlyTime > spawnInterval) {
        ghosts.push(makeGhost());  // Add a new fly
        lastFlyTime = currentTime;  // Reset the timer
        spawnInterval = random(1000, 3000);
    }
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveGhost(ghost) {
    // Move the fly
    ghost.x += ghost.speed;
    ghost.y += cos(frameCount / ghost.wave) * ghost.movement;
}

/**
 * This handles when specifically the spacebar is pressed
 */
function keyPressed()
{
    console.log(key + " pressed")
    if (key === "Shift" && event.code === "ShiftLeft")
        if (hunter.net.state === "idle")
        hunter.net.state = "outbound";
    if (key === "a" || key === "A") keyState.a = true;
    if (key === "d" || key === "D") keyState.d = true;
    keyState[key] = true;
}

function keyReleased()
{
    console.log(key + " released")
    if (key === "a" || key === "A") keyState.a = false;
    if (key === "d" || key === "D") keyState.d = false;
}

/**
 * Moves the hunter to the mouse position on x
 */
function moveHunter() {
    if (keyState.a)
    {
        acceleration -= 0.05;
        if (acceleration >= 0) acceleration -= 0.05
    }
    else if (keyState.d)
    {
        acceleration += 0.05;
        if (acceleration <= 0) acceleration += 0.05
    }
    else acceleration = (acceleration >= 0) ? acceleration - 0.03 : acceleration + 0.03;

    if (hunter.body.x - hunter.body.size <= 0) acceleration += 0.3;
    if (hunter.body.x >= MAXWIDTH) acceleration -= 0.3;
    if (acceleration > maxAccelertaion) acceleration = maxAccelertaion;
    hunter.body.x += acceleration;
    //hunter.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveNet() {
    // Tongue matches the hunter's x
    hunter.net.x = hunter.body.x;
    // If the net is idle, it doesn't do anything
    if (hunter.net.state === "idle") {
        // Do nothing
    }
    // If the net is outbound, it moves up
    else if (hunter.net.state === "outbound") {
        hunter.net.y += -hunter.net.speed;
        // The net bounces back if it hits the top
        if (hunter.net.y <= 0) {
            hunter.net.state = "inbound";
        }
    }
    // If the net is inbound, it moves down
    else if (hunter.net.state === "inbound") {
        hunter.net.y += hunter.net.speed;
        // The net stops if it hits the bottom
        if (hunter.net.y >= hunter.net.maxHeight) {
            hunter.net.state = "idle";
            caughtGhost = false;
        }
    }
}


/**
 * Handles the net overlapping the ghost
 */
function checkNetGhostOverlap() {
    for (const ghost of ghosts)
    {
        // Get distance from net to ghost
        const d = dist(hunter.net.x, hunter.net.y, ghost.x, ghost.y);
        // Check if it's an overlap
        const eaten = (d < hunter.net.size / 2 + ghost.size);
        if (eaten) {
            console.log(hunter.net.size / 2 + ghost.size / 2);
            console.log(d);
            ghost.toRemove = true;
            // Bring back the net
            hunter.net.state = "inbound";
            caughtGhost = true;
        }
    }
}