const express = require('express')
const cors = require('cors')
// const mysql = require('mysql2')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

app.set('port', 5000)

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('OK')
})

app.get('/test', async (req, res) => {
  const url = req.query.url
  const response = await axios.get(
    // 'https://www.digimart.net/cat01/shop1484/DS07695772/'
    'https://www.digimart.net/cat01/shop5356/DS07695782/'
  )
  const $ = cheerio.load(response.data)
  const priceElement = $('.itemDetailBlock .itemState .price')
  const imgElement = $('.mainPhotoBlock img')

  try {
    let price = $(priceElement[0]).text()
    const img = imgElement[0].attribs.src

    const regex = /\d+/
    price = regex.exec(price)
    const returnObj = {
      price: price[0],
      img: img,
    }

    return res.json(returnObj)
  } catch {
    return res.status(400).send('error')
  }
})

app.listen(app.get('port'), () => {
  console.log('Example app listening on port 5000!')
})
