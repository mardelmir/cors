const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')

let allCharacters = []

app.use(cors())

app.get('/characters', async (req, res) => {
    try {
        const characters = []
        let page = 1

        while (page < 43) {
            const url = `https://rickandmortyapi.com/api/character?page=${page}`
            const response = await axios.get(url)
            const results = response.data.results

            results.forEach(result => {
                const character = {
                    id: result.id,
                    name: result.name,
                    status: result.status,
                    species: result.species,
                    gender: result.gender,
                    origin: result.origin,
                    img: result.image
                }
                characters.push(character)
            })
            page++
        }

        allCharacters = characters
        res.json(allCharacters)
    }
    catch (error) {
        res.status(404).json({ error: 'Error al recoger los datos' })
    }
})

app.get('/characters/:name', (req, res) => {
    const name = req.params.name
    const pattern = name.replace(' ', '').toLowerCase()

    const found = allCharacters.filter(character => {
        const formattedName = character.name.replace(' ', '').toLowerCase()
        return formattedName.includes(pattern)
    })

    res.json(found)
    // found.length === 0 ? res.json(found) : res.status(404).json({ error: "Personaje no encontrado" })
})

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000/')
})