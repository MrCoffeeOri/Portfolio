const ctx = document.querySelector("canvas").getContext("2d")

// Matrix Rain Effect
const matrixFontSize = 24;
const matrixTrailLength = 10;
const matrixChars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*'.split('');
const randomMatrixChar = () => matrixChars[Math.floor(Math.random() * matrixChars.length)];
let matrixDrops = [];
let matrixColumnChars = [];
let matrixHeadColor = '#b6ff00';
let matrixBodyColor = '#00ff41';

function initMatrix() {
    // One column per glyph slot: columns are drawn at i * matrixFontSize,
    // so anything beyond innerWidth / matrixFontSize would be off-screen.
    const matrixColumns = Math.ceil(window.innerWidth / matrixFontSize);
    matrixDrops = [];
    matrixColumnChars = [];
    for (let x = 0; x < matrixColumns; x++) {
        matrixDrops[x] = Math.random() * window.innerHeight / matrixFontSize;
        matrixColumnChars[x] = Array.from({ length: matrixTrailLength }, randomMatrixChar);
    }
}

window.setMatrixEnabled = function(enabled) {
    window._matrixEnabled = enabled;
};
window._matrixEnabled = true;

// Called by the terminal theme switcher
window.setMatrixColors = function(headColor, bodyColor) {
    matrixHeadColor = headColor;
    matrixBodyColor = bodyColor;
};

function drawMatrix() {
    ctx.font = `bold ${matrixFontSize}px Inconsolata, monospace`;
    ctx.shadowColor = matrixBodyColor;

    for (let i = 0; i < matrixDrops.length; i++) {
        for (let j = 0; j < matrixTrailLength; j++) {
            const yPos = (matrixDrops[i] - j) * matrixFontSize;
            if (yPos > -matrixFontSize && yPos < window.innerHeight) {
                ctx.fillStyle = j === 0 ? matrixHeadColor : matrixBodyColor; // First character is brighter
                ctx.globalAlpha = j === 0 ? 1.0 : Math.max(0.1, 1.0 - j * 0.1); // Fade effect
                ctx.shadowBlur = j === 0 ? 8 : 4;
                ctx.fillText(matrixColumnChars[i][j], i * matrixFontSize, yPos);
            }
        }

        // Reset column when it goes off screen
        if (matrixDrops[i] * matrixFontSize > window.innerHeight + 100 && Math.random() > 0.975) {
            matrixDrops[i] = 0;
            matrixColumnChars[i] = Array.from({ length: matrixTrailLength }, randomMatrixChar);
        }
        matrixDrops[i] += 0.1 + Math.random() * 0.05;
    }

    // Reset state so it does not leak into the next frame
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
}

Resize()
addEventListener("resize", () => Resize())
requestAnimationFrame(Tick)

function Tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    if (window._matrixEnabled) drawMatrix();
    requestAnimationFrame(Tick)
}

function Resize() {
    ctx.canvas.width = innerWidth
    ctx.canvas.height = innerHeight
    initMatrix();
}
