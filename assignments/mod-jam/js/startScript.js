let fadeIn = 0;
let objectFadeIn = 0;
let objectFadeOut = 255;
let textFadeIn = {
    author: 0,
    title: 0,
    options: 0
}

let skipped = {
    once: false,
    twice: false,
};
let skipForward = 0;
let spaceGrace = 0;
let menuSelect = {
    main: true,
    single: false,
    multi: false,
    instructions: false,
    options: false
}

let fadeBeforeGameStart = 0;
let gameStartTriggered = false;
let startPlayTimeoutSet = false;
let startTriggerTimeoutSet = false;

let titleStartTime = 0;

function startIntro()
{
    if (titleStartTime === 0) titleStartTime = millis();
    let sec = (millis() - titleStartTime) / 1000;  // Get current time in milliseconds
    let timing = sec + skipForward;

    console.log(timing);
    if (keyState.space && !skipped.once)
    {
        spaceGrace++;
        skipped.once = true;
        skipForward = 8 - sec;
        fadeIn = 90;
        objectFadeIn = 255;
    }
    if (!keyState.space && spaceGrace == 1) spaceGrace++;
    if (keyState.space && skipped.once && !skipped.twice && spaceGrace == 2)
    {
        textFadeIn.author = 0;
        skipped.twice = true;
        skipForward = 12 - sec;
    }
    background(fadeIn);
    if (timing >= 3 && fadeIn < 90) fadeIn += 0.5;
    if (timing >= 5 && objectFadeIn <= 255) objectFadeIn += 1.5;
    drawMoon(objectFadeIn);
    drawLandscape(objectFadeIn, menuSelect.main ? objectFadeIn : objectFadeOut, menuSelect.main ? objectFadeIn : coop ? objectFadeOut : 255);
    drawStars(objectFadeIn);
    drawWaves(objectFadeIn);
    if (timing >= 8 && timing < 10)
    {
        push();
        noStroke();
        translate(MAXWIDTH / 2, MAXHEIGHT / 2);
        fill(255, 255, 255, textFadeIn.author)
        textSize(48);
        textAlign(CENTER);
        text(ending == "funny" ? "Lol\nLmao even" : "A game by\nSean Gregory", 0, 0);
        textSize(20);
        text("Please allow autoplay in your browser for the best experience", 0, 200)
        if (textFadeIn.author <= 255) textFadeIn.author += 3;
        pop();
    }
    if (timing >= 10)
    {
        push();
        noStroke();
        translate(MAXWIDTH / 2, MAXHEIGHT / 2);
        fill(255, 255, 255, textFadeIn.author)
        textSize(48);
        textAlign(CENTER);
        text(ending == "funny" ? "Lol\nLmao even" : "A game by\nSean Gregory", 0, 0);
        textSize(20);
        text("Please allow autoplay in your browser for the best experience", 0, 200)
        if (textFadeIn.author >= 0) textFadeIn.author -= 3;
        pop();
    }
    if (timing >= 12)
    {
        push();
        noStroke();
        translate(MAXWIDTH / 2, MAXHEIGHT / 2);
        textSize(60);
        textFont(mainFont)
        textAlign(CENTER);
        // Now we can select options
        
        let minW = MAXWIDTH / 2 - 100;
        let maxW = MAXWIDTH / 2 + 100;
        let avH = MAXHEIGHT / 2
        let cond = mouseX >= minW - 200 && mouseX <= maxW + 200 && mouseY >= avH -50 && mouseY <= avH 
        fill(255, 255, 255, textFadeIn.title)
        text(cond ? "Spirit of our Sister" : "Spiritus Sororis Nostrae", 0, 0);
        textSize(24);
        
        cond = mouseX >= minW && mouseX <= maxW && mouseY >= avH + 80 && mouseY <= avH + 100
        fill(cond ? 0 : 255, cond ? 0 : 255, cond ? 0 : 255, textFadeIn.title)
        text(cond ? "Single Player" : "Lusor Unius", 0, 100)
        if (cond && click && textFadeIn.title >= 255)
        {
            menuSelect.single = true;
            menuSelect.main = false;
        }
        cond = mouseX >= minW && mouseX <= maxW && mouseY >= avH + 120 && mouseY <= avH + 140
        fill(cond ? 0 : 255, cond ? 0 : 255, cond ? 0 : 255, textFadeIn.title)
        text(cond ? "Multiplayer" : "Lusoribus", 0, 140)
        if (cond && click && textFadeIn.title >= 255)
        {
            menuSelect.single = true;
            menuSelect.main = false;
            coop = true;
        }
        cond = mouseX >= minW && mouseX <= maxW && mouseY >= avH + 160 && mouseY <= avH + 180
        fill(cond ? 0 : 255, cond ? 0 : 255, cond ? 0 : 255, textFadeIn.title)
        text(cond ? "Instructions" : "Instructiones", 0, 180)
        if (cond && click && textFadeIn.title >= 255)
        {
            menuSelect.instructions = true;
            menuSelect.main = false;
            gameState = "instructions";
        }
        cond = mouseX >= minW && mouseX < maxW && mouseY >= avH + 200 && mouseY <= avH + 220
        fill(cond ? 0 : 255, cond ? 0 : 255, cond ? 0 : 255, textFadeIn.title)
        text(cond ? "Options" : "Optiones", 0, 220)
        if (cond && click && textFadeIn.title >= 255)
        {
            menuSelect.options = true;
            menuSelect.main = false;
            gameState = "options";
        }
        if (timing <= 14 && textFadeIn.title <= 255) textFadeIn.title += 3;
        pop();
    }
    
    if (menuSelect.single)
    {
        textFadeIn.title -= 3;
        objectFadeOut -= 2.5;
    }
    if (objectFadeOut < 0)
    {
        if (!gameStartTriggered)
        {
            if (fadeBeforeGameStart >= 255)
            {
                if (!startTriggerTimeoutSet) {
                    startTriggerTimeoutSet = true;
                    setTimeout(() => { gameStartTriggered = true; }, 3000);
                }
            }
            else fadeBeforeGameStart += 3;
        }
        else
        {
            fadeBeforeGameStart -= 3;
            // schedule entering play state only once
            if (!startPlayTimeoutSet)
            {
                startPlayTimeoutSet = true;
                setTimeout(() => {
                    gameState = "options";
                    hunter.body.x = -300;
                    if (coop) hunter2.body.x = MAXWIDTH + 150;
                    skipped.once = false;
                    skipped.twice = false;
                    skipForward = 0;
                    spaceGrace = 0;
                }, 1200);
            }
        }
        push();
        noStroke();
        translate(MAXWIDTH / 2, MAXHEIGHT / 2);
        textSize(30);
        textFont(mainFont)
        textAlign(CENTER);
        // Now we can select options
        fill(255, 255, 255, fadeBeforeGameStart)
        text("Sophia...\nTe invenire debeo...", 0, 0);
        textSize(24);
        fill(180, 180, 180, fadeBeforeGameStart)
        text("Sophia...\nWhere are you...", 0, 80);
        pop();
    }
}


function resetAll()
{
    fadeIn = 0;
    objectFadeIn = 0;
    objectFadeOut = 255;
    textFadeIn = {
        author: 0,
        title: 0,
        options: 0
    }

    skipped = {
        once: false,
        twice: false,
    };
    skipForward = 0;
    spaceGrace = 0;

    menuSelect = {
        main: true,
        single: false,
        multi: false,
        instructions: false,
        options: false
    }

    click = false;

    gameStartTriggered = false;
    startPlayTimeoutSet = false;
    startTriggerTimeoutSet = false;

    hunter.score = 100;
    hunter2.score = 100;

    titleStartTime = 0;
}