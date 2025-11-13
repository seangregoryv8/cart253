/**
 * Terrible New Car
 * Pippin Barr
 * 
 * A program to generate new car model names using dinosaurs.
 * 
 * Uses:
 * Darius Kazemi's corpora repository
 * https://github.com/dariusk/corpora/tree/master
 */

"use strict";

let carData = undefined;
let dinosaurData = undefined;
let langData = undefined;
let lang = "fr";

// Starts with the instruction
let carName = "Click to generate a car name.";

/**
 * Load the car and dinosaur data
 */
function preload() {
    fetch("../assets/data/cars.json")
        .then(response => response.json())
        .then(data => carData = data.cars )
        
    fetch("../assets/data/dinosaurs.json")
        .then(response => response.json())
        .then(data => dinosaurData = data.dinosaurs )
}

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 400);
    console.log(carData)
    console.log(dinosaurData)
}

/**
 * Display the current main text (either instructions or a car)
*/
function draw() {
    background(0);

    push();
    fill("pink");
    textAlign(CENTER, CENTER);
    textSize(32);
    text(carName, width / 2, height / 2);
    pop();
}

/**
 * Generate a new car name
 */
function mousePressed() {
    let newName = "";
    newName += carData[ranInt(0, carData.length - 1)]
    newName += " " + dinosaurData[ranInt(0, dinosaurData.length - 1)]
    carName = newName;
}

/**
 * Little function I made to make a random integer
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function ranInt(min, max)
{
    return Math.round(random(min, max))
}