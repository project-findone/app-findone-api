import { inject, injectable } from 'tsyringe'
import { Lost } from '@modules/losts/infra/prisma/entites/Lost'
import { ILostsRepository } from '../repositories/ILostsRepository'
import { IBecomeLostDTO } from '@modules/losts/dtos/IBecomeLostDTO'

import { becomeLostValidationSchema } from '@modules/losts/infra/helpers/BecomeLostValidationSchema'
import { createCaseSchema } from '@modules/disappeareds/infra/helpers/CreateDisappearedValidationSchema'

import { AppError } from '@shared/error/AppError'
import { JoiValidationError } from '@shared/error/ValidationError'
import { birthDateFormat } from '@shared/helpers/BirthDateFormat'

@injectable()
export class BecomeLostService {
  constructor (
    @inject('LostsRepository')
    private lostsRepository: ILostsRepository
  ) {}

  public async handle (request: IBecomeLostDTO, personID: string): Promise<Lost | undefined | {}> {
    const { case: caseLost, characteristics, lost: { birthDate }, lost } = request
    if (!lost || !caseLost || !characteristics) throw new AppError('Alguns parâmetros estão ausentes.', 400)

    if (lost) {
      const { error } = becomeLostValidationSchema.validate(lost)

      if (error !== undefined) {
        throw new JoiValidationError(error)
      }
    }

    if (caseLost) {
      const { error } = createCaseSchema.validate(caseLost)

      if (error !== undefined) {
        throw new JoiValidationError(error)
      }
    }

    if (characteristics.length < 3) {
      throw new AppError('Coloque 3 caracteristicas no mínimo', 400)
    }

    const { dateFormatted } = birthDateFormat(birthDate as string, false)

    request.lost.birthDate = dateFormatted

    const result = await this.lostsRepository.becomeLost(request, personID)

    if (!result) {
      throw new AppError('Houve um erro ao se tornar um perdido.', 500)
    }
    return result
  }
}

export default BecomeLostService
