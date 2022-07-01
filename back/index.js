const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const axios = require('axios')
const cheerio = require('cheerio')
const schedule = require('node-schedule')
const dotenv = require('dotenv')
dotenv.config()

const dbconfig = {
  host: 'localhost',
  user: 'root',
  database: 'electric',
  password: '3456',
}

const connection = mysql.createConnection(dbconfig)

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

app.get('/exchange', (req, res) => {
  try {
    connection.query(
      'SELECT * FROM exchange ORDER BY createtime DESC LIMIT 1',
      function (err, result, field) {
        if (err) {
          return res.status(400).send(err)
        }

        res.json(result[0])
      }
    )
  } catch (error) {
    res.status(400).send(error)
  }
})

app.get('/test', async (req, res) => {
  const url = req.query.url
  const response = await axios.get(
    // 'https://www.digimart.net/cat01/shop1484/DS07695772/'
    url
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

const job = schedule.scheduleJob('10 11 * * 1-5', function () {
  const result = axios.get(
    'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON',
    {
      params: {
        authkey: process.env.EXCHANGE_API_KEY,
        data: 'AP01',
      },
    }
  )

  result
    .then((response) => {
      response.map((v, i) => {
        if (v.cur_unit === 'JPY(100)') {
          connection.query(
            'INSERT INTO exchange (type, rate) VALUES (?, ?)',
            [v.cur_unit, v.tts],
            function (err, result, fields) {
              if (err) {
                console.log(err)
              }
            }
          )
        }
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

app.listen(app.get('port'), () => {
  console.log('Example app listening on port 5000!')
})
