import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { ICreateUserRepository } from '@modules/users/repositories/ICreateUserRepository'
import { User } from '../entities/User'

import prisma from '@shared/infra/prisma'

class CreateUserRepository implements ICreateUserRepository {
  async create (data: ICreateUserDTO): Promise<User> {
    const user = await prisma.tb_pessoa.create({ data })
    return user
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = await prisma.tb_pessoa.findFirst({ where: { TB_PESSOA_EMAIL: email } })
    return user
  }
}

export default CreateUserRepository
