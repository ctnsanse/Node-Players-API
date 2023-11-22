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
    const id = parseInt(req.params.id);
        // TODO Check if player with id exists
    // if not return status code 404 Not Found
    // Hint: return res.end()

    // Some pour vérifier si au moins un joueur dans le tableau "players" a le même ID que celui fourni dans la requête
    const playerExists = players.some(player => player.id === id);

    if (!playerExists) {
        return res.status(404).json({ error: "Player does not exist" });
    }

    // TODO Modify the player name

    // TODO Return modified player

    // Retourner une réponse réussie ou toute autre chose
    return res.status(200).json(` You have just modified ${players.name} !`)
})

app.delete("/api/players/:id", (req, res) => {
    // TODO Add coment and implementation
    res.send(" Vous venez de supprimer un pokémon dans votre pokédex !")
})

app.listen(port, () => console.log(`Our Node application is started on : http://localhost:${port}`))