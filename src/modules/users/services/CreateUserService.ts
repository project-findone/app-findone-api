import { PersonEntity } from '@shared/infra/prisma/entities/Person'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { ICreateUserRepository } from '../repositories/ICreateUserRepository'

import { userSchema } from '../infra/helpers/UserValidationSchema'

class CreateUserService {
  constructor (private createUserRepository: ICreateUserRepository) {}
  public async handle (request: ICreateUserDTO): Promise<PersonEntity | undefined> {
    const { email } = request

    const { error } = userSchema.validate(request)

    if (error !== undefined) {
      throw new Error(`Alguns parâmetros estão ausentes' ${String(error)}`)
    }

    const userExists = await this.createUserRepository.findByEmail(email)

    if (userExists) {
      throw new Error('O e-mail já foi cadastrado.')
    }

    const user = await this.createUserRepository.create(request)

    if (!user) {
      throw new Error('Houve um erro ao cadastrar o usuário.')
    }

    return user
  }
}

export default CreateUserService
