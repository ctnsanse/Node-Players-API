// npm init / npm run [script-name]

const express = require("express")
let players = require("./mock-player")
// const players = require("./mock-players")

const app = express()
const port = 3000

app.get("/", (req,res) => res.send("Hello, again Expres ! :)"))

app.get("/api/players/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const player = players.find(player => player.id === id)
    // return res.json(players)
    res.send(`You asked for the players ${player.name}`)
})

app.get("/api/players", (req,res) => {
    return res.json(players)
    res.send(`Il y a ${players.length} players(s) dans le centre de formation pour le moment.`)
})

// app.post("/api/create/player", (req, res) => 
// res.send(" You just created a new player his !")
// )

app.put("/api/modify/player/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const player = players.find(player => player.id == id)
res.send(` You have just modified ${player.name} !`)
})

// app.delete("/api/player/:id", (req, res) => 
// res.send(" Vous venez de supprimer un pokémon dans votre pokédex !")
// )

app.listen(port, () => console.log(`Our Node application is started on : http://localhost:${port}`))