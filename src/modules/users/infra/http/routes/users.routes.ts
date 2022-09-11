import { container } from 'tsyringe'
import { Router } from 'express'

import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserService from '@modules/users/services/UpdateUserService'
import DeleteUserService from '@modules/users/services/DeleteUserService'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  const createUserService = container.resolve(CreateUserService)
  console.log(request.body)
  const user = await createUserService.handle(request.body)
  return response.json({ message: user })
})

usersRouter.put('/', ensureAuthenticated, async (request, response) => {
  const updateUserService = container.resolve(UpdateUserService)
  const personID = Number(request.user.id)
  const user = await updateUserService.handle(request.body, personID)
  return response.json({ message: user })
})

usersRouter.delete('/', ensureAuthenticated, async (request, response) => {
  const deleteUserService = container.resolve(DeleteUserService)
  const personID = Number(request.user.id)
  const user = await deleteUserService.handle(personID)
  return response.json({ message: user })
})

export { usersRouter }
