import { verify } from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import { NextFunction, Request, Response } from 'express'

import AuthConfig from 'config/auth'

interface IDecodedPayload {
  iat: number | undefined
  exp: number | undefined
  sub: string
  codeEncrypted: string
}

export function VerifyCode (
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization
  const { JWT, AES } = AuthConfig
  const { code } = request.body

  if (!authHeader) {
    throw new Error('O token de verificação não foi informado.')
  }

  if (!code) {
    throw new Error('O código de verificação não foi informado.')
  }

  if (!JWT && !AES) {
    throw new Error('Há parâmetros ausentes para o método de criptografia.')
  }

  const [, token] = authHeader.split(' ')

  try {
    const jwtDecoded = verify(token, JWT.Secret)
    const { sub, codeEncrypted } = jwtDecoded as IDecodedPayload

    const codeDecoded = CryptoJS.AES.decrypt(codeEncrypted, AES.Secret).toString(CryptoJS.enc.Utf8)

    if (codeDecoded === code) {
      request.user = {
        email: sub
      }
      return next()
    }
    throw new Error('O código de verificação informado está incorreto.')
  } catch (e) {
    throw new Error(`Houve um erro ao comparar os códigos de verificação.
    \n \n${e as string}`)
  }
}
