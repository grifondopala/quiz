import express, { Request, Response } from 'express';

import io from './socket'

const SERVER_PORT = 5000
const SOCKET_PORT = 4000

const app = express()
const cors = require('cors')
const routes = require('./routes/index')
const bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use('/api', routes)

app.listen(SERVER_PORT, () => {
  console.log(`Сервер запущен на порте ${SERVER_PORT}`)
})

io.listen(SOCKET_PORT)

require('./db/init-tables').initTables();