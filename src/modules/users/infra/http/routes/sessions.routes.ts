import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService'
import { container } from 'tsyringe'
import { Router, Request, Response } from 'express'
import { ensureVerified } from '../middlewares/ensureVerified'

import { User } from '../../prisma/entities/User'

const sessionsRouter = Router()

sessionsRouter.post('/', ensureVerified, async (request: Request, response: Response) => {
  try {
    const authUserService = container.resolve(AuthenticateUserService)
    const user = await authUserService.handle(request.body)
    if (user) {
      const userResponse = user.userResponse as User
      Object.defineProperty(request.user, 'id', 1)
    }
    return response.json(user)
  } catch (e) {
    console.error(e)
  }
})

export default sessionsRouter
