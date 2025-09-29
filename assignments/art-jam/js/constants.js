"use strict";

const WIDTH = 560;
const HEIGHT = 680;

// This is a list of feature boxes for the eyes, mouth, eyebrows, and ears, detecting where they are in the portrait
const featureBoxes = {
    leftEye: [6, 15, 7, 7],
    rightEye: [15, 15, 7, 7],
    mouth: [10, 26, 8, 5],
    leftEyebrow: [6, 10, 16, 5],
    leftEar: [1, 18, 3, 4],
    rightEar: [24, 18, 3, 4]
};