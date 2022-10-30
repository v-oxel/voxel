var blocksX = 40;
var blocksY = 20;

let maxBlocks = 1000;
let blockSize;
let xOffset = 0;
let yOffset = 0;

let s;
let noDieMode = true;
let pause = false;

let speedMultiplier = 1;
let hc;
let outlineLength = 3;

let welcomeText;
let previousHeadPositions = [];

function perload() {
    welcomeText = loadImage("../../welcomes_Монтажная область 1.png");
    console.log(welcomeText.width);
}

function setup() {
    welcomeText = loadImage("../../welcomes_Монтажная область 1.png");
    console.log(welcomeText.width);
    window.canvas = createCanvas(windowWidth - 18, windowHeight);
    canvas.position(0, 0);
    window.canvas.style('z-index', 1);
    setBlocks();
    blockSize = min(width / blocksX, height / blocksY);
    outlineLength = blockSize / 15;
    xOffset = (width - blockSize * blocksX) / 2.0;
    yOffset = (height - blockSize * blocksY) / 2.0;

    s = new Snake();

    hc = new HamiltonianCycle(blocksX, blocksY);
    s.resetOnHamiltonian(hc.cycle);
    frameRate(30);
}

function setBlocks() {
    let testBlockSize = 1;
    while (true) {
        if (floor(canvas.width / testBlockSize) * floor(canvas.height / testBlockSize) < maxBlocks) {
            blockSize = testBlockSize;
            blocksX = floor(canvas.width / blockSize) - floor(canvas.width / blockSize) % 2;
            blocksY = floor(canvas.height / blockSize) - floor(canvas.height / blockSize) % 2;
            return;
        } else {
            testBlockSize++;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth - 18, windowHeight);
    blockSize = min(width / blocksX, height / blocksY);
    outlineLength = blockSize / 15;
    xOffset = (width - blockSize * blocksX) / 2.0;
    yOffset = (height - blockSize * blocksY) / 2.0;
    onResize();
}

function draw() {
    if (!pause) {
        background(20);

        textAlign(CENTER, CENTER);
        fill(255);
        noStroke();
        textSize(100);
        if (canvas.width > 700) {
            let newImageWidth = canvas.width - 2 * xOffset;
            newImageWidth *= 0.6;
            let widthRatio = newImageWidth / welcomeText.width;
            let newImageHeight = welcomeText.height * widthRatio;
            image(welcomeText, canvas.width / 2 - newImageWidth / 2, canvas.height / 2 - newImageHeight / 2, newImageWidth, newImageHeight);
            fill(20, 230);
            rect(canvas.width / 2 - newImageWidth / 2, canvas.height / 2 - newImageHeight / 2, newImageWidth, newImageHeight)
        }

        fill(15);
        rect(0, 0, width, yOffset);
        rect(0, 0, xOffset, height);
        rect(width, height, -width, -yOffset);
        rect(width, height, -xOffset, -height);
        push();
        translate(xOffset, yOffset);

        fill(0);
        s.show();
        for (let i = 0; i < speedMultiplier; i++) {
            s.update();
        }
        pop();
    }
}

function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            s.velX = 0;
            s.velY = -1;
            pause = false;
            frameRate(30);
            break;
        case DOWN_ARROW:
            s.velX = 0;
            s.velY = 1;
            pause = false;
            frameRate(10);
            break;
    }
    switch (key) {
        case ' ':
            speedMultiplier = 10;
            break;

    }
}

function keyReleased() {
    switch (key) {
        case ' ':
            speedMultiplier = 1;
    }
}