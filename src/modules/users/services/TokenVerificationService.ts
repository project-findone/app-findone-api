import { sign } from 'jsonwebtoken'
import { encrypt } from 'crypto-js/aes'
import { inject, injectable } from 'tsyringe'

import AuthConfig from '@config/auth'
import { IMailProvider } from '@shared/container/providers/MailProvider/Models/IMailProvider'

interface IResponse {
  token: string
}

@injectable()
export class TokenVerificationService {
  constructor (
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider) {}

  public async handle (email: string): Promise<IResponse> {
    const { JWT, AES } = AuthConfig

    if (!email) {
      throw new Error(' Nenhum e-mail foi encontrado.')
    }

    const verifyCode = (Math.floor(Math.random() * 10000) + 1000).toString()

    if (!AES.Secret) {
      throw new Error('O AES Secret não foi encontrado.')
    }

    try {
      const data = {
        to: { email: JSON.stringify(email) },
        body: verifyCode
      }
      await this.mailProvider.sendMail(data)

      const codeEncrypted = encrypt(verifyCode, AES.Secret).toString()

      const token = sign({ codeEncrypted }, JWT.Secret, {
        subject: String(email),
        expiresIn: 120 // 2 minutes
      })

      return { token }
    } catch (e) {
      throw new Error(`Houve um erro ao criar o token de verificação.
        \n \n${e as string}`)
    }
  }
}
