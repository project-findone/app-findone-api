import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService'
import { container } from 'tsyringe'
import { Router } from 'express'

import { ensureVerified } from '../middlewares/ensureVerified'

const sessionsRouter = Router()

sessionsRouter.post('/', ensureVerified, async (request, response) => {
  const authUserService = container.resolve(AuthenticateUserService)
  const user = await authUserService.handle(request.body)
  return response.json({ message: user })
})

export default sessionsRouter
