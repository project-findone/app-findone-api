import { EntityContribution } from '../infra/prisma/entites/Contribution'
import { ICreateContributionDTO } from '../dtos/ICreateContributionDTO'
import { inject, injectable } from 'tsyringe'
import { ISupportersRepository } from '../repositories/ISupportersRepository'

import { AppError } from '@shared/error/AppError'

import { createContributionSchema } from '@modules/supporters/infra/helpers/CreateContributionValidationSchema'

@injectable()
export class SendContributionService {
  constructor (
    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository
  ) {}

  public async handle (request: ICreateContributionDTO, personID: number): Promise<EntityContribution> {
    const { error } = createContributionSchema.validate(request)

    if (error !== undefined) {
      throw new AppError(`Alguns parâmetros referentes ao caso estão ausentes' ${String(error)}`, 400)
    }

    const contribution = await this.supportersRepository.sendContribution(request, personID)

    if (!contribution) {
      throw new AppError('Não foi possivel enviar a contribuição.', 400)
    }

    return contribution
  }
}

export default SendContributionService
