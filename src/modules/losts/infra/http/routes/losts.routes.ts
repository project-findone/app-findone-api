import { container } from 'tsyringe'
import { Router } from 'express'

import BecomeLostService from '@modules/losts/services/BecomeLostService'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const lostsRouter = Router()

lostsRouter.put('/', ensureAuthenticated, async (request, response) => {
  const becomeLostService = container.resolve(BecomeLostService)
  const personID = request.user.id as string
  const lost = await becomeLostService.handle(request.body, personID)
  return response.json({ lost })
})

export { lostsRouter }
