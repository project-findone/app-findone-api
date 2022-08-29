import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

import prisma from '@shared/infra/prisma'
import { User } from '../entities/User'

export class UsersRepository implements IUsersRepository {
  async create (data: ICreateUserDTO): Promise<User> {
    const user = await prisma.person.create({
      data: {
        ...data
      }
    })
    return user as User
  }

  async findByEmail (email: string): Promise<User | null> {
    const userFiltred = await prisma.person.findFirst({ where: { email } })
    return userFiltred as User
  }
}
