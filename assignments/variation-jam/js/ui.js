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

    textSize(24);
    textFont(exoFont.medium);
    text("Classic Mode", GAMEWIDTH + 25, 160);
}