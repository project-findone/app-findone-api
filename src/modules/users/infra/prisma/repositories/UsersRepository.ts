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
    const userFiltred = await prisma.person.findUnique({ where: { email } })
    return userFiltred as User
  }

  async verifyEmail (email: string): Promise<User | null> {
    const userVerified = await prisma.person.update({
      where: { email },
      data: {
        verified: true
      },
      select: {
        email: true,
        verified: true
      }
    })
    return userVerified as User
  }

  async updatePass (email: string, newPassword: string): Promise<User> {
    const userUpdated = await prisma.person.update({
      where: { email },
      data: { password: newPassword }
    })

    return userUpdated as User
  }
}
