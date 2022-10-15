import { Disappeared } from '../infra/prisma/entites/Disappeared'
import { IQueryDisappearedDTO } from '../dtos/IQueryDisappearedDTO'
import { IDisappearedRepository } from '../repositories/IDisappearedRepository'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/error/AppError'

@injectable()
class QueryDisappearedService {
  constructor (
    @inject('DisappearedRepository')
    private disappearedRepository: IDisappearedRepository
  ) {}

  public async handle (request: IQueryDisappearedDTO): Promise<Disappeared[]> {
    const disappeareds = await this.disappearedRepository.findDisappearedsByFilters(request)

    if (disappeareds.length <= 0) {
      throw new AppError('Não foi possivél encontrar casos de acordo com esses filtros.', 400)
    }

    return disappeareds
  }
}

export default QueryDisappearedService
