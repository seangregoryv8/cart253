let keyState = {
    w: false,
    a: false,
    d: false,
    i: false,
    j: false,
    l: false,
    space: false,
    escape: false,
}

/**
 * This handles when specifically the spacebar is pressed
 */
function keyPressed()
{
    if (key === " ") keyState.space = true;
    if (key === "a" || key === "A") keyState.a = true;
    if (key === "d" || key === "D") keyState.d = true;

    if (key === "j" || key === "J") keyState.j = true;
    if (key === "l" || key === "L") keyState.l = true;

    if (keyCode === ESCAPE) keyState.escape = true;
    
    keyState[key] = true;
}

/**
 * Sees when a key has been released.
 */
function keyReleased()
{
    if (key === "w" || key === "W") keyState.w = false;
    if (key === "a" || key === "A") keyState.a = false;
    if (key === "d" || key === "D") keyState.d = false;
    if (key === "i" || key === "I") keyState.i = false;
    if (key === "j" || key === "J") keyState.j = false;
    if (key === "l" || key === "L") keyState.l = false;
    if (key === " ") keyState.space = false;
    if (keyCode === ESCAPE) keyState.escape = false;
}