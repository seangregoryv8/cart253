let gamePaused = false;
let escapePressed = false;

let pauseStart = 0;

var pauseDuration = 0;

/**
 * This deals with the pause feature, that should work on its own.
 * Only works in play, and will allow you to return to the main menu if you wish.
 */
function pauseGame()
{
    if (keyState.escape && !escapePressed)
    {
        gamePaused = !gamePaused;
        escapePressed = true;
        if (gamePaused) pauseStart = millis();
        else 
        {
            pauseDuration = millis() - pauseStart;
            pauseStart = 0;
            console.log(pauseDuration);
        }
        console.log(gamePaused ? "Game Paused" : "Game Resumed");
    }
    else if (!keyState.escape && escapePressed)
        escapePressed = false;

    if (gamePaused)
    {
        pauseDuration = millis();
        drawPauseOverlay();
    }

    if (gamePaused)
    {
        if (!keyState.space && spacePressed)
        {
            gameState = "title";
            gamePaused = false;
            winTriggered = false;
            reset();
            resetAll();
        }
        if (keyState.space)
        {
            spacePressed = true;
        }
    }
}

/**
 * Draws a simple overlay for the pause. Nothing special
 */
function drawPauseOverlay()
{
    push();
    fill(0, 150);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textFont(mainFont);
    textSize(48);
    text("GAME PAUSED", width / 2, height / 2);
    textSize(24);
    text("To resume, press ESC", width / 2, height / 2 + 100)
    text("To go back to the title screen, press SPACE", width / 2, height / 2 + 150)
    pop();
}
