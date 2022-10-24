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
import { DatabaseError } from '@shared/error/DatabaseError'

export class UsersRepository implements IUsersRepository {
  async create (data: ICreateUserDTO): Promise<User> {
    try {
      const user = await prisma.person.create({
        data: {
          personTypeID: 1,
          ...data
        }
      })
      return user as User
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async findByEmail (email: string): Promise<User | null> {
    try {
      const userFiltred = await prisma.person.findUnique({ where: { email } })
      return userFiltred as User
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async findByID (personID: number): Promise<User | null> {
    try {
      const userFiltred = await prisma.person.findUnique({ where: { personID } })
      return userFiltred as User
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async verifyEmail (email: string, verify: boolean): Promise<User> {
    try {
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
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async updatePass (email: string, newPassword: string): Promise<User> {
    try {
      const userUpdated = await prisma.person.update({
        where: { email },
        data: { password: newPassword }
      })

      return userUpdated as User
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async update (data: IUpdateUserDTO, personID: number): Promise<User> {
    try {
      const userUpdated = await prisma.person.update({
        where: { personID },
        data: {
          ...data
        }
      })
      return userUpdated as User
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async updateImage (image: string, personID: number): Promise<User> {
    try {
      const userUpdated = await prisma.person.update({
        where: { personID },
        data: { personImage: image }
      })
      return userUpdated as User
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async disable (personID: number): Promise<void> {
    try {
      await prisma.person.update({
        where: { personID },
        data: { disabled: true }
      })
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async evaluateContribution (personID: number, contributionID: number, score: number): Promise<EntityContribution> {
    try {
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
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async queryCases (personID: number): Promise<CaseEntity[] | Array<{}>> {
    try {
      const cases = await prisma.case.findMany({
        where: {
          person: {
            ownerID: personID
          }
        }
      })

      return cases as CaseEntity[]
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async querySupporters (caseID: number): Promise<Supporter[] | Array<{}>> {
    try {
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
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async findUserByID (personID: number): Promise<PersonEntity> {
    try {
      const person = await prisma.person.findUnique({ where: { personID } })
      return person as PersonEntity
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async login (personID: number): Promise<void> {
    try {
      await prisma.person.update({
        where: { personID },
        data: { login: subHours(new Date(), 3) }
      })
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async logout (personID: number): Promise<void> {
    try {
      await prisma.person.update({
        where: { personID },
        data: { logout: subHours(new Date(), 3) }
      })
    } catch (err) {
      throw new DatabaseError(err)
    }
  }
}
