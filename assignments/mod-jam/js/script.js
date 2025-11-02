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

    hunter = new Hunter(MAXWIDTH - 100, MAXHEIGHT - 40, 100, "P1", hunter1Controls)
    hunter2 = new Hunter(100, MAXHEIGHT - 40, 100, "P2", hunter2Controls)
}

let fadeIn = 0;
let objectFadeIn = 0;
let objectFadeOut = 255;
let textFadeIn = {
    author: 0,
    title: 0,
    options: 0
}

let skipped = {
    once: false,
    twice: false,
};
let skipForward = 0;
let spaceGrace = 0;
var mainFont;

let menuSelect = {
    main: true,
    single: false,
    multi: false,
    instructions: false,
    options: false
}

let click = false;

function resetAll()
{
    fadeIn = 0;
    objectFadeIn = 0;
    objectFadeOut = 255;
    textFadeIn = {
        author: 0,
        title: 0,
        options: 0
    }

    skipped = {
        once: false,
        twice: false,
    };
    skipForward = 0;
    spaceGrace = 0;

    menuSelect = {
        main: true,
        single: false,
        multi: false,
        instructions: false,
        options: false
    }

    click = false;

    gameStartTriggered = false;
    startPlayTimeoutSet = false;
    startTriggerTimeoutSet = false;

    score = 200;
}

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


let fadeBeforeGameStart = 0;
let gameStartTriggered = false;
let startPlayTimeoutSet = false;
let startTriggerTimeoutSet = false;

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

let titleStartTime = 0;

function draw()
{
    if (gameState == "win") titleStartTime = 0;

    switch (gameState)
    {
        case "title":
            if (titleStartTime === 0) titleStartTime = millis();
            let sec = (millis() - titleStartTime) / 1000;  // Get current time in milliseconds

            let timing = sec + skipForward
            console.log(timing);
            console.log(sec);
            //console.log(timing);
            if (keyState.space && !skipped.once)
            {
                spaceGrace++;
                skipped.once = true;
                skipForward = 8 - sec;
                fadeIn = 90;
                objectFadeIn = 255;
            }
            if (!keyState.space && spaceGrace == 1) spaceGrace++;

            if (keyState.space && skipped.once && !skipped.twice && spaceGrace == 2)
            {
                textFadeIn.author = 0;
                skipped.twice = true;
                skipForward = 12 - sec;
            }

            background(fadeIn);
            if (timing >= 3 && fadeIn < 90) fadeIn += 0.5;
            if (timing >= 5 && objectFadeIn <= 255) objectFadeIn += 1.5;
            drawMoon(objectFadeIn);
            drawLandscape(objectFadeIn, menuSelect.main ? objectFadeIn : objectFadeOut, menuSelect.main ? objectFadeIn : coop ? objectFadeOut : 255);
            drawStars(objectFadeIn);
            drawWaves(objectFadeIn);

            if (timing >= 8 && timing < 10)
            {
                push();
                noStroke();
                translate(MAXWIDTH / 2, MAXHEIGHT / 2);
                fill(255, 255, 255, textFadeIn.author)
                textSize(48);
                textAlign(CENTER);
                text("A game by\nSean Gregory", 0, 0);
                if (textFadeIn.author <= 255) textFadeIn.author += 3;
                pop();
            }

            if (timing >= 10)
            {
                push();
                noStroke();
                translate(MAXWIDTH / 2, MAXHEIGHT / 2);
                fill(255, 255, 255, textFadeIn.author)
                textSize(48);
                textAlign(CENTER);
                text("A game by\nSean Gregory", 0, 0);
                if (textFadeIn.author >= 0) textFadeIn.author -= 3;
                pop();
            }

            if (timing >= 12)
            {
                push();
                noStroke();
                translate(MAXWIDTH / 2, MAXHEIGHT / 2);
                textSize(60);
                textFont(mainFont)
                textAlign(CENTER);
                // Now we can select options
                
                let minW = MAXWIDTH / 2 - 100;
                let maxW = MAXWIDTH / 2 + 100;
                let avH = MAXHEIGHT / 2

                let cond = mouseX >= minW - 200 && mouseX <= maxW + 200 && mouseY >= avH -50 && mouseY <= avH 
                fill(255, 255, 255, textFadeIn.title)
                text(cond ? "Spirit of our Sister" : "Spiritus Sororis Nostrae", 0, 0);

                textSize(24);
                
                cond = mouseX >= minW && mouseX <= maxW && mouseY >= avH + 80 && mouseY <= avH + 100
                fill(cond ? 0 : 255, cond ? 0 : 255, cond ? 0 : 255, textFadeIn.title)
                text(cond ? "Single Player" : "Lusor Unius", 0, 100)
                if (cond && click && textFadeIn.title >= 255)
                {
                    menuSelect.single = true;
                    menuSelect.main = false;
                }

                cond = mouseX >= minW && mouseX <= maxW && mouseY >= avH + 120 && mouseY <= avH + 140
                fill(cond ? 0 : 255, cond ? 0 : 255, cond ? 0 : 255, textFadeIn.title)
                text(cond ? "Multiplayer" : "Lusoribus", 0, 140)
                if (cond && click && textFadeIn.title >= 255)
                {
                    menuSelect.single = true;
                    menuSelect.main = false;
                    coop = true;
                }

                cond = mouseX >= minW && mouseX <= maxW && mouseY >= avH + 160 && mouseY <= avH + 180
                fill(cond ? 0 : 255, cond ? 0 : 255, cond ? 0 : 255, textFadeIn.title)
                text(cond ? "Instructions" : "Instructiones", 0, 180)
                if (cond && click && textFadeIn.title >= 255)
                {
                    menuSelect.instructions = true;
                    menuSelect.main = false;
                    gameState = "instructions";
                }

                cond = mouseX >= minW && mouseX < maxW && mouseY >= avH + 200 && mouseY <= avH + 220
                fill(cond ? 0 : 255, cond ? 0 : 255, cond ? 0 : 255, textFadeIn.title)
                text(cond ? "Options" : "Optiones", 0, 220)

                if (timing <= 14 && textFadeIn.title <= 255) textFadeIn.title += 3;
                pop();
            }
            
            if (menuSelect.single)
            {
                textFadeIn.title -= 3;
                objectFadeOut -= 2.5;
                //gameState = "play";
            }
            if (objectFadeOut < 0)
            {
                if (!gameStartTriggered)
                {
                    if (fadeBeforeGameStart >= 255)
                    {
                        if (!startTriggerTimeoutSet) {
                            startTriggerTimeoutSet = true;
                            setTimeout(() => { gameStartTriggered = true; }, 3000);
                        }
                    }
                    else fadeBeforeGameStart += 3;
                }
                else
                {
                    fadeBeforeGameStart -= 3;

                    // schedule entering play state only once
                    if (!startPlayTimeoutSet) {
                        startPlayTimeoutSet = true;
                        setTimeout(() => {
                            gameState = "play";
                            hunter.body.x = -300;
                            if (coop) hunter2.body.x = MAXWIDTH + 150;
                            skipped.once = false;
                            skipped.twice = false;
                            skipForward = 0;
                            spaceGrace = 0;
                        }, 1000);
                    }
                }
                push();
                noStroke();
                translate(MAXWIDTH / 2, MAXHEIGHT / 2);
                textSize(30);
                textFont(mainFont)
                textAlign(CENTER);
                // Now we can select options
                fill(255, 255, 255, fadeBeforeGameStart)

                text("Sophia...\nTe invenire debeo...", 0, 0);
                textSize(24);
                fill(180, 180, 180, fadeBeforeGameStart)
                text("Sophia...\nWhere are you...", 0, 80);
                pop();
            }
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
        case "play":
            background(90);
            drawMoon();
            drawLandscape(255, 0, !coop ? 255 : 0);
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
            
            setTimeout(spawnGhosts, 2000);
            drawWaves();

            if (score >= 300 && !winTriggered)
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