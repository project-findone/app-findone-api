import { inject, injectable } from 'tsyringe'
import { PersonEntity } from '@shared/infra/prisma/entities/Person'
import { IUsersRepository } from '../repositories/IUsersRepository'

import { AppError } from '@shared/error/AppError'

@injectable()
export class FindUserService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async handle (personID: number): Promise<PersonEntity | undefined | {}> {
    if (!personID) {
      throw new AppError('Alguns parâmetros estão ausentes', 400)
    }

    const person = await this.userRepository.findUserByID(personID)

    if (!person) {
      throw new AppError('Nenhuma pessoa foi encontrada.', 404)
    }

    return person
  }
}

export default FindUserService
