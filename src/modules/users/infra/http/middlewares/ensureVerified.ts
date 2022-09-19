import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

import { AppError } from '@shared/error/AppError'

import { VerifyUserService } from '@modules/users/services/VerifyUserService'
import { User } from '../../prisma/entities/User'

export async function ensureVerified (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email } = request.body

    if (!email) {
      next(new AppError('O e-mail não foi informado.', 404))
    }

    const verifyUserService = container.resolve(VerifyUserService)

    const user = await verifyUserService.handle({ email }, true) as User

    if (!user) {
      throw new AppError('Ocorreu um erro ao verificar o usuário.', 500)
    }

    const { verified } = user

    if (verified) {
      return next()
    } else {
      throw new AppError('O usuário precisa ser verificado para realizar o login.', 401)
    }
  } catch (error) {
    next(error)
  }
}
