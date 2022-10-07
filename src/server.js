require('dotenv/config')
const express = require('express')
const puppeteer = require('puppeteer')
var cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())


app.listen(process.env.PORT, () => {
    const date = new Date().toLocaleString("pt-BR", { timeZone: 'America/Sao_Paulo' })

    console.log(`Servidor online 🚀 ${date}`)
})

app.post('/news/:pages', async (response, request) => {
    const { pages } = response.params

    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.tecmundo.com.br/api/v1/materia/novidades/?page=${pages}&top=25`);

    const json = await page.evaluate(() => {
        const json = document.querySelector('body pre').innerHTML

        return JSON.parse(json);
    })


    await browser.close();

    return request.json(json.dados)
})
