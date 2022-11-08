import { inject, injectable } from 'tsyringe'

import { CaseEntity } from '@modules/case/infra/prisma/entites/Case'
import { ICasesRepository } from '../repositories/ICasesRepository'

import { AppError } from '@shared/error/AppError'

@injectable()
class QuerySupporterCasesService {
  constructor (
    @inject('CasesRepository')
    private caseRepository: ICasesRepository
  ) {}

  public async handle (supporterID: string): Promise<CaseEntity[] | undefined | {}> {
    if (!supporterID) {
      throw new AppError('Alguns parâmetros estão ausentes', 400)
    }

    const cases = await this.caseRepository.querySupporterCases(supporterID)

    if (!cases) {
      throw new AppError('Houve um erro ao consultar os casos.', 500)
    }

    return cases
  }
}

export default QuerySupporterCasesService
