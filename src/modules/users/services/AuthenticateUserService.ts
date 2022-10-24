import { User } from '@modules/users/infra/prisma/entities/User'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import AuthConfig from '@config/auth'
import { AppError } from '@shared/error/AppError'

import { middleArchiveService } from '@modules/case/services/MiddleArchiveService'

interface Request{
  email: string
  password: string
}

interface Response {
  userResponse: User | {}
  token: string
}

@injectable()
export class AuthenticateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {}

  public async handle (request: Request): Promise<Response | null> {
    const { email, password } = request
    const { JWT } = AuthConfig

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('O e-mail informado não existe.', 404)
    }

    const passMatched = await compare(password, user.password)

    if (!passMatched) {
      throw new AppError('Os parâmetros email/senha não coincidem.', 401)
    }

    try {
      const token = sign({}, JWT.Secret, {
        subject: String(user.personID),
        expiresIn: '1d'
      })

      const { password: _, ...userResponse } = user

      await this.usersRepository.login(user.personID)
      await middleArchiveService.handle(user.personID, 'stop')

      return {
        userResponse,
        token
      }
    } catch {
      throw new AppError('O JWTSecret não foi encontrado.', 503)
    }
  }
}
