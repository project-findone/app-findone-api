import { Router } from 'express'
import { container } from 'tsyringe'

import { TokenVerificationService } from '@modules/users/services/TokenVerificationService'
import { VerifyCode } from '../middlewares/VerifyCode'
import { ResetPassService } from '@modules/users/services/ResetPassService'

const recoveryPassRouter = Router()

recoveryPassRouter.post('/generate-code', async (request, response) => {
  const tokenVerificationService = container.resolve(TokenVerificationService)
  const token = await tokenVerificationService.handle(request.body)
  return response.json(token)
})

recoveryPassRouter.post('/reset-pass', VerifyCode, async (request, response) => {
  const resetPassService = container.resolve(ResetPassService)
  const data = {
    email: request.user.email as string,
    newPassword: request.body.newPassword as string
  }
  const user = await resetPassService.handle(data)
  return response.json({ user })
})

export { recoveryPassRouter }
