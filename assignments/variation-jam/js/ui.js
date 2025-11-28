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
let selectedMode = "RNG Hell";

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
        "Use 'A' and 'D' to move the paddle.",
        "Press 'Shift' to Dash.",
        "Launch the ball with 'Space'.",
        "Break all the bricks to advance levels.",
        "Don't let the ball fall past your paddle!"
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
    pop();
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