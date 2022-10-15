import { injectable, inject } from 'tsyringe'

import { ICasesRepository } from '../repositories/ICasesRepository'

import { AppError } from '@shared/error/AppError'

@injectable()
export default class ReactivateCaseService {
  constructor (
    @inject('CasesRepository')
    private casesRepository: ICasesRepository) {}

  public async handle (personID: number, caseID: number): Promise<{}> {
    if (!personID || typeof personID !== 'number') {
      throw new AppError(' Não foi possível acessar o ID do usuário.', 400)
    }

    if (!caseID || typeof caseID !== 'number') {
      throw new AppError(' Não foi possível acessar o ID do caso.', 400)
    }

    const thisCase = await this.casesRepository.reactivateCase(personID, caseID)

    if (thisCase === null) {
      throw new AppError('Não foi possível realizar a reativação do caso.', 400)
    }

    return {}
  }
}
