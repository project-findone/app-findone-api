import { injectable, inject } from 'tsyringe'

import { IUsersRepository } from '../repositories/IUsersRepository'

import { AppError } from '@shared/error/AppError'

import { middleArchiveService } from '@modules/case/services/MiddleArchiveService'

@injectable()
export default class LogoutUserService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository) {}

  public async handle (userID: string): Promise<{}> {
    if (!userID || typeof userID !== 'string') {
      throw new AppError('Não foi possível acessar o ID do usuário.', 500)
    }

    try {
      await this.userRepository.logout(userID)
      await middleArchiveService.handle(userID, 'start')
      return {}
    } catch (err) {
      if (err instanceof AppError) throw new AppError(err.message, err.statusCode)
      throw new AppError('Não foi possível realizar logout.', 500)
    }
  }
}
