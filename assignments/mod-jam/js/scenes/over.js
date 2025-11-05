/**
 * Admittedly, this one is kinda messy. It handles two endings:
 * - Regular ending when you lose all your points in single player
 * - Funny ending if you have the 1/100 chance of dying to the ghost horde in single player.
 * 
 * It took a while to get the video player working, and I was stuck on how to make a proper batch of effects, so I needed help to get that working.
 */

function drawOver()
{
    if (ending == "funny")
    {
        // create and start the video once (remove ghostHordeFunny guard so video always shows on game over)
        if (!gameOverVideo)
        {
            gameOverVideo = createVideoHandler(['assets/hordeMessage.mov','assets/hordeMessage.mp4'], () => {
                gameState = "title";
                resetAll();
            });
        }
        checkVideoFallback(gameOverVideo);
    }
    else if (ending == "sad")
    {
        /**
         * These effects were taken from a mixture of Geeks4Geeks and ChatGPT for a few advanced things like the grain and dutch angles
         */
        push();
        // timed cutscene: 0..10 seconds (ms-based)
        background(20);
        let elapsedMs = millis() - loseStartTime;
        let elapsed = elapsedMs / 1000; // seconds
        loseProgress = constrain(elapsed / 10, 0, 1);
        // dutch angle (grows as cutscene progresses) + tiny wobble
        let baseTiltDeg = -36;
        const wobbleDeg = 0;
        const wobbleSpeed = 0;
        let tiltDeg = baseTiltDeg * loseProgress;
        let wobble = Math.sin(elapsed * TWO_PI * wobbleSpeed) * wobbleDeg;
        let angle = radians(tiltDeg + wobble);
        // schedule twitches: small head jolt every so often
        if (millis() > sadTwitchState.nextTwitchAt)
        {
            // next twitch in 200..1400ms
            sadTwitchState.duration = Math.round(random(80, 220));
            sadTwitchState.offsetX = random(-10, 10) * (0.3 + loseProgress * 1.2);
            sadTwitchState.offsetY = random(-6, 6) * (0.3 + loseProgress * 1.2);
            sadTwitchState.rot = radians(random(-8, 8) * (0.25 + loseProgress));
            sadTwitchState.endAt = millis() + sadTwitchState.duration;
            sadTwitchState.nextTwitchAt = millis() + random(200, 1400) * (1 - loseProgress * 0.6);
        }
        // occasional white flash (very brief) to punctuate horror
        if (millis() > whiteFlashUntil && elapsed > 0.6 && elapsed < 9)
            if (random() < 0.025 + loseProgress * 0.08)
                whiteFlashUntil = millis() + Math.round(random(40, 150)); // ms
        // occasional static pulse (grain / inverted wash)
        if (millis() > staticPulseUntil && elapsed > 1 && elapsed < 9)
            if (random() < 0.015 + loseProgress * 0.05)
                staticPulseUntil = millis() + Math.round(random(60, 220));
        // subtle zoom + rotation around centre
        push();
        translate(MAXWIDTH / 2, MAXHEIGHT / 2);
        rotate(angle);
        let zoom = 1 + loseProgress * 0.42;
        scale(zoom);
        translate(-MAXWIDTH / 2, -MAXHEIGHT / 2);
        // draw scene underneath
        drawMoon(255);
        drawLandscape(255, 0, 0);
        drawStars(255);
        // draw hunter — apply twitch transform only to the hunter draw call
        let targetX = MAXWIDTH / 2;
        hunter.body.x = lerp(hunter.body.x, targetX, 0.02 + loseProgress * 0.02);
        // if twitch is active, draw hunter with local jitter/rotation
        if (millis() < sadTwitchState.endAt)
        {
            push();
            // move to hunter body origin, apply local twitch, then draw
            translate(sadTwitchState.offsetX, sadTwitchState.offsetY);
            rotate(sadTwitchState.rot);
            hunter.draw();
            pop();
        }
        else hunter.draw();
        // keep net animating so scene feels alive
        hunter.moveNet();
        // draw quick ghostly silhouettes during pulses
        if (millis() < staticPulseUntil)
        {
            push();
            blendMode(ADD);
            noStroke();
            fill(255, 255, 255, 30 + loseProgress * 120);
            // quick radial smear in centre
            ellipse(MAXWIDTH/2 + random(-30,30), MAXHEIGHT/2 + random(-30,30), 600 * (0.4 + loseProgress * 1.2));
            pop();
        }
        // white flash overlay (short, jarring)
        if (millis() < whiteFlashUntil)
        {
            push();
            noStroke();
            fill(255, 255, 255, map(whiteFlashUntil - millis(), 0, 150, 0, 220));
            rect(0, 0, MAXWIDTH, MAXHEIGHT);
            pop();
        }
        // film-grain / subtle static drawn on top while later in cutscene
        if (loseProgress > 0.35)
        {
            push();
            noStroke();
            fill(255, 30);
            for (let i = 0; i < 60 * loseProgress; i++)
                rect(random(MAXWIDTH), random(MAXHEIGHT), random(1,3), random(1,3));
            pop();
        }
        pop();
        // finalise: when full 10s elapsed, proceed
        if (elapsed >= 10)
            startLoss();
        pop(); // end main rotate/scale transform
    }
}