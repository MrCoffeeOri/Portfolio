const messages = document.getElementById("messages")
const commands = {
    "!help": {
        func: () => {
            let textToShow = '$---features---$--Use ArrowUp and ArrowDown to navigate through the command history$--Enter to execute a line$--The character \\$ breaks a line$--Use the right mouse button to paste any text into the console$---commands---'
            for (const command in commands)
                if (Object.hasOwnProperty.call(commands, command))
                    textToShow += `$--${command} -> ${commands[command].desc}`
            ShowMessages([textToShow], 1)
        },
        desc: "Shows all commands"
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
                .then(data => ShowMessages([data.reduce((acc, curr) => acc + `$---Name: ${curr.name}$---Description: ${curr.description || "No description"}$---License: ${curr.license?.name || "No license"}$---URL: ${curr.html_url}$---Fork: ${curr.fork}$---Open issues: ${curr.open_issues}$---Watchers: ${curr.watchers}$`, '')], 1))
        },
        desc: "Shows all my repos"
    },
    "!myHistory": {
        func: () => ShowMessages(["$$I started programming at about 13 years old, my first language was HTML and my first programming language was Javascript, I started with web development and then I learned a little bit about Unity, but now I'm interested in software development in C # and C ++ . Now I am studying and practicing a lot, I intend to work in the area of software engineering or web development."], 1),
        desc: "Shows my history"
    }
}
let commandHistory = [], commandHistoryIndex = 0

ShowMessages([
    "Hello 👋! My name is Renan Penha Marquette and i'm a young developer 👨‍💻",
    "Type !help to see all avaible commands and more"
], 20)

window.addEventListener("keydown", e => {
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
        return command && commands[command[0]] ? commands[command[0]].func(messages.lastElementChild.children[1].innerText) && AddNewInputRow() : ShowMessages([`Invalid command: ${messages.lastElementChild.children[1].innerText}`], 1)
    }
    messages.lastElementChild.children[1].innerHTML = e.key == "Backspace" ? messages.lastElementChild.children[1].innerText.slice(0, -1) : messages.lastElementChild.children[1].innerHTML + (e.key == ' ' ? "&nbsp;" : e.key)
})

window.addEventListener("mousedown", async e => {
    if (messages.lastElementChild.id != "typing" && e.which == 3) messages.lastElementChild.children[1].innerHTML += await navigator.clipboard.readText()
})

function ShowMessages(texts, timePerLetter) {
    let iLetter = 0, iMessage = 0
    !messages.lastElementChild || messages.lastElementChild.children[1].innerText.length > 0 && messages.lastElementChild.id != "typing" && AddNewInputRow()
    const interval = setInterval(() => {
        messages.lastElementChild.id = "typing"
        if (iLetter == texts[iMessage].length) {
            messages.lastElementChild.removeAttribute("id")
            iLetter = 0
            AddNewInputRow()
            if (iMessage == texts.length - 1) return clearInterval(interval)
            iMessage++
        }
        messages.lastElementChild.children[1].innerHTML += texts[iMessage][iLetter] == '$' && texts[iMessage][iLetter - 1] != '\\' ? "<br/>" : texts[iMessage][iLetter].replace('\\', '')
        iLetter++
    }, timePerLetter)
}

function AddNewInputRow() {
    messages.lastElementChild?.children[2].remove()
    messages.innerHTML += `<div><span>C:\\Users\\MrCoffee></span><span></span><div id="col"></div></div>`
}

function ShowDataFromURL(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => ShowMessages(['$' + JSON.stringify(data).replace(/\,/g, ",$")], 0))
        .catch(reason => ShowMessages([reason.message], 0))
}