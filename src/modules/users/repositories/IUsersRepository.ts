import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { User } from '../infra/prisma/entities/User'

export interface IUsersRepository{
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  verifyEmail(email: string, verify: boolean): Promise<User | null>
  updatePass(email: string, newPassword: string): Promise<User>
  update(data: IUpdateUserDTO, personID: number): Promise<User>
  delete(personID: number): Promise<void>
}
