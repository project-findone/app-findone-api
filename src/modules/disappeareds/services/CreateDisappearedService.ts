import { Disappeared } from '../infra/prisma/entites/Disappeared'
import { ICreateDisappearedDTO } from '../dtos/ICreateDisappearedDTO'
import { IDisappearedRepository } from '../repositories/IDisappearedRepository'
import { inject, injectable } from 'tsyringe'

import { createDisappearedSchema, createCaseSchema } from '../infra/helpers/CreateDisappearedValidationSchema'

import { AppError } from '@shared/error/AppError'
import { JoiValidationError } from '@shared/error/ValidationError'

@injectable()
class CreateDisappearedService {
  constructor (
    @inject('DisappearedRepository')
    private disappearedRepository: IDisappearedRepository
  ) {}

  public async handle (request: ICreateDisappearedDTO, ownerID: number): Promise<Disappeared | Disappeared[] | undefined | {} | []> {
    try {
      const { characteristics, disappeared, case: caseDisappeared, passCheck } = request
      if (disappeared) {
        const { error } = createDisappearedSchema.validate(disappeared)

        if (error !== undefined) {
          throw new JoiValidationError(error)
        }
      }

      if (caseDisappeared) {
        const { error } = createCaseSchema.validate(caseDisappeared)

        if (error !== undefined) {
          throw new JoiValidationError(error)
        }
      }

      if (!characteristics) {
        throw new AppError('A propriedade "characteristics" é obrigatória')
      } else if (characteristics.length < 3 || characteristics.length > 4) {
        throw new AppError('Coloque 3 caracteristicas no mínimo e no máximo 4', 400)
      }

      if (!passCheck) {
        const disappeareds = await this.disappearedRepository.findSimilarDisappeareds(request)
        if (disappeareds.length > 0) return { status: 'Alert', disappeareds }
      }

      const result = await this.disappearedRepository.create(request, ownerID)

      if (!result) {
        throw new AppError('Houve um erro ao cadastrar o desaparecido.', 500)
      }
      return { status: 'Sucess', disappeared: result }
    } catch (err) {
      throw new AppError('Houve um erro ao invocar o serviço. Por favor, verifique a estrutura da requisição.')
    }
  }
}

export default CreateDisappearedService
