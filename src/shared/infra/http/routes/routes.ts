import { recoveryPassRouter } from '@modules/users/infra/http/routes/recoverypass.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import { usersRouter } from '@modules/users/infra/http/routes/users.routes'
import { verificatonsRouter } from '@modules/users/infra/http/routes/verifications.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/verifications', verificatonsRouter)
routes.use('/forgot-pass', recoveryPassRouter)

export default routes
