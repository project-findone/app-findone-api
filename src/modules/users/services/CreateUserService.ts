import { User } from '../infra/prisma/entities/User'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

import { createUserSchema } from '../infra/helpers/CreateUserValidationSchema'
import { AppError } from '@shared/error/AppError'

@injectable()
class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async handle (request: ICreateUserDTO): Promise<User | undefined | {}> {
    const { email, password } = request

    const { error } = createUserSchema.validate(request)

    if (error !== undefined) {
      throw new AppError(`Alguns parâmetros estão ausentes' ${String(error)}`, 400)
    }

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new AppError('O e-mail já foi cadastrado.', 400)
    }

    const hashedPassword = await hash(password, 12)

    if (!hashedPassword) {
      throw new AppError('Houve um erro ao criptografar a senha.', 400)
    }

    request.password = hashedPassword

    const user = await this.usersRepository.create(request)

    if (!user) {
      throw new AppError('Houve um erro ao cadastrar o usuário.', 400)
    }

    const { password: _, ...response } = user

    return response
  }
}

export default CreateUserService
