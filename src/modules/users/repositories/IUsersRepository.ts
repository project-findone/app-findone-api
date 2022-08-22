import { PersonEntity } from '@shared/infra/prisma/entities/Person'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'

export interface IUsersRepository{
  create(data: ICreateUserDTO): Promise<PersonEntity>
  findByEmail(email: string): Promise<PersonEntity | null>
}
