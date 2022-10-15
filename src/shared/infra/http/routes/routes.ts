import { recoveryPassRouter } from '@modules/users/infra/http/routes/recoverypass.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import { usersRouter } from '@modules/users/infra/http/routes/users.routes'
import { disappearedRouter } from '@modules/disappeareds/infra/http/routes/disappeared.routes'
import { supportersRouter } from '@modules/supporters/infra/http/routes/supporters.routes'
import { lostsRouter } from '@modules/losts/infra/http/routes/losts.routes'
import { casesRouter } from '@modules/case/infra/http/routes/cases.routes'
import { verificatonsRouter } from '@modules/users/infra/http/routes/verifications.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/disappeared', disappearedRouter)
routes.use('/supporters', supportersRouter)
routes.use('/losts', lostsRouter)
routes.use('/cases', casesRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/verifications', verificatonsRouter)
routes.use('/forgot-pass', recoveryPassRouter)

export default routes
