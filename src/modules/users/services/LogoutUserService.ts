import { injectable, inject } from 'tsyringe'

import { IUsersRepository } from '../repositories/IUsersRepository'

import { AppError } from '@shared/error/AppError'

import { middleArchiveService } from '@modules/case/services/MiddleArchiveService'

@injectable()
export default class LogoutUserService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository) {}

  public async handle (personID: number): Promise<{}> {
    if (!personID || typeof personID !== 'number') {
      throw new AppError('Não foi possível acessar o ID do usuário.', 500)
    }

    try {
      await this.userRepository.logout(personID)
      await middleArchiveService.handle(personID, 'start')
      return {}
    } catch {
      throw new AppError('Não foi possível realizar logout.', 500)
    }
  }
}
