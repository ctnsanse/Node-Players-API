// npm init / npm run [script-name]

const express = require("express")

const players = require("./mock-players")

const app = express()
app.use(express.json())
const port = 3000

app.post("/api/create/players", async (req, res) => {
    const playerToCreate = req.body
    console.log(playerToCreate)

    // TODO Check if a player with the same name exists
    let playerExists = false
    for (let index = 0; index < players.length; index++) {
        if (players[index].name === playerToCreate.name) {
            playerExists = true
            break
        }
    }
    if (playerExists) {
        return res.status(409).json({ error: "Player already exists" })
    }

    // Set ID
    let lastId = 0
    for (let index = 0; index < players.length; index++) {
        if (players[index].id > lastId) {
            lastId = players[index].id
        }
    }
    playerToCreate.id = lastId + 1

    // Store player
    players.push(playerToCreate)
    res.status(201).json(playerToCreate)
})

app.get("/api/players", (req, res) => {
    return res.json(players)
})

app.get("/api/players/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const player = players.find(player => player.id === id)
    return res.json(player)
})

app.put("/api/players/:id", (req, res) => {
    const player = req.body
    const id = parseInt(req.params.id)
    // TODO Check if player with id exists
    // if not return status code 404 Not Found
    // Hint: return res.end()
    let playerExists = true
    for (let index = 0; index < players.length; index++) {
        if (players[index].id === players.id) {
            playerExists = false
            break
        }
    }
    if (playerExists) {
        return res.end(409).json({ error: "Player exists" })
    }
    return

    // TODO Modify the player name

    // TODO Return modified player
    res.send(` You have just modified ${player.name} !`)
})

app.delete("/api/players/:id", (req, res) => {
    // TODO Add coment and implementation
    res.send(" Vous venez de supprimer un pokémon dans votre pokédex !")
})

app.listen(port, () => console.log(`Our Node application is started on : http://localhost:${port}`))