let keyState = {
    a: false,
    d: false,
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
    if (key === "i" || key === "I") keyState.i = true;
    if (keyCode === ESCAPE) keyState.escape = true;
}

/**
 * Sees when a key has been released.
 */
function keyReleased()
{
    if (key === "a" || key === "A") keyState.a = false;
    if (key === "d" || key === "D") keyState.d = false;
    if (key === " ") keyState.space = false;
    if (keyCode === ESCAPE) keyState.escape = false;
}