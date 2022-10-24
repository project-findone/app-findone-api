import { inject, injectable } from 'tsyringe'
import { Supporter } from '@modules/supporters/infra/prisma/entites/Supporter'
import { ISupportersRepository } from '../repositories/ISupportersRepository'

import { AppError } from '@shared/error/AppError'

interface IRequest{
  state: string
  city: string
}

@injectable()
export class QueryCasesService {
  constructor (
    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository
  ) {}

  public async handle (request: IRequest): Promise<Supporter[] | undefined | {}> {
    const supporters = await this.supportersRepository.ranking(request.state, request.city)

    if (!supporters) {
      throw new AppError('Houve um erro ao consultar o Ranking.', 500)
    }

    return supporters
  }
}

export default QueryCasesService
