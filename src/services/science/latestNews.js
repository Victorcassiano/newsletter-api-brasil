const cheerio = require('cheerio')
const axios = require('axios')

const tecmundoLatestNews = async (page) => {
    const url = page ? `https://www.tecmundo.com.br/ciencia?page=${page}` : 'https://www.tecmundo.com.br/ciencia'
    const response = await axios.get(url)
    const data = []
    const img = []
    const text = []
    const link = []
    const time = []
    const date = []

    const $ = cheerio.load(response.data)

    $('#js-main > div > div > div.z--col.z--w-2-3 > div.tec--list.tec--list--lg > div > article > figure > a > img').each((idx, element) => {
        const e = element.attribs['data-src']
        img.push(e.split('?')[0])
    })

    $('#js-main > div > div > div.z--col.z--w-2-3 > div.tec--list.tec--list--lg > div > article > div > h3 > a').each((idx, element) => {
        const e = $(element).text()
        text.push(e.trim())
    })

    $('#js-main > div > div > div.z--col.z--w-2-3 > div.tec--list.tec--list--lg > div > article > div > h3 > a').each((idx, element) => {
        const e = element.attribs['href']
        link.push(e)
    })

    $('#js-main > div > div > div.z--col.z--w-2-3 > div.tec--list.tec--list--lg > div > article > div > div > div.tec--timestamp__item.z--min-w-none > div').each((idx, element) => {
        const e = $(element).text()
        time.push(e)
    })

    $('#js-main > div > div > div.z--col.z--w-2-3 > div.tec--list.tec--list--lg > div > article > div > div > div.tec--timestamp__item.z--font-semibold').each((idx, element) => {
        const e = $(element).text()
        date.push(e)
    })


    img.forEach((item, i) => {
        data.push({
            img: img[i],
            title: text[i],
            link: link[i],
            time: time[i],
            date: date[i],
        })
    })

    return data;
}

module.exports = tecmundoLatestNews