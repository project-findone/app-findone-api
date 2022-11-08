import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '../repositories/IUsersRepository'
import { User } from '../infra/prisma/entities/User'

import { AppError } from '@shared/error/AppError'

interface IRequest{
  state: string
  city: string
}

@injectable()
export class QueryCasesService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async handle (request: IRequest): Promise<User[] | undefined | {}> {
    const supporters = await this.userRepository.ranking(request.state, request.city)

    if (!supporters) {
      throw new AppError('Houve um erro ao consultar o Ranking.', 500)
    }

    return supporters
  }
}

export default QueryCasesService
