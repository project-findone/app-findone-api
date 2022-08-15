import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/prisma/entities/User'

export interface ICreateUserRepository{
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(data: ICreateUserDTO): Promise<User | null>
}
