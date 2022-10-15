import { container } from 'tsyringe'
import { Router } from 'express'

import ArchiveCaseService from '@modules/case/services/ArchiveCaseService'
import FinishCaseService from '@modules/case/services/FinishCaseService'
import ReactivateCaseService from '@modules/case/services/ReactivateCaseService'

// import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const casesRouter = Router()

casesRouter.patch('/archive/:caseID', /* ensureAuthenticated, */ async (request, response) => {
  const archiveCaseService = container.resolve(ArchiveCaseService)
  const caseID = Number(request.params.caseID)
  const personID = Number(1 /* request.user.id */)
  const thisCase = await archiveCaseService.handle(personID, caseID)
  return response.json({ message: thisCase })
})

casesRouter.patch('/finish/:caseID', /* ensureAuthenticated, */ async (request, response) => {
  const finishCaseService = container.resolve(FinishCaseService)
  const caseID = Number(request.params.caseID)
  const personID = Number(1 /* request.user.id */)
  const thisCase = await finishCaseService.handle(personID, caseID)
  return response.json({ message: thisCase })
})

casesRouter.patch('/reactivate/:caseID', /* ensureAuthenticated, */ async (request, response) => {
  const reactivateCaseService = container.resolve(ReactivateCaseService)
  const caseID = Number(request.params.caseID)
  const personID = Number(1 /* request.user.id */)
  const thisCase = await reactivateCaseService.handle(personID, caseID)
  return response.json({ message: thisCase })
})

export { casesRouter }
