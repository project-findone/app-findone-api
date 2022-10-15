import { Disappeared } from '../infra/prisma/entites/Disappeared'
import { ICreateDisappearedDTO } from '../dtos/ICreateDisappearedDTO'
import { ICreateCaseDTO } from '@modules/case/dtos/ICreateCaseDTO'
import { IDisappearedRepository } from '../repositories/IDisappearedRepository'
import { inject, injectable } from 'tsyringe'

import { createDisappearedSchema } from '../infra/helpers/CreateDisappearedValidationSchema'
import { createCaseSchema } from '@modules/case/infra/helpers/CreateCaseValidationSchema'

import { AppError } from '@shared/error/AppError'

@injectable()
class CreateDisappearedService {
  constructor (
    @inject('DisappearedRepository')
    private disappearedRepository: IDisappearedRepository
  ) {}

  public async handle (disappearedData: ICreateDisappearedDTO, caseData: ICreateCaseDTO, ownerID: number, characteristics: number[], passCheck: boolean): Promise<Disappeared | Disappeared[] | undefined | {} | []> {
    if (disappearedData) {
      const { error } = createDisappearedSchema.validate(disappearedData)

      if (error !== undefined) {
        throw new AppError(`Alguns parâmetros referentes ao desaparecido estão ausentes' ${String(error)}`, 400)
      }
    }

    if (caseData) {
      const { error } = createCaseSchema.validate(caseData)

      if (error !== undefined) {
        throw new AppError(`Alguns parâmetros referentes ao caso estão ausentes' ${String(error)}`, 400)
      }
    }

    if (characteristics.length < 3 || characteristics.length > 4) {
      throw new AppError('Coloque 3 caracteristicas no mínimo e no máximo 4', 400)
    }

    if (!passCheck) {
      const disappeareds = await this.disappearedRepository.findSimilarDisappeareds(disappearedData, characteristics)
      if (disappeareds.length > 0) return disappeareds
    }

    const disappeared = await this.disappearedRepository.create(disappearedData, caseData, ownerID, characteristics)

    if (!disappeared) {
      throw new AppError('Houve um erro ao cadastrar o desaparecido.', 400)
    }

    return disappeared
  }
}

export default CreateDisappearedService
