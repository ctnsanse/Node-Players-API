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
    const playerUpdate = req.body
    // console.log(player)
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
    playerUpdate[playerExists].name = req.body.name

    // TODO Return modified player

    // Retourner une réponse réussie ou toute autre chose
    return (` You have just modified ${playerExists} !`)
})

app.delete("/api/players/:id", (req, res) => {
    // TODO Add coment and implementation
    const id = req.params.id * 1

    //TODO Check if player with id exists
    // if not return status code 404 Not Found
    const playerExists = players.some(player => player.id === id)

    if (!playerExists) {
        return res.status(404).json({ error: "Player does not exist" })
    }

    //TODO delete a players
    const playerToDelete = players.delete(playerExists)

    //TODO return deleted player id and status code
    res.status(200).json(` successfuly : Vous venez de supprimer ${players.name} de votre base de données !`)
})

app.listen(port, () => console.log(`Our Node application is started on : http://localhost:${port}`))



// app.put("/api/players/:id", (req, res) => {
//     const id = parseInt(req.params.id);

//     // Vérifier si un joueur avec l'ID existe
//     const playerToUpdate = players.find(player => player.id === id);

//     if (!playerToUpdate) {
//         return res.status(404).json({ error: "Player does not exist" });
//     }

//     // Modifier le nom du joueur avec le nouveau nom fourni dans le corps de la requête
//     playerToUpdate.name = req.body.name;

//     // Retourner le joueur modifié en tant que réponse
//     return res.status(200).json({ message: `You have just modified ${players.name}!`, player: playerToUpdate });
// })