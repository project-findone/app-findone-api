import { PersonEntity } from '@shared/infra/prisma/entities/Person'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

import { userSchema } from '../infra/helpers/UserValidationSchema'

@injectable()
class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async handle (request: ICreateUserDTO): Promise<PersonEntity | undefined> {
    const { email, password } = request

    const { error } = userSchema.validate(request)

    if (error !== undefined) {
      throw new Error(`Alguns parâmetros estão ausentes' ${String(error)}`)
    }

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new Error('O e-mail já foi cadastrado.')
    }

    const hashedPassword = await hash(password, 12)

    if (!hashedPassword) {
      throw new Error('Houve um erro ao criptografar a senha.')
    }

    request.password = hashedPassword

    const user = await this.usersRepository.create(request)

    if (!user) {
      throw new Error('Houve um erro ao cadastrar o usuário.')
    }

    return user
  }
}

export default CreateUserService
