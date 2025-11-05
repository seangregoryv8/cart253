/**
 * This draws the main stuff for play, including:
 * - The background things
 * - The UI that includes your score and when you catch or release ghosts
 * - The hunter and his boat
 * - Every ghost that appears on screen
 * - The triggers for all 8 endings
 * 
 * Alongside triggers to differentiate whether you have coop on (if youre playing multiplayer)
 */
function drawPlay()
{
    background(90);
    drawMoon();
    drawLandscape(255, 0, !coop ? 255 : 0);
    drawStars();

    createUI();

    hunter.draw();
    hunter.move();
    hunter.moveNet();

    if (coop)
    {
        hunter2.draw();
        hunter2.move();
        hunter2.moveNet();
    }

    for (const ghost of ghosts)
    {
        moveGhost(ghost);
        drawGhost(ghost);
    }
    hunter.checkNetGhostOverlap();
    if (coop) hunter2.checkNetGhostOverlap();

    ghosts = ghosts.filter(ghost => !ghost.toRemove);
    
    setTimeout(spawnGhosts, 2000);
    drawWaves();

    if (!coop && hunter.score >= gameOptions[difficulty].pointsToWin && !winTriggered)
    {
        triggerWin("reunion");
        gameState = "win";
    }
    else if (coop)
    {
        if (hunter.score >= gameOptions[difficulty].pointsToWin)
        {
            ending = "p1wins"
            gameState = "win";
        }
        else if (hunter2.score >= gameOptions[difficulty].pointsToWin)
        {
            ending = "p2wins"
            gameState = "win";
        }
        else if (hunter.score < 0 && hunter2.score < 0)
        {
            ending = "bothlose";
            gameState = "win";
        }
        else if (hunter.score < 0)
        {
            ending = "p1lose";
            gameState = "win";
        }
        else if (hunter2.score < 0)
        {
            ending = "p2lose";
            gameState = "win";
        }
    }

    // Hidden not-so-hidden ending
    if (!coop && hunter.score < 0)
    {
        if (ghostHordeFunny) ending = "funny";
        else
        {
            ending = "sad";
            triggerLoss();
        }
        gameState = "over";
    }
}