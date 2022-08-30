import { sign } from 'jsonwebtoken'
import {} from 'crypto-js/aes'

import AuthConfig from '@config/auth'

interface IResponse {
  token: string
}

export class TokenVerificationService {
  public async handle (email: string): Promise<IResponse> {
    const { JWT } = AuthConfig
    const verifyCode = Math.floor(Math.random() * 10000) + 1000

    const token = sign({ verifyCode }, JWT.JWTSecret, {
      subject: email,
      expiresIn: '240s'
    })

    return { token }
  }
}
