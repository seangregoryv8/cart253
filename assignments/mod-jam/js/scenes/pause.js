let gamePaused = false;
let escapePressed = false;

let pauseStart = 0;

var pauseDuration

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
        return;
    }
}
function drawPauseOverlay()
{
    push();
    fill(0, 150);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("PAUSED", width / 2, height / 2);
    pop();
}
