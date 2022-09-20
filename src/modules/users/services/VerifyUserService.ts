import { inject, injectable } from 'tsyringe'

import { User } from '../infra/prisma/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { AppError } from '@shared/error/AppError'

interface IRequest{
  email: string | undefined | null
}

@injectable()
export class VerifyUserService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async handle (request: IRequest, isMiddlewareCall?: boolean): Promise<User | null> {
    const { email } = request

    if (!email) {
      throw new AppError('O e-mail não foi informado.', 400)
    }

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('O e-mail informado não existe.', 404)
    }

    if (isMiddlewareCall) {
      return user
    }

    if (user.verified) {
      throw new AppError('O e-mail já é verificado.', 403)
    }

    const userVerified = await this.userRepository.verifyEmail(email, true)

    return userVerified
  }
}
