import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/prisma/entities/User'

export interface IUsersRepository{
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  verifyEmail(email: string, verify: boolean): Promise<User | null>
  updatePass(email: string, newPassword: string): Promise<User>
}
