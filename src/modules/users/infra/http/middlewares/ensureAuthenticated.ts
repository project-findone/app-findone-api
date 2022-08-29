import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import AuthConfig from '@config/auth'

export function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization
  const { JWT } = AuthConfig

  if (!authHeader) {
    throw new Error('O token de autenticação está ausente.')
  }

  if (!JWT.JWTSecret) {
    throw new Error('O JWTSecret não foi encontrado.')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, JWT.JWTSecret)
    const { sub } = decoded

    request.user = {
      id: String(sub)
    }

    return next()
  } catch {
    throw new Error('O token informado não é válido.')
  }
}
