import { inject, injectable } from 'tsyringe'
import { Lost } from '@modules/losts/infra/prisma/entites/Lost'
import { ILostsRepository } from '../repositories/ILostsRepository'
import { IBecomeLostDTO } from '@modules/losts/dtos/IBecomeLostDTO'
import { ICreateCaseDTO } from '@modules/case/dtos/ICreateCaseDTO'

import { becomeLostValidationSchema } from '@modules/losts/infra/helpers/BecomeLostValidationSchema'
import { createCaseSchema } from '@modules/case/infra/helpers/CreateCaseValidationSchema'

import { AppError } from '@shared/error/AppError'

@injectable()
export class BecomeLostService {
  constructor (
    @inject('LostsRepository')
    private lostsRepository: ILostsRepository
  ) {}

  public async handle (lostData: IBecomeLostDTO, caseData: ICreateCaseDTO, personID: number, characteristics: number[]): Promise<Lost | undefined | {}> {
    if (lostData) {
      const { error } = becomeLostValidationSchema.validate(lostData)

      if (error !== undefined) {
        throw new AppError(`Alguns parâmetros referentes ao perdido estão ausentes' ${String(error)}`, 400)
      }
    }

    if (caseData) {
      const { error } = createCaseSchema.validate(caseData)

      if (error !== undefined) {
        throw new AppError(`Alguns parâmetros referentes ao caso estão ausentes' ${String(error)}`, 400)
      }
    }

    if (characteristics.length < 3) {
      throw new AppError('Coloque 3 caracteristicas no mínimo', 400)
    }

    const lost = await this.lostsRepository.becomeLost(lostData, caseData, personID, characteristics)

    if (!lost) {
      throw new AppError('Houve um erro ao se tornar um perdido.', 400)
    }
    return lost
  }
}

export default BecomeLostService
