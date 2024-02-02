const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')

const url = 'https://rickandmortyapi.com/api/character/?name='

app.use(cors())

app.get('/characters/:name', async (req, res) => {
    const characterName = req.params.name
    try {
        const response = await axios.get(`${url}${characterName}`)
        const character = response.data.results
        
        if(character) {
            res.json(character)
        } else {
            res.status(404).json({mensaje: 'Personaje no encontrado'})
        }

     }
    catch (error) { res.status(500).json({ mansaje: 'Error al obtener el personaje' }) }
})

app.listen(4001, () => {
    console.log('Express está escuchando en el puerto http://localhost:4001/')
})