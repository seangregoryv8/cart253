/**
 * This draws the instructions, including everything for the background,
 * A transluscent rectangle for you to more easily read the text
 * And all the instructions I put forth
 * Alongside a way for you to return to the title after its all done
 */

function drawInstructions()
{
    background(90);
    drawMoon();
    drawLandscape(255, 255);
    drawStars();
    drawWaves();

    fill(0, 0, 0, 150);
    noStroke();
    rect(50, 50, MAXWIDTH - 100, MAXHEIGHT - 100);
    
    push();
    noStroke();
    translate(MAXWIDTH / 2, MAXHEIGHT / 2);
    textSize(50);
    textFont(mainFont)
    textAlign(CENTER);
    fill(255, 255, 255)
    text("How to play", 0, -200);

    textSize(18);
    let instructionsText = "You are Felix, a spirit reaper, trying to find your deceased sister.\n\n"
    instructionsText += "Catch as many ghosts as you can with your spectral net\n"
    instructionsText += "Each ghost you catch will give you points based on how difficult it was to catch\n"
    instructionsText += "If a ghost escapes off the right side of the screen, you will lose points\n\n"
    instructionsText += "Launch the net using the W key\n"
    instructionsText += "Move the boat left and right using the A and D keys\n\n"

    instructionsText += "In multiplayer mode, Player 2, Charlie, your longtime friend,\nuses the I, J, and L keys respectively\n\n"

    instructionsText += "Good luck finding your sister...\n\n"
    instructionsText += "Press SPACE to return to the main menu"
    text(instructionsText, 0, -100);
    pop();

    if (keyState.space)
    {
        gameState = "title";
        menuSelect.instructions = false;
        menuSelect.main = true;
    }
}