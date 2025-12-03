/**
 * This is a function I took off another project of mine that adds a new div element and adds a vhs overlay to it.
 * @param {*} src 
 */
function createOverlay(src = null)
{
    let vhs_overlay_div = document.createElement('div');
    vhs_overlay_div.id = 'vhs_overlay_div';

    let vhs_overlay = document.createElement('img');
    vhs_overlay.id = 'vhs_overlay';
    vhs_overlay.draggable = false;
    if (src != null)
    {
        vhs_overlay.src = src;
    }
    
    vhs_overlay.style.position = "fixed";
    vhs_overlay.style.left = 0;
    vhs_overlay.style.top = 0;
    vhs_overlay.style.width = "100%";
    vhs_overlay.style.height = "100%";
    vhs_overlay.style.objectFit = "fill";

    vhs_overlay_div.appendChild(vhs_overlay);
    document.getElementById("breakBody").appendChild(vhs_overlay_div);
}

/**
 * This is a function I took off another project of mine that adds a div and creates static inside of it.
 */
function createStatic()
{
    let static_div = document.createElement('div');
    static_div.id = 'static_div';

    let staticNoise = document.createElement('img');
    staticNoise.id = 'staticNoise';
    staticNoise.draggable = false;
    staticNoise.style.opacity = 0;
    
    staticNoise.style.position = "fixed";
    staticNoise.style.left = 0;
    staticNoise.style.top = 0;
    staticNoise.style.width = "100%";
    staticNoise.style.height = "100%";
    staticNoise.style.objectFit = "fill";

    static_div.appendChild(staticNoise);
    document.getElementById("breakBody").appendChild(static_div);
}

/**
 * This inserts a bunch of gradient lines onto the monitor to make it feel like a real CRT TV
 */
function createCrtOverlay()
{
    let crt_container = document.createElement('div');
    crt_container.id = 'crt-container';

    let crt_overlay = document.createElement('div');
    crt_overlay.id = 'crt-overlay';

    crt_overlay.style.position = "absolute";
    crt_overlay.style.left = 0;
    crt_overlay.style.top = 0;
    crt_overlay.style.width = "100%";
    crt_overlay.style.height = "100%";
    crt_overlay.style.pointerEvents = "none";
    crt_overlay.style.background = 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)';
    crt_overlay.style.backgroundSize = "100% 2px";

    crt_overlay.style.color = "#00ff00";
    crt_overlay.style.textShadow = "0 0 10px #00ff00, 0 0 5px #00ff00";

    crt_container.appendChild(crt_overlay);
    document.getElementById("breakBody").appendChild(crt_container);
}

/**
 * This is a function I took off another project that adds small bars on either side for a 4x3 aspect ratio (most of the time)
 */
function createBars()
{
    let leftBar = document.createElement('div');
    leftBar.id = 'leftbar';
    leftBar.style.backgroundColor = "black";
    leftBar.style.position = "fixed"
    leftBar.style.top = 0;
    leftBar.style.left = 0;
    leftBar.style.width = "15%";
    leftBar.style.height = "100%";
    leftBar.style.zIndex = 1;
    document.getElementById("breakBody").appendChild(leftBar);
    
    let rightBar = document.createElement('div');
    rightBar.id = 'rightbar';
    rightBar.style.backgroundColor = "black";
    rightBar.style.position = "fixed"
    rightBar.style.top = 0;
    rightBar.style.right = 0;
    rightBar.style.width = "15%";
    rightBar.style.height = "100%";
    rightBar.style.zIndex = 1;
    document.getElementById("breakBody").appendChild(rightBar);
}