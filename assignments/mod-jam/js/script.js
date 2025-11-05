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
    space: false
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
        speed: random(gameOptions[difficulty].minSpeed, gameOptions[difficulty].maxSpeed),
        toRemove: false,
        tail: [],
        wave: random(gameOptions[difficulty].minWave, gameOptions[difficulty].maxWave),
        movement: random(gameOptions[difficulty].minMovement, gameOptions[difficulty].maxMovement),
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

    hunter = new Hunter(MAXWIDTH - 100, MAXHEIGHT - 40, 100, "P1", hunter1Controls, "#ffe2c9", "#1569C7")
    hunter2 = new Hunter(100, MAXHEIGHT - 40, 100, "P2", hunter2Controls, "#472a16", "#3dff98")
}

var mainFont;
var horrorFont;

let click = false;

function mousePressed()
{
    click = true;
}
function mouseReleased()
{
    click = false;
}
let smileImage;
function preload()
{
    mainFont = loadFont("./assets/fleshandblood.ttf")
    horrorFont = loadFont("./assets/whoAsksSatan.ttf")
    smileImage = loadImage('./assets/images/smile.png');
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
            console.log("HI")
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

        // What to add:
        // - Difficulty slider
        // - Points to win for multiplayer
            ending = "regular";
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
            
            text("CHOOSE DIFFICULTY", 0, -200);
            textSize(24);
            let avgX = 250; // Increments by 200
            let avgY = 285;
            mouseHover = (mouseX < avgX + 50 && mouseX > avgX - 50 && mouseY < avgY + 15 && mouseY > avgY - 15)
            fill(mouseHover ? 150 : 255);
            text("EASY", -200, -100)
            if (mouseHover) difficulty = "easy";
            avgX += 200;
            mouseHover = (mouseX < avgX + 50 && mouseX > avgX - 50 && mouseY < avgY + 15 && mouseY > avgY - 15)
            fill(mouseHover ? 150 : 255);
            text("MEDIUM", 0, -100)
            if (mouseHover) difficulty = "medium";
            avgX += 200;
            mouseHover = (mouseX < avgX + 50 && mouseX > avgX - 50 && mouseY < avgY + 15 && mouseY > avgY - 15)
            fill(mouseHover ? 150 : 255);
            text("HARD", 200, -100)
            if (mouseHover) difficulty = "hard";

            fill(255);
            textSize(18);
            textFont("Calibri")
            let optionsText;
            switch (difficulty)
            {
                case "easy":
                    optionsText = "Looking for a more casual ghost experience\n\n"
                    optionsText += "- Slower ghost spawn time (Between 2-4 seconds)\n"
                    optionsText += "- More lenient ghost horde\n"
                    optionsText += "- Generally slower ghosts that don't move around as much\n"
                    optionsText += "- 0.75 less penalization for missing a ghost\n"
                    break;
                case "medium":
                    optionsText = "Slight bit of challenge, but nothing supernatural yet\n\n"
                    optionsText += "- Regular ghost spawn time (Between 1-3 seconds)\n"
                    optionsText += "- Standard ghost horde\n"
                    optionsText += "- Run-of-the-mill ghosts\n"
                    optionsText += "- Regular penalization for missing a ghost\n"
                    break;
                case "hard":
                    optionsText = "A true undead fan, and a tough one at that\n\n"
                    optionsText += "- Faster ghost spawn time (Between 0.5-2 seconds)\n"
                    optionsText += "- Good luck with the ghost horde\n"
                    optionsText += "- Faster ghosts, more jittery and wavy\n"
                    optionsText += "- 50% more penalization for missing a ghost\n"
                    break;
            }
            if (!coop)
            {
                optionsText += "\n- "
                if (difficulty == "easy") optionsText += "2000 points needed to win"
                if (difficulty == "medium") optionsText += "3000 points needed to win"
                if (difficulty == "hard") optionsText += "5000 points needed to win"
            }

            if (coop)
            {
                optionsText += "\n- "
                if (difficulty == "easy") optionsText += "First to 2000 points wins!"
                if (difficulty == "medium") optionsText += "First to 3000 points wins!"
                if (difficulty == "hard") optionsText += "First to 5000 points wins!"
            }

            optionsText += "\n\n"
            text(optionsText, 0, 0);
            textSize(24);
            text("Happy with your selection? Press SPACE to go ghost hunting...", 0, 300)
            pop();

            if (keyState.space)
            {
                hunter.setScore();
                if (coop) hunter2.setScore();
                gameState = "play";
                menuSelect.options = false;
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

            if (!coop && hunter.score >= gameOptions[difficulty].pointsToWin && !winTriggered)
            {
                triggerWin("reunion");
                gameState = "win";
            }
            else if (coop)
            {
                if (hunter.score >= gameOptions[difficulty].pointsToWin)
                {
                    ending = "p1wins"
                    gameState = "win";
                }
                else if (hunter2.score >= gameOptions[difficulty].pointsToWin)
                {
                    ending = "p2wins"
                    gameState = "win";
                }
                else if (hunter.score < 0 && hunter2.score < 0)
                {
                    ending = "bothlose";
                    gameState = "win";
                }
                else if (hunter.score < 0)
                {
                    ending = "p1lose";
                    gameState = "win";
                }
                else if (hunter2.score < 0)
                {
                    ending = "p2lose";
                    gameState = "win";
                }
            }

            // Hidden not-so-hidden ending
            if (!coop && hunter.score < 0)
            {
                if (ghostHordeFunny) ending = "funny";
                else
                {
                    ending = "sad";
                    triggerLoss();
                }
                gameState = "over";
            }
            break;
        case "over":
            if (ending == "funny")
            {
                // create and start the video once (remove ghostHordeFunny guard so video always shows on game over)
                if (!gameOverVideo) {
                    
                    gameOverVideo = createVideo(['assets/hordeMessage.mov','assets/hordeMessage.mp4']);
                    gameOverVideo.hide();
                    gameOverVideo.volume(1);
                    gameOverVideo.elt.muted = false;

                    gameOverVideo.elt.oncanplay = () => {
                        gameOverVideo.play();
                        attachVideoFrameUpdate(gameOverVideo);
                        noLoop(); // only draw when frame changes
                    };
                
                    gameOverVideo.elt.onended = () => {
                        gameState = "title";
                        resetAll();
                        try { gameOverVideo.stop(); } catch(e){}
                        gameOverVideo.remove();
                        gameOverVideo = null;
                        loop(); // resume normal drawing
                    };
                }

                // draw current video frame when available; otherwise show fallback text
                if (gameOverVideo && gameOverVideo.elt.readyState >= 2) {
                    gameOverVideo.loadPixels();
                    image(gameOverVideo, 0, 0, MAXWIDTH, MAXHEIGHT);
                } else {
                    // fallback while loading / if unsupported
                    push();
                    fill(255);
                    textAlign(CENTER, CENTER);
                    textSize(48);
                    text("GAME OVER", MAXWIDTH/2, MAXHEIGHT/2);
                    textSize(18);
                    text("Loading video...", MAXWIDTH/2, MAXHEIGHT/2 + 60);
                    pop();
                }
            }
            else if (ending == "sad")
            {
                push();
                // timed cutscene: 0..10 seconds (ms-based)
                background(20);
                let elapsedMs = millis() - loseStartTime;
                let elapsed = elapsedMs / 1000; // seconds
                loseProgress = constrain(elapsed / 10, 0, 1);

                // dutch angle (grows as cutscene progresses) + tiny wobble
                let baseTiltDeg = -36;
                const wobbleDeg = 0;
                const wobbleSpeed = 0;
                let tiltDeg = baseTiltDeg * loseProgress;
                let wobble = Math.sin(elapsed * TWO_PI * wobbleSpeed) * wobbleDeg;
                let angle = radians(tiltDeg + wobble);

                // schedule twitches: small head jolt every so often
                if (millis() > sadTwitchState.nextTwitchAt)
                {
                    // next twitch in 200..1400ms
                    sadTwitchState.duration = Math.round(random(80, 220));
                    sadTwitchState.offsetX = random(-10, 10) * (0.3 + loseProgress * 1.2);
                    sadTwitchState.offsetY = random(-6, 6) * (0.3 + loseProgress * 1.2);
                    sadTwitchState.rot = radians(random(-8, 8) * (0.25 + loseProgress));
                    sadTwitchState.endAt = millis() + sadTwitchState.duration;
                    sadTwitchState.nextTwitchAt = millis() + random(200, 1400) * (1 - loseProgress * 0.6);
                }

                // occasional white flash (very brief) to punctuate horror
                if (millis() > whiteFlashUntil && elapsed > 0.6 && elapsed < 9)
                    if (random() < 0.025 + loseProgress * 0.08)
                        whiteFlashUntil = millis() + Math.round(random(40, 150)); // ms

                // occasional static pulse (grain / inverted wash)
                if (millis() > staticPulseUntil && elapsed > 1 && elapsed < 9)
                    if (random() < 0.015 + loseProgress * 0.05)
                        staticPulseUntil = millis() + Math.round(random(60, 220));

                // subtle zoom + rotation around centre
                push();
                translate(MAXWIDTH / 2, MAXHEIGHT / 2);
                rotate(angle);
                let zoom = 1 + loseProgress * 0.42;
                scale(zoom);
                translate(-MAXWIDTH / 2, -MAXHEIGHT / 2);

                // draw scene underneath
                drawMoon(255);
                drawLandscape(255, 0, 0);
                drawStars(255);

                // draw hunter — apply twitch transform only to the hunter draw call
                let targetX = MAXWIDTH / 2;
                hunter.body.x = lerp(hunter.body.x, targetX, 0.02 + loseProgress * 0.02);

                // if twitch is active, draw hunter with local jitter/rotation
                if (millis() < sadTwitchState.endAt)
                {
                    push();
                    // move to hunter body origin, apply local twitch, then draw
                    translate(sadTwitchState.offsetX, sadTwitchState.offsetY);
                    rotate(sadTwitchState.rot);
                    hunter.draw();
                    pop();
                }
                else hunter.draw();

                // keep net animating so scene feels alive
                hunter.moveNet();

                // draw quick ghostly silhouettes during pulses
                if (millis() < staticPulseUntil)
                {
                    push();
                    blendMode(ADD);
                    noStroke();
                    fill(255, 255, 255, 30 + loseProgress * 120);
                    // quick radial smear in centre
                    ellipse(MAXWIDTH/2 + random(-30,30), MAXHEIGHT/2 + random(-30,30), 600 * (0.4 + loseProgress * 1.2));
                    pop();
                }

                // white flash overlay (short, jarring)
                if (millis() < whiteFlashUntil)
                {
                    push();
                    noStroke();
                    fill(255, 255, 255, map(whiteFlashUntil - millis(), 0, 150, 0, 220));
                    rect(0, 0, MAXWIDTH, MAXHEIGHT);
                    pop();
                }

                // film-grain / subtle static drawn on top while later in cutscene
                if (loseProgress > 0.35)
                {
                    push();
                    noStroke();
                    fill(255, 30);
                    for (let i = 0; i < 60 * loseProgress; i++)
                        rect(random(MAXWIDTH), random(MAXHEIGHT), random(1,3), random(1,3));
                    pop();
                }
                pop();

                // finalise: when full 10s elapsed, proceed
                if (elapsed >= 10)
                    startLoss();

                pop(); // end main rotate/scale transform
            }
            break;
        case "win":
            if (coop)
            {
                if (ending != "bothlose")
                {
                    push();
                    background(90);
                    noStroke();
                    fill(59, 111, 65)
                    ellipse(MAXWIDTH / 2, MAXHEIGHT + 40, 1500, 600)
                    push();
                    noStroke();
                    translate(MAXWIDTH / 2, MAXHEIGHT / 2);
                    textSize(50);
                    textFont(mainFont)
                    textAlign(CENTER);
                    fill(255, 255, 255)
                    pop();
                }
                if (ending === "p1wins" || ending === "p2wins")
                {
                    drawStars();

                    const winner = ending === "p1wins" ? "Player 1" : "Player 2";
                    const loser  = ending === "p1wins" ? "Player 2" : "Player 1";
                    const winHunter = ending === "p1wins" ? hunter : hunter2;
                    const loseHunter = ending === "p1wins" ? hunter2 : hunter;

                    fill(0, 0, 0, 100);
                    noStroke();
                    rect(MAXWIDTH / 4, 30, MAXWIDTH / 2, 230);

                    textFont(mainFont);
                    textAlign(CENTER);
                    textSize(50);
                    fill(255);
                    text(`${winner} Wins`, MAXWIDTH / 2, 100);

                    textFont("Calibri");
                    textSize(24);
                    text(`${winner} Score: ${winHunter.score}`, MAXWIDTH / 2, 200);
                    text(`${loser} Score: ${loseHunter.score}`, MAXWIDTH / 2, 230);

                    pop();
                    playerWins(winHunter, loseHunter);
                }
                else if (ending == "bothlose")
                {
                    // create and start the video once (remove ghostHordeFunny guard so video always shows on game over)
                    if (!bothLoseVideo) {

                        bothLoseVideo = createVideo(['assets/bothLose.mov']);
                        bothLoseVideo.hide();
                        bothLoseVideo.volume(1);
                        bothLoseVideo.elt.muted = false;

                        bothLoseVideo.elt.oncanplay = () => {
                            bothLoseVideo.play();
                            attachVideoFrameUpdate(bothLoseVideo);
                            noLoop(); // only draw when frame changes
                        };
                    
                        bothLoseVideo.elt.onended = () => {
                            gameState = "title";
                            resetAll();
                            try { bothLoseVideo.stop(); } catch(e){}
                            bothLoseVideo.remove();
                            bothLoseVideo = null;
                            loop(); // resume normal drawing
                        };
                    }

                    // draw current video frame when available; otherwise show fallback text
                    if (bothLoseVideo && bothLoseVideo.elt.readyState >= 2)
                    {
                        bothLoseVideo.loadPixels();
                        image(bothLoseVideo, 0, 0, MAXWIDTH, MAXHEIGHT);
                    }
                    else
                    {
                        // fallback while loading / if unsupported
                        push();
                        fill(255);
                        textAlign(CENTER, CENTER);
                        textSize(48);
                        text("GAME OVER", MAXWIDTH/2, MAXHEIGHT/2);
                        textSize(18);
                        text("Loading video...", MAXWIDTH/2, MAXHEIGHT/2 + 60);
                        pop();
                    }
                }
                else 
                if (ending === "p1lose" || ending === "p2lose")
                {
                    drawStars();

                    const winner = ending === "p2lose" ? "Player 1" : "Player 2";
                    const loser  = ending === "p2lose" ? "Player 2" : "Player 1";
                    const winHunter = ending === "p2lose" ? hunter : hunter2;
                    const loseHunter = ending === "p2lose" ? hunter2 : hunter;

                    fill(0, 0, 0, 100);
                    noStroke();
                    rect(MAXWIDTH / 6, 30, MAXWIDTH * 2 / 3, 230);

                    textFont(mainFont);
                    textAlign(CENTER);
                    textSize(50);
                    fill(255);
                    text(`${loser} Disqualified.\n${winner} Wins`, MAXWIDTH / 2, 100);

                    textFont("Calibri");
                    textSize(24);
                    text(`${winner} Score: ${winHunter.score}`, MAXWIDTH / 2, 220);
                    text(`${loser} Score: ${loseHunter.score}`, MAXWIDTH / 2, 250);

                    pop();
                    playerDefaultWins(winHunter, loseHunter);
                }
            }
            else
            {
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
                if (elapsed >= 10)
                    startEnding();
                pop();
            }
            break;
    }
}
function attachVideoFrameUpdate(v) {
    v.elt.requestVideoFrameCallback(() => {
        redraw();
        attachVideoFrameUpdate(v);
    });
}

let ghostHordeFunny = false;
function spawnGhosts()
{
    let grace = 0;
    const currentTime = millis();  // Get current time in milliseconds
    if (currentTime - lastFlyTime > spawnInterval)
    {
        let ranNum = Math.round(random(1, 100))
        if (ranNum === 69)
        {
            for (let i = 0; i < gameOptions[difficulty].insaneGhosts; i++)
                ghosts.push(makeGhost())
            ghostHordeFunny = true;
            setTimeout(() => ghostHordeFunny = false, 5000)
        }
        do
        {
            grace++;
            ghosts.push(makeGhost());  // Add a new ghost
            ranNum -= 20
        } while (ranNum > 20)
        lastFlyTime = currentTime;  // Reset the timer
        spawnInterval = random(gameOptions[difficulty].minSpawn * grace, gameOptions[difficulty].maxSpawn * grace);
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
    let d = gameOptions[difficulty]
    let avgSpeed = d.maxSpeed - d.minSpeed;
    let avgWave = d.maxWave - d.minWave;
    let avgMovement = d.maxMovement - d.minMovement;

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

    if (ghost.speed <= d.minSpeed + (avgSpeed / 3)) ghostStats.speed = "Slow";
    else if (ghost.speed > d.minSpeed + (avgSpeed / 3) && ghost.speed <= d.minSpeed + (2 * (avgSpeed / 3))) ghostStats.speed = "Medium";
    else if (ghost.speed > d.minSpeed + (2 * (avgSpeed / 3))) ghostStats.speed = "Fast";

    if (ghost.wave <= d.minWave + (avgWave / 3)) ghostStats.wave = "Jittery";
    else if (ghost.wave > d.minWave + (avgWave / 3) && ghost.wave <= d.minWave + (2 * (avgWave / 3))) ghostStats.wave = "Floaty";
    else if (ghost.wave > d.minWave + (2 * (avgWave / 3))) ghostStats.wave = "Calm";

    if (ghost.movement <= d.minMovement + (avgMovement / 3)) ghostStats.movement = "Static";
    else if (ghost.movement > d.minMovement + (avgMovement / 3) && ghost.movement <= d.minMovement + (2 * (avgMovement / 3))) ghostStats.movement = "Wiggly";
    else if (ghost.movement > d.minMovement + (2 * (avgMovement / 3))) ghostStats.movement = "Sine Master";

    return ghostStats;
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