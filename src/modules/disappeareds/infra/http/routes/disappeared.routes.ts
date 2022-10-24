import { container } from 'tsyringe'
import { Router } from 'express'

import CreateDisappearedService from '@modules/disappeareds/services/CreateDisappearedService'
import QueryDisappearedService from '@modules/disappeareds/services/QueryDisappearedService'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const disappearedRouter = Router()

disappearedRouter.post('/', ensureAuthenticated, async (request, response) => {
  const createDisappearedService = container.resolve(CreateDisappearedService)
  const { birthDate } = request.body
  request.body.birthDate = new Date(birthDate)
  const ownerID = Number(request.user.id)
  const disappeared = await createDisappearedService.handle(request.body, ownerID)
  return response.json({ disappeared })
})

disappearedRouter.get('/', async (request, response) => {
  const queryDisappearedService = container.resolve(QueryDisappearedService)
  const disappeareds = await queryDisappearedService.handle(request.body)
  return response.json({ disappeareds })
})

export { disappearedRouter }
