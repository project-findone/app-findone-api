import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/prisma/entities/User'
import { ICreateUserRepository } from '../repositories/ICreateUserRepository'

interface IRequest {
  data: ICreateUserDTO
}

class CreateUserService {
  constructor (private createUserRepository: ICreateUserRepository) {}
  async handle (request: IRequest): Promise<User | null> {
    const user = await this.createUserRepository.create(request.data)
    return user
  }
}

export default CreateUserService
