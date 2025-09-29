"use strict";

// This is a simple function to detect if the mouse is over a rectangle, using my pixel art detection system
function isMouseOver(x, y, w, h) { return mouseX >= locX(x) && mouseX <= locX(x + w) && mouseY >= locY(y) && mouseY <= locY(y + h); }


// This is a map of features to their corresponding emotion-changing functions
const featureMap = {
    leftEye: () => leftEyeEmotion = random(eyeEmotions),
    rightEye: () => rightEyeEmotion = random(eyeEmotions),
    mouth: () => {
        let newMouth;
        do { newMouth = random(mouthEmotions); } while(newMouth === mouthEmotion);
        mouthEmotion = newMouth;
    },
    leftEyebrow: () => {
        let newBrow;
        do { newBrow = random(browEmotions); } while(newBrow === browEmotion);
        browEmotion = newBrow;
    }
};

function handleClick() {
    for (let feature in featureBoxes) {
        let box = featureBoxes[feature];
        if (isMouseOver(box[0], box[1], box[2], box[3])) {
            featureMap[feature]();
            break;
        }
    }
}

function randomizeEmotions(brow = true, mouth = true, eyes = true)
{
    if (brow)
    {
        let newBrowEmotion;
        do { newBrowEmotion = random(browEmotions); } while (newBrowEmotion === browEmotion); // This repeats until a new emotion has been selected
        browEmotion = newBrowEmotion;
    }

    if (mouth)
    {
        let newMouthEmotion;
        do { newMouthEmotion = random(mouthEmotions); } while (newMouthEmotion === mouthEmotion); // This repeats until a new emotion has been selected
        mouthEmotion = newMouthEmotion;
    }
    
    if (eyes)
    {
        let newLeftEyeEmotion;
        do { newLeftEyeEmotion = random(eyeEmotions); } while (newLeftEyeEmotion === leftEyeEmotion); // This repeats until a new emotion has been selected
        leftEyeEmotion = newLeftEyeEmotion;

        let newRightEyeEmotion;
        do { newRightEyeEmotion = random(eyeEmotions); } while (newRightEyeEmotion === rightEyeEmotion); // This repeats until a new emotion has been selected
        rightEyeEmotion = newRightEyeEmotion;
    }
}

function skinRandomizer()
{
    skin = random(palettes.skinColors);
}

function hairRandomizer()
{
    hair = random(palettes.hairColors);
}

// This is a specialized eyeblink class, that handles everything related to blinking (for extra interactivity)
class BlinkController
{
    constructor()
    {
        this.isBlinking = false;
        this.blinkTimer = 0;
        this.blinkDuration = 5;
        this.blinkInterval = floor(random(100, 200));
        this.prevEmotions = {}; // store previous emotions for each eye
    }

    update(leftEye, rightEye)
    {
        // We need to see if both eyes are in some kind of "open" state to sync them
        let leftOpen = (leftEye === "regular" || leftEye === "squint" || leftEye === "happy" || leftEye === "sad");
        let rightOpen = (rightEye === "regular" || rightEye === "squint" || rightEye === "happy" || rightEye === "sad");

        // If they arent already blinking, both eyes are open, and it's time to blink
        if (!this.isBlinking && leftOpen && rightOpen && frameCount % this.blinkInterval === 0)
        {
            // Start a synchronized blink
            this.isBlinking = true;
            this.blinkTimer = 0;
            this.prevEmotions.left = leftEye;
            this.prevEmotions.right = rightEye;
            return {left: "closed", right: "closed"};
        }

        if (this.isBlinking)
        {
            this.blinkTimer++;
            if (this.blinkTimer >= this.blinkDuration)
            {
                // End blink
                this.isBlinking = false;
                this.blinkInterval = floor(random(100, 200));
                return {left: this.prevEmotions.left, right: this.prevEmotions.right};
            }
            return {left: "closed", right: "closed"};
        }

        // Independent blinking for eyes not open together
        return {left: leftOpen ? leftEye : leftEye, right: rightOpen ? rightEye : rightEye};
    }
}

// This is for detecting which quadrant of the canvas the mouse is in for a special eye-tracking feature
function mouseOverQuadrant(col, row) {
    return mouseX >= col * quadWidth &&
           mouseX < (col + 1) * quadWidth &&
           mouseY >= row * quadHeight &&
           mouseY < (row + 1) * quadHeight;
}

let prevMouseX, prevMouseY;
let spinAmount = 0;
let dizzy = false;
let dizzyTimer = 0;
const dizzyDuration = 240;
// This is for an experimental feature here that could calculate dizziness
function updateSpin()
{
    // This should collect the mouse movement delta and use it to determine if the character is dizzy
    if (!prevMouseX)
    {
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        return;
    }

    // Then we calculate the delta
    let dx = mouseX - prevMouseX;
    let dy = mouseY - prevMouseY;

    let angle = atan2(dy, dx);
    spinAmount += abs(angle) * 0.1; // Scale down the effect

    prevMouseX = mouseX;
    prevMouseY = mouseY;

    if (frameCount % 150 === 0) spinAmount = 0;

    if (spinAmount > 20)
    {
        console.log("HELP IM DIZZY!");
        dizzy = true;
        dizzyTimer = 0;
        spinAmount = 0;
    }

    if (dizzy)
    {
        leftEyeEmotion = "dizzy";
        rightEyeEmotion = "dizzy";
        mouthEmotion = "dizzy";
        dizzyTimer++;
        if (dizzyTimer > dizzyDuration)
        {
            console.log("NOT DIZZY ANYMORE");
            dizzy = false;
            dizzyTimer = 0;
            randomizeEmotions();
        }
    }
}