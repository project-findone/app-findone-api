import { Router } from 'express'
import { container } from 'tsyringe'

import { TokenVerificationService } from '@modules/users/services/TokenVerificationService'
import { VerifyCode } from '../middlewares/VerifyCode'
import { VerifyUserService } from '@modules/users/services/VerifyUserService'

const verificatonsRouter = Router()

verificatonsRouter.post('/generate-code', async (request, response) => {
  const tokenVerificationService = container.resolve(TokenVerificationService)
  const token = await tokenVerificationService.handle(request.body)
  return response.json(token)
})

verificatonsRouter.post('/verify-user', VerifyCode, async (request, response) => {
  const verifyUserService = container.resolve(VerifyUserService)
  const email = request.user.email
  const userVerified = await verifyUserService.handle({ email })
  return response.json(userVerified)
})

export { verificatonsRouter }
