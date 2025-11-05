/**
 * how many points to win
- 2000 points (easy), 300 points (medium), 5000 points (hard)
How often ghosts spawn
- Minspawn: 2000 (easy), 1000 (medium), 500 (hard)
- Maxspawn: 4000 (easy), 3000 (medium), 2000 (hard)

How many ghosts spawn on insane:
- 10 ghosts (easy), 30 ghosts (medium), 50 ghosts (hard)
How fast ghosts are
- Minspeed: 1 (easy), 2 (medium), 3 (hard)
- Maxspeed: 6 (easy), 8 (medium), 10 (hard)
How much ghosts move
- Minwave: 3 (easy), 5 (medium), 7 (hard)
- Maxwave: 10 (easy), 15 (medium), 20 (hard)
How often ghosts move
- Minmovement: 1 (easy), 2 (medium), 3 (hard)
- Maxmovement: 7 (easy), 10 (medium), 13 (hard)

How much you get penalized for a missed ghost
0.75 (easy), 1 (medium), 1.5 (hard)
 */
let gameOptions = 
{
    easy:
    {
        startScore: 200,
        pointsToWin: 2000,
        minSpawn: 2000,
        maxSpawn: 4000,
        insaneGhosts: 10,
        minSpeed: 1,
        maxSpeed: 6,
        minWave: 3,
        maxWave: 10,
        minMovement: 1,
        maxMovement: 7,
        penalize: 0.75
    },
    medium:
    {
        startScore: 100,
        pointsToWin: 3000,
        minSpawn: 1000,
        maxSpawn: 3000,
        insaneGhosts: 30,
        minSpeed: 2,
        maxSpeed: 8,
        minWave: 5,
        maxWave: 15,
        minMovement: 2,
        maxMovement: 10,
        penalize: 1
    },
    hard:
    {
        startScore: 50,
        pointsToWin: 5000,
        minSpawn: 500,
        maxSpawn: 2000,
        insaneGhosts: 50,
        minSpeed: 3,
        maxSpeed: 10,
        minWave: 7,
        maxWave: 20,
        minMovement: 3,
        maxMovement: 13,
        penalize: 1.5
    }
}

const MAXWIDTH = 900;
const MAXHEIGHT = 800;
let coop = false;
let gameState = "over";
let difficulty = "hard";

const hunter1Controls = {
    left: 65,
    right: 68,
    net: 16
}

const hunter2Controls = {
    left: 74,
    right: 76,
    net: 73
}

let ending = "sad";
let sadTwitchState = {
    nextTwitchAt: 0,
    endAt: 0,
    offsetX: 0,
    offsetY: 0,
    rot: 0,
    duration: 0
};
let whiteFlashUntil = 0;
let staticPulseUntil = 0;
let pupilSize = 0.15;
let eyeShake = 0
let eyeShakeDecay = 0.9;
