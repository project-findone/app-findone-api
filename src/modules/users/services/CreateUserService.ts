import { PersonEntity } from '@shared/infra/prisma/entities/Person'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

import { userSchema } from '../infra/helpers/UserValidationSchema'

@injectable()
class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async handle (request: ICreateUserDTO): Promise<PersonEntity | undefined> {
    const { email } = request

    const { error } = userSchema.validate(request)

    if (error !== undefined) {
      throw new Error(`Alguns parâmetros estão ausentes' ${String(error)}`)
    }

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new Error('O e-mail já foi cadastrado.')
    }

    const user = await this.usersRepository.create(request)

    if (!user) {
      throw new Error('Houve um erro ao cadastrar o usuário.')
    }

    return user
  }
}

export default CreateUserService
