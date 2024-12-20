const ctx = document.querySelector("canvas").getContext("2d")
const randBetween = (max, min) => Math.random() * (max - min + 1) + min
let objs = []

for (let i = 0; i < randBetween(20, 9); i++)
    objs.push({
        position: { x: randBetween(innerWidth - 250, 250), y: randBetween(innerHeight - 250, 250) },
        velocity: { x: randBetween(1, -1), y: randBetween(1, -1) },
        size: randBetween(7, 5)
    })

Resize()
addEventListener("resize", () => Resize())
requestAnimationFrame(Tick)

function Tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    ctx.fillStyle = ctx.strokeStyle = 'rgb(0, 50, 0, 0.5)'
    for (let i = 0; i < objs.length; i++) {
        if (objs[i].position.x - objs[i].size <= 0 || objs[i].position.x + objs[i].size >= innerWidth)
            objs[i].velocity.x = -objs[i].velocity.x 
        if (objs[i].position.y - objs[i].size <= 0 || objs[i].position.y + objs[i].size >= innerHeight) 
            objs[i].velocity.y = -objs[i].velocity.y
        objs[i].position.x += objs[i].velocity.x 
        objs[i].position.y += objs[i].velocity.y
        ctx.beginPath()
        ctx.moveTo(objs[i].position.x, objs[i].position.y)
        for (let ii = 0; ii < objs.length; ii++)
            i != ii && ctx.lineTo(objs[ii].position.x, objs[ii].position.y)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(objs[i].position.x, objs[i].position.y, objs[i].size, 0, Math.PI * 2)
        ctx.fill()
    }
    requestAnimationFrame(Tick)
}

function Resize() {
    ctx.canvas.width = innerWidth
    ctx.canvas.height = innerHeight
}