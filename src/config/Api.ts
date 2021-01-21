import * as express from 'express'
import * as http from 'http'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as responseTime from 'response-time'
import { createConnection, Connection } from 'typeorm'

import routes from '../routes'
import errorHandler from '../middlewares/errorHandler'
import notFound from '../middlewares/notFound'

class Api {
  public app: express.Application
  public server: http.Server
  public databaseConnection: Promise<Connection>

  public constructor () {
    this.app = express()
    this.server = http.createServer(this.app)
    this.databaseConnection = createConnection()

    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cors())
    this.app.use(responseTime('dev'))

    this.app.use(routes)

    this.app.use(notFound)
    this.app.use(errorHandler)
  }
}

export default new Api()
