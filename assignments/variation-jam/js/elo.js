let scoreboard = 1200;

let elo = {
    rating: scoreboard,
    K: 16,
    difficultyMultiplier: 1,
    recentScores: [],
    recentMax: 60
};

let combo = 0;
let comboTimer = 0;
const COMBO_TIMEOUT = 120; // frames before combo resets

function updateElo()
{
    if (comboTimer > 0)
    {
        comboTimer--;
        if (comboTimer === 0) combo = 0;
    }

    scoreboard = elo.rating;

    drawELO();
}

// ELO system that collects global score and adjusts its own difciculty in mind
// A cap where you can keep that same level for when you're comfortable with the level you want

function drawELO()
{
    push();
    fill(255);
    textSize(24);
    textFont(exoFont.light)
    text("ELO Score: " + Math.round(scoreboard), GAMEWIDTH + 75, HEIGHT - 50);
    pop();
}

function addScore(baseScore)
{
    // baseScore: canonical points for the event (positive hit, negative death)
    // multiplier: combo + speed + ELO difficulty multiplier
    const speedFactor = Math.max(0.5, ball.speedBank / 6); // ball.speedBank ~ 5-8, scale so it's meaningful
    const comboFactor = 1 + (combo * 0.2);
    const difficultyFactor = Math.max(0.25, elo.difficultyMultiplier);

    let scaled = baseScore * speedFactor * comboFactor * difficultyFactor;

    // Apply and record to recent for dynamic difficulty adjustments
    elo.recentScores.push(scaled);
    if (elo.recentScores.length > elo.recentMax) elo.recentScores.shift();

    // Adjust elo rating directly (small incremental update)
    elo.rating = roundToNDecimals(elo.rating + scaled, 2);
}

function updateDifficulty()
{
    if (elo.recentScores.length === 0) return;
    const avg = elo.recentScores.reduce((a, b) => a + b, 0) / elo.recentScores.length;
    const baseline = 5;
    elo.difficultyMultiplier = 1 + Math.tanh((avg - baseline) / baseline) * 0.5;
}