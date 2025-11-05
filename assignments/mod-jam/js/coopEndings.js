/**
 * This draws out the two ending scenes of a hunter winning depending on who won.
 * @param {*} hunter 
 * @param {*} hunter2 
 */
function playerWins(hunter, hunter2)
{
    // Draw the hunter's body
    
    let x = MAXWIDTH / 2 - 50;
    let y = MAXHEIGHT / 2 + 200;
    let size = 100;
    happyHunter(x, y, size, hunter, true);
    happyHunter(x + 200, y, size, hunter2, false);
    if (!keyState.space && spacePressed)
    {
        gameState = "title";
        winTriggered = false;
        reset();
        resetAll();
    }
    if (keyState.space)
    {
        spacePressed = true;
    }
}
/**
 * This draws out the two ending scenes of a hunter winning depending on who was disqualified.
 * @param {*} hunter 
 * @param {*} hunter2 
 */
function playerDefaultWins(hunter, hunter2)
{
    let x = MAXWIDTH / 2 - 50;
    let y = MAXHEIGHT / 2 + 200;
    let size = 100;
    fedUpHunter(x, y, size, hunter, true);
    fedUpHunter(x + 200, y, size, hunter2, false);
    if (!keyState.space && spacePressed)
    {
        gameState = "title";
        winTriggered = false;
        reset();
        resetAll();
    }
    if (keyState.space)
    {
        spacePressed = true;
    }
}

/**
 * Since I like reusability, this changes the hunters (specifically for both disqualification endings) depending on whether they won or lost.
 * @param {*} x 
 * @param {*} y 
 * @param {*} size 
 * @param {*} hunter 
 * @param {*} won 
 */
function fedUpHunter(x, y, size, hunter, won)
{
    push();
    stroke(0);
    if (won)
    {
        fill("#c7b300ff")
        rect(x - 110, y - 50, 120, 70)
        textAlign(CENTER);
        textSize(40)
        fill(0);
        text("#1", x - 50, y)
        translate(0, -50)
    }
    strokeWeight(1);
    fill("#bbbbbb")
    if (!won)
    {
        rotate(1);
        translate(300, -600)
    }
    arc(x - (size / 2), y, size, size * 2.5, radians(180), 0)
    if (won)
    {
        ellipse(x - 100, y - 80, size / 3);
        ellipse(x, y - 80, size / 3);
    }
    else
    {
        push();
        translate(x, y - 100)
        rotate(PI / 2);
        rectMode(CENTER);
        ellipse(-10, 0, size / 3, 10);
        translate(-110, 0);
        rotate(0.6);
        rectMode(CENTER);
        ellipse(30, -15, size / 3, 10);
        pop();
    }
    fill(hunter.color);
    translate(x - (size / 2), y - size * 1.5)
    ellipse(0, 0, size * 0.75)

    stroke(0);
    fill(255);
    translate(0, 15)
    
    if (won)
    {
        // Now we draw his eyes
        ellipse(-15, -15, 20, 30)
        ellipse(15, -15, 20, 30)
        fill(hunter.eyeColor)
        noStroke();
        ellipse(-10, -9, 10);
        ellipse(20, -9, 10);
        fill(0)
        noStroke();
        ellipse(-11, -9, 5);
        ellipse(19, -9, 5);
        fill(255)
        noStroke();
        ellipse(-10, -9, 2);
        ellipse(20, -9, 2);

        fill(hunter.color);
        rect(-27.5, -36, 55, 20)
        stroke(0);
        strokeWeight(2);
        line(25, -15, -25, -15)
        arc(0, 10, 20, 12, PI, TWO_PI);
    }
    else
    {
        strokeWeight(2);
        fill(230);
        triangle(-37, 0, 10, -55, -120, -120)
        push();
        rotate(-2.4)
        noStroke();
        fill(0);
        textSize(20);
        text("DUNCE", 35, 17)
        stroke(2);
        line(10, 10, 5, 40)
        pop();
    }
    pop();
}

/**
 * Since I like reusability, this changes the hunters (specifically for both winning endings) depending on whether they won or lost.
 * @param {*} x 
 * @param {*} y 
 * @param {*} size 
 * @param {*} hunter 
 * @param {*} won 
 */
function happyHunter(x, y, size, hunter, won)
{
    push();
    stroke(0);
    if (won)
    {
        fill("#c7b300ff")
        rect(x - 110, y - 50, 120, 70)
        textAlign(CENTER);
        textSize(40)
        fill(0);
        text("#1", x - 50, y)
        translate(0, -50)
    }
    strokeWeight(1);
    fill("#bbbbbb")
    arc(x - (size / 2), y, size, size * 2.5, radians(180), 0)
    if (won)
    {
        ellipse(x - 120, y - 80, size / 3);
        ellipse(x + 20, y - 140, size / 3);
    }
    else
    {
        ellipse(x - 120, y - 100, size / 3);
        ellipse(x - 110, y - 115, size / 3);
    }
    fill(hunter.color);
    translate(x - (size / 2), y - size * 1.5)
    ellipse(0, 0, size * 0.75)

    stroke(0);
    fill(255);
    translate(0, 15)
    
    // Now we draw his eyes
    noFill();
    stroke(0);
    strokeWeight(3);

    // left happy eye
    translate(-12, -15);
    arc(0, 0, 20, 12, PI, TWO_PI);

    if (won)
    {
        // right happy eye
        translate(30, 0);
        arc(0, 0, 20, 12, PI, TWO_PI);
        pop();
    }
}