let mouthEmotion
const mouthEmotions = ["smallSmile", "bigSmile", "frown", "bigFrown", "cat", "surprised", "kiss", "neutral", "miff", "smirk"];

// This simply rotates the dizzy mouth rotation every 10 frames
function drawMouthDizzy()
{
    // Every 10 frames
    let rotation = floor(frameCount / 10) % 2;

    for (let x = 9; x <= 18; x += 2)
    {
        rect(locX(rotation == 0 ? x : x + 1), locY(26), pixel(1), pixel(1));
        rect(locX(rotation == 0 ? x + 1 : x), locY(27), pixel(1), pixel(1));
    }
}

/**
 * This draws the mouth of the pixel art, and picks from a variety of emotions
 */
function drawMouth()
{
    fill(0);
    switch (mouthEmotion)
    {
        case "dizzy":
            drawMouthDizzy();
            break;
        case "frown":
            symmRectX(11, 28, 1, 1);
            rect(locX(12), locY(27), pixel(symmetryX(12)), pixel(1));
            break;
        case "bigFrown":
            fill(255, 100, 100);
            rect(locX(11), locY(27), pixel(symmetryX(11)), pixel(3));
            fill(255, 192, 203);
            rect(locX(12), locY(29), pixel(symmetryX(12)), pixel(1));
            fill(0);
            symmRectX(10, 27, 1, 4);
            rect(locX(11), locY(30), pixel(symmetryX(11)), pixel(1));
            rect(locX(11), locY(26), pixel(symmetryX(11)), pixel(1));
            break;
        case "neutral":
            rect(locX(11), locY(27), pixel(symmetryX(11)), pixel(1));
            break;
        case "miff":
            rect(locX(12), locY(26), pixel(4), pixel(1))
            rect(locX(16), locY(27), pixel(1), pixel(1))
            break;
        case "kiss":
            rect(locX(13), locY(24), pixel(2), pixel(1))
            rect(locX(15), locY(25), pixel(1), pixel(1))
            rect(locX(13), locY(26), pixel(2), pixel(1))
            rect(locX(15), locY(27), pixel(1), pixel(1))
            rect(locX(13), locY(28), pixel(2), pixel(1))
            break;
        case "smirk":
            rect(locX(12), locY(27), pixel(4), pixel(1))
            rect(locX(16), locY(26), pixel(1), pixel(1))
            rect(locX(17), locY(25), pixel(1), pixel(1))
            break;
        case "cat":
            symmRectX(10, 26, 1, 2);
            symmRectX(11, 28, 2, 1);
            rect(locX(13), locY(27), pixel(symmetryX(13)), pixel(1));
            break;
        case "bigSmile":
            fill(255, 100, 100);
            rect(locX(11), locY(27), pixel(symmetryX(11)), pixel(3));
            fill(255, 192, 203);
            rect(locX(12), locY(29), pixel(symmetryX(12)), pixel(1));
            fill(0);
            symmRectX(10, 26, 1, 4);
            rect(locX(11), locY(30), pixel(symmetryX(11)), pixel(1));
            rect(locX(11), locY(26), pixel(symmetryX(11)), pixel(1));
            break;
        case "surprised":
            fill(255, 100, 100);
            rect(locX(11), locY(26), pixel(symmetryX(11)), pixel(3));
            fill(255, 192, 203);
            rect(locX(12), locY(28), pixel(symmetryX(12)), pixel(1));
            fill(0);
            rect(locX(12), locY(25), pixel(symmetryX(12)), pixel(1));
            symmRectX(11, 26, 1, 3);
            rect(locX(12), locY(29), pixel(symmetryX(12)), pixel(1));
        case "smallSmile":
        default:
            symmRectX(11, 27, 1, 2);
            rect(locX(12), locY(29), pixel(symmetryX(12)), pixel(1));
            break;
    }
}