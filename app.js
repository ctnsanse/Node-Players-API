// npm init / npm run [script-name]

const express = require("express")

let players = require("./mock-players")

const player = require("./mock-players")

const app = express()
app.use(express.json())
const port = 3000

app.post("/api/players", async (req, res) => {
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
    res.status(201).json({ data: playerToCreate })
})

app.get("/api/players", (req, res) => {
    return res.json({ data: players })
})

app.get("/api/players/:id", (req, res) => {
    const id = parseInt(req.params.id)
    console.debug("id", id)
    const player = players.find(player => player.id === id)
    console.debug("player", player)
    return res.json({ data: player })
})

app.put("/api/players/:id", async (req, res) => {
    const playerUpdate = req.body
    const playerId = parseInt(req.params.id)

    const parameters = ['name']
    for (const parameter of parameters) {
        if (!Object.keys(playerUpdate).includes(parameter))
            return res.status(400).json({ error: "Missing parameter " + parameter })
    }

    if (parameters.length !== Object.keys(playerUpdate)) {
        return res.status(400).json({ error: "Unexpected number of parameters" })
    }

    // Check if player with id exists
    // Hint: return res.end()
    let playerExists = false
    for (let index = 0; index < players.length; index++) {
        if (players[index].id === playerId) {
            playerExists = true

            // TODO Modify the player name
            players[index] = { ...players[index], ...playerUpdate }
            break
        }
    }

    // if not return status code 404 Not Found
    if (!playerExists) {
        return res.status(404).json({ error: `Player with ID ${playerId} does not exist` });
    }

    // TODO Return modified player
    res.json({ data: players.find(player => player.id === playerId) });
})


app.delete("/api/players/:id", async (req, res) => {
    const playerId = parseInt(req.params.id)

    const playerToDelete = players.find(player => player.id === playerId)
    console.debug("playerToDelete", playerToDelete)

    if (!playerToDelete) {
        return res.status(404).json({ error: "Player does not exist" })
    }

    //TODO delete a players
    players = players.filter(player => player.id !== playerId)
    console.debug("players", players)

    //TODO return deleted player id and status code
    res.status(204).end()
})

app.listen(port, () => console.log(`Our Node application is started on : http://localhost:${port}`))