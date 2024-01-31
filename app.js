const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => res.redirect('/characters'))

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
        res.json(characters)
    }
    catch (error) {
        res.status(404).json({ error: 'Error al recoger los datos' })
    }
})


app.get('/characters/:name', async (req, res) => {
    const characterName = req.params.name

    try { }
    catch (error) {
        res.status(404).json({ error: "Personaje no encontrado" })
    }
})

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000/')
})