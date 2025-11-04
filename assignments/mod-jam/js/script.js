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
    l: false,
    space: false,
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
        minSpeed: 1,
        maxSpeed: 6,
        toRemove: false,
        tail: [],
        wave: random(3, 15),
        minWave: 3,
        maxWave: 15,
        movement: random(1, 7),
        minMovement: 1,
        maxMovement: 7,
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

    hunter = new Hunter(MAXWIDTH - 100, MAXHEIGHT - 40, 100, "P1", hunter1Controls)
    hunter2 = new Hunter(100, MAXHEIGHT - 40, 100, "P2", hunter2Controls)
}

var mainFont;

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
    mainFont = loadFont("/assets/fleshandblood.ttf")
}

let winTriggered = false;
let winStartTime = 0;
let winEndingType = "reunion"; // "reunion", "bittersweet", "lost"
let winProgress = 0; // 0..1
// ...existing code...

function triggerWin(type = "reunion")
{
    if (winTriggered) return;
    winTriggered = true;
    winStartTime = millis();
    winEndingType = type;
    // stop spawning and freeze gameplay inputs if needed
    // e.g. clear ghosts, or set a flag used by draw()
    // optional: play a sound here
    console.log("WIN TRIGGERED:", type);
    // switch to win state to run cutscene
    gameState = "win";
}

function draw()
{
    if (gameState == "win") titleStartTime = 0;

    switch (gameState)
    {
        case "title":
            startIntro();
            break;
        case "instructions":
            background(90);
            drawMoon();
            drawLandscape(255, 255);
            drawStars();
            drawWaves();

            fill(0, 0, 0, 150);
            noStroke();
            rect(50, 50, MAXWIDTH - 100, MAXHEIGHT - 100);
            
            push();
            noStroke();
            translate(MAXWIDTH / 2, MAXHEIGHT / 2);
            textSize(50);
            textFont(mainFont)
            textAlign(CENTER);
            fill(255, 255, 255)
            text("How to play", 0, -200);

            textSize(18);
            let instructionsText = "You are a spirit reaper, trying to find your deceased sister.\n\n"
            instructionsText += "Catch as many ghosts as you can with your spectral net\n"
            instructionsText += "Each ghost you catch will give you points based on how difficult it was to catch\n"
            instructionsText += "If a ghost escapes off the right side of the screen, you will lose points\n\n"
            instructionsText += "Launch the net using the W key\n"
            instructionsText += "Move your hunter left and right using the A and D keys\n"

            instructionsText += "In multiplayer mode, Player 2, your brother, uses the I, J, and L keys respectively\n\n"

            instructionsText += "Good luck finding your sister...\n\n"
            instructionsText += "Press SPACE to return to the main menu"
            text(instructionsText, 0, -100);
            pop();

            if (keyState.space)
            {
                gameState = "title";
                menuSelect.instructions = false;
                menuSelect.main = true;
            }
            break;
        case "options":
            background(90);
            drawMoon();
            drawLandscape(255, 255);
            drawStars();
            drawWaves();

            fill(0, 0, 0, 150);
            noStroke();
            rect(50, 50, MAXWIDTH - 100, MAXHEIGHT - 100);
            
            push();
            noStroke();
            translate(MAXWIDTH / 2, MAXHEIGHT / 2);
            textSize(50);
            textFont(mainFont)
            textAlign(CENTER);
            fill(255, 255, 255)
            text("How to play", 0, -200);

            textSize(18);
            let optionsText = "You are a spirit reaper, trying to find your deceased sister.\n\n"
            optionsText += "Catch as many ghosts as you can with your spectral net\n"
            optionsText += "Each ghost you catch will give you points based on how difficult it was to catch\n"
            optionsText += "If a ghost escapes off the right side of the screen, you will lose points\n\n"
            optionsText += "Launch the net using the W key\n"
            optionsText += "Move your hunter left and right using the A and D keys\n"
            optionsText += "In multiplayer mode, Player 2, your brother, uses the I, J, and L keys respectively\n\n"
            optionsText += "Good luck finding your sister...\n\n"
            optionsText += "Press SPACE to return to the main menu"
            text(optionsText, 0, -100);
            pop();

            if (keyState.space)
            {
                gameState = "title";
                menuSelect.instructions = false;
                menuSelect.main = true;
            }
            break;
        case "play":
            background(90);
            drawMoon();
            drawLandscape(255, 0, !coop ? 255 : 0);
            drawStars();

            createUI();
        
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
            
            setTimeout(spawnGhosts, 2000);
            drawWaves();

            if (!coop && hunter.score >= 300 && !winTriggered)
            {
                triggerWin("reunion");
                gameState = "win";
            }
            break;
        case "over":
            break;
        case "win":
            // simple timed cutscene: 0..10 seconds
            background(20);
            let elapsed = (millis() - winStartTime) / 1000; // seconds
            winProgress = constrain(elapsed / 10, 0, 1);

            // subtle zoom effect by scaling around centre
            push();
            translate(MAXWIDTH / 2, MAXHEIGHT / 2);
            let zoom = 1 + winProgress * 0.4;
            scale(zoom);
            translate(-MAXWIDTH / 2, -MAXHEIGHT / 2);

            // dim scene and draw environment faintly
            drawMoon(255);
            drawLandscape(255, 0, 0);
            drawStars(255);

            // draw hunter slowly moving to centre
            let targetX = MAXWIDTH / 2;
            hunter.body.x = lerp(hunter.body.x, targetX, 0.02 + winProgress * 0.02);
            hunter.draw();
            hunter.moveNet();

            // epilogue text after cutscene
            if (elapsed >= 10)
            {
                startEnding();
                // unlock example: if high score, set an unlock flag
                // wait for space to go back
            }
            pop();
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

function judgeGhost(ghost)
{
    let avgSpeed = ghost.maxSpeed - ghost.minSpeed;
    let avgWave = ghost.maxWave - ghost.minWave;
    let avgMovement = ghost.maxMovement - ghost.minMovement;

    let ghostStats = {
        speed: "",
        wave: "",
        movement: ""
    }
    
    // If the speed is low, medium, or high
    // avgSpeed: 9 (if min 1 and max 10)
    // Slow speed: 1-3
    // Average speed: 4-6
    // High speed: 7-10

    if (ghost.speed <= ghost.minSpeed + (avgSpeed / 3)) ghostStats.speed = "Slow";
    else if (ghost.speed > ghost.minSpeed + (avgSpeed / 3) && ghost.speed <= ghost.minSpeed + (2 * (avgSpeed / 3))) ghostStats.speed = "Medium";
    else if (ghost.speed > ghost.minSpeed + (2 * (avgSpeed / 3))) ghostStats.speed = "Fast";

    if (ghost.wave <= ghost.minWave + (avgWave / 3)) ghostStats.wave = "Jittery";
    else if (ghost.wave > ghost.minWave + (avgWave / 3) && ghost.wave <= ghost.minWave + (2 * (avgWave / 3))) ghostStats.wave = "Floaty";
    else if (ghost.wave > ghost.minWave + (2 * (avgWave / 3))) ghostStats.wave = "Calm";

    if (ghost.movement <= ghost.minMovement + (avgMovement / 3)) ghostStats.movement = "Static";
    else if (ghost.movement > ghost.minMovement + (avgMovement / 3) && ghost.movement <= ghost.minMovement + (2 * (avgMovement / 3))) ghostStats.movement = "Wiggly";
    else if (ghost.movement > ghost.minMovement + (2 * (avgMovement / 3))) ghostStats.movement = "Sine Master";

    return ghostStats;
}

function penalizePlayer(ghost)
{
    let speedG = Math.round(ghost.speed);
    let waveG = Math.round(ghost.wave);
    let moveG = Math.round(ghost.movement);

    let stats = judgeGhost(ghost);

    let addedScore = Math.round((speedG * 1.5) + (waveG * 1.25) + (moveG * 1.25) * 0.75)

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