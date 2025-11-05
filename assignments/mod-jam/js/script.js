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

let hunter, hunter2, ghosts = [];
let lastFlyTime = 0;
let spawnInterval = 1000;

let keyState = {
    w: false,
    a: false,
    d: false,
    i: false,
    j: false,
    l: false,
    space: false
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

    hunter = new Hunter(MAXWIDTH - 100, MAXHEIGHT - 40, 100, "P1", hunter1Controls, "#ffe2c9", "#1569C7")
    hunter2 = new Hunter(100, MAXHEIGHT - 40, 100, "P2", hunter2Controls, "#472a16", "#3dff98")
}

var mainFont, horrorFont, smileImage;

let click = false;

function mousePressed()
{
    click = true;
}
function mouseReleased()
{
    click = false;
}
function preload()
{
    //mainFont = loadFont("/cart253/assignments/mod-jam/assets/fleshandblood.ttf")
    //horrorFont = loadFont("/cart253/assignments/mod-jam/assets/whoAsksSatan.ttf")
    //smileImage = loadImage('/cart253/assignments/mod-jam/assets/images/smile.png');
    mainFont = loadFont("assets/fleshandblood.ttf")
    horrorFont = loadFont("assets/whoAsksSatan.ttf")
    smileImage = loadImage('assets/images/smile.png');
}

let winTriggered = false;
let winStartTime = 0;
let lossTriggered = false;
let loseStartTime = 0;
let winEndingType = "reunion"; // "reunion", "bittersweet", "lost"
let winProgress = 0; // 0..1
let loseProgress = 0;
// ...existing code...

function triggerWin(type = "reunion")
{
    if (winTriggered) return;
    winTriggered = true;
    winStartTime = millis();
    // switch to win state to run cutscene
    gameState = "win";
}

function triggerLoss()
{
    if (lossTriggered) return;
    lossTriggered = true;
    loseStartTime = millis();
    // stop spawning and freeze gameplay inputs if needed
    // e.g. clear ghosts, or set a flag used by draw()
    // optional: play a sound here
    // switch to win state to run cutscene
    gameState = "over";
}

let gameOverVideo = null;
let bothLoseVideo = null;

let choiceSelected = false;
let mouseHover = 1;
function draw()
{
    if (gameState == "win") titleStartTime = 0;

    switch (gameState)
    {
        case "title":
            startIntro();
            // Here's where we'll put the difficulty slider
            break;
        case "difficulty":
            break;
        case "instructions":
            drawInstructions();
            break;
        case "options":
            drawOptions();
            break;
        case "play":
            drawPlay();
            break;
        case "over":
            drawOver();
            break;
        case "win":
            drawWin();
            break;
    }
}

function attachVideoFrameUpdate(v) {
    v.elt.requestVideoFrameCallback(() => {
        redraw();
        attachVideoFrameUpdate(v);
    });
}


/**
 * This handles when specifically the spacebar is pressed
 */
function keyPressed()
{
    if (key === " ") keyState.space = true;
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
    if (key === " ") keyState.space = false;
}

function penalizePlayer(ghost)
{
    let speedG = Math.round(ghost.speed);
    let waveG = Math.round(ghost.wave);
    let moveG = Math.round(ghost.movement);

    let stats = judgeGhost(ghost);

    let addedScore = Math.round((speedG * 1.5) + (waveG * 1.25) + (moveG * 1.25) * gameOptions[difficulty].penalize)

    let p = "";
    p += "GHOST ESCAPED\n\n"
    p += "Speed: " + stats.speed + "\n"
    p += "Waviness: " + stats.wave + "\n"
    p += "Jitteryness: " + stats.movement + "\n"

    p += "Deducted: " + addedScore
    hunter.score -= addedScore;
    if (coop) hunter2.score -= addedScore;
    setEscapedGhost(p);
}

function scorePlayer(ghost, headCatch)
{
    let speedG = Math.round(ghost.speed);
    let waveG = Math.round(ghost.wave);
    let moveG = Math.round(ghost.movement);

    let stats = judgeGhost(ghost);

    let addedScore = Math.round((speedG * 1.5) + (waveG * 1.25) + (moveG * 1.25))

    let p = "";
    p += "GHOST CAUGHT\n\n"
    if (headCatch)
    {
        p += "HEAD CATCH\n"
        addedScore += 10
    }
    p += "Speed: " + stats.speed + "\n"
    p += "Waviness: " + stats.wave + "\n"
    p += "Jitteryness: " + stats.movement + "\n"

    p += "Quality: " + addedScore
    setCaughtGhost(p);
    return addedScore;
}