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

const MAXWIDTH = 900;
const MAXHEIGHT = 800;
let coop = false;
let gameState = "title";

const hunter1Controls = {
    left: 65,
    right: 68,
    net: 16
}

const hunter2Controls = {
    left: 74,
    right: 76,
    net: 73
}

let hunter;
let hunter2;

let ghosts = [];
let lastFlyTime = 0;
let spawnInterval = 1000;

let keyState = {
    w: false,
    a: false,
    d: false,
    i: false,
    j: false,
    l: false
}

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

    if (coop)
    {
        hunter = new Hunter(MAXWIDTH - 100, MAXHEIGHT - 40, 100, "P1", hunter1Controls)
        hunter2 = new Hunter(100, MAXHEIGHT - 40, 100, "P2", hunter2Controls)
    }
    else
        hunter = new Hunter(MAXWIDTH - 100, MAXHEIGHT - 40, 100, "", hunter1Controls)
}

let fadeIn = 0;
let objectFadeIn = 0;
let textFadeIn = {
    author: 0,
    title: 0,
    options: 0
}

let skipped = false;
let skipForward = 0;

let mainFont;

function preload()
{
    mainFont = loadFont("/assets/fleshandblood.ttf")
}
function draw()
{

    switch (gameState)
    {
        case "title":
            background(fadeIn);
            let sec = millis() / 1000;  // Get current time in milliseconds

            let timing = sec + skipForward
            console.log(timing);
            if (key == " " && !skipped)
            {
                skipped = true;
                skipForward = 8 - sec;
                fadeIn = 90
                objectFadeIn = 100;
            }
            if (timing >= 3 && fadeIn < 90) fadeIn += 0.5;
            if (timing >= 5 && objectFadeIn != 100) objectFadeIn += 0.5;
            drawMoon(objectFadeIn);
            drawLandscape(objectFadeIn);
            drawStars(objectFadeIn);
            drawWaves(objectFadeIn);

            if (timing >= 8 && timing < 10)
            {
                push();
                noStroke();
                translate(MAXWIDTH / 2, MAXHEIGHT / 2);
                fill("rgba(255, 255, 255, " + textFadeIn.author / 100 + ")")
                textSize(48);
                textAlign(CENTER);
                text("A game by\nSean Gregory", 0, 0);
                if (textFadeIn.author != 100) textFadeIn.author += 1;
                pop();
            }

            if (timing >= 10)
            {
                push();
                noStroke();
                translate(MAXWIDTH / 2, MAXHEIGHT / 2);
                fill("rgba(255, 255, 255, " + textFadeIn.author / 100 + ")")
                textSize(48);
                textAlign(CENTER);
                text("A game by\nSean Gregory", 0, 0);
                if (textFadeIn.author != 0) textFadeIn.author -= 1;
                pop();
            }

            if (timing >= 12)
            {
                console.log("HI")
                push();
                noStroke();
                translate(MAXWIDTH / 2, MAXHEIGHT / 2);
                fill("rgba(255, 255, 255, " + textFadeIn.title / 100 + ")")
                textSize(60);
                textFont(mainFont)
                textAlign(CENTER);
                text("Ground Zero", 0, 0);
                if (textFadeIn.title != 100) textFadeIn.title += 1;
                pop();
            }
            
            break;
        case "play":

            background(90);
            drawMoon();
            drawLandscape();
            drawStars();
        
            hunter.draw();
            hunter.move();
            hunter.moveNet();
        
            if (coop)
            {
                hunter2.draw();
                hunter2.move();
                hunter2.moveNet();
            }
        
            for (const ghost of ghosts)
            {
                moveGhost(ghost);
                drawGhost(ghost);
            }
            hunter.checkNetGhostOverlap();
            if (coop) hunter2.checkNetGhostOverlap();
        
        
            ghosts = ghosts.filter(ghost => !ghost.toRemove);
        
            spawnGhosts();
            drawWaves(100);
            break;
        case "over":
            break;
    }

}

function spawnGhosts()
{
    let grace = 0;
    const currentTime = millis();  // Get current time in milliseconds
    if (currentTime - lastFlyTime > spawnInterval)
    {
        let ranNum = Math.round(random(1, 100))
        if (ranNum === 69)
            for (let i = 0; i < 50; i++)
                ghosts.push(makeGhost())
        do
        {
            grace++;
            ghosts.push(makeGhost());  // Add a new ghost
            ranNum -= 20
        } while (ranNum > 20)
        lastFlyTime = currentTime;  // Reset the timer
        spawnInterval = random(1000 * grace, 3000 * grace);
    }
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveGhost(ghost)
{
    ghost.x += ghost.speed;
    ghost.y += cos(frameCount / ghost.wave) * ghost.movement;

    if (ghost.x >= MAXWIDTH + 50)
    {
        ghost.toRemove = true;
        penalizePlayer(ghost);
    }
}

/**
 * This handles when specifically the spacebar is pressed
 */
function keyPressed()
{
    if ((key === "w" || key === "W") && !keyState.w)
    {
        keyState.w = true;
        if (hunter.net.state === "idle")
            hunter.net.state = "outbound";
    }
    if (key === "a" || key === "A") keyState.a = true;
    if (key === "d" || key === "D") keyState.d = true;

    if ((key === "i" || key === "I") && !keyState.i)
        {
            keyState.i = true;
            if (hunter2.net.state === "idle")
                hunter2.net.state = "outbound";
        }
        if (key === "j" || key === "J") keyState.j = true;
        if (key === "l" || key === "L") keyState.l = true;
    keyState[key] = true;
}

function keyReleased()
{
    if (key === "w" || key === "W") keyState.w = false;
    if (key === "a" || key === "A") keyState.a = false;
    if (key === "d" || key === "D") keyState.d = false;
    if (key === "i" || key === "I") keyState.i = false;
    if (key === "j" || key === "J") keyState.j = false;
    if (key === "l" || key === "L") keyState.l = false;
}


function penalizePlayer(ghost)
{
    let speedG = Math.round(ghost.speed);
    let waveG = Math.round(ghost.wave);
    let moveG = Math.round(ghost.movement);
    let p = "";
    p += "GHOST ESCAPED!\n"
    p += "Speed: " + speedG + "\n"
    p += "Waviness: " + waveG + "\n"
    p += "Jitteryness: " + moveG + "\n"

    let addedScore = Math.round(((speedG * 2) + (waveG * 1.5) + (moveG * 1.5)) / 1.5)

    p += "Deducted: " + addedScore
    score -= addedScore
    document.getElementById("currentScore").innerText = score;
    document.getElementById("lostGhostInfo").innerText = p
}

function scorePlayer(ghost, headCatch)
{
    let speedG = Math.round(ghost.speed);
    let waveG = Math.round(ghost.wave);
    let moveG = Math.round(ghost.movement);

    let addedScore = Math.round((speedG * 2) + (waveG * 1.5) + (moveG * 1.5))

    let p = "";
    p += "GHOST CAUGHT!\n"
    if (headCatch)
    {
        p += "HEAD CATCH! +10\n"
        addedScore += 10
    }
    p += "Speed: " + speedG + "\n"
    p += "Waviness: " + waveG + "\n"
    p += "Jitteryness: " + moveG + "\n"


    p += "Quality: " + addedScore
    score += addedScore
    document.getElementById("currentScore").innerText = score;
    document.getElementById("ghostInfo").innerText = p
}

let score = 200;