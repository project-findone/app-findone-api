import { inject, injectable } from 'tsyringe'
import { CaseEntity } from '@modules/case/infra/prisma/entites/Case'

import { AppError } from '@shared/error/AppError'
import { ICasesRepository } from '../repositories/ICasesRepository'

@injectable()
class QueryOwnerCasesService {
  constructor (
    @inject('CasesRepository')
    private caseRepository: ICasesRepository) {}

  public async handle (ownerID: string): Promise<CaseEntity[] | undefined | {}> {
    if (!ownerID) {
      throw new AppError('Alguns parâmetros estão ausentes', 400)
    }

    const cases = await this.caseRepository.queryOwnerCases(ownerID)

    if (!cases) {
      throw new AppError('Houve um erro ao consultar os casos.', 500)
    }

    return cases
  }
}

export default QueryOwnerCasesService
