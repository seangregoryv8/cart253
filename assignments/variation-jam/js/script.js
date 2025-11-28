"use strict";

let TESTTIMER = 0;

let GAMEMODES = {
    CLASSIC: "classic",
    PREDICTION: "prediction",
    POWERUP: "powerup"
}

let brickImages = 
{
    health1: 
    {
        outside: "",
        inside: ""
    },
    health2: 
    {
        outside: "",
        inside: ""
    },
    health3: 
    {
        outside: "",
        inside: ""
    }
}

let particles = [];
let enemies = []
let GAMEWIDTH = 600;
let WIDTH = 900;
let HEIGHT = 900;

let triggerHappy = false;

let directions = {
    LEFT: "left",
    RIGHT: "right",
    UP: "up",
    DOWN: "down"
}

let ballState = {
    START: "start",
    LAUNCHED: "launched"
}

let paddle = {
    x: GAMEWIDTH / 2,
    y: HEIGHT - px(1),
    size: px(5),
    speed: 5,
    dashing: false,
    dashFalloff: 0.2
}

let ballStartY = HEIGHT - px(2);

let ball = {
    x: GAMEWIDTH / 2 + px(2),
    y: HEIGHT - px(2),
    size: px(1),
    state: ballState.START,
    directionX: "",
    directionY: "",

    speedBank: 8,
    velocityX: 0,  // Velocity components for physics
    velocityY: 0,  // Velocity components for physics
    invincible: 0
}

let enemy = {
    health: ranInt(1, 3),
    maxHealth: ranInt(1, 3),
    x: x,
    y: y,
    width: px(3),
    height: px(1),
    color: 0
};

function preload()
{
    brickImages.health1.outside = loadImage("../assets/images/brick3Outside.png")
    brickImages.health1.inside = loadImage("../assets/images/brick3Inside.png")
    brickImages.health2.outside = loadImage("../assets/images/brick2Outside.png")
    brickImages.health2.inside = loadImage("../assets/images/brick2Inside.png")
    brickImages.health3.outside = loadImage("../assets/images/brick1Outside.png")
    brickImages.health3.inside = loadImage("../assets/images/brick1Inside.png")

    exoFont.black = loadFont("../assets/fonts/Exo_2/static/Exo2-Black.ttf");
    exoFont.blackItalic = loadFont("../assets/fonts/Exo_2/static/Exo2-BlackItalic.ttf");
    exoFont.bold = loadFont("../assets/fonts/Exo_2/static/Exo2-Bold.ttf");
    exoFont.boldItalic = loadFont("../assets/fonts/Exo_2/static/Exo2-BoldItalic.ttf");
    exoFont.extraBold = loadFont("../assets/fonts/Exo_2/static/Exo2-ExtraBold.ttf");
    exoFont.extraBoldItalic = loadFont("../assets/fonts/Exo_2/static/Exo2-ExtraBoldItalic.ttf");
    exoFont.extraLight = loadFont("../assets/fonts/Exo_2/static/Exo2-ExtraLight.ttf");
    exoFont.extraLightItalic = loadFont("../assets/fonts/Exo_2/static/Exo2-ExtraLightItalic.ttf");
    exoFont.italic = loadFont("../assets/fonts/Exo_2/static/Exo2-Italic.ttf");
    exoFont.light = loadFont("../assets/fonts/Exo_2/static/Exo2-Light.ttf");
    exoFont.lightItalic = loadFont("../assets/fonts/Exo_2/static/Exo2-LightItalic.ttf");
    exoFont.medium = loadFont("../assets/fonts/Exo_2/static/Exo2-Medium.ttf");
    exoFont.mediumItalic = loadFont("../assets/fonts/Exo_2/static/Exo2-MediumItalic.ttf");
    exoFont.regular = loadFont("../assets/fonts/Exo_2/static/Exo2-Regular.ttf");
    exoFont.semiBold = loadFont("../assets/fonts/Exo_2/static/Exo2-SemiBold.ttf");
    exoFont.semiBoldItalic = loadFont("../assets/fonts/Exo_2/static/Exo2-SemiBoldItalic.ttf");
    exoFont.thin = loadFont("../assets/fonts/Exo_2/static/Exo2-Thin.ttf");
    exoFont.thinItalic = loadFont("../assets/fonts/Exo_2/static/Exo2-ThinItalic.ttf");

    gameModesUI.push(
    {
        name: "Classic",
        description: "Standard Breakout gameplay.",
        x: GAMEWIDTH + 25,
        y: 160,
        width: 150,
        height: 30,
        hovered: false
    },
    {
        name: "Prediction",
        description: "Predict the bounces.",
        x: GAMEWIDTH + 25,
        y: 190,
        width: 150,
        height: 30,
        hovered: false
    },
    {
        name: "PowerUp",
        description: "Change speed, size, and everything in between.",
        x: GAMEWIDTH + 25,
        y: 220,
        width: 150,
        height: 30,
        hovered: false
    },
    {
        name: "Supershot",
        description: "Cannonball to the heart.",
        x: GAMEWIDTH + 25,
        y: 250,
        width: 150,
        height: 30,
        hovered: false
    })
}

/**
 * Setup game
 */
function setup() {
    createCanvas(WIDTH, HEIGHT);
    drawLevel();
}
/**
 * Main game loop
 */
function draw()
{
    background(0);
    //drawGrid();
    drawPaddle();
    drawBall();

    if (ball.state == ballState.START && keyState.space)
    {
        ball.state = ballState.LAUNCHED;
        ball.directionY = directions.UP;
        if (keyState.a)
            ball.directionX = directions.LEFT;
        else if (keyState.d)
            ball.directionX = directions.RIGHT;
        else ball.directionX = ranInt(0, 1) == 0 ? directions.LEFT : directions.RIGHT;
        ball.velocityX = ball.speedBank / 2; // Random velocity for the ball
        ball.velocityY = ball.speedBank / 2; // Initial velocity
        if (keyState.a || keyState.d)
        {
            ball.velocityX *= 2;
            ball.velocityY /= 2;
        }
    }

    // Draw all enemies (bricks)
    for (let enemy of enemies)
        drawEnemy(enemy);

    if (TESTTIMER == 0)
    {
        movePaddle();
        handleDash();
        moveBall();
        ballPaddleCollision();
        ballEnemyCollision();
        ballWallCollision();
    }

    for (let i = 0; i < particles.length; i++)
    {
        moveParticle(particles[i])
        if (particles[i].y >= HEIGHT + px(2))
            particles.splice(i, 1);
    }

    if (ball.invincible > 0)
        ball.invincible--;

    if (TESTTIMER > 0)
        TESTTIMER--;

    if (keyState.i)
    {
        triggerHappy = true;
    }

    updateElo();

    drawModes();
}

/**
 * Draw the level (bricks)
 */
function drawLevel()
{
    noStroke();
    fill(60);
    for (let x = px(1); x <= GAMEWIDTH; x += px(3))
    {
        for (let y = 0; y <= HEIGHT - px(10); y += px(2))
        {
            if (ranInt(0, 100) >= 20)
            {
                enemies.push({
                    health: ranInt(1, 3),
                    maxHealth: ranInt(1, 3),
                    x: x - px(1),
                    y: y,
                    width: px(3),
                    height: px(1),
                    color:
                    {
                        r: ranInt(0, 255),
                        g: ranInt(0, 255),
                        b: ranInt(0, 255)
                    }
                });
            }
        }
    }
}


/**
 * Draw enemy (brick) based on health
 */
function drawEnemy(enemy)
{
    let imgOut;
    let imgIn;
    switch (enemy.health)
    {
        case 1:
            imgOut = brickImages.health1.outside;
            imgIn = brickImages.health1.inside;
            break;
        case 2:
            imgOut = brickImages.health2.outside;
            imgIn = brickImages.health2.inside;
            break;
        case 3:
            imgOut = brickImages.health3.outside;
            imgIn = brickImages.health3.inside;
            break;
    }
    image(imgOut, enemy.x, enemy.y)

    push();
    tint(enemy.color.r, enemy.color.g, enemy.color.b);
    image(imgIn, enemy.x, enemy.y);
    pop();
}

/**
 * Draw the ball
 */
function drawBall()
{
    fill(150);
    rect(ball.x, ball.y, px(1), px(1), 20);
}

/**
 * Move the ball
 */
function moveBall()
{
    if (ball.state == ballState.LAUNCHED)
    {
        ball.x += ball.velocityX * (ball.directionX == directions.RIGHT ? 1 : -1);
        ball.y += ball.velocityY * (ball.directionY == directions.UP ? -1 : 1);
    }
}

/**
 * Draw the paddle
 */
function drawPaddle()
{
    noStroke();
    fill(255);
    rect(paddle.x, paddle.y, paddle.size, px(1), 10);
}

/**
 * Move the paddle based on user input
 */
function movePaddle()
{
    if (keyState.a && paddle.x >= 0)
    {
        paddle.x -= paddle.speed;
        if (ball.state == ballState.START)
        {
            ball.x -= paddle.speed;
        }
    }
    else if (keyState.d && paddle.x + paddle.size <= GAMEWIDTH)
    {
        paddle.x += paddle.speed;
        if (ball.state == ballState.START)
        {
            ball.x += paddle.speed;
        }
    }
}

function handleDash()
{
    if (paddle.dashing)
    {
        if (paddle.speed <= 5)
        {
            paddle.speed = 5;
            paddle.dashing = false;
            paddle.dashFalloff = 0.2;
        }
        paddle.speed -= paddle.dashFalloff;
        paddle.dashFalloff += 0.05
    }
}

/**
 * Handle ball collision with paddle
 */
function ballPaddleCollision()
{
    if (ball.y + px(1) >= paddle.y && ball.y <= paddle.y + px(1))
    {
        if (ball.x + px(1) >= paddle.x && ball.x <= paddle.x + px(5))
        {
            if (ball.state == ballState.LAUNCHED)
            {
                // From -60 to 60 (-60 is closest to the left, 60 is furthest to the right)

                // Lowst value would be 1
                // Highest value would be 7
                // Everything must always equal up to 8
                let directional;
                let pa = ball.x;
                let pb = paddle.x + (paddle.size / 2);
                directional = pa > pb ? pa - pb : pb - pa;

                directional = (directional / 60) * ball.speedBank;

                ball.velocityX = directional;
                ball.velocityY = ball.speedBank - directional;
                ball.speedBank *= 1.05;  // Increase speed after paddle collision
                ball.velocityX += random(-0.5, 0.5);  // Add a little random variation to the ball's x velocity
            }
            ball.directionY = directions.UP;
        }
    }
}

/**
 * Handle ball collision with walls
 */
function ballWallCollision()
{
    if (ball.x <= 0 || ball.x + px(1) >= GAMEWIDTH || ball.y <= 0)
        addScore(0.2);

    if (ball.x <= 0)                 ball.directionX = directions.RIGHT;
    if (ball.x + px(1) >= GAMEWIDTH) ball.directionX = directions.LEFT;
    if (ball.y <= 0)                 ball.directionY = directions.DOWN;
    if (ball.y >= HEIGHT)
    {
        ball.y = ballStartY;
        ball.x = paddle.x + (paddle.size / 2);
        ball.state = ballState.START;
        ball.speedBank = random(5, 8);

        addScore(-50);
        combo = 0;
        comboTimer = 0;
    }

    updateDifficulty();
}

/**
 * Handle ball collision with enemies (bricks)
 */
function ballEnemyCollision()
{
    for (let i = 0; i < enemies.length; i++)
    {
        let enemy = enemies[i];

        let ballXLeft = ball.x;
        let ballXRight = ball.x + ball.size;

        let enemyXLeft = enemy.x;
        let enemyXRight = enemy.x + enemy.width;

        let ballYUp = ball.y;
        let ballYDown = ball.y + ball.size;

        let enemyYUp = enemy.y;
        let enemyYDown = enemy.y + enemy.height;

        let detectionX = ballXRight >= enemyXLeft && ballXLeft <= enemyXRight;
        let detectionY = ballYDown >= enemyYUp && ballYUp <= enemyYDown;

        if ((detectionX && detectionY && ball.invincible == 0) || triggerHappy)
        {
            let cornerR = ballXLeft == enemyXRight;
            let cornerL = ballXRight == enemyXLeft;
            ball.invincible = 5;
            enemy.health--;
            if (enemy.health <= 2)
            {
                for (let i = 0; i < ranInt(1, 2); i++)
                    makeParticle(enemy.x + (enemy.width / 2), enemy.y + (enemy.height / 2), random(-5, -2), random(-3, 3), enemy.color)
                addScore(0.5);
            }
            if (enemy.health <= 1)
            {
                for (let i = 0; i < ranInt(1, 2); i++)
                    makeParticle(enemy.x + (enemy.width / 2), enemy.y + (enemy.height / 2), random(-5, -2), random(-3, 3), enemy.color)
                addScore(0.75);
            }
            if (enemy.health <= 0)
            {
                for (let i = 0; i < ranInt(3, 6); i++)
                    makeParticle(enemy.x + (enemy.width / 2), enemy.y + (enemy.height / 2), random(-5, -2), random(-3, 3), enemy.color)
                // Remove the enemy from the array when its health reaches 0
                enemies.splice(i, 1);
                i--;  // Adjust the index since we removed an element
                addScore(1.5);
            }
            if (cornerR)
                ball.directionX = directions.RIGHT;
            else if (cornerL)
                ball.directionX = directions.LEFT;
            else
            {
                ball.directionY = ball.y + ball.size / 2 >= enemy.y + enemy.height / 2 ? directions.DOWN : directions.UP;
            }

            updateDifficulty();
        }
    }
}

/**
 * Draw grid for pixel art effect
 */
function drawGrid()
{
    stroke(0);
    fill(230);
    for (let x = 0; x <= GAMEWIDTH; x += px(1))
    {
        rect(x, 0, px(1), px(1));
        for (let y = 0; y <= HEIGHT; y += px(1))
            rect(x, y, px(1), px(1));
    }
    noStroke();
}

function makeParticle(x, y, velY, velX, color)
{
    particles.push({
        x: x,
        y: y,
        velocityY: velY,
        velocityX: velX,
        size: random(5, 20),
        shade: color
    })
}

function moveParticle(particle)
{
    fill(particle.shade.r, particle.shade.g, particle.shade.b)
    ellipse(particle.x, particle.y, particle.size)
    particle.y += particle.velocityY;
    particle.velocityY += random(0.2, 0.8);
    particle.x += particle.velocityX;
}

function px(s) { return s * 20; }

/**
 * Little function I made to make a random integer
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function ranInt(min, max)
{
    return Math.round(random(min, max))
}

function checkTarget(ball, enemy)
{
    let d = dist(ball.x, ball.y, enemy.x, enemy.y);
    return d < px(1) / 2 + enemy.size / 2;
}

function roundToNDecimals(number, decimals)
{
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
}