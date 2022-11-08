import { sign } from 'jsonwebtoken'
import { encrypt } from 'crypto-js/aes'
import { inject, injectable } from 'tsyringe'

import AuthConfig from '@config/auth'
import { IMailProvider } from '@shared/container/providers/MailProvider/Models/IMailProvider'
import { AppError } from '@shared/error/AppError'

interface IRequest{
  email: string
}

interface IResponse {
  token: string
}

@injectable()
export class TokenVerificationService {
  constructor (
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider) {}

  public async handle (data: IRequest): Promise<IResponse> {
    const { JWT, AES } = AuthConfig

    const { email } = data

    if (!email) {
      throw new AppError('O e-mail não foi informado.', 400)
    }

    if (!AES.Secret) {
      throw new AppError('O AES Secret não foi encontrado.', 404)
    }

    const verifyCode = String(Math.random()).match(/\d{4}/)
    if (!verifyCode) throw new AppError('Ocorreu um erro ao gerar o código de verificação', 500)

    try {
      const data = {
        to: email,
        body: verifyCode[0]
      }
      await this.mailProvider.sendMail(data)

      const codeEncrypted = encrypt(verifyCode[0], AES.Secret)

      const token = sign({ codeEncrypted }, JWT.Secret, {
        subject: String(email),
        expiresIn: 120 // 2 minutes
      })

      return { token }
    } catch (err) {
      if (err instanceof AppError) throw new AppError(err.message, err.statusCode)
      throw new AppError('Houve um erro ao criar o token de verificação.', 500)
    }
  }
}
