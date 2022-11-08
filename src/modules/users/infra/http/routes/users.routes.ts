import { container } from 'tsyringe'
import { Router } from 'express'
import { AppError } from '@shared/error/AppError'

import multer from 'multer'
import uploadConfig from 'config/Upload'

import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserService from '@modules/users/services/UpdateUserService'
import DisableUserService from '@modules/users/services/DisableUserService'
import UpdateUserImageService from '@modules/users/services/UpdateUserImageService'
import EvaluateContributionService from '@modules/users/services/EvaluateContributionService'
import QuerySupportersService from '@modules/users/services/QuerySupportersService'
import FindUserService from '@modules/users/services/FindUserService'
import LogoutUserService from '@modules/users/services/LogoutUserService'
import JoinCaseService from '@modules/users/services/JoinCaseService'
import SendContributionService from '@modules/users/services/SendContributionService'
import SendAttachmentService from '@modules/users/services/SendAttachmentService'
import RankingSupportersService from '@modules/users/services/RankingSupportersService'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const uploadImage = multer(uploadConfig.multer.images)
const uploadDoc = multer(uploadConfig.multer.docs)

const usersRouter = Router()

usersRouter.post('/join/:caseID', ensureAuthenticated, async (request, response) => {
  const joinCaseService = container.resolve(JoinCaseService)
  const caseID = request.params.caseID
  const supporterID = request.user.id as string
  const supporter = await joinCaseService.handle(caseID, supporterID)
  return response.json({ message: supporter })
})

usersRouter.post('/contribution', ensureAuthenticated, async (request, response) => {
  const sendContributionService = container.resolve(SendContributionService)
  const supporterID = request.user.id as string
  const contribution = await sendContributionService.handle(request.body, supporterID)
  return response.json({ contribution })
})

usersRouter.post('/attachment/image/:contributionID', uploadImage.single('attachment'), async (request, response) => {
  if (request.file) {
    const sendAttachmentService = container.resolve(SendAttachmentService)
    const contributionID = request.params.contributionID
    const fileName = request.file?.filename
    const attachment = await sendAttachmentService.handle({ contributionID, fileName })
    return response.json({ attachment })
  }
  return response.json({ message: 'Não é um tipo de arquivo válido' })
})

usersRouter.post('/attachment/file/:contributionID', uploadDoc.single('attachment'), async (request, response) => {
  if (request.file) {
    const sendAttachmentService = container.resolve(SendAttachmentService)
    const contributionID = request.params.contributionID
    const fileName = request.file?.filename
    const attachment = await sendAttachmentService.handle({ contributionID, fileName })
    return response.json({ attachment })
  }
  return response.json({ message: 'Não é um tipo de arquivo válido' })
})

usersRouter.get('/ranking', async (request, response) => {
  const rankingSupportersService = container.resolve(RankingSupportersService)
  const filters = request.body
  const supporters = await rankingSupportersService.handle(filters)
  return response.json({ supporters })
})

usersRouter.post('/', async (request, response) => {
  const createUserService = container.resolve(CreateUserService)
  const user = await createUserService.handle(request.body)
  return response.json({ user })
})

usersRouter.put('/', ensureAuthenticated, async (request, response) => {
  const updateUserService = container.resolve(UpdateUserService)
  const userID = request.user.id as string
  const user = await updateUserService.handle(request.body, userID)
  return response.json({ user })
})

usersRouter.patch('/', ensureAuthenticated, uploadImage.single('image'), async (request, response) => {
  if (request.file) {
    const updateUserImageService = container.resolve(UpdateUserImageService)
    const userID = request.user.id as string
    const fileName = request.file?.filename
    const user = await updateUserImageService.handle({ userID, fileName })
    return response.json({ message: user })
  }
  throw new AppError('Não é um tipo de arquivo válido', 400)
})

usersRouter.patch('/disable', ensureAuthenticated, async (request, response) => {
  const disableUserService = container.resolve(DisableUserService)
  const userID = request.user.id as string
  await disableUserService.handle(userID)
  return response.json({ message: 'Sucess' })
})

usersRouter.patch('/envaluate/:contributionID', ensureAuthenticated, async (request, response) => {
  const evaluateContributionService = container.resolve(EvaluateContributionService)
  const contributionID = request.params.contributionID
  const contribution = await evaluateContributionService.handle(contributionID, request.body.score)
  return response.json(contribution)
})

usersRouter.get('/supporters/:caseID', async (request, response) => {
  const querySupportersService = container.resolve(QuerySupportersService)
  const caseID = request.params.caseID
  const supporters = await querySupportersService.handle(caseID)
  return response.json(supporters)
})

usersRouter.get('/:userID', async (request, response) => {
  const findUserService = container.resolve(FindUserService)
  const userID = request.params.userID
  const user = await findUserService.handle(userID)
  return response.json(user)
})

usersRouter.patch('/logout', ensureAuthenticated, async (request, response) => {
  const logoutUserService = container.resolve(LogoutUserService)
  const userID = request.user.id as string
  await logoutUserService.handle(userID)
  return response.json({ status: 'Sucess' })
})

export { usersRouter }
