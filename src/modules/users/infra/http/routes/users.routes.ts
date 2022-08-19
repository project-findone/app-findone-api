import CreateUserService from '@modules/users/services/CreateUserService'
import { Router } from 'express'
import { CreateUserRepository } from '../../prisma/repositories/CreateUserRepository'

const usersRouter = Router()
const userRepository = new CreateUserRepository()
const createUserService = new CreateUserService(userRepository)

usersRouter.post('/', async (request, response) => {
  const user = await createUserService.handle(request.body)
  return response.json({ message: user })
})

export default usersRouter
