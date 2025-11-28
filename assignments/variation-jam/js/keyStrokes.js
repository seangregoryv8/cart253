let keyState = {
    a: false,
    d: false,
    i: false,
    space: false,
    escape: false,
    shift: false
}

document.onkeydown = function(e) {
    if (e.key === " ") keyState.space = true;
    if (e.key === "a" || e.key === "A") keyState.a = true;
    if (e.key === "d" || e.key === "D") keyState.d = true;
    if (e.keyCode === 27) keyState.escape = true;
    if (e.key === "Shift" && !paddle.dashing) 
    {
        keyState.shift = true;
        paddle.speed = 15;
        paddle.dashing = true;
    }
}

document.onkeyup = function(e) {
    if (e.key === " ") keyState.space = false;
    if (e.key === "a" || e.key === "A") keyState.a = false;
    if (e.key === "d" || e.key === "D") keyState.d = false;
    if (e.keyCode === 27) keyState.escape = false;
    if (e.key === "Shift") keyState.shift = false;
}