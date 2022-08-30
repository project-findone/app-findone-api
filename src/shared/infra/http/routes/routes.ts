import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import { usersRouter } from '@modules/users/infra/http/routes/users.routes'
import { verificatonsRouter } from '@modules/users/infra/http/routes/verifications.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/verifications', verificatonsRouter)

export default routes
