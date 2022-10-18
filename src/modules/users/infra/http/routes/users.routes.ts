import { container } from 'tsyringe'
import { Router } from 'express'

import multer from 'multer'
import uploadConfig from 'config/Upload'

import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserService from '@modules/users/services/UpdateUserService'
import DisableUserService from '@modules/users/services/DisableUserService'
import UpdateUserImageService from '@modules/users/services/UpdateUserImageService'
import EvaluateContributionService from '@modules/users/services/EvaluateContributionService'
import QueryCasesService from '@modules/users/services/QueryCasesService'
import QuerySupportersService from '@modules/users/services/QuerySupportersService'
import FindUserService from '@modules/users/services/FindUserService'
import LogoutUserService from '@modules/users/services/LogoutUserService'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const uploadImage = multer(uploadConfig.multer.images)

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

usersRouter.patch('/', ensureAuthenticated, uploadImage.single('image'), async (request, response) => {
  if (request.file) {
    const updateUserImageService = container.resolve(UpdateUserImageService)
    const personID = Number(request.user.id)
    const fileName = request.file?.filename
    const user = await updateUserImageService.handle({ personID, fileName })
    return response.json({ message: user })
  }
  return response.json({ message: 'Não é um tipo de arquivo válido' })
})

usersRouter.patch('/disable', /* ensureAuthenticated, */ async (request, response) => {
  const disableUserService = container.resolve(DisableUserService)
  const personID = Number(11 /* request.user.id */)
  const user = await disableUserService.handle(personID)
  return response.json({ message: user })
})

usersRouter.patch('/envaluate/:contributionID', /* ensureAuthenticated, */ async (request, response) => {
  const evaluateContributionService = container.resolve(EvaluateContributionService)
  const contributionID = Number(request.params.contributionID)
  const personID = Number(1 /* request.user.id */)
  const contribution = await evaluateContributionService.handle(personID, contributionID, request.body.score)
  return response.json({ contribution })
})

usersRouter.get('/cases', ensureAuthenticated, async (request, response) => {
  const queryCasesService = container.resolve(QueryCasesService)
  const personID = Number(request.user.id)
  const cases = await queryCasesService.handle(personID)
  return response.json({ cases })
})

usersRouter.get('/supporters/:caseID', async (request, response) => {
  const querySupportersService = container.resolve(QuerySupportersService)
  const caseID = Number(request.params.caseID)
  const supporters = await querySupportersService.handle(caseID)
  return response.json({ supporters })
})

usersRouter.get('/:personID', async (request, response) => {
  const findUserService = container.resolve(FindUserService)
  const personID = Number(request.params.personID)
  const user = await findUserService.handle(personID)
  return response.json({ user })
})

usersRouter.patch('/logout', ensureAuthenticated, async (request, response) => {
  const logoutUserService = container.resolve(LogoutUserService)
  const personID = Number(request.user.id)
  const user = await logoutUserService.handle(personID)
  return response.json({ message: user })
})

export { usersRouter }
