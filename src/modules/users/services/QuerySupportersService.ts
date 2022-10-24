import { inject, injectable } from 'tsyringe'
import { Supporter } from '@modules/supporters/infra/prisma/entites/Supporter'
import { IUsersRepository } from '../repositories/IUsersRepository'

import { AppError } from '@shared/error/AppError'

@injectable()
export class QuerySupportersService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async handle (caseID: number): Promise<Supporter[] | undefined | {}> {
    if (!caseID || typeof caseID !== 'number') {
      throw new AppError('Não foi possível acessar o ID do caso.', 500)
    }

    const supporters = await this.userRepository.querySupporters(caseID)

    if (supporters.length === 0) {
      throw new AppError('Nenhum apoiador foi encontrado.', 404)
    }

    return supporters
  }
}

export default QuerySupportersService
