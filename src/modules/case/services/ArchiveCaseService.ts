import { injectable, inject } from 'tsyringe'

import { ICasesRepository } from '../repositories/ICasesRepository'

import { AppError } from '@shared/error/AppError'

@injectable()
export default class ArchiveCaseService {
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

    const contributions = await this.casesRepository.archiveCase(personID, caseID)

    if (contributions.length > 0) {
      throw new AppError('Não foi possível realizar a arquivação do caso, por conta da pressensa de contribuições com avaliações pendentes.', 400)
    }

    return {}
  }
}
