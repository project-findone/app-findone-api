import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/prisma/entities/User'
import { ICreateUserRepository } from '../repositories/ICreateUserRepository'

interface IRequest {
  data: ICreateUserDTO
}

class CreateUserService {
  constructor (private createUserRepository: ICreateUserRepository) {}
  public async handle (request: IRequest): Promise<User | null> {
    const { TB_PESSOA_EMAIL } = request.data

    const userExists = await this.createUserRepository.findByEmail(TB_PESSOA_EMAIL)

    if (userExists != null) {
      throw new Error('User is exists')
    }

    const user = await this.createUserRepository.create(request.data)
    return user
  }
}

export default CreateUserService
