/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
    getAngry: false,
    // Position and size
    x: 200,
    y: 200,
    size: 100,
    // Colour
    fill: {
        r: 255,
        g: 225,
        b: 225
    }
};

let sky = {
    nightTime: false,
    r: 160,
    g: 180,
    b: 200
};

function ranInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
    setTimeout(() => { mrFurious.getAngry = true; }, ranInt(2000, 5000));
    setTimeout(() => { sky.nightTime = true; }, ranInt(2000, 5000));
}


/**
 * Draw (and update) Mr. Furious
 */
function draw()
{
    drawBird(0, 0);
    if (sky.nightTime)
    {
        if (sky.r != 0) sky.r--;
        if (sky.g != 0) sky.g--;
        if (sky.b != 0) sky.b--;
    }

    background(sky.r, sky.g, sky.b);
    // Draw Mr. Furious as a coloured circle
    push();
    noStroke();
    if (mrFurious.getAngry)
    {
        if (mrFurious.fill.g != 0) mrFurious.fill.g--;
        if (mrFurious.fill.b != 0) mrFurious.fill.b--;
    }
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
    pop();
}

function drawBird(x, y)
{
    let size = 25;
    stroke(0);
    noFill();
    arc(x, y, size, size, radians(210), 0);
    arc(x + size, y, size, size, radians(180), radians(-30));
}