/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

let ghosts = [];
let lastFlyTime = 0;
let spawnInterval = 1000;

function makeGhost()
{
    return {
        x: -50,
        y: random(100, 300),
        size: 40,
        speed: random(1, 6),
        toRemove: false,
        tail: [],
        wave: random(3, 15),
        movement: random(1, 7)
    }
}
/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

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
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueGhostOverlap();

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
    fill("#ffffff");
    ellipse(ghost.x, ghost.y, ghost.size);
    ghost.tail.unshift({x: ghost.x, y: ghost.y})
    if (ghost.tail.length > 30) ghost.tail.pop();
    // draw the tail
    for (let i = 0; i < ghost.tail.length; i++)
    {
        const tailPoint = ghost.tail[i];
        const pointSize = ghost.size * (ghost.tail.length - i) / ghost.tail.length;
        const pointAlpha = 255 * (ghost.tail.length - i) / ghost.tail.length;
        fill(255, pointAlpha)
        ellipse(tailPoint.x, tailPoint.y, pointSize)
    }

    fill("#000000");
    ellipse(ghost.x - 8, ghost.y - 3, ghost.size / 4)
    ellipse(ghost.x + 8, ghost.y - 3, ghost.size / 4)
    ellipse(ghost.x, ghost.y + 10, ghost.size / 4)


    pop();
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the ghost
 */
function checkTongueGhostOverlap() {
    for (const ghost of ghosts)
    {
        // Get distance from tongue to ghost
        const d = dist(frog.tongue.x, frog.tongue.y, ghost.x, ghost.y);
        // Check if it's an overlap
        const eaten = (d < frog.tongue.size/2 + ghost.size/2);
        if (eaten) {
            ghost.toRemove = true;
            // Reset the ghost
            //resetghost();
            // Bring back the tongue
            frog.tongue.state = "inbound";
        }
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}