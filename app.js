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

app.put("/api/players/:id", async (req, res) => {
    const playerUpdate = req.body
    const playerId = parseInt(req.params.id)

    // Vérifier si le joueur avec l'ID existe
    let playerExists = false
    for (let index = 0; index < players.length; index++) {
        if (players[index].id === playerId) {
            playerExists = true

            // Modifier le nom du joueur
            players[index].name = playerUpdate.name
            break
        }
    }

    if (!playerExists) {
        return res.status(404).json({ error: "Player does not exist" });
    }

    // Retourner le joueur modifié
    res.json({ message: `Player with ID ${playerId} has been updated`, player: players.find(player => player.id === playerId) });
})


app.delete("/api/players/:id", async (req, res) => {
    const playerId = req.params.id * 1
    const playerToDelete = players.find(player => player.id === playerId)
    const index = players.indexOf(playerToDelete)

    if (!playerToDelete) {
        return res.status(404).json({ error: "Player no exists" })
    }

    //TODO delete a players
    players.splice(index, 1)

    //TODO return deleted player id and status code
    res.status(200).json(` successfuly : Vous venez de supprimer ${playerId} de votre base de données !`)
})

app.listen(port, () => console.log(`Our Node application is started on : http://localhost:${port}`))