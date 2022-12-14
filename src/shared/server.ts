import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import 'reflect-metadata'

import Routes from './infra/http/routes/routes'
import './container/index'

const app = express()

app.use(cors())
app.use(express.json())
app.use(Routes)

app.listen(3333, () => {
  console.log('Server running at port: 3333')
})
