import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error('O token de autenticação está ausente.')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, 'cecdf269f5769fdc23e96de1ef488e55')
    const { sub } = decoded

    request.user = {
      id: String(sub)
    }

    return next()
  } catch {
    throw new Error('O token informado não é válido.')
  }
}
