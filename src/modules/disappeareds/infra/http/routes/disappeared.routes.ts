import { container } from 'tsyringe'
import { Router } from 'express'

// import multer from 'multer'
// import uploadConfig from 'config/Upload'

import CreateDisappearedService from '@modules/disappeareds/services/CreateDisappearedService'

// import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

// const upload = multer(uploadConfig)

const disappearedRouter = Router()

disappearedRouter.post('/', async (request, response) => {
  const createDisappearedService = container.resolve(CreateDisappearedService)
  const { birthDate } = request.body
  request.body.birthDate = new Date(birthDate)
  const disappeared = await createDisappearedService.handle(request.body)
  return response.json({ disappeared })
})

export { disappearedRouter }
