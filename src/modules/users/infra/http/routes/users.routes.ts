import CreateUserService from '@modules/users/services/CreateUserService'
import { container } from 'tsyringe'
import { Router } from 'express'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  const createUserService = container.resolve(CreateUserService)
  console.log(request.body)
  const user = await createUserService.handle(request.body)
  return response.json({ message: user })
})

export { usersRouter }
