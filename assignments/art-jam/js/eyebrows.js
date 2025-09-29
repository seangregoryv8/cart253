let browEmotion;
const browEmotions = ["normal", "sad", "angry", "surprised"];

function drawEyebrows(x, y)
{
    fill(0);
    switch(browEmotion)
    {
        case "sad":
            symmRectX(x + 1, y - 2, 3, 1);
            symmRectX(x + 2, y - 3, 3, 1);
            break;
        case "angry":
            symmRectX(x + 4, y - 2, 2, 1);
            symmRectX(x + 3, y - 3, 2, 1);
            break;
        case "surprised":
            symmRectX(x, y - 2, 1, 1);
            symmRectX(x + 6, y - 2, 1, 1);
            symmRectX(x + 1, y - 3, 1, 1);
            symmRectX(x + 5, y - 3, 1, 1);
            symmRectX(x + 2, y - 4, 3, 1);
            break;
        case "normal":
        default:
            symmRectX(x, y - 2, 1, 1);
            symmRectX(x + 6, y - 2, 1, 1);
            symmRectX(x + 1, y - 3, 5, 1);
            break;
    }
}