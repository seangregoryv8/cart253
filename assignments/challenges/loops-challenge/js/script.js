/**
 * Lines
 * Pippin Barr
 * 
 * A series of lines across the canvas
 */

"use strict";

let MAXSIZE = 500;
/**
 * Creates the canvas
 */
function setup() {
    createCanvas(MAXSIZE, MAXSIZE);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    let i = 0;
    background("pink");

    for (let j = 0; j < MAXSIZE / 2; j++)
    {
        stroke(255, j + 2, j + 3)
        line(j, 0, j, height)
        line(MAXSIZE - j, 0, MAXSIZE - j, height)
    }
    while (i <= 500)
    {

        stroke(i == 0 ? 0 : i / 2)
        line(i, 0, i, height);
        line(0, i, height, i)
        i += 50;
    }
}
