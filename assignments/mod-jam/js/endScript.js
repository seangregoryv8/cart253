let frozenTimer = 0;
let endTimer = 0;
let startEndTimer = 0;
let endArrived = false;

let hunterSpawn = 0;
let ghostSpawn = 0;
let sadSpawn = 0;
let gx = 0;

let hangHead = false;
let headRaise = false;
let ghostSmile = false;
let hunterSmile = false;

let spacePressed = false;

let textSpawn = 0;

function reset()
{
    frozenTimer = 0;
    endTimer = 0;
    startEndTimer = 0;
    endArrived = false;
    ghostSpawn = 0;
    sadSpawn = 0;
    gx = 0;
    hangHead = false;
    headRaise = false;
    ghostSmile = false;
    hunterSmile = false;
    spacePressed = false;
    textSpawn = 0;
}

let triggers = {
    trigger1: false,
    trigger2: false,
    trigger3: false,
    trigger4: false,
    trigger5: false,
    trigger6: false
}

const lossTimeline = [
    { start: 5, action: () => triggers.trigger1 = true },
    { start: 8, end: 10, speaker: 'hunter', text: "Sophie..." },
    { start: 13, action: () => triggers.trigger2 = true },
    { start: 14, end: 16, speaker: 'hunter', text: "Sophie?..." },
    { start: 18, action: () => triggers.trigger3 = true },
    { start: 20, end: 22, speaker: 'hunter', text: "Sophie?" },
    { start: 23, action: () => triggers.trigger4 = true },
    { start: 25, end: 27, speaker: 'hunter', text: "Sophie?" },
    { start: 26, action: () => triggers.trigger5 = true },
    { start: 29, end: 30, speaker: 'hunter', text: "Sophie?" },
    { start: 30, action: () => triggers.trigger6 = true },
    { start: 31, end: 33, speaker: 'hunter', text: "Sophie?" },
    { start: 78, action: () => textSpawn = min(textSpawn + 3, 255) },
]
const endingTimeline = [
    { start: 2, end: 4, action: () => ghostSpawn = min(ghostSpawn + 3, 255) },
    { start: 4, end: 6, action: () => sadSpawn = min(sadSpawn + 3, 255) },
    { start: 8, end: 10, speaker: 'hunter', text: "Sophie... is that you" },
    { start: 12, end: 14, speaker: 'ghost', text: "..." },
    { start: 14, end: 16, speaker: 'ghost', text: "Felix..." },
    { start: 16, end: 18, speaker: 'hunter', text: "I miss you so much...", action: () => gx = 50 },
    { start: 18, end: 20, speaker: 'ghost', text: "Felix..." },
    { start: 20, end: 22, speaker: 'ghost', text: "It was not your fault..." },
    { start: 22, end: 24, speaker: 'hunter', text: "Sophie... I could not protect you..." },
    { start: 24, end: 26, speaker: 'ghost', text: "Felix... you protected me all my life..." },
    { start: 26, end: 29, speaker: 'ghost', text: "This was not your fault...\nWe both know you could not have\ngotten there in time..." },
    { time: 30, action: () => hangHead = true },
    { start: 31, end: 34, speaker: 'ghost', text: "You did everything you could...\nYou need to move on...\nFrom me..." },
    { start: 36, end: 38, speaker: 'hunter', text: "...I do not know if I can..." },
    { start: 40, end: 42, speaker: 'ghost', text: "You will...\nFor both of us..." },
    { time: 44, action: () => ghostSmile = true },
    { start: 44, end: 46, speaker: 'ghost', text: "I will always be with you..." },
    { start: 46, end: 48, speaker: 'ghost', text: "I love you, Felix..." },
    { time: 50, action: () => { headRaise = true; hangHead = false; } },
    { start: 52, end: 54, speaker: 'hunter', text: "I love you too, Sophie..." },
    { start: 56, end: 58, speaker: 'hunter', text: "Goodbye..." },
    { start: 58, end: 60, speaker: 'ghost', text: "I never liked goodbye..." },
    { start: 62, end: 64, speaker: 'ghost', text: "How about...\nsee you later..." },
    { time: 67, action: () => hunterSmile = true },
    { start: 68, end: 70, speaker: 'hunter', text: "Yeah... See you later..." },
    { start: 72, end: 74, action: () => ghostSpawn = max(ghostSpawn - 3, 0) },
    { start: 78, action: () => textSpawn = min(textSpawn + 3, 255) },
];

/**
 * Handles the ending cutscene drawing
 */

function startEnding()
{
    if (frozenTimer === 0) frozenTimer = millis();

    endTimer = (millis() - frozenTimer) / 1000;
    endTimer *= 10;

    background(0);

    let x = MAXWIDTH / 2 - 50;
    let y = MAXHEIGHT / 2 + 100;
    let size = 100;

    let arrived;

    if (!endArrived) arrived = drawWalkingHunter((endTimer * 1000) - startEndTimer, x, y, size);
    else
    {
        endTimer = Math.round(endTimer);
        
        // Process timeline events
        for (const event of endingTimeline)
        {
            const start = event.start ?? event.time;
            const end = event.end; // may be undefined

            const isActive = endTimer >= start && (end === undefined || endTimer < end);

            if (isActive)
            {
                if (event.action) event.action();
                if (event.text) sayDialogue(event.text, event.speaker === 'hunter');
            }
        }
        drawEndHunter(x, y, size, gx);
        
        push();
        
        fill(255, 255, 255, textSpawn);
        textSize(50);
        textFont(mainFont)
        textAlign(CENTER);
        text("THE END", MAXWIDTH / 2, 250);

        textSize(18);
        text("Press SPACE to return to menu.", MAXWIDTH / 2, MAXHEIGHT / 2 + 200);
        pop();

        if (!keyState.space && spacePressed)
        {
            gameState = "title";
            winTriggered = false;
            reset();
            resetAll();
        }
        if (keyState.space && textSpawn >= 255)
        {
            spacePressed = true;
        }
    }
    if (arrived)
    {
        frozenTimer = millis();
        endArrived = true;
    }
}

function startLoss()
{
    if (frozenTimer === 0) frozenTimer = millis();

    endTimer = (millis() - frozenTimer) / 1000;
    endTimer *= 20;

    background(0);

    let x = MAXWIDTH / 2 - 50;
    let y = MAXHEIGHT / 2 + 100;
    let size = 100;

    let arrived;

    if (!endArrived) arrived = drawWalkingHunter((endTimer * 700) - startEndTimer, x, y, size);
    else
    {
        endTimer = Math.round(endTimer);
        
        // Process timeline events
        for (const event of lossTimeline)
        {
            const start = event.start ?? event.time;
            const end = event.end; // may be undefined

            const isActive = endTimer >= start && (end === undefined || endTimer < end);

            if (isActive)
            {
                if (event.action) event.action();
                if (event.text) sayDialogue(event.text, event.speaker === 'hunter');
            }
        }
        drawEndHunter(x, y, size, gx);
        
        push();
        
        fill(255, 255, 255, textSpawn);
        textSize(50);
        textFont(triggers.trigger2 ? horrorFont : mainFont)
        textAlign(CENTER);
        text("THE END", MAXWIDTH / 2, 250);

        textSize(18);
        text("Press SPACE to return to menu.", MAXWIDTH / 2, MAXHEIGHT / 2 + 200);
        pop();

        if (!keyState.space && spacePressed)
        {
            gameState = "title";
            winTriggered = false;
            reset();
            resetAll();
        }
        if (keyState.space && textSpawn >= 255)
        {
            spacePressed = true;
        }
    }
    if (arrived)
    {
        frozenTimer = millis();
        endArrived = true;
    }
}

function sayDialogue(dialogue, hunterSpeak = true)
{
    fill(255);
    textSize(triggers.trigger2 ? 28 : 18);
    textFont(triggers.trigger2 ? horrorFont : mainFont)
    textAlign(CENTER);
    text(dialogue, hunterSpeak ? MAXWIDTH / 2 - 100 + gx : MAXWIDTH / 2 + 125, MAXHEIGHT / 2 + 150);
}

/**
 * Draw the hunter walking in from the left with bob and simple leg movement.
 * elapsed: ms since walk started
 * targetX: final x position
 * y: base y
 * size: base size scale
 */
function drawWalkingHunter(elapsed, targetX, y, size)
{
    const walkDuration = 6000;
    let p = constrain(elapsed / walkDuration, 0, 1);
    let eased = easeOutCubic(p);

    let startX = -size * 2;
    let x = lerp(startX, targetX, eased);

    let bobAmp = gameState == "over" ? 100 : 10;
    let bob = sin(elapsed * 0.008) * bobAmp * (1 - eased * 0.8);
    if (gameState == "over") bob *= 0;

    drawEndHunter(x, y + bob, size);

    return p >= 1;
}

function drawEndHunter(x, y, size, gx = 0)
{
    // Draw the hunter's body
    push();
    
    if (triggers.trigger3)
    {
        scale(1.5);
        translate(-125, -125)
    }
    if (triggers.trigger4)
    {
        scale(1.5);
        translate(-120, -125)
    }
    if (triggers.trigger5)
    {
        scale(1.5);
        translate(-105, -125)
    }
    if (triggers.trigger6)
    {
        scale(1.5);
        translate(-100, -75)
    }
    push();
    
    stroke(0);
    fill("#bbbbbb")
    translate(gx, 0);
    arc(x - (size / 2), y, size, size * 2.5, radians(180), 0)
    ellipse(x - 40 + (!headRaise ? gx : 0), y - 80 + (hangHead ? 30 : 0), size / 3);
    fill("#ffe2c9");
    translate(x - (size / 2), y - size * 1.5)
    translate(hangHead ? 15 : 0, hangHead ? 15 : 0);
    ellipse(0, 0, size * 0.75)

    if (hunterSmile)
    {
        push();
        fill(0);
        stroke(0);
        rotate(0.2);
        line(10, 20, 25, 20);
        line(10, 20, 2, 15);
        pop();
    }

    if (triggers.trigger1)
    {
        push();
        if (triggers.trigger2)
        {
            translate(-10, -10);
            rotate(radians(45))
        }
        ellipse(25, -15, 20, 30)
        ellipse(-5, -15, 20, 30)
        pop();
    }
    else if (gameState == "over")
    {
        ellipse(20, -15, 20, 30)
    }

    if (!hangHead)
    {
        stroke(0);
        fill(255);
        translate(0, 15)
        // Now we draw his eyes
        ellipse(20, -15, 20, 30)
        fill("#1569C7")
        noStroke();
        ellipse(25, -15, 10);
        fill(0)
        ellipse(27, -15, 5);
        fill(255)
        ellipse(27, -15, 2);

        fill(0, 0, 0, sadSpawn);
        circle(15, -30, size / 4);
        fill(255, 226, 201, sadSpawn);
        ellipse(12, -33, size / 4);
    }

    if ((gameState == "over" && !endArrived) || (gameState == "win" && !hangHead))
    {
        fill("#1569C7")
        noStroke();
        ellipse(25, -15, 10);
        fill(0)
        ellipse(27, -15, 5);
        fill(255)
        ellipse(27, -15, 2);
        fill(0, 0, 0, sadSpawn);
        circle(15, -30, size / 4);
        fill(255, 226, 201, sadSpawn);
        ellipse(12, -33, size / 4);
    }

    translate(!hangHead ? 15 : 0, 15);

    // Draw ghost
    translate(-gx, 0);
    translate(200, 0)
    fill(255, 255, 255, ghostSpawn)
    ellipse(0, 0, size)
    fill(0, 0, 0, ghostSpawn);
    ellipse(-20, -20, size / 4)
    ellipse(20, -20, size / 4)
    if (ghostSmile)
    {
        arc(0, 10, size / 2, size / 4, 0, PI);
    }
    else ellipse(0, 20, size / 4)

    pop();
    
}

/* easing helper */
function easeOutCubic(t) {
    return 1 - pow(1 - t, 3);
}