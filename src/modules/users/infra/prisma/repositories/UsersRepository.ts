import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

import prisma from '@shared/infra/prisma'
import { PersonEntity } from '@shared/infra/prisma/entities/Person'

export class UsersRepository implements IUsersRepository {
  async create (data: ICreateUserDTO): Promise<PersonEntity> {
    const user = await prisma.person.create({
      data: {
        ...data
      }
    })
    return user
  }

  async findByEmail (email: string): Promise<PersonEntity | null> {
    const userFiltred = await prisma.person.findFirst({ where: { email } })
    return userFiltred
  }
}
