import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import AuthConfig from '@config/auth'

import { AppError } from '@shared/error/AppError'

export const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers.authorization
  const { JWT } = AuthConfig

  if (!authHeader) {
    throw new AppError('O token de autenticação está ausente.', 400)
  }

  if (!JWT.Secret) {
    throw new AppError('O JWT Secret não foi encontrado.', 503)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, JWT.Secret)
    const { sub } = decoded

    request.user = {
      id: String(sub)
    }

    return next()
  } catch {
    throw new AppError('O token informado não é válido ou já expirou.', 401)
  }
}
