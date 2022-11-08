import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '../repositories/IUsersRepository'
import { EntityContribution } from '../infra/prisma/entities/Contribution'
import { ICreateContributionDTO } from '../dtos/ICreateContributionDTO'

import { AppError } from '@shared/error/AppError'

import { createContributionSchema } from '@modules/supporters/infra/helpers/CreateContributionValidationSchema'
import { JoiValidationError } from '@shared/error/ValidationError'

@injectable()
export class SendContributionService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async handle (request: ICreateContributionDTO, supporterID: string): Promise<EntityContribution> {
    const { error } = createContributionSchema.validate(request)

    if (error !== undefined) {
      throw new JoiValidationError(error)
    }

    const contribution = await this.userRepository.sendContribution(request, supporterID)

    if (!contribution) {
      throw new AppError('Não foi possivel enviar a contribuição.', 500)
    }

    return contribution
  }
}

export default SendContributionService
