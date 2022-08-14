import routes from './infra/http/routes/routes'

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
