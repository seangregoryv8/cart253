let leftEyeEmotion;
let rightEyeEmotion;

let eyeEmotions = ["regular", "closed", "sadClosed", "sad", "squint", "happy", "dead"];

const dizzyPattern = [
    {x: 3, y: 3},
    {x: 2, y: 2},
    {x: 3, y: 1},
    {x: 4, y: 0},
    {x: 5, y: 1},
    {x: 6, y: 2},
    {x: 7, y: 3},
    {x: 6, y: 4},
    {x: 5, y: 5},
    {x: 4, y: 6},
    {x: 3, y: 7},
    {x: 2, y: 6},
    {x: 1, y: 5},
    {x: 0, y: 4}
];

function rotatePoint(px, py, cx, cy, rotation)
{
    let dx = px - cx;
    let dy = py - cy;

    // Essentially, it does a 90 degree rotation
    for (let i = 0; i < rotation; i++) [dx, dy] = [dy, -dx];

    return {x: cx + dx, y: cy + dy};
}
function drawDizzy(x, y)
{
    let rotation = floor(frameCount / 5) % 4;
    for (let p of dizzyPattern)
    {
        let r = rotatePoint(p.x, p.y, 3, 3, rotation);
        rect(locX(x + r.x), locY(y + r.y), pixel(1), pixel(1));
    }
}

/**
 * Combines the eye coloring and the eye drawing functions
 * @param {*} x Position x
 * @param {*} y Position y
 * @param {*} eyeEmotion The emotion of the eye (which determines how it is drawn)
 */
function drawEye(x, y, eyeEmotion)
{
    switch (eyeEmotion)
    {
        case "dizzy":
            drawDizzy(x, y);
            break;
        case "closed":
            fill(0);
            rect(locX(x), locY(y + 3), pixel(7), pixel(1));
            break;
        case "sadClosed":
            fill(0);
            rect(locX(x + 1), locY(y + 3), pixel(5), pixel(1));
            fill(150, 150, 255);
            rect(locX(x + 1), locY(y + 4), pixel(5), pixel(1));
            fill(200, 200, 255);
            rect(locX(x + 1), locY(y + 5), pixel(5), pixel(4));
            break;
        case "sad":
            colorEyes(80, x, y);
            fill(0);
            pixel3Circle(x, y);
            rect(locX(x + 2), locY(y + 5), pixel(3), pixel(1));
            fill(150, 150, 255);
            rect(locX(x + 1), locY(y + 6), pixel(5), pixel(1));
            fill(200, 200, 255);
            rect(locX(x + 1), locY(y + 7), pixel(5), pixel(4));
            break;
        case "squint":
            colorEyes(80, x, y);
            fill(0);
            rect(locX(x + 2), locY(y), pixel(3), pixel(1));
            rect(locX(x), locY(y + 2), pixel(1), pixel(3));
            rect(locX(x + 6), locY(y + 2), pixel(1), pixel(3));
            rect(locX(x + 1), locY(y + 1), pixel(1), pixel(1));
            rect(locX(x + 5), locY(y + 1), pixel(1), pixel(1));
            rect(locX(x + 1), locY(y + 5), pixel(1), pixel(1));
            rect(locX(x + 5), locY(y + 5), pixel(1), pixel(1));
            rect(locX(x + 2), locY(y + 5), pixel(3), pixel(1));
            break;
        case "happy":
            fill(0);
            rect(locX(x + 2), locY(y + 1), pixel(3), pixel(1));
            rect(locX(x + 1), locY(y + 2), pixel(1), pixel(3));
            rect(locX(x + 5), locY(y + 2), pixel(1), pixel(3));
            break;
        case "dead":
            fill(0);
            for (let i = 1; i <= 5; i++)
            {
                rect(locX(x + i), locY(y + i), pixel(1), pixel(1));
                rect(locX(x + 6 - i), locY(y + i), pixel(1), pixel(1));
            }
            break;
        case "regular":
        default:
            colorEyes(80, x, y);
            fill(0);
            pixel3Circle(x, y);
            break;
    }
}

// This draws a 3x3 circle for the eyes
function pixel3Circle(x, y)
{
    noStroke();
    rect(locX(x + 2), locY(y), pixel(3), pixel(1));
    rect(locX(x), locY(y + 2), pixel(1), pixel(3));
    rect(locX(x + 2), locY(y + 6), pixel(3), pixel(1));
    rect(locX(x + 6), locY(y + 2), pixel(1), pixel(3));
    rect(locX(x + 1), locY(y + 1), pixel(1), pixel(1));
    rect(locX(x + 5), locY(y + 1), pixel(1), pixel(1));
    rect(locX(x + 1), locY(y + 5), pixel(1), pixel(1));
    rect(locX(x + 5), locY(y + 5), pixel(1), pixel(1));
}

/**
 * Colors the eyes of the pixel art
 * @param {*} r Red value 
 * @param {*} g Green value
 * @param {*} b Blue value
 */
function colorEyes(col, x, y)
{
    fill(col);
    rect(locX(x + 1), locY(y + 1), pixel(5), pixel(5));
    //symmRectX(x + 1, y + 1, 5, 5)
    fill(255);
    rect(locX(x + 2 + currentQuadrant.col), locY(y + 2 + currentQuadrant.row), pixel(1), pixel(1));
}