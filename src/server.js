require('dotenv/config')
const express = require('express')
var cors = require('cors')
const tecmundoMostRead = require('./services/tecmundoMostRead');
const tecmundoLatestNews = require('./services/tecmundoLatestNews');
const app = express();

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT, () => {
    const date = new Date().toLocaleString("pt-BR", { timeZone: 'America/Sao_Paulo' })

    console.log(`Servidor online 🚀 ${date}`)
})

app.get('/news', async (response, request) => {
    const { page } = response.query

    const data = await tecmundoLatestNews(page)

    request.send({ data })
})

app.get('/mostread', async (response, request) => {
    const { page, type } = response.query

    // Tipos: null, semana, mes, sempre

    const data = await tecmundoMostRead(page, type)

    request.send({ data })
})
