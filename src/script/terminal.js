const messages = document.getElementById("messages")
const GITHUB_USER = 'MrCoffeeOri'
const PROMPT_TEXT = 'C:\\Users\\MrCoffee>'

// Fetches JSON and rejects on HTTP errors (e.g. GitHub's 403 rate limit)
function fetchJSON(url) {
    return fetch(url).then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} while fetching ${url}`)
        return res.json()
    })
}

/* ------------------------------------------------------------------ */
/* Translations (the language choice is shared with interface.html)    */
/* ------------------------------------------------------------------ */
const terminalTexts = {
    en: {
        'banner.title': "RHT (Renan's Hacker Terminal)",
        'banner.subtitle': 'Welcome to the Hacker Terminal!',
        'load.1': 'Initializing terminal...',
        'load.2': 'Loading matrix background...',
        'load.3': 'Fetching user profile...',
        'load.4': 'Applying hacker theme...',
        'load.5': 'Ready!',
        'welcome.1': "Hello 👋! My name is Renan Penha Marquette and I'm a developer 👨‍💻",
        'welcome.2': 'Type !help (or tap a command below) to see everything you can do',
        'help.features': '$-[ features ]$-· ArrowUp / ArrowDown navigate through the command history$-· Enter executes a line$-· Ctrl+V or the right mouse button pastes text$-· Tap the buttons below the terminal to run commands',
        'group.general': 'General',
        'group.hacker': 'Hacker',
        'group.knowledge': 'Knowledge',
        'desc.help': 'Shows all commands (grouped)',
        'desc.clear': 'Clears the screen',
        'desc.info': 'Shows my GitHub profile info',
        'desc.clearHistory': 'Clears the command history',
        'desc.fetch': 'Fetches a URL and prints the JSON',
        'desc.know': 'Shows what I know',
        'desc.repos': 'Shows all my repos',
        'desc.myHistory': 'Shows my story',
        'desc.interface': 'Opens the web interface',
        'desc.matrix': 'Toggles the Matrix rain effect',
        'desc.banner': 'Shows the hacker banner again',
        'desc.theme': 'Cycles the terminal color theme',
        'desc.lang': 'Switches between English and Portuguese',
        'desc.date': 'Shows the current date and time',
        'know': '$-[ knowledge ]$-· C++ (Intermediate)$-· C# (Advanced)$-· HTML (Advanced)$-· CSS (Advanced)$-· SASS (Advanced)$-· Javascript (Advanced)$-· Unity (Advanced)$-· React JS (Advanced)$-· Node JS (Advanced)$-· GIT (Advanced)',
        'myHistory': "$$I started programming at about 13 years old. My first language was HTML and my first programming language was JavaScript. I started with web development and then learned a bit of Unity, and now I'm interested in software development with C# and C++. I'm studying and practicing a lot, and I intend to work in software engineering or web development.",
        'repo.description': 'Description',
        'repo.license': 'License',
        'repo.fork': 'Fork',
        'repo.issues': 'Open issues',
        'repo.watchers': 'Watchers',
        'repo.noDescription': 'No description',
        'repo.noLicense': 'No license',
        'repo.error': 'Could not load repositories: {msg}',
        'fetch.usage': 'Usage: !fetch <url>',
        'matrix.on': 'Matrix rain enabled.',
        'matrix.off': 'Matrix rain disabled.',
        'theme.set': 'Theme set to {theme}.',
        'lang.set': 'Language set to English.',
        'date': 'Current date/time: {date}',
        'invalid': 'Invalid command: {cmd} (type !help)',
        'clipboard': 'Could not read the clipboard ({msg}). Try Ctrl+V instead.',
        'ui.theme': 'Change color theme',
        'ui.lang': 'Mudar para português',
        'ui.matrix': 'Toggle Matrix rain',
        'ui.web': 'Open the web interface',
        'ui.quick': 'Quick commands'
    },
    pt: {
        'banner.title': 'RHT (Renan\'s Hacker Terminal)',
        'banner.subtitle': 'Bem-vindo ao Terminal Hacker!',
        'load.1': 'Inicializando terminal...',
        'load.2': 'Carregando o fundo Matrix...',
        'load.3': 'Buscando perfil do usuário...',
        'load.4': 'Aplicando tema hacker...',
        'load.5': 'Pronto!',
        'welcome.1': 'Olá 👋! Meu nome é Renan Penha Marquette e eu sou desenvolvedor 👨‍💻',
        'welcome.2': 'Digite !help (ou toque em um comando abaixo) para ver tudo o que dá para fazer',
        'help.features': '$-[ recursos ]$-· Seta para cima / para baixo navega pelo histórico de comandos$-· Enter executa uma linha$-· Ctrl+V ou o botão direito do mouse cola texto$-· Toque nos botões abaixo do terminal para rodar comandos',
        'group.general': 'Geral',
        'group.hacker': 'Hacker',
        'group.knowledge': 'Conhecimento',
        'desc.help': 'Mostra todos os comandos (agrupados)',
        'desc.clear': 'Limpa a tela',
        'desc.info': 'Mostra as informações do meu perfil no GitHub',
        'desc.clearHistory': 'Limpa o histórico de comandos',
        'desc.fetch': 'Busca uma URL e imprime o JSON',
        'desc.know': 'Mostra o que eu sei',
        'desc.repos': 'Mostra todos os meus repositórios',
        'desc.myHistory': 'Conta a minha história',
        'desc.interface': 'Abre a interface web',
        'desc.matrix': 'Liga/desliga a chuva Matrix',
        'desc.banner': 'Mostra o banner hacker de novo',
        'desc.theme': 'Alterna o tema de cores do terminal',
        'desc.lang': 'Alterna entre inglês e português',
        'desc.date': 'Mostra a data e a hora atuais',
        'know': '$-[ conhecimentos ]$-· C++ (Intermediário)$-· C# (Avançado)$-· HTML (Avançado)$-· CSS (Avançado)$-· SASS (Avançado)$-· Javascript (Avançado)$-· Unity (Avançado)$-· React JS (Avançado)$-· Node JS (Avançado)$-· GIT (Avançado)',
        'myHistory': '$$Comecei a programar com uns 13 anos. Minha primeira linguagem foi HTML e minha primeira linguagem de programação foi JavaScript. Comecei com desenvolvimento web, depois aprendi um pouco de Unity, e hoje me interesso por desenvolvimento de software com C# e C++. Estou estudando e praticando bastante, e pretendo trabalhar com engenharia de software ou desenvolvimento web.',
        'repo.description': 'Descrição',
        'repo.license': 'Licença',
        'repo.fork': 'Fork',
        'repo.issues': 'Issues abertas',
        'repo.watchers': 'Observadores',
        'repo.noDescription': 'Sem descrição',
        'repo.noLicense': 'Sem licença',
        'repo.error': 'Não foi possível carregar os repositórios: {msg}',
        'fetch.usage': 'Uso: !fetch <url>',
        'matrix.on': 'Chuva Matrix ligada.',
        'matrix.off': 'Chuva Matrix desligada.',
        'theme.set': 'Tema alterado para {theme}.',
        'lang.set': 'Idioma alterado para português.',
        'date': 'Data/hora atual: {date}',
        'invalid': 'Comando inválido: {cmd} (digite !help)',
        'clipboard': 'Não foi possível ler a área de transferência ({msg}). Tente Ctrl+V.',
        'ui.theme': 'Mudar tema de cores',
        'ui.lang': 'Switch to English',
        'ui.matrix': 'Ligar/desligar chuva Matrix',
        'ui.web': 'Abrir a interface web',
        'ui.quick': 'Comandos rápidos'
    }
}

let currentLang = (() => {
    const saved = localStorage.getItem('lang')
    if (saved === 'en' || saved === 'pt') return saved
    return (navigator.language || 'en').toLowerCase().startsWith('pt') ? 'pt' : 'en'
})()

function t(key, vars = {}) {
    const text = terminalTexts[currentLang][key] ?? terminalTexts.en[key] ?? key
    return text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '')
}

const commands = {
    "!help": {
        func: () => {
            let textToShow = t('help.features')
            const groups = [
                { title: t('group.general'), cmds: ['!help','!clear','!info','!clearHistory','!myHistory','!date','!banner','!theme','!lang'] },
                { title: t('group.hacker'), cmds: ['!matrix','!interface'] },
                { title: t('group.knowledge'), cmds: ['!know','!repos','!fetch'] }
            ];
            for (const group of groups) {
                textToShow += `$$[ ${group.title.toLowerCase()} ]`;
                for (const cmd of group.cmds) {
                    if (commands[cmd]) textToShow += `$-${cmd.padEnd(15, '\u00a0')}${t(commands[cmd].desc)}`;
                }
            }
            ShowMessages([textToShow], 1);
        },
        desc: "desc.help"
    },
    "!clear": {
        // The Enter handler adds the fresh input row right after this runs
        func: () => messages.innerHTML = '',
        desc: "desc.clear"
    },
    "!info": {
        func: () => ShowDataFromURL(`https://api.github.com/users/${GITHUB_USER}`),
        desc: "desc.info"
    },
    "!clearHistory": {
        func: () => {
            commandHistory = []
            commandHistoryIndex = 0
        },
        desc: "desc.clearHistory"
    },
    "!fetch": {
        func: text => {
            const url = text.slice(text.indexOf("!fetch") + 6).trim()
            if (!url) return ShowMessages([t('fetch.usage')], 1)
            ShowDataFromURL(url)
        },
        desc: "desc.fetch"
    },
    "!know": {
        func: () => ShowMessages([t('know')], 1),
        desc: "desc.know"
    },
    "!repos": {
        func: () => {
            // per_page=100: the API returns only 30 repositories by default
            fetchJSON(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`)
                .then(data => ShowMessages([data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).reduce((acc, curr) => acc + `$-[ ${curr.name} ]$-· ${t('repo.description')}: ${curr.description || t('repo.noDescription')}$-· ${t('repo.license')}: ${curr.license?.name || t('repo.noLicense')}$-· URL: ${curr.html_url}$-· ${t('repo.fork')}: ${curr.fork}$-· ${t('repo.issues')}: ${curr.open_issues}$-· ${t('repo.watchers')}: ${curr.watchers}$-`, '')], 1))
                .catch(reason => ShowMessages([t('repo.error', { msg: reason.message })], 1))
        },
        desc: "desc.repos"
    },
    "!myHistory": {
        func: () => ShowMessages([t('myHistory')], 1),
        desc: "desc.myHistory"
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
        // Resolved relative to the current page, so it works with or without index.html, ?query or #hash
        func: () => window.location.href = new URL("interface.html", window.location.href).href,
        desc: "desc.interface"
    },
    "!matrix": {
        func: () => {
            setMatrix(!matrixEnabled);
            ShowMessages([matrixEnabled ? t('matrix.on') : t('matrix.off')], 1);
        },
        desc: 'desc.matrix'
    },
    "!banner": {
        func: () => {
            if (bannerDiv) {
                bannerDiv.classList.remove('hide');
                setTimeout(() => bannerDiv.classList.add('hide'), 1800);
            }
        },
        desc: 'desc.banner'
    },
    "!theme": {
        func: () => {
            cycleTheme();
            ShowMessages([t('theme.set', { theme: currentTheme })], 1);
        },
        desc: 'desc.theme'
    },
    "!lang": {
        func: () => {
            setLanguage(currentLang === 'en' ? 'pt' : 'en');
            ShowMessages([t('lang.set')], 1);
        },
        desc: 'desc.lang'
    },
    "!date": {
        func: () => {
            const dateStr = new Date().toLocaleString(currentLang === 'pt' ? 'pt-BR' : 'en-US');
            ShowMessages([t('date', { date: dateStr })], 1);
        },
        desc: 'desc.date'
    }
}
let commandHistory = [], commandHistoryIndex = 0
let matrixEnabled = localStorage.getItem('terminalMatrix') !== 'off';
let currentTheme = 'green';

// Each theme drives the CSS (--term-* variables on <body>) and the Matrix rain colors
const themeColors = {
    green: { color: '#00ff41', head: '#b6ff00', bg: '#0a0f0a' },
    amber: { color: '#ffbf00', head: '#fff2b3', bg: '#120d00' },
    cyan:  { color: '#00e5ff', head: '#d6fbff', bg: '#00101a' }
};
const themeOrder = Object.keys(themeColors);

function setTheme(theme) {
    if (!themeColors[theme]) theme = 'green';
    currentTheme = theme;
    const colors = themeColors[theme];
    document.body.classList.remove(...themeOrder.map(name => 'theme-' + name));
    document.body.classList.add('theme-' + theme);
    if (typeof window.setMatrixColors === 'function')
        window.setMatrixColors(colors.head, colors.color);
    localStorage.setItem('terminalTheme', theme);
    const label = document.getElementById('term-theme-label');
    if (label) label.textContent = theme;
}

function cycleTheme() {
    setTheme(themeOrder[(themeOrder.indexOf(currentTheme) + 1) % themeOrder.length]);
}

function setMatrix(enabled) {
    matrixEnabled = enabled;
    window.dispatchEvent(new CustomEvent('toggle-matrix', { detail: matrixEnabled }));
    localStorage.setItem('terminalMatrix', enabled ? 'on' : 'off');
    const btn = document.getElementById('term-matrix');
    if (btn) btn.setAttribute('aria-pressed', String(enabled));
}

// Static texts of the page (banner, toolbar tooltips) in the current language
function applyLanguage() {
    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    const set = (selector, text) => { const el = document.querySelector(selector); if (el) el.textContent = text; };
    set('.hacker-title', t('banner.title'));
    set('.hacker-subtitle', t('banner.subtitle'));
    set('#term-lang-label', currentLang.toUpperCase());
    document.querySelectorAll('[data-t-title]').forEach(el => {
        el.title = t(el.dataset.tTitle);
        el.setAttribute('aria-label', t(el.dataset.tTitle));
    });
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyLanguage();
}

setTheme(localStorage.getItem('terminalTheme'));
applyLanguage();

const bannerDiv = document.getElementById('hacker-banner');
const shellEl = document.querySelector('.term-shell');
const canvasEl = document.querySelector('canvas');

// Hide terminal until loading is done
if (shellEl) shellEl.classList.remove('visible');
if (canvasEl) canvasEl.classList.remove('visible');

// Prevent typing until loaded
let terminalReady = false;

const loadSteps = ['load.1', 'load.2', 'load.3', 'load.4', 'load.5'];
const loadbar = document.querySelector('.hacker-loadbar-inner');
const loadstepsDiv = document.querySelector('.hacker-loadsteps');
if (loadbar && loadstepsDiv) {
    let step = 0;
    function nextStep() {
        if (step < loadSteps.length) {
            loadstepsDiv.textContent = t(loadSteps[step]);
            loadbar.style.width = ((step + 1) / loadSteps.length * 100) + '%';
            step++;
            setTimeout(nextStep, step === loadSteps.length ? 500 : 700);
        } else {
            setTimeout(() => {
                if (bannerDiv) bannerDiv.classList.add('hide');
                if (shellEl) shellEl.classList.add('visible');
                if (canvasEl) canvasEl.classList.add('visible');
                setMatrix(matrixEnabled);
                terminalReady = true;
                ShowMessages([t('welcome.1'), t('welcome.2')], 20);
            }, 600);
        }
    }
    nextStep();
}

const currentInput = () => messages.lastElementChild.children[1]
const isHistoryKey = key => key == "ArrowUp" || key == "ArrowDown"

window.addEventListener("keydown", e => {
    if (!terminalReady) return
    // Leave browser shortcuts alone (F5, Ctrl+R, Ctrl+V -> paste event, ...)
    if (e.ctrlKey || e.metaKey || e.altKey) return
    if (e.key.length > 1 && e.key != "Backspace" && e.key != "Enter" && !isHistoryKey(e.key)) return
    e.preventDefault()
    if (document.getElementById("typing")) return
    const input = currentInput()

    if (isHistoryKey(e.key)) {
        if (commandHistory.length == 0) return
        // Index == history length means "the new, empty line" below the newest entry
        commandHistoryIndex = e.key == "ArrowUp"
            ? Math.max(0, commandHistoryIndex - 1)
            : Math.min(commandHistory.length, commandHistoryIndex + 1)
        input.textContent = commandHistory[commandHistoryIndex] ?? ""
        return
    }

    if (e.key == "Enter") return ExecuteCurrentLine()

    if (e.key == "Backspace") input.textContent = Array.from(input.textContent).slice(0, -1).join("")
    else input.textContent += e.key == " " ? " " : e.key
    scrollMessagesToBottom()
})

function ExecuteCurrentLine() {
    const input = currentInput()
    const line = input.textContent.replace(/ /g, " ").trim()
    if (!line) return
    if (commandHistory[commandHistory.length - 1] != line) commandHistory.push(line)
    commandHistoryIndex = commandHistory.length
    const command = /![^!\s]\S+/.exec(line)
    if (command && commands[command[0]]) {
        commands[command[0]].func(line)
        AddNewInputRow()
    } else {
        const promptSpan = input.previousElementSibling
        promptSpan.classList.add('glitch')
        setTimeout(() => promptSpan.classList.remove('glitch'), 700)
        ShowMessages([t('invalid', { cmd: line })], 1)
    }
}

// Quick-command chips: type the command into the prompt and run it (works on touch screens)
function RunCommand(command) {
    if (!terminalReady || document.getElementById("typing")) return
    currentInput().textContent = command
    ExecuteCurrentLine()
}

document.querySelectorAll('[data-command]').forEach(chip => {
    chip.addEventListener('click', () => {
        RunCommand(chip.dataset.command)
        chip.blur()
    })
})
document.getElementById('term-theme')?.addEventListener('click', e => { cycleTheme(); e.currentTarget.blur() })
document.getElementById('term-lang')?.addEventListener('click', e => { setLanguage(currentLang === 'en' ? 'pt' : 'en'); e.currentTarget.blur() })
document.getElementById('term-matrix')?.addEventListener('click', e => { setMatrix(!matrixEnabled); e.currentTarget.blur() })

// Text is always inserted as plain text, never parsed as HTML
function InsertTypedText(text) {
    if (!terminalReady || !text || document.getElementById("typing")) return
    currentInput().textContent += text.replace(/\s+/g, " ")
    scrollMessagesToBottom()
}

window.addEventListener("paste", e => {
    e.preventDefault()
    InsertTypedText(e.clipboardData.getData("text"))
})

// Right mouse button pastes into the terminal instead of opening the context menu
window.addEventListener("contextmenu", async e => {
    if (!terminalReady) return
    e.preventDefault()
    try {
        InsertTypedText(await navigator.clipboard.readText())
    } catch (err) {
        ShowMessages([t('clipboard', { msg: err.message })], 1)
    }
})

function scrollMessagesToBottom() {
    const messages = document.getElementById('messages');
    if (messages) messages.scrollTop = messages.scrollHeight;
}

// Outputs are queued so two async results (e.g. two fetches) never type into the same row
let outputQueue = Promise.resolve()
function ShowMessages(texts, timePerLetter) {
    outputQueue = outputQueue.then(() => TypeMessages(texts, timePerLetter))
    return outputQueue
}

// "$-" -> line break, "$$" -> blank line. Text is appended as text nodes, never as HTML.
function TypeMessages(texts, timePerLetter) {
    return new Promise(resolve => {
        const last = messages.lastElementChild
        if (!last || (last.children[1].textContent.length > 0 && last.id != "typing")) AddNewInputRow()
        // Array.from splits by code point, so emojis are not cut in half
        const queue = texts.map(text => Array.from(String(text)))
        // Browsers clamp intervals to ~4ms, so fast outputs type several letters per tick
        const lettersPerTick = timePerLetter <= 0 ? 40 : Math.max(1, Math.round(4 / timePerLetter))
        let iLetter = 0, iMessage = 0
        const interval = setInterval(() => {
            for (let n = 0; n < lettersPerTick; n++) {
                const row = messages.lastElementChild
                const text = queue[iMessage]
                row.id = "typing"
                if (iLetter >= text.length) {
                    row.removeAttribute("id")
                    iLetter = 0
                    AddNewInputRow()
                    if (iMessage == queue.length - 1) {
                        clearInterval(interval)
                        return resolve()
                    }
                    iMessage++
                    continue
                }
                const output = row.children[1]
                if (text[iLetter] == "$" && (text[iLetter + 1] == "-" || text[iLetter + 1] == "$")) {
                    output.append(document.createElement("br"))
                    if (text[iLetter + 1] == "$") output.append(document.createElement("br"))
                    iLetter += 2
                } else {
                    const lastNode = output.lastChild
                    if (lastNode && lastNode.nodeType == Node.TEXT_NODE) lastNode.appendData(text[iLetter])
                    else output.append(text[iLetter])
                    iLetter++
                }
            }
            scrollMessagesToBottom()
        }, Math.max(timePerLetter, 0))
    })
}

// Builds the row with DOM nodes instead of `innerHTML +=`, which re-parsed the whole terminal every line
function AddNewInputRow() {
    messages.querySelector("#col")?.remove()
    const row = document.createElement("div")
    const prompt = document.createElement("span")
    prompt.textContent = PROMPT_TEXT
    const input = document.createElement("span")
    const cursor = document.createElement("div")
    cursor.id = "col"
    row.append(prompt, input, cursor)
    messages.append(row)
    scrollMessagesToBottom()
}

function ShowDataFromURL(url) {
    fetchJSON(url)
        .then(data => ShowMessages(['$-' + JSON.stringify(data).replace(/,/g, ",$-")], 0))
        .catch(reason => ShowMessages([reason.message], 0))
}

// Listen for matrix toggle
window.addEventListener('toggle-matrix', e => {
    if (typeof window.setMatrixEnabled === 'function') {
        window.setMatrixEnabled(e.detail);
    }
});