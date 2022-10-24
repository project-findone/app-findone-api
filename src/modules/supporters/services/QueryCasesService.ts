import { inject, injectable } from 'tsyringe'
import { CaseEntity } from '@modules/case/infra/prisma/entites/Case'
import { ISupportersRepository } from '../repositories/ISupportersRepository'

import { AppError } from '@shared/error/AppError'

@injectable()
export class QueryCasesService {
  constructor (
    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository
  ) {}

  public async handle (personID: number): Promise<CaseEntity[] | undefined | {}> {
    if (!personID) {
      throw new AppError('Alguns parâmetros estão ausentes', 400)
    }

    const cases = await this.supportersRepository.queryCases(personID)

    if (!cases) {
      throw new AppError('Houve um erro ao consultar os casos.', 500)
    }

    return cases
  }
}

export default QueryCasesService
