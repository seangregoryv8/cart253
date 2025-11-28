var exoFont = {
    black: null,
    blackItalic: null,
    bold: null,
    boldItalic: null,
    extraBold: null,
    extraBoldItalic: null,
    extraLight: null,
    extraLightItalic: null,
    italic: null,
    light: null,
    lightItalic: null,
    medium: null,
    mediumItalic: null,
    regular: null,
    semiBold: null,
    semiBoldItalic: null,
    thin: null,
    thinItalic: null
}

var gameModesUI = []

let GAMEMODES = {
    Classic: "Classic",
    Prediction: "Prediction",
    RNGHell: "RNG Hell",
    Powerup: "PowerUp",
    Supershot: "Supershot"
}
let selectedMode = GAMEMODES.Prediction;

let palmar = false;
let palmarTimer = 0;

let palmarWords = [
    "Unlucky",
    "Womp womp",
    "F",
    "L + Ratio",
    "Oof",
    "Lol. Lmao even",
    "Get nae nae'd",
    "Thwack",
    "Sussy Baka",
    "Big oof",
    "RIP",
    "gg ez",
    "Bruh",
    "Let's go gambling!",
    "Aw dangit",
    "Definition of insanity"
]

let rngEffects = {
    invisibleBall: false,
    frozenPaddle: false
}

let palmarChosen = -1;
let palmarScrew = "";
function drawModes()
{
    let selectedDesc = "";
    push();
    fill(255);
    textSize(32);
    textFont(exoFont.black);
    text("BREAKTHROUGH", GAMEWIDTH + 25, 50);

    textSize(18);
    textFont(exoFont.light);
    text("Breakout Variation Game by", GAMEWIDTH + 25, 90);
    text("Sean Gregory", GAMEWIDTH + 25, 110);

    for (let mode of gameModesUI)
    {
        updateModeHover(mode);

        if (mode.hovered) fill(100, 200, 255);
        else fill(255);

        textSize(24);
        if (mode.name === selectedMode)
        {
            textFont(exoFont.bold);
            selectedDesc = mode.description;
        }
        else textFont(exoFont.medium);
        text(mode.name, mode.x, mode.y);
    }
    pop();
    
    push();

    let instructions = [
        selectedDesc,
        (selectedMode == GAMEMODES.Prediction) ? "Aim by pressing 'A' and 'D'" : "Use 'A' and 'D' to move the paddle.",
        (selectedMode == GAMEMODES.Prediction) ? "Increase power by holding down 'Space'" : "Press 'Shift' to Dash.",
        (selectedMode == GAMEMODES.Prediction) ? "Launch the ball by releasing 'Space'" : "Launch the ball with 'Space'.",
        (selectedMode == GAMEMODES.Prediction) ? "Predict how many bounces will occur" : "Break all the bricks to advance levels.",
        (selectedMode == GAMEMODES.Prediction) ? "Closer to the prediction = higher ELO" : "Don't let the ball fall past your paddle!"
    ]

    fill(150);
    textSize(14);
    textFont(exoFont.light);
    for (let i = 0; i < instructions.length; i++)
    {
        textSize(i == 0 ? 20 : 14);
        textFont(i == 0 ? exoFont.bold : exoFont.light);
        text(instructions[i], GAMEWIDTH + 25, HEIGHT - (i == 0 ? 200 : 150) + i * 15);
    }

    switch (selectedMode)
    {
        case GAMEMODES.RNGHell:
            rngUI();
            break;
        case GAMEMODES.Prediction:
            predictionUI();
            break;
    }

    pop();
}

// new: global arrow angle (radians) used by script.js when launching the ball
let arrowAngle = 0;
let predict = 0;
let predictLeftHover = false;
let predictRightHover = false;
function predictionUI()
{
    const tx = GAMEWIDTH + 100;
    const ty = HEIGHT / 2;
    const s = 2;

    const lx = (mouseX - tx) / s;
    const ly = (mouseY - ty) / s;

    const U = { ax: 10, ay: -10, bx: 30, by: -10, cx: 20, cy: -30 };
    const D = { ax: 90, ay: -30, bx: 110, by: -30, cx: 100, cy: -10 };
    
    predictLeftHover = pointInTriangle(lx, ly, U.ax, U.ay, U.bx, U.by, U.cx, U.cy);
    predictRightHover = pointInTriangle(lx, ly, D.ax, D.ay, D.bx, D.by, D.cx, D.cy);

    translate(tx, ty);
    scale(s);

    if (predictLeftHover) fill(100, 200, 255);
    else fill(255);
    triangle(U.ax, U.ay, U.bx, U.by, U.cx, U.cy);

    if (predictRightHover) fill(100, 200, 255);
    else fill(255);
    triangle(D.ax, D.ay, D.bx, D.by, D.cx, D.cy);

    fill(255);
    scale(1);
    text("Bounce Prediction", 5, -40);
    textSize(26);
    textFont(exoFont.bold);
    fill(255, 150, 0);
    text(predict, 50, -10);

    if (keyState.w && !increased)
        predict++;
    if (keyState.s && !decreased)
        predict = Math.max(0, predict - 1);
    
    if (keyState.w) 
    {
        increased = true;
        keyState.w = false;
    }
    if (keyState.s)
    {
        decreased = true;
        keyState.s = false;
    }
    pop();

    const baseX = GAMEWIDTH / 2 + 45;
    const baseY = HEIGHT - 80;
    const pivot = { x: 5, y: 50 };
    const gx = baseX + pivot.x;
    const gy = baseY + pivot.y;
    let angleToMouse = Math.atan2(mouseY - gy, mouseX - gx);
    let angle = angleToMouse + Math.PI / 2;
    arrowAngle = angle;
    
    push();
    translate(baseX, baseY);
    translate(pivot.x, pivot.y);
    rotate(angle);
    fill(150);
    rect(-5, -50, 10, 50);
    triangle(-10, -50, 0, -70, 10, -50);
    pop();

    arrowAngle -= Math.PI / 2; 
}

function pointInTriangle(px, py, ax, ay, bx, by, cx, cy)
{
    // barycentric technique
    const v0x = cx - ax, v0y = cy - ay;
    const v1x = bx - ax, v1y = by - ay;
    const v2x = px - ax, v2y = py - ay;

    const dot00 = v0x * v0x + v0y * v0y;
    const dot01 = v0x * v1x + v0y * v1y;
    const dot02 = v0x * v2x + v0y * v2y;
    const dot11 = v1x * v1x + v1y * v1y;
    const dot12 = v1x * v2x + v1y * v2y;

    const denom = (dot00 * dot11 - dot01 * dot01);
    if (denom === 0) return false;
    const invDenom = 1 / denom;
    const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    return (u >= 0) && (v >= 0) && (u + v < 1);
}

function rngUI()
{
    if (palmarTimer > 0)
    {
        palmar = true;
        if (palmarChosen == -1 || palmarTimer == 200)
        {
            let s;
            do
            {
                s = ranInt(0, palmarWords.length - 1);
            }
            while (s == palmarChosen)
            palmarChosen = s;
        }
        if (palmarTimer == 0)
        {
            palmar = false;
            palmarChosen = -1;
        }
        palmarTimer--;
    }

    if (palmar)
    {
        if (rngEffects.frozenPaddle)
        {
            textFont(exoFont.bold);
            textSize(18);
            text("Paddle currently frozen", GAMEWIDTH + 25, HEIGHT - 425);
        }
        if (rngEffects.invisibleBall)
        {
            textFont(exoFont.bold);
            textSize(18);
            text("Ball currently invisible", GAMEWIDTH + 25, HEIGHT - 400);
        }
        textFont(exoFont.bold);
        textSize(18);
        text("Screwed over by " + palmarScrew + "!", GAMEWIDTH + 25, HEIGHT - 375);
        textSize(24);
        text(palmarWords[palmarChosen], GAMEWIDTH + 25, HEIGHT - 350);
    }

}

function updateModeHover(mode)
{
    // Check if mouse is within the text bounding box
    mode.hovered = (mouseX >= mode.x && mouseX <= mode.x + mode.width &&
        mouseY >= mode.y - mode.height && mouseY <= mode.y)
}

function mousePressed()
{
    // Check which mode was clicked
    for (let mode of gameModesUI)
    {
        if (mode.hovered)
        {
            selectedMode = mode.name;
            return false;
        }
    }

    if (selectedMode == GAMEMODES.Prediction)
    {
        if (predictRightHover)
        {
            predict = Math.max(0, predict - 1);
        }
        else if (predictLeftHover)
        {
            predict++;
        }
    }
}

/**
 * 
 * @param {boolean} selectChance 
 * @param {Function} whatToDo 
 */
function randomChance(selectChance, whatToDo, chance = 300)
{
    if (ball.state == ballState.LAUNCHED && selectedMode == "RNG Hell" && selectChance)
    {
        if (ranInt(1, chance) == 69)
        {
            palmarTimer = 200;
            whatToDo();
        }
    }
}