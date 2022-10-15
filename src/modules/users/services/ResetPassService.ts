import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { User } from '../infra/prisma/entities/User'

import { AppError } from '@shared/error/AppError'

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
      throw new AppError('Alguns parâmetros estão ausentes.', 400)
    }

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('O e-mail informado não existe.', 404)
    }

    const hashedPassword = await hash(newPassword, 12)

    if (!hashedPassword) {
      throw new AppError('Não foi possível criptografar a nova senha.', 400)
    }

    const userUpdated = await this.userRepository.updatePass(email, hashedPassword)

    if (!userUpdated) {
      throw new AppError('Não foi possível atualizar o cadastro do usuário.', 400)
    }

    const { password: _, ...response } = userUpdated

    return response as User
  }
}
