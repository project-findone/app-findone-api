import { Person } from '@prisma/client'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'

export interface ICreateUserRepository{
  create(data: ICreateUserDTO): Promise<Person>
  findByEmail(email: string): Promise<Person | null>
}
