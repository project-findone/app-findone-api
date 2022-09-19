import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import { asyncMiddleware } from 'middleware-async'

import { AppError } from '@shared/error/AppError'

import { VerifyUserService } from '@modules/users/services/VerifyUserService'
import { User } from '../../prisma/entities/User'

export const ensureVerified = asyncMiddleware(async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = request.body

  if (!email) {
    next(new AppError('O e-mail não foi informado.', 404))
  }

  const verifyUserService = container.resolve(VerifyUserService)

  const user = await verifyUserService.handle({ email }, true) as User

  if (!user) {
    next(new AppError('Ocorreu um erro ao verificar o usuário.', 400))
  }

  const { verified } = user

  if (verified) {
    return next()
  } else {
    throw new AppError('O usuário precisa ser verificado para realizar o login.', 401)
  }
})
