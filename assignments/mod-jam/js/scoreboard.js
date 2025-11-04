let caughtGhost = "";
let escapedGhost = "";

const scoreTimeout = 2000;

let lastCaught = -scoreTimeout;
let lastEscaped = -scoreTimeout;

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

    fill(0, 0, 0, 100);
    noStroke();
    rect(-95, -50, 200, coop ? 200 : 100);
    fill(255);
    text("P1 SCORE", 0, 0);
    if (coop) text("P2 SCORE", 0, 100);
    textFont("Courier New");
    text(hunter.score, 0, 40);
    if (coop) text(hunter2.score, 0, 140);
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