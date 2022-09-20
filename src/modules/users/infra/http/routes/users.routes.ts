import { container } from 'tsyringe'
import { Router } from 'express'

import multer from 'multer'
import uploadConfig from 'config/Upload'

import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserService from '@modules/users/services/UpdateUserService'
import DeleteUserService from '@modules/users/services/DeleteUserService'
import UpdateUserImageService from '@modules/users/services/UpdateUserImageService'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const upload = multer(uploadConfig.multer)

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  const createUserService = container.resolve(CreateUserService)
  const { birthDate } = request.body
  request.body.birthDate = new Date(birthDate)
  const user = await createUserService.handle(request.body)
  return response.json({ user })
})

usersRouter.put('/', ensureAuthenticated, async (request, response) => {
  const updateUserService = container.resolve(UpdateUserService)
  const personID = Number(request.user.id)
  const user = await updateUserService.handle(request.body, personID)
  return response.json({ user })
})

usersRouter.patch('/', ensureAuthenticated, upload.single('image'), async (request, response) => {
  if (request.file) {
    const updateUserImageService = container.resolve(UpdateUserImageService)
    const personID = Number(request.user.id)
    const fileName = request.file?.filename
    const user = await updateUserImageService.handle({ personID, fileName })
    return response.json({ message: user })
  }
  return response.json({ message: 'Não é um tipo de arquivo válido' })
})

usersRouter.delete('/', ensureAuthenticated, async (request, response) => {
  const deleteUserService = container.resolve(DeleteUserService)
  const personID = Number(request.user.id)
  const user = await deleteUserService.handle(personID)
  return response.json({ message: user })
})

export { usersRouter }
