import { VerifyUserService } from '@modules/users/services/VerifyUserService'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import { User } from '../../prisma/entities/User'

export async function ensureVerified (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { email } = request.body

  if (!email) {
    throw new Error('O e-mail não foi informado.')
  }

  const verifyUserService = container.resolve(VerifyUserService)

  const user = await verifyUserService.handle({ email }, true) as User

  if (!user) {
    throw new Error('Ocorreu um erro ao verificar o usuário.')
  }

  const { verified } = user

  if (verified) {
    return next()
  } else {
    throw new Error('O usuário precisa ser verificado para realizar o login.')
  }
}
