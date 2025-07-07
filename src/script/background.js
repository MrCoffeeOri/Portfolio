const ctx = document.querySelector("canvas").getContext("2d")
const randBetween = (max, min) => Math.random() * (max - min + 1) + min
let objs = []

for (let i = 0; i < randBetween(20, 9); i++)
    objs.push({
        position: { x: randBetween(innerWidth - 250, 250), y: randBetween(innerHeight - 250, 250) },
        velocity: { x: randBetween(1, -1), y: randBetween(1, -1) },
        size: randBetween(7, 5)
    })

// Matrix Rain Effect
const matrixCanvas = ctx.canvas;
const matrixCtx = ctx;
const matrixFontSize = 24;
let matrixColumns = Math.floor(window.innerWidth / matrixFontSize * 2.5);
const matrixChars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*'.split('');
let matrixDrops = [];
let matrixColumnChars = [];

function initMatrix() {
    matrixColumns = Math.floor(window.innerWidth / matrixFontSize * 2.5);
    matrixDrops = [];
    matrixColumnChars = [];
    for (let x = 0; x < matrixColumns; x++) {
        matrixDrops[x] = Math.random() * window.innerHeight / matrixFontSize;
        // Initialize each column with 10 characters
        matrixColumnChars[x] = [];
        for (let i = 0; i < 10; i++) {
            matrixColumnChars[x].push(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
        }
    }
}

window.setMatrixEnabled = function(enabled) {
    window._matrixEnabled = enabled;
};
window._matrixEnabled = true;

function drawMatrix() {
    if (!window._matrixEnabled) return;
    matrixCtx.fillStyle = 'rgba(19,19,19,0.18)';
    matrixCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    matrixCtx.font = `bold ${matrixFontSize}px Inconsolata, monospace`;
    
    for (let i = 0; i < matrixDrops.length; i++) {
        for (let j = 0; j < 10; j++) {
            const yPos = (matrixDrops[i] - j) * matrixFontSize;
            if (yPos > -matrixFontSize && yPos < window.innerHeight) {
                const char = matrixColumnChars[i][j];
                matrixCtx.fillStyle = j === 0 ? '#b6ff00' : '#00ff41'; // First character is brighter
                matrixCtx.globalAlpha = j === 0 ? 1.0 : Math.max(0.1, 1.0 - j * 0.1); // Fade effect
                matrixCtx.shadowColor = '#00ff41';
                matrixCtx.shadowBlur = j === 0 ? 8 : 4;
                matrixCtx.fillText(char, i * matrixFontSize, yPos);
                matrixCtx.shadowBlur = 0;
            }
        }
        
        // Reset column when it goes off screen
        if (matrixDrops[i] * matrixFontSize > window.innerHeight + 100 && Math.random() > 0.975) {
            matrixDrops[i] = 0;
            // Generate new characters for this column
            for (let j = 0; j < 10; j++) {
                matrixColumnChars[i][j] = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            }
        }
        matrixDrops[i] += 0.1 + Math.random() * 0.05;
    }
}

Resize()
addEventListener("resize", () => Resize())
requestAnimationFrame(Tick)

function Tick() {
    if (window._matrixEnabled) {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        drawMatrix();
    } else
        ctx.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(Tick)
}

function Resize() {
    ctx.canvas.width = innerWidth
    ctx.canvas.height = innerHeight
    initMatrix();
}