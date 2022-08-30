import CreateUserService from '@modules/users/services/CreateUserService'
import { container } from 'tsyringe'
import { Router } from 'express'

import { TokenVerificationService } from '@modules/users/services/TokenVerificationService'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  const createUserService = container.resolve(CreateUserService)
  const user = await createUserService.handle(request.body)
  return response.json({ message: user })
})

usersRouter.post('/verify', async (request, response) => {
  const tokenVerificationService = container.resolve(TokenVerificationService)
  const token = await tokenVerificationService.handle(request.body)
  return response.json(token)
})

export default usersRouter
