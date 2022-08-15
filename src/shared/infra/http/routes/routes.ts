import usersRouter from '@modules/users/infra/http/routes/users.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/user/', usersRouter)

export default routes
