import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

import prisma from '@shared/infra/prisma'
import { User } from '../entities/User'
import { Supporter } from '@modules/supporters/infra/prisma/entites/Supporter'
import { EntityContribution } from '@modules/supporters/infra/prisma/entites/Contribution'
import { CaseEntity } from '@modules/case/infra/prisma/entites/Case'
import { PersonEntity } from '@shared/infra/prisma/entities/Person'
import subHours from 'date-fns/subHours'

export class UsersRepository implements IUsersRepository {
  async create (data: ICreateUserDTO): Promise<User> {
    const user = await prisma.person.create({
      data: {
        personTypeID: 1,
        ...data
      }
    })
    return user as User
  }

  async findByEmail (email: string): Promise<User | null> {
    const userFiltred = await prisma.person.findUnique({ where: { email } })
    return userFiltred as User
  }

  async findByID (personID: number): Promise<User> {
    const userFiltred = await prisma.person.findUnique({ where: { personID } })
    return userFiltred as User
  }

  async verifyEmail (email: string, verify: boolean): Promise<User | null> {
    const userVerified = await prisma.person.update({
      where: { email },
      data: {
        verified: verify
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

  async update (data: IUpdateUserDTO, personID: number): Promise<User> {
    const userUpdated = await prisma.person.update({
      where: { personID },
      data: {
        ...data
      }
    })
    return userUpdated as User
  }

  async updateImage (image: string, personID: number): Promise<User> {
    const userUpdated = await prisma.person.update({
      where: { personID },
      data: { personImage: image }
    })
    return userUpdated as User
  }

  async disable (personID: number): Promise<void> {
    await prisma.person.update({
      where: { personID },
      data: { disabled: true }
    })
  }

  async evaluateContribution (personID: number, contributionID: number, score: number): Promise<EntityContribution> {
    const contribution = await prisma.contribution.update({
      where: { contributionID },
      data: {
        score
      }
    })

    const supporter = await prisma.person.findUnique({ where: { personID: contribution.issuer } })

    const newScore = Number(supporter?.score) + Number(contribution.score)
    await prisma.person.update({
      where: { personID: supporter?.personID },
      data: {
        score: newScore
      }
    })

    return contribution as EntityContribution
  }

  async queryCases (personID: number): Promise<CaseEntity[] | Array<{}>> {
    const cases = await prisma.case.findMany({
      where: {
        person: {
          ownerID: personID
        }
      }
    })

    return cases as CaseEntity[]
  }

  async querySupporters (caseID: number): Promise<Supporter[] | Array<{}>> {
    const supporters = await prisma.supportCase.findMany({
      where: { caseID },
      include: {
        person: {
          select: {
            personID: true,
            personTypeID: true,
            name: true,
            lastname: true
          }
        }
      }
    })

    return supporters
  }

  async findUserByID (personID: number): Promise<PersonEntity> {
    const person = await prisma.person.findUnique({ where: { personID } })

    return person as PersonEntity
  }

  async login (personID: number): Promise<void> {
    await prisma.person.update({
      where: { personID },
      data: { login: subHours(new Date(), 3) }
    })
  }

  async logout (personID: number): Promise<void> {
    await prisma.person.update({
      where: { personID },
      data: { logout: subHours(new Date(), 3) }
    })
  }
}
