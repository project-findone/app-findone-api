import { inject, injectable } from 'tsyringe'
import { CaseEntity } from '@modules/case/infra/prisma/entites/Case'
import { IUsersRepository } from '../repositories/IUsersRepository'

import { AppError } from '@shared/error/AppError'

@injectable()
export class QueryCasesService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async handle (personID: number): Promise<CaseEntity[] | undefined | {}> {
    if (!personID) {
      throw new AppError('Alguns parâmetros estão ausentes', 400)
    }

    const cases = await this.userRepository.queryCases(personID)

    if (cases.length === 0) {
      throw new AppError('Nenhum caso foi encontrado.', 404)
    }

    return cases
  }
}

export default QueryCasesService
