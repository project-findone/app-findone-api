import { Disappeared } from '../infra/prisma/entites/Disappeared'
import { ICreateDisappearedDTO } from '../dtos/ICreateDisappearedDTO'
import { IDisappearedRepository } from '../repositories/IDisappearedRepository'
import { inject, injectable } from 'tsyringe'

import { createDisappearedSchema } from '../infra/helpers/CreateDisappearedValidationSchema'

@injectable()
class CreateDisappearedService {
  constructor (
    @inject('DisappearedRepository')
    private disappearedRepository: IDisappearedRepository
  ) {}

  public async handle (request: ICreateDisappearedDTO): Promise<Disappeared | undefined | {}> {
    const { error } = createDisappearedSchema.validate(request)

    if (error !== undefined) {
      throw new Error(`Alguns parâmetros estão ausentes' ${String(error)}`)
    }

    const disappeared = await this.disappearedRepository.create(request)

    if (!disappeared) {
      throw new Error('Houve um erro ao cadastrar o desaparecido.')
    }

    return disappeared
  }
}

export default CreateDisappearedService
