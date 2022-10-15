import { inject, injectable } from 'tsyringe'
import { Supporter } from '@modules/supporters/infra/prisma/entites/Supporter'
import { ISupportersRepository } from '../repositories/ISupportersRepository'

import { AppError } from '@shared/error/AppError'

interface IRequest{
  personBiografy: string
}

@injectable()
export class BecomeSupporterService {
  constructor (
    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository
  ) {}

  public async handle (request: IRequest, personID: number): Promise<Supporter | undefined | {}> {
    const { personBiografy } = request

    if (!personBiografy || !personID) {
      throw new AppError('Alguns parâmetros estão ausentes', 400)
    }

    const supporter = await this.supportersRepository.becomeSupporter(personBiografy, personID)

    if (!supporter) {
      throw new AppError('Houve um erro ao se tornar um apoiador.', 400)
    }

    return supporter
  }
}

export default BecomeSupporterService
