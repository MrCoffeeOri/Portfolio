const messages = document.getElementById("messages")
const commands = {
    "!help": {
        func: () => {
            let textToShow = '$---features---$--Use ArrowUp and ArrowDown to navigate through the command history$--Enter to execute a line$--The character \\$ breaks a line$--Use the right mouse button to paste any text into the console$---commands---'
            const groups = [
                { title: 'General', cmds: ['!help','!clear','!info','!clearHistory','!myHistory','!date','!banner','!theme'] },
                { title: 'Hacker', cmds: ['!matrix','!pong','!interface'] },
                { title: 'Knowledge', cmds: ['!know','!repos','!fetch'] }
            ];
            for (const group of groups) {
                textToShow += `$--$---${group.title}---`;
                for (const cmd of group.cmds) {
                    if (commands[cmd]) textToShow += `$--${cmd} -> ${commands[cmd].desc}`;
                }
            }
            ShowMessages([textToShow], 1);
        },
        desc: "Shows all commands (grouped)"
    },
    "!clear": {
        func: () => {
            messages.innerHTML = ''
            AddNewInputRow()
        },
        desc: "Clear all the screen"
    },
    "!info": {
        func: () => ShowDataFromURL('https://api.github.com/users/MrCoffeeOri'),
        desc: "Shows my profile info"
    },
    "!clearHistory": {
        func: () => commandHistory = ["!clearHistory"],
        desc: "Clear command history"
    },
    "!fetch": {
        func: text => ShowDataFromURL(text.trim().slice(6).trim()),
        desc: "Fetches an URL"
    },
    "!know": {
        func: text => ShowMessages(["$$---Knowledges---$--C++ (Intermediate)$--C# (Advanced)$--HTML (Advanced)$--CSS (Advanced)$--SASS (Advanced)$--Javascript (Advanced)$--Unity (Advanced)$--React JS (Advanced)$--Node JS (Advanced)$--GIT (Advanced)"],1),
        desc: "Shows all my current knowledges"
    },
    "!repos": {
        func: () => {
            fetch("https://api.github.com/users/MrCoffeeOri/repos")
                .then(res => res.json())
                .then(data => ShowMessages([data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).reduce((acc, curr) => acc + `$---Name: ${curr.name}$---Description: ${curr.description || "No description"}$---License: ${curr.license?.name || "No license"}$---URL: ${curr.html_url}$---Fork: ${curr.fork}$---Open issues: ${curr.open_issues}$---Watchers: ${curr.watchers}$`, '')], 1))
        },
        desc: "Shows all my repos"
    },
    "!myHistory": {
        func: () => ShowMessages(["$$I started programming at about 13 years old, my first language was HTML and my first programming language was Javascript, I started with web development and then I learned a little bit about Unity, but now I'm interested in software development in C # and C ++ . Now I am studying and practicing a lot, I intend to work in the area of software engineering or web development."], 1),
        desc: "Shows my history"
    },
    // "!pong": {
    //     func: () => {
    //         // Remove any existing pong canvas and score
    //         const existingPong = document.getElementById('pong');
    //         if (existingPong) {
    //             existingPong.remove();
    //         }
    //         const existingScore = document.getElementById('score');
    //         if (existingScore) {
    //             existingScore.remove();
    //         }
            
    //         const canvas = document.createElement('canvas')
    //         canvas.width = 600
    //         canvas.height = 400
    //         canvas.id = "pong"
    //         canvas.style.position = "absolute"
    //         canvas.style.top = "50px"
    //         canvas.style.left = "50px"
    //         canvas.style.zIndex = "1000"
    //         document.body.append(canvas)
    //         const ctx = canvas.getContext('2d')

    //         const scoreDisplay = document.createElement('div')
    //         scoreDisplay.id = 'score'
    //         scoreDisplay.style.position = "absolute"
    //         scoreDisplay.style.top = "10px"
    //         scoreDisplay.style.left = "50px"
    //         scoreDisplay.style.zIndex = "1001"
    //         scoreDisplay.style.color = "white"
    //         scoreDisplay.style.fontSize = "24px"
    //         scoreDisplay.style.fontFamily = "'Inconsolata', monospace"
    //         document.body.appendChild(scoreDisplay)

    //         let paddleHeight = 10, paddleWidth = 75, paddleX = (canvas.width - paddleWidth) / 2
    //         let rightPressed = false, leftPressed = false
    //         let ballRadius = 10, x = canvas.width / 2, y = canvas.height - 30
    //         let dx = 2, dy = -2
    //         let score = 0

    //         document.addEventListener("keydown", keyDownHandler, false)
    //         document.addEventListener("keyup", keyUpHandler, false)

    //         function keyDownHandler(e) {
    //             if (e.key == "Right" || e.key == "ArrowRight") {
    //                 rightPressed = true
    //             } else if (e.key == "Left" || e.key == "ArrowLeft") {
    //                 leftPressed = true
    //             }
    //         }

    //         function keyUpHandler(e) {
    //             if (e.key == "Right" || e.key == "ArrowRight") {
    //                 rightPressed = false
    //             } else if (e.key == "Left" || e.key == "ArrowLeft") {
    //                 leftPressed = false
    //             }
    //         }

    //         function drawBall() {
    //             ctx.beginPath()
    //             ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    //             ctx.fillStyle = "#0095DD"
    //             ctx.fill()
    //             ctx.closePath()
    //         }

    //         function drawPaddle() {
    //             ctx.beginPath()
    //             ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    //             ctx.fillStyle = "#0095DD"
    //             ctx.fill()
    //             ctx.closePath()
    //         }

    //         function drawScore() {
    //             scoreDisplay.innerHTML = `Score: ${score}`
    //         }

    //         function collisionDetection() {
    //             if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    //                 dx = -dx
    //             }
    //             if (y + dy < ballRadius) {
    //                 dy = -dy
    //             } else if (y + dy > canvas.height - ballRadius) {
    //                 if (x > paddleX && x < paddleX + paddleWidth) {
    //                     dy = -dy
    //                     score++
    //                 } else {
    //                     window.removeEventListener("keydown", keyDownHandler)
    //                     window.removeEventListener("keyup", keyUpHandler)
    //                     document.body.removeChild(canvas)
    //                     document.body.removeChild(scoreDisplay)
    //                     ShowMessages([`Game Over! Your score was: ${score}`], 1)
    //                 }
    //             }
    //         }

    //         function movePaddle() {
    //             if (rightPressed && paddleX < canvas.width - paddleWidth) {
    //                 paddleX += 7
    //             } else if (leftPressed && paddleX > 0) {
    //                 paddleX -= 7
    //             }
    //         }

    //         function draw() {
    //             ctx.clearRect(0, 0, canvas.width, canvas.height)
    //             drawBall()
    //             drawPaddle()
    //             drawScore()
    //             collisionDetection()
    //             movePaddle()

    //             x += dx
    //             y += dy
    //             requestAnimationFrame(draw)
    //         }

    //         draw()
    //     },
    //     desc: "Play Pong game"
    // },
    "!interface": {
        func: () => window.location.href += "/interface.html",
        desc: "Shows the web interface"
    },
    "!matrix": {
        func: () => {
            matrixEnabled = !matrixEnabled;
            window.dispatchEvent(new CustomEvent('toggle-matrix', { detail: matrixEnabled }));
            ShowMessages([matrixEnabled ? 'Matrix rain enabled.' : 'Matrix rain disabled.'], 1);
        },
        desc: 'Toggle Matrix rain effect'
    },
    "!banner": {
        func: () => {
            if (bannerDiv) {
                bannerDiv.classList.remove('hide');
                setTimeout(() => bannerDiv.classList.add('hide'), 1800);
            }
        },
        desc: 'Show the hacker banner again'
    },
    "!theme": {
        func: () => {
            setTheme(currentTheme === 'green' ? 'amber' : 'green');
            ShowMessages([`Theme set to ${currentTheme}.`], 1);
        },
        desc: 'Toggle terminal color theme'
    },
    "!date": {
        func: () => {
            const now = new Date();
            const pad = n => n.toString().padStart(2, '0');
            const dateStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
            ShowMessages([`Current date/time: ${dateStr}`], 1);
        },
        desc: 'Show current date and time'
    }
}
let commandHistory = [], commandHistoryIndex = 0
let matrixEnabled = true;
let currentTheme = 'green';

const themeColors = {
    green: {
        '--terminal-color': '#00ff41',
        '--terminal-bg': 'rgb(19,19,19)'
    },
    amber: {
        '--terminal-color': '#ffbf00',
        '--terminal-bg': '#1a1400'
    }
};
function setTheme(theme) {
    currentTheme = theme;
    document.body.classList.remove('theme-green', 'theme-amber');
    document.body.classList.add('theme-' + theme);
    document.body.style.backgroundColor = themeColors[theme]['--terminal-bg'];
}
setTheme('green');

const bannerDiv = document.getElementById('hacker-banner');
const messagesDiv = document.getElementById('messages');
const canvasEl = document.querySelector('canvas');
if (bannerDiv) {
    const title = bannerDiv.querySelector('.hacker-title');
    const subtitle = bannerDiv.querySelector('.hacker-subtitle');
    if (title) title.innerText = 'RHT (Renan\'s Hacker Terminal)';
    if (subtitle) subtitle.innerText = 'Welcome to the Hacker Terminal!';
}

// Hide terminal until loading is done
if (messagesDiv) messagesDiv.classList.remove('visible');
if (canvasEl) canvasEl.classList.remove('visible');

// Prevent typing until loaded
let terminalReady = false;

const loadSteps = [
    'Initializing terminal... ',
    'Loading matrix background... ',
    'Fetching user profile... ',
    'Applying hacker theme... ',
    'Ready!'
];
const loadbar = document.querySelector('.hacker-loadbar-inner');
const loadstepsDiv = document.querySelector('.hacker-loadsteps');
if (loadbar && loadstepsDiv) {
    let step = 0;
    function nextStep() {
        if (step < loadSteps.length) {
            loadstepsDiv.innerText = loadSteps[step];
            loadbar.style.width = ((step + 1) / loadSteps.length * 100) + '%';
            step++;
            setTimeout(nextStep, step === loadSteps.length ? 500 : 700);
        } else {
            setTimeout(() => {
                if (bannerDiv) bannerDiv.classList.add('hide');
                if (messagesDiv) messagesDiv.classList.add('visible');
                if (canvasEl) canvasEl.classList.add('visible');
                terminalReady = true;
                ShowMessages([
                    "Hello 👋! My name is Renan Penha Marquette and i'm a developer 👨‍💻",
                    "Type !help to see all avaible commands and more"
                ], 20);
            }, 600);
        }
    }
    nextStep();
}

window.addEventListener("keydown", e => {
    if (!terminalReady) return;
    e.preventDefault()
    if (document.getElementById("typing") || 
        (e.key == "Backspace" && messages.lastElementChild.children[1].innerText.length == 0) || 
        (e.key.length > 1 && e.key != "Backspace" && e.key != "Enter" && !e.key.includes("Arrow"))) return
    if (e.key.includes("Arrow")) {
        if (commandHistory.length == 0) return
        if (commandHistoryIndex < commandHistory.length -1 && e.key == "ArrowUp")
            commandHistoryIndex++
        if (commandHistoryIndex > 0 && e.key == "ArrowDown")
            commandHistoryIndex--
        messages.lastElementChild.children[1].innerText = commandHistory[commandHistoryIndex]
        return 
    }
    if (e.key == "Enter") {
        const command = /\![^\!]\S+/g.exec(messages.lastElementChild.children[1].innerText)
        commandHistory.push(messages.lastElementChild.children[1].innerText)
        if (command && commands[command[0]]) {
            commands[command[0]].func(messages.lastElementChild.children[1].innerText)
            AddNewInputRow()
        } else {
            const promptSpan = messages.lastElementChild.children[0];
            promptSpan.classList.add('glitch');
            setTimeout(() => document.querySelector('.glitch').classList.remove('glitch'), 700);
            ShowMessages([`Invalid command: ${messages.lastElementChild.children[1].innerText}`], 1)
        }
        return
    }
    messages.lastElementChild.children[1].innerHTML = e.key == "Backspace" ? messages.lastElementChild.children[1].innerText.slice(0, -1) : messages.lastElementChild.children[1].innerHTML + (e.key == ' ' ? "&nbsp;" : e.key)
})

window.addEventListener("mousedown", async e => {
    if (messages.lastElementChild.id != "typing" && e.which == 3) messages.lastElementChild.children[1].innerHTML += await navigator.clipboard.readText()
})

function scrollMessagesToBottom() {
    const messages = document.getElementById('messages');
    if (messages) messages.scrollTop = messages.scrollHeight;
}

function ShowMessages(texts, timePerLetter) {
    let iLetter = 0, iMessage = 0
    !messages.lastElementChild || messages.lastElementChild.children[1].innerText.length > 0 && messages.lastElementChild.id != "typing" && AddNewInputRow()
    const interval = setInterval(() => {
        messages.lastElementChild.id = "typing"
        if (iLetter == texts[iMessage].length) {
            messages.lastElementChild.removeAttribute("id")
            iLetter = 0
            AddNewInputRow()
            scrollMessagesToBottom();
            if (iMessage == texts.length - 1) return clearInterval(interval)
            iMessage++
        }
        else {
            if (texts[iMessage][iLetter] == "$" && texts[iMessage][iLetter + 1] == "-") {
                messages.lastElementChild.children[1].innerHTML += '<br>'
                iLetter += 2
            } else if (texts[iMessage][iLetter] == "$" && texts[iMessage][iLetter + 1] == "$") {
                messages.lastElementChild.children[1].innerHTML += '<br><br>'
                iLetter += 2
            } else {
                messages.lastElementChild.children[1].innerHTML += texts[iMessage][iLetter]
                iLetter++
            }
            scrollMessagesToBottom();
        }
    }, timePerLetter)
}

function AddNewInputRow() {
    messages.lastElementChild?.children[2].remove()
    messages.innerHTML += `<div><span>C:\\Users\\MrCoffee></span><span></span><div id="col"></div></div>`
    scrollMessagesToBottom();
}

function ShowDataFromURL(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => ShowMessages(['$' + JSON.stringify(data).replace(/\,/g, ",$")], 0))
        .catch(reason => ShowMessages([reason.message], 0))
}

// Listen for matrix toggle
window.addEventListener('toggle-matrix', e => {
    if (typeof window.setMatrixEnabled === 'function') {
        window.setMatrixEnabled(e.detail);
    }
});