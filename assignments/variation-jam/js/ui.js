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
let selectedMode = "Classic";

function drawModes()
{
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
        if (mode.name === selectedMode) textFont(exoFont.bold);
        else textFont(exoFont.medium);
        text(mode.name, mode.x, mode.y);
    }
    

    let instructions = [
        "Use 'A' and 'D' to move the paddle.",
        "Press 'Shift' to Dash.",
        "Launch the ball with 'Space'.",
        "Break all the bricks to advance levels.",
        "Don't let the ball fall past your paddle!"
    ]

    textSize(14);
    textFont(exoFont.light);
    for (let i = 0; i < instructions.length; i++)
        text(instructions[i], GAMEWIDTH + 25, HEIGHT - 150 + i * 15);
    pop();
}

function updateModeHover(mode)
{
    // Check if mouse is within the text bounding box
    if (mouseX >= mode.x && mouseX <= mode.x + mode.width &&
        mouseY >= mode.y - mode.height && mouseY <= mode.y)
    {
        mode.hovered = true;
    } else {
        mode.hovered = false;
    }
}

function mousePressed()
{
    // Check which mode was clicked
    for (let mode of gameModesUI)
    {
        if (mode.hovered)
        {
            selectedMode = mode.name;
            console.log("Selected mode: " + selectedMode);
            // Add your game mode logic here
            return false;
        }
    }
}