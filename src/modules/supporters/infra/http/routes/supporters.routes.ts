import { container } from 'tsyringe'
import { Router } from 'express'

import multer from 'multer'
import uploadConfig from 'config/Upload'

import JoinCaseService from '@modules/supporters/services/JoinCaseService'
import SendContributionService from '@modules/supporters/services/SendContributionService'
import SendAttachmentService from '@modules/supporters/services/SendAttachmentService'
import QueryCasesService from '@modules/supporters/services/QueryCasesService'
import BecomeSupporterService from '@modules/supporters/services/BecomeSupporterService'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const uploadImage = multer(uploadConfig.multer.images)
const uploadDoc = multer(uploadConfig.multer.docs)

const supportersRouter = Router()

supportersRouter.put('/', /* ensureAuthenticated, */ async (request, response) => {
  const becomeSupporterService = container.resolve(BecomeSupporterService)
  const personID = Number(1 /* request.user.id */)
  const supporter = await becomeSupporterService.handle(request.body, personID)
  return response.json({ supporter })
})

supportersRouter.post('/:caseID', /* ensureAuthenticated, */ async (request, response) => {
  const joinCaseService = container.resolve(JoinCaseService)
  const caseID = Number(request.params.caseID)
  const personID = Number(4 /* request.user.id */)
  const supporter = await joinCaseService.handle(caseID, personID)
  return response.json({ message: supporter })
})

supportersRouter.post('/', /* ensureAuthenticated, */ async (request, response) => {
  const sendContributionService = container.resolve(SendContributionService)
  const personID = Number(1 /* request.user.id */)
  const contribution = await sendContributionService.handle(request.body, personID)
  return response.json({ contribution })
})

supportersRouter.post('/attachment/image/:contributionID', uploadImage.single('attachment'), async (request, response) => {
  if (request.file) {
    const sendAttachmentService = container.resolve(SendAttachmentService)
    const contributionID = Number(request.params.contributionID)
    const fileName = request.file?.filename
    const attachment = await sendAttachmentService.handle({ contributionID, fileName })
    return response.json({ attachment })
  }
  return response.json({ message: 'Não é um tipo de arquivo válido' })
})

supportersRouter.post('/attachment/file/:contributionID', uploadDoc.single('attachment'), async (request, response) => {
  if (request.file) {
    const sendAttachmentService = container.resolve(SendAttachmentService)
    const contributionID = Number(request.params.contributionID)
    const fileName = request.file?.filename
    const attachment = await sendAttachmentService.handle({ contributionID, fileName })
    return response.json({ attachment })
  }
  return response.json({ message: 'Não é um tipo de arquivo válido' })
})

supportersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const queryCasesService = container.resolve(QueryCasesService)
  const personID = Number(request.user.id)
  const cases = await queryCasesService.handle(personID)
  return response.json({ cases })
})

export { supportersRouter }
