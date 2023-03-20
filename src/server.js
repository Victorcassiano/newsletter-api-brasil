require('dotenv/config')
const express = require('express')
var cors = require('cors')
const main = require('./services/main');
const software = require('./services/software');
const security = require('./services/security');
const internet = require('./services/internet');
const mobileDevices = require('./services/mobile-devices');
const product = require('./services/product');
const science = require('./services/science');
const games = require('./services/games');
const series = require('./services/series');
const app = express();

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT_SERVER_NEWSLETTER_API, () => {
    const date = new Date().toLocaleString("pt-BR", { timeZone: 'America/Sao_Paulo' })

    console.log(`Servidor online 🚀 ${date}`)
})

app.get('/main/news', async (response, request) => {
    const { page } = response.query

    const data = await main.latestNews(page)

    request.send({ data })
})

app.get('/main/mostread', async (response, request) => {
    const { page, old, type } = response.query

    // Old: null, semana, mes, sempre

    const data = await main.mostRead(page, old)

    request.send({ data })
})

app.get('/software/news', async (response, request) => {
    const { page } = response.query

    const data = await software.latestNews(page)

    request.send({ data })
})

app.get('/security/news', async (response, request) => {
    const { page } = response.query

    const data = await security.latestNews(page)

    request.send({ data })
})

app.get('/internet/news', async (response, request) => {
    const { page } = response.query

    const data = await internet.latestNews(page)

    request.send({ data })
})

app.get('/mobile-devices/news', async (response, request) => {
    const { page } = response.query

    const data = await mobileDevices.latestNews(page)

    request.send({ data })
})

app.get('/product/news', async (response, request) => {
    const { page } = response.query

    const data = await product.latestNews(page)

    request.send({ data })
})

app.get('/science/news', async (response, request) => {
    const { page } = response.query

    const data = await science.latestNews(page)

    request.send({ data })
})

app.get('/games/news', async (response, request) => {
    const { page } = response.query

    const data = await games.latestNews(page)

    request.send({ data })
})

app.get('/series/news', async (response, request) => {
    const { page } = response.query

    const data = await series.latestNews(page)

    request.send({ data })
})
