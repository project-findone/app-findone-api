import { inject, injectable } from 'tsyringe'
import { User } from '../infra/prisma/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'

interface IRequest{
  email: string | undefined | null
}

@injectable()
export class VerifyUserService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async handle (request: IRequest): Promise<User | null> {
    const { email } = request

    if (!email) {
      throw new Error('O e-mail não foi informado.')
    }

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('O e-mail informado não existe.')
    }

    if (user.verified) {
      throw new Error('O e-mail já é verificado.')
    }

    const userVerified = await this.userRepository.verifyEmail(email)

    return userVerified
  }
}
