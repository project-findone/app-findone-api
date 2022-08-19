import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { ICreateUserRepository } from '@modules/users/repositories/ICreateUserRepository'

import prisma from '@shared/infra/prisma'
import { Person } from '@prisma/client'

export class CreateUserRepository implements ICreateUserRepository {
  async create (data: ICreateUserDTO): Promise<Person> {
    const user = prisma.person.create({
      data: {
        ...data
      }
    })
    return user
  }

  async findByEmail (email: string): Promise<Person | null> {
    const userFiltred = await prisma.person.findFirst({ where: { email } })
    return userFiltred
  }
}
