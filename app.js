// npm init / npm run [script-name]

const express = require("express")

const players = require("./mock-players")

const player = require("./mock-players")

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
    const playerUpdate = req.body
    const id = parseInt(req.params.id);
    // TODO Check if player with id exists
    // if not return status code 404 Not Found
    // Hint: return res.end()

    // Some pour vérifier si au moins un joueur dans le tableau "players" a le même ID que celui fourni dans la requête
    let playerExists = false
    for (let index = 0; index < players.length; index++) {
        if (players[index].id === playerToCreate.id) {
            playerExists = true
            break
        }
    }
    if (!playerExists) {
        return res.status(404).json({ error: "Player does not exist" });
    }

    // TODO Modify the player name
    playerUpdate[playerExists].name = req.body.name

    // TODO Return modified player
    return (` You have just modified ${playerUpdate} !`)
})

app.delete("/api/players/:id", async (req, res) => {
    // TODO Add coment and implementation
    const playerToDelete = req.body
    console.log(playerToDelete)
    const id = req.params.id * 1

    // TODO Check if a player with the same name exists
    const playerExists = players.some(player => player.id === id)

    // "!" signifie que si l'instruction sera executée que si il y a false.
    if (!playerExists) {
        return res.status(409).json({ error: "Player no exists" })
    }

    //TODO delete a players
    delete players[id]

    //TODO return deleted player id and status code
    res.status(200).json(` successfuly : Vous venez de supprimer ${player.name} de votre base de données !`)
})

app.listen(port, () => console.log(`Our Node application is started on : http://localhost:${port}`))