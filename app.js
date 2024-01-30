const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')

app.use(cors())



app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000/')
})