import { ISupportersRepository } from '../repositories/ISupportersRepository'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/error/AppError'

@injectable()
class JoinCaseService {
  constructor (
    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository
  ) {}

  public async handle (caseID: number, personID: number): Promise<{} | null> {
    if (!caseID || typeof caseID !== 'number') {
      throw new AppError(' Não foi possível acessar o ID do caso.', 400)
    }

    const supportCase = await this.supportersRepository.joinCase(caseID, personID)

    if (supportCase !== null) {
      return {}
    }

    throw new AppError('Não foi possível ingressar no caso.', 400)
  }
}

export default JoinCaseService
