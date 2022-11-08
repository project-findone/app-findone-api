import { container } from 'tsyringe'
import { Router } from 'express'

import CreateDisappearedService from '@modules/disappeareds/services/CreateDisappearedService'
import QueryDisappearedService from '@modules/disappeareds/services/QueryDisappearedService'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const disappearedRouter = Router()

disappearedRouter.post('/', ensureAuthenticated, async (request, response) => {
  const createDisappearedService = container.resolve(CreateDisappearedService)
  const ownerID = request.user.id as string
  const disappeared = await createDisappearedService.handle(request.body, ownerID)
  return response.json(disappeared)
})

disappearedRouter.post('/find', async (request, response) => {
  const queryDisappearedService = container.resolve(QueryDisappearedService)
  const disappeareds = await queryDisappearedService.handle(request.body)
  return response.json(disappeareds)
})

export { disappearedRouter }
