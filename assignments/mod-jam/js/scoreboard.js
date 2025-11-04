let mainScore = 100;
let caughtGhost = "";
let escapedGhost = "";

let lastCaught = 0;
let lastEscaped = 0;

const scoreTimeout = 2000;

function setCaughtGhost(text)
{
    caughtGhost = text;
    lastCaught = millis();
}

function setEscapedGhost(text)
{
    escapedGhost = text;
    lastEscaped = millis();
}

function createUI()
{
    // Create a div to hold the scoreboard
    push();
    translate(MAXWIDTH / 2, 100);
    fill(255);
    textSize(30);
    textFont(mainFont);
    textAlign(CENTER);

    let now = millis();
    let lastActivity = Math.max(lastCaught, lastEscaped);
    text("SCORE", 0, 0);
    textFont("Courier New");
    text(mainScore, 0, 40);
    translate(-300, 100);
    textSize(20);

    if (now - lastCaught <= scoreTimeout) 
    {
        fill(0, 150, 0, 150);
        noStroke();
        rect(-150, -25, 300, 200);
        fill(255);
        text(caughtGhost, 0, 0);
    }
    translate(600, 0);
    textSize(20);

    if (now - lastEscaped <= scoreTimeout) 
    {
        fill(150, 0, 0, 150);
        noStroke();
        rect(-150, -25, 300, 200);
        fill(255);
        text(escapedGhost, 0, 0);
    }
    pop();
}