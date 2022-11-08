import { container } from 'tsyringe'
import { Router } from 'express'

import QueryOwnerCasesService from '@modules/case/services/QueryOwnerCasesService'
import QuerySupporterCasesService from '@modules/case/services/QuerySupporterCasesService copy'
import ArchiveCaseService from '@modules/case/services/ArchiveCaseService'
import FinishCaseService from '@modules/case/services/FinishCaseService'
import ReactivateCaseService from '@modules/case/services/ReactivateCaseService'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const casesRouter = Router()

casesRouter.get('/owner', ensureAuthenticated, async (request, response) => {
  const queryOwnerCasesService = container.resolve(QueryOwnerCasesService)
  const personID = request.user.id as string
  const cases = await queryOwnerCasesService.handle(personID)
  return response.json({ cases })
})

casesRouter.get('/supporter', ensureAuthenticated, async (request, response) => {
  const querySupporterCasesService = container.resolve(QuerySupporterCasesService)
  const personID = request.user.id as string
  const cases = await querySupporterCasesService.handle(personID)
  return response.json(cases)
})

casesRouter.patch('/archive/:caseID', ensureAuthenticated, async (request, response) => {
  const archiveCaseService = container.resolve(ArchiveCaseService)
  const caseID = request.params.caseID
  const ownerID = request.user.id as string
  const thisCase = await archiveCaseService.handle(ownerID, caseID)
  return response.json({ message: thisCase })
})

casesRouter.patch('/finish/:caseID', ensureAuthenticated, async (request, response) => {
  const finishCaseService = container.resolve(FinishCaseService)
  const caseID = request.params.caseID
  const personID = request.user.id as string
  const thisCase = await finishCaseService.handle(personID, caseID)
  return response.json({ message: thisCase })
})

casesRouter.patch('/reactivate/:caseID', ensureAuthenticated, async (request, response) => {
  const reactivateCaseService = container.resolve(ReactivateCaseService)
  const caseID = request.params.caseID
  const personID = request.user.id as string
  const thisCase = await reactivateCaseService.handle(personID, caseID)
  return response.json({ message: thisCase })
})

export { casesRouter }
