/**
 * This returns a new ghost
 * @returns A new ghost object with:
 * x: Its X value starting point (always -50 for off-screen)
 * y: Its Y value, which can be anywhere on screen with a 200 pixel grace area
 * size: Always 40, size of the circle
 * speed: how fast it moves off-screen
 * toRemove: When its caught, it will notify the array when to remove it
 * tail: a small array for the tail class, that makes 30 instances of the circle to act as the "spooky" tail
 * wave: the phases between its waves
 * movement: How much it waves across the screen
 * color: what shade of gray it is
 */
function makeGhost()
{
    return {
        x: -50,
        y: random(200, MAXHEIGHT - 200),
        size: 40,
        speed: random(gameOptions[difficulty].minSpeed, gameOptions[difficulty].maxSpeed),
        toRemove: false,
        tail: [],
        wave: random(gameOptions[difficulty].minWave, gameOptions[difficulty].maxWave),
        movement: random(gameOptions[difficulty].minMovement, gameOptions[difficulty].maxMovement),
        color: random(160, 255)
    }
}

let ghostHordeFunny = false;
function spawnGhosts()
{
    console.log("HI")
    let grace = 0;
    const currentTime = millis();  // Get current time in milliseconds
    if (currentTime - lastFlyTime > spawnInterval)
    {
        console.log(currentTime - lastFlyTime)
        let ranNum = Math.round(random(1, 100))
        if (ranNum === 69)
        {
            for (let i = 0; i < gameOptions[difficulty].insaneGhosts; i++)
                ghosts.push(makeGhost())
            ghostHordeFunny = true;
            setTimeout(() => ghostHordeFunny = false, 5000)
        }
        do
        {
            grace++;
            ghosts.push(makeGhost());  // Add a new ghost
            ranNum -= 20
        } while (ranNum > 20)
        lastFlyTime = currentTime;  // Reset the timer
        spawnInterval = random(gameOptions[difficulty].minSpawn * grace, gameOptions[difficulty].maxSpawn * grace);
    }
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveGhost(ghost)
{
    ghost.x += ghost.speed;
    ghost.y += cos(frameCount / ghost.wave) * ghost.movement;

    if (ghost.x >= MAXWIDTH + 50)
    {
        ghost.toRemove = true;
        penalizePlayer(ghost);
    }
}

function judgeGhost(ghost)
{
    let d = gameOptions[difficulty]
    let avgSpeed = d.maxSpeed - d.minSpeed;
    let avgWave = d.maxWave - d.minWave;
    let avgMovement = d.maxMovement - d.minMovement;

    let ghostStats = {
        speed: "",
        wave: "",
        movement: ""
    }
    
    // If the speed is low, medium, or high
    // avgSpeed: 9 (if min 1 and max 10)
    // Slow speed: 1-3
    // Average speed: 4-6
    // High speed: 7-10

    if (ghost.speed <= d.minSpeed + (avgSpeed / 3)) ghostStats.speed = "Slow";
    else if (ghost.speed > d.minSpeed + (avgSpeed / 3) && ghost.speed <= d.minSpeed + (2 * (avgSpeed / 3))) ghostStats.speed = "Medium";
    else if (ghost.speed > d.minSpeed + (2 * (avgSpeed / 3))) ghostStats.speed = "Fast";

    if (ghost.wave <= d.minWave + (avgWave / 3)) ghostStats.wave = "Jittery";
    else if (ghost.wave > d.minWave + (avgWave / 3) && ghost.wave <= d.minWave + (2 * (avgWave / 3))) ghostStats.wave = "Floaty";
    else if (ghost.wave > d.minWave + (2 * (avgWave / 3))) ghostStats.wave = "Calm";

    if (ghost.movement <= d.minMovement + (avgMovement / 3)) ghostStats.movement = "Static";
    else if (ghost.movement > d.minMovement + (avgMovement / 3) && ghost.movement <= d.minMovement + (2 * (avgMovement / 3))) ghostStats.movement = "Wiggly";
    else if (ghost.movement > d.minMovement + (2 * (avgMovement / 3))) ghostStats.movement = "Sine Master";

    return ghostStats;
}