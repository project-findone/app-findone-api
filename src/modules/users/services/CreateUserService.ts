import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/prisma/entities/Person'
import { ICreateUserRepository } from '../repositories/ICreateUserRepository'

class CreateUserService {
  constructor (private createUserRepository: ICreateUserRepository) {}
  public async handle (request: ICreateUserDTO): Promise<User | undefined> {
    const { email } = request

    if (!email) {
      throw new Error('A propriedade de e-mail está ausente.')
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
