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
        y: MAXHEIGHT + 40,
        size: 100
    },
    // The hunter's tongue has a position, size, speed, and state
    net: {
        x: undefined,
        y: MAXHEIGHT,
        size: 20,
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


function makeGhost()
{
    return {
        x: -50,
        y: random(100, MAXHEIGHT - 100),
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
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(MAXWIDTH, MAXHEIGHT);

    ghosts.push(makeGhost());
}

function draw() {
    
    background("#87ceeb");
  
    for (const ghost of ghosts)
    {
        moveGhost(ghost);
        drawGhost(ghost);
    }

    //moveghost();
    //drawghost();
    moveHunter();
    moveNet();
    drawHunter();
    checkNetGhostOverlap();

    ghosts = ghosts.filter(ghost => !ghost.toRemove);

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
 * Draws the fly as a black circle
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

    fill("#000000");
    ellipse(ghost.x - 8, ghost.y - 3, ghost.size / 4)
    ellipse(ghost.x + 8, ghost.y - 3, ghost.size / 4)
    ellipse(ghost.x, ghost.y + 10, ghost.size / 4)


    pop();
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
        if (hunter.net.y >= height) {
            hunter.net.state = "idle";
        }
    }
}

/**
 * Displays the net (tip and line connection) and the hunter (body)
 */
function drawHunter() {
    // Draw the net tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(hunter.net.x, hunter.net.y, hunter.net.size);
    pop();

    // Draw the rest of the net
    push();
    stroke("#ff0000");
    strokeWeight(hunter.net.size);
    line(hunter.net.x, hunter.net.y, hunter.body.x, hunter.body.y);
    pop();

    // Draw the hunter's body
    push();
    stroke(0);
    fill("#bbbbbb")
    ellipse(hunter.body.x - 50, hunter.body.y, hunter.body.size, 300);
    fill("#ffe2c9");
    ellipse(hunter.body.x - 50, hunter.body.y - hunter.body.size * 1.5, hunter.body.size * 0.75)

    // Draw his funny shirt
    noStroke();
    fill("#ff0000")
    ellipse(hunter.body.x - 50, hunter.body.y - hunter.body.size + 20, hunter.body.size * 0.5);
    pop();

    push();
    noStroke();
    fill(255);
    let shirtGhostX = hunter.body.x - 55;
    let shirtGhostY = hunter.body.y - 98;
    let shirtGhostSize = hunter.body.size / 4;
    ellipse(shirtGhostX, shirtGhostY, shirtGhostSize);
    ellipse(shirtGhostX + 10, shirtGhostY + 20, shirtGhostSize);
    rect(shirtGhostX - 10, shirtGhostY + 10, 40, 10);
    fill(0);
    ellipse(shirtGhostX - 6, shirtGhostY, shirtGhostSize / 4)
    ellipse(shirtGhostX + 6, shirtGhostY, shirtGhostSize / 4)
    ellipse(shirtGhostX, shirtGhostY + 7, shirtGhostSize / 4)
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
 * Handles the net overlapping the ghost
 */
function checkNetGhostOverlap() {
    for (const ghost of ghosts)
    {
        // Get distance from net to ghost
        const d = dist(hunter.net.x, hunter.net.y, ghost.x, ghost.y);
        // Check if it's an overlap
        const eaten = (d < hunter.net.size/2 + ghost.size/2);
        if (eaten) {
            ghost.toRemove = true;
            // Reset the ghost
            //resetghost();
            // Bring back the net
            hunter.net.state = "inbound";
        }
    }
}