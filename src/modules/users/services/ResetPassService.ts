import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { User } from '../infra/prisma/entities/User'

interface IRequest{
  email: string
  newPassword: string
}

@injectable()
export class ResetPassService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async handle (request: IRequest): Promise<User | null> {
    const { newPassword, email } = request

    if (!newPassword || !email) {
      throw new Error('Alguns parâmetros estão ausentes.')
    }

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('O e-mail informado não existe.')
    }

    const hashedPassword = await hash(newPassword, 12)

    if (!hashedPassword) {
      throw new Error('Não foi possível criptografar a nova senha.')
    }

    const userUpdated = await this.userRepository.updatePass(email, hashedPassword)

    if (!userUpdated) {
      throw new Error('Não foi possível atualizar o cadastro do usuário.')
    }

    const { password: _, ...response } = userUpdated

    return response as User
  }
}
