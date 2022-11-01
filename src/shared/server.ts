import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import 'reflect-metadata'

import Routes from './infra/http/routes/routes'
import './container/index'
import { AppError } from './error/AppError'

const app = express()

app.use(cors())
app.use(express.json())
app.use(Routes)

app.use((
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction) => {
  if (error instanceof AppError) {
    console.error(error)
    return response.status(error.statusCode).json({
      status: error.status,
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'Default Error',
    message: 'Internal Server Error'
  })
})

app.listen(3333, () => {
  console.log('Server running at port: 3333')
})
