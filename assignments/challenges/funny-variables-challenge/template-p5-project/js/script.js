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
function ranDouble(min, max) {
    return Math.random() * (max - min) + min;
}

let annoyingFlap = false;

let birdSound;
function preload()
{
    birdSound = loadSound("assets/sounds/birb.mp3");
}
/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);

    setTimeout(() => {
        birdSound.loop();
        stupidBird.startDVD = true;
    }, ranInt(2000, 5000));
    setTimeout(() => { mrFurious.getAngry = true; }, ranInt(7000, 9000));
    setTimeout(() => { sky.nightTime = true; }, ranInt(7000, 9000));
    annoyingFlap = false;
}


/**
 * Draw (and update) Mr. Furious
 */
function draw()
{
    if (frameCount % 6 == 0)
        annoyingFlap = true;
    else if (frameCount % 6 == 3)
        annoyingFlap = false;
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
    //console.log(mrFurious.fill.r * mrFurious.fill.g * mrFurious.fill.b)
    let mrColor = mrFurious.fill.r * mrFurious.fill.g * mrFurious.fill.b;
    if (mrFurious.getAngry)
    {
        if (mrFurious.fill.g != 0) mrFurious.fill.g--;
        if (mrFurious.fill.b != 0) mrFurious.fill.b--;
    }
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    const rand = getRageValue(mrColor);
    switch (ranInt(1, 4))
    {
        case 1: ellipse(mrFurious.x + rand, mrFurious.y + rand, mrFurious.size); break;
        case 2: ellipse(mrFurious.x + rand, mrFurious.y - rand, mrFurious.size); break;
        case 3: ellipse(mrFurious.x - rand, mrFurious.y + rand, mrFurious.size); break;
        case 4: ellipse(mrFurious.x - rand, mrFurious.y - rand, mrFurious.size); break;
    }
    pop();
    if (stupidBird.startRandomness) drawBird(ranInt(50, 400), ranInt(50, 400), annoyingFlap);
    if (stupidBird.startDVD)
    {
        drawBird(stupidBird.x, stupidBird.y, annoyingFlap);
        stupidBird.x = (stupidBird.flipX) ? stupidBird.x - stupidBird.addX : stupidBird.x + stupidBird.addX;
        stupidBird.y = (stupidBird.flipY) ? stupidBird.y - stupidBird.addY : stupidBird.y + stupidBird.addY;

        if (stupidBird.x <= 10)
        {
            stupidBird.flipX = false;
            stupidBird.addX = ranDouble(1, 3)
        }
        if (stupidBird.x >= 370)
        {
            stupidBird.flipX = true;
            stupidBird.addX = ranDouble(1, 3)
        }
        if (stupidBird.y <= 20)
        {
            stupidBird.flipY = false;
            stupidBird.addY = ranDouble(1, 3)
        }
        if (stupidBird.y >= 400)
        {
            stupidBird.flipY = true;
            stupidBird.addY = ranDouble(1, 3)
        }
    }
}

let stupidBird = {
    startRandomness: false,
    startDVD: false,
    x: 0,
    y: 0,
    flipX: false,
    flipY: false,
    addX: ranDouble(1, 3),
    addY: ranDouble(1, 3)
}

function drawBird(x, y, cycle)
{
    let angleOffset = PI / 8;
    let size = 25;
    stroke(255);
    noFill();

    let bodyX = x;
    let bodyY = y;

    if (cycle)
    {
        push();
        translate(bodyX, bodyY);
        rotate(angleOffset)
        arc(0, 0 - 5, size, size, radians(210), 0);
        pop();
        //if (cycle) arc(x, y, size, size, radians(240), 30);
        //else arc(x, y, size, size, radians(210), 0);
    
        push();
        translate(bodyX, bodyY);
        rotate(-angleOffset);
        arc(size, 0 + 5, size, size, radians(180), radians(-30));
        pop();
    }
    else
    {
        push();
        translate(bodyX, bodyY);
        arc(0, 0, size, size, radians(210), 0);
        pop();
        //if (cycle) arc(x, y, size, size, radians(240), 30);
        //else arc(x, y, size, size, radians(210), 0);
    
        push();
        translate(bodyX, bodyY);
        arc(size, 0, size, size, radians(180), radians(-30));
        pop();

    }
    cycle = !cycle;
}

function getRageValue(input)
{
    const max = 12909375;
    const min = 255;
  
    const normalizedInput = (input - min) / (max - min);
    const rageValue = Math.exp(-normalizedInput * 5);
  
    return (Math.random() - 0.5) * (rageValue * 100);
}