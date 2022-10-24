import { User } from '../infra/prisma/entities/User'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

import { createUserSchema } from '../infra/helpers/CreateUserValidationSchema'
import { AppError } from '@shared/error/AppError'
import { JoiValidationError } from '@shared/error/ValidationError'

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
      throw new JoiValidationError(error)
    }

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new AppError('O e-mail já foi cadastrado.', 405)
    }

    const hashedPassword = await hash(password, 12)

    if (!hashedPassword) {
      throw new AppError('Houve um erro ao criptografar a senha.', 500)
    }

    request.password = hashedPassword

    const user = await this.usersRepository.create(request)

    if (!user) {
      throw new AppError('Houve um erro ao cadastrar o usuário.', 500)
    }

    const { password: _, ...response } = user

    return response
  }
}

export default CreateUserService
