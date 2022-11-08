import { injectable, inject } from 'tsyringe'

import { ICasesRepository } from '../repositories/ICasesRepository'

import { AppError } from '@shared/error/AppError'

@injectable()
export default class ArchiveCaseService {
  constructor (
    @inject('CasesRepository')
    private casesRepository: ICasesRepository) {}

  public async handle (personID: string, caseID: string): Promise<{}> {
    if (!personID || typeof personID !== 'string') {
      throw new AppError(' Não foi possível acessar o ID do usuário.', 500)
    }

    if (!caseID || typeof caseID !== 'string') {
      throw new AppError(' Não foi possível acessar o ID do caso.', 500)
    }

    const contributions = await this.casesRepository.archiveCase(personID, caseID)

    if (contributions.length > 0) {
      throw new AppError('Não foi possível realizar a arquivação do caso, porque há casos não avaliados.', 405)
    }

    return {}
  }
}
