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

  public async handle (contributionID: string, score: number): Promise<EntityContribution | undefined | {}> {
    if (!contributionID || typeof contributionID !== 'string') {
      throw new AppError('Não foi possível acessar o ID da contribuição.', 500)
    }

    const contribution = await this.usersRepository.evaluateContribution(contributionID, score)

    if (!contribution) {
      throw new AppError('Não foi possível avaliar a contribuição.', 500)
    }

    return contribution
  }
}

export default EvaluateContributionService