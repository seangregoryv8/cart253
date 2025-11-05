/**
 * This code is a bit less messy than over.js, but it handles the 1 single player win scenario, alongside all 5 endings for multiplayer:
 * - If player 1 wins
 * - If player 2 wins
 * - If player 1 gets disqualified
 * - If player 2 gets disqualified
 * - If both players lose at the same time
 * 
 * I reuse some code from other portions:
 * - Simplified effect batch from over.js
 * - The same video helper for the second joke video
 * - The win and lose scenarios for coop
 */

function drawWin()
{
    if (coop)
    {
        if (ending != "bothlose")
        {
            push();
            background(90);
            noStroke();
            fill(59, 111, 65)
            ellipse(MAXWIDTH / 2, MAXHEIGHT + 40, 1500, 600)
            push();
            noStroke();
            translate(MAXWIDTH / 2, MAXHEIGHT / 2);
            textSize(50);
            textFont(mainFont)
            textAlign(CENTER);
            fill(255, 255, 255)
            pop();
        }
        if (ending === "p1wins" || ending === "p2wins")
        {
            drawStars();
            const winner = ending === "p1wins" ? "Player 1" : "Player 2";
            const loser  = ending === "p1wins" ? "Player 2" : "Player 1";
            const winHunter = ending === "p1wins" ? hunter : hunter2;
            const loseHunter = ending === "p1wins" ? hunter2 : hunter;
            fill(0, 0, 0, 100);
            noStroke();
            rect(MAXWIDTH / 4, 30, MAXWIDTH / 2, 230);
            textFont(mainFont);
            textAlign(CENTER);
            textSize(50);
            fill(255);
            text(`${winner} Wins`, MAXWIDTH / 2, 100);
            textFont("Calibri");
            textSize(24);
            text(`${winner} Score: ${winHunter.score}`, MAXWIDTH / 2, 200);
            text(`${loser} Score: ${loseHunter.score}`, MAXWIDTH / 2, 230);
            pop();
            playerWins(winHunter, loseHunter);
        }
        else if (ending == "bothlose")
        {
            // create and start the video once (remove ghostHordeFunny guard so video always shows on game over)
            if (!bothLoseVideo)
            {
                bothLoseVideo = createVideoHandler('assets/bothLose.mov', () => 
                {
                    gameState = "title";
                    resetAll();
                });
            }
            checkVideoFallback(bothLoseVideo);
        }
        else 
        if (ending === "p1lose" || ending === "p2lose")
        {
            drawStars();
            const winner = ending === "p2lose" ? "Player 1" : "Player 2";
            const loser  = ending === "p2lose" ? "Player 2" : "Player 1";
            const winHunter = ending === "p2lose" ? hunter : hunter2;
            const loseHunter = ending === "p2lose" ? hunter2 : hunter;
            fill(0, 0, 0, 100);
            noStroke();
            rect(MAXWIDTH / 6, 30, MAXWIDTH * 2 / 3, 230);
            textFont(mainFont);
            textAlign(CENTER);
            textSize(50);
            fill(255);
            text(`${loser} Disqualified.\n${winner} Wins`, MAXWIDTH / 2, 100);
            textFont("Calibri");
            textSize(24);
            text(`${winner} Score: ${winHunter.score}`, MAXWIDTH / 2, 220);
            text(`${loser} Score: ${loseHunter.score}`, MAXWIDTH / 2, 250);
            pop();
            playerDefaultWins(winHunter, loseHunter);
        }
    }
    else
    {
        // simple timed cutscene: 0..10 seconds
        background(20);
        let elapsed = (millis() - winStartTime) / 1000; // seconds
        winProgress = constrain(elapsed / 10, 0, 1);

        // subtle zoom effect by scaling around centre
        push();
        translate(MAXWIDTH / 2, MAXHEIGHT / 2);
        let zoom = 1 + winProgress * 0.4;
        scale(zoom);
        translate(-MAXWIDTH / 2, -MAXHEIGHT / 2);
           
        // dim scene and draw environment faintly
        drawMoon(255);
        drawLandscape(255, 0, 0);
        drawStars(255);
           
        // draw hunter slowly moving to centre
        let targetX = MAXWIDTH / 2;
        hunter.body.x = lerp(hunter.body.x, targetX, 0.02 + winProgress * 0.02);
        hunter.draw();
        hunter.moveNet();
        if (elapsed >= 10)
            startEnding();
        pop();
    }
}