/**
 * This is the games difficulty slider, which showcases how each difficulty changes the game.
 * Similarly to the instructions, it draws a background alongside the easily readable rectangle behind.
 * However, when you hover over each option, it'll change the text to reflect that option.
 * 
 * Unlike a traditional difficulty slider, you just have to hover over it and then press SPACE to select that difficulty.
 */

function drawOptions()
{
    ending = "regular";
    background(90);
    drawMoon();
    drawLandscape(255, 0, coop ? 0 : 255);
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
    
    text("CHOOSE DIFFICULTY", 0, -200);
    textSize(24);
    let avgX = 250; // Increments by 200
    let avgY = 285;
    mouseHover = (mouseX < avgX + 50 && mouseX > avgX - 50 && mouseY < avgY + 15 && mouseY > avgY - 15)
    fill(mouseHover ? 150 : 255);
    text("EASY", -200, -100)
    if (mouseHover) difficulty = "easy";
    avgX += 200;
    mouseHover = (mouseX < avgX + 50 && mouseX > avgX - 50 && mouseY < avgY + 15 && mouseY > avgY - 15)
    fill(mouseHover ? 150 : 255);
    text("MEDIUM", 0, -100)
    if (mouseHover) difficulty = "medium";
    avgX += 200;
    mouseHover = (mouseX < avgX + 50 && mouseX > avgX - 50 && mouseY < avgY + 15 && mouseY > avgY - 15)
    fill(mouseHover ? 150 : 255);
    text("HARD", 200, -100)
    if (mouseHover) difficulty = "hard";

    fill(255);
    textSize(18);
    textFont("Calibri")
    let optionsText;
    switch (difficulty)
    {
        case "easy":
            optionsText = "Looking for a more casual ghost experience\n\n"
            optionsText += "- Slower ghost spawn time (Between 2-4 seconds)\n"
            optionsText += "- More lenient ghost horde\n"
            optionsText += "- Generally slower ghosts that don't move around as much\n"
            optionsText += "- 0.75 less penalization for missing a ghost\n"
            break;
        case "medium":
            optionsText = "Slight bit of challenge, but nothing supernatural yet\n\n"
            optionsText += "- Regular ghost spawn time (Between 1-3 seconds)\n"
            optionsText += "- Standard ghost horde\n"
            optionsText += "- Run-of-the-mill ghosts\n"
            optionsText += "- Regular penalization for missing a ghost\n"
            break;
        case "hard":
            optionsText = "A true undead fan, and a tough one at that\n\n"
            optionsText += "- Faster ghost spawn time (Between 0.5-2 seconds)\n"
            optionsText += "- Good luck with the ghost horde\n"
            optionsText += "- Faster ghosts, more jittery and wavy\n"
            optionsText += "- 50% more penalization for missing a ghost\n"
            break;
    }
    if (!coop)
    {
        optionsText += "\n- "
        if (difficulty == "easy") optionsText += "2000 points needed to win"
        if (difficulty == "medium") optionsText += "3000 points needed to win"
        if (difficulty == "hard") optionsText += "5000 points needed to win"
    }

    if (coop)
    {
        optionsText += "\n- "
        if (difficulty == "easy") optionsText += "First to 2000 points wins!"
        if (difficulty == "medium") optionsText += "First to 3000 points wins!"
        if (difficulty == "hard") optionsText += "First to 5000 points wins!"
    }

    optionsText += "\n\n"
    text(optionsText, 0, 0);
    textSize(24);
    text("Happy with your selection? Press SPACE to go ghost hunting...", 0, 300)
    pop();

    if (keyState.space)
    {
        hunter.setScore();
        if (coop) hunter2.setScore();
        gameState = "play";
        menuSelect.options = false;
        menuSelect.main = true;
    }
}