import { injectable, inject } from 'tsyringe'

import { IUsersRepository } from '../repositories/IUsersRepository'

@injectable()
export default class DeleteUserService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository) {}

  public async handle (personID: number): Promise<{}> {
    if (!personID || typeof personID !== 'number') {
      throw new Error(' Não foi possível acessar o ID do usuário.')
    }

    try {
      await this.userRepository.delete(personID)
      return {}
    } catch {
      throw new Error('Não foi possível realizar a exclusão do perfil.')
    }
  }
}
