import { EntityContribution } from '@modules/supporters/infra/prisma/entites/Contribution'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/error/AppError'

@injectable()
class EvaluateContributionService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async handle (personID: number, contributionID: number, score: number): Promise<EntityContribution | undefined | {}> {
    if (!contributionID || typeof contributionID !== 'number') {
      throw new AppError(' Não foi possível acessar o ID da contribuição.', 400)
    }

    const contribution = await this.usersRepository.evaluateContribution(personID, contributionID, score)

    if (!contribution) {
      throw new AppError('Não foi possível avaliar a contribuição.', 400)
    }

    return contribution
  }
}

export default EvaluateContributionService
