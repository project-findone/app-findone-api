import { User } from '@modules/users/infra/prisma/entities/User'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import AuthConfig from '@config/auth'
import { AppError } from '@shared/error/AppError'

import { middleArchiveService } from '@modules/case/services/MiddleArchiveService'

interface IRequest{
  email?: string
  personCPF?: string
  password: string
}

interface IResponse {
  userResponse: User | {}
  token: string
}

@injectable()
export class AuthenticateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {}

  public async handle (request: IRequest): Promise<IResponse | null> {
    const { email, personCPF, password } = request
    const { JWT } = AuthConfig

    if ((!email && !personCPF) || !password) throw new AppError('Alguns parâmetros estão ausentes', 400)

    const user = email ? await this.usersRepository.findByEmail(email) : await this.usersRepository.findByCPF(String(personCPF as string))

    if (!user) {
      throw new AppError('O e-mail ou CPF informado não existe.', 404)
    }

    if (user.disabled) throw new AppError('Este perfil está desativado, reative-o para que possa acessá-lo novamente.', 403)

    const passMatched = await compare(String(password), user.password)

    if (!passMatched) {
      throw new AppError('Os parâmetros email/senha não coincidem.', 401)
    }

    try {
      const token = sign({}, JWT.Secret, {
        subject: user.personID,
        expiresIn: '1d'
      })

      const { password: _, ...userResponse } = user

      await this.usersRepository.login(user.personID)
      await middleArchiveService.handle(user.personID, 'stop')

      return {
        userResponse,
        token
      }
    } catch (err) {
      if (err instanceof AppError) throw new AppError(err.message, err.statusCode)
      throw new AppError('O JWTSecret não foi encontrado.', 503)
    }
  }
}
