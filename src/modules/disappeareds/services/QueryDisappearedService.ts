import { Disappeared } from '../infra/prisma/entites/Disappeared'
import { IQueryDisappearedDTO } from '../dtos/IQueryDisappearedDTO'
import { IDisappearedRepository } from '../repositories/IDisappearedRepository'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/error/AppError'
import { ICasesRepository } from '@modules/case/repositories/ICasesRepository'
import { Case } from '@prisma/client'

@injectable()
class QueryDisappearedService {
  constructor (
    @inject('DisappearedRepository')
    private disappearedRepository: IDisappearedRepository,

    @inject('CasesRepository')
    private casesRepository: ICasesRepository
  ) {}

  public async handle (request: IQueryDisappearedDTO): Promise<Array<{disappeared: Disappeared, case: Case}>> {
    const disappeareds = await this.disappearedRepository.findDisappearedsByFilters(request)

    const cases = await this.casesRepository.findAllCases()

    if (!disappeareds || !cases || disappeareds.length === 0 || cases.length === 0) {
      throw new AppError('Não foi possivel encontrar casos de acordo com esses filtros.', 404)
    }

    const result = disappeareds.map((disappeared) => {
      let caseFound: Case | null = null

      cases.every((caseToCompare) => {
        if (caseToCompare.personID === disappeared.personID) {
          caseFound = caseToCompare
          return false
        }
        return true
      })
      if (!caseFound) throw new AppError('Houve um erro ao vincular um caso ao desaparecido.', 500)
      return { disappeared, case: caseFound }
    })

    return result
  }
}

export default QueryDisappearedService
