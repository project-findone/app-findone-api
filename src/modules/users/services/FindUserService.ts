import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '../repositories/IUsersRepository'
import { User } from '../infra/prisma/entities/User'

import { AppError } from '@shared/error/AppError'

@injectable()
export class FindUserService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async handle (userID: string): Promise<User | undefined | {}> {
    if (!userID) {
      throw new AppError('Alguns parâmetros estão ausentes', 400)
    }

    const { password, ...person } = await this.userRepository.findByID(userID) as User

    if (!person) {
      throw new AppError('Nenhuma pessoa foi encontrada.', 404)
    }

    return person
  }
}

export default FindUserService
