import prisma from '@shared/infra/prisma'
import { v4 as uuidv4 } from 'uuid'

import { User } from '../entities/User'
import { EntityContribution } from '@modules/supporters/infra/prisma/entites/Contribution'

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

import subHours from 'date-fns/subHours'

import { DatabaseError } from '@shared/error/DatabaseError'
import { ICreateContributionDTO } from '@modules/users/dtos/ICreateContributionDTO'
import { EntityAttachment } from '../entities/Attachment'

export class UsersRepository implements IUsersRepository {
  async create (data: ICreateUserDTO): Promise<User> {
    try {
      const user = await prisma.person.create({
        data: {
          personID: uuidv4(),
          personTypeID: 1,
          score: 0,
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

  async findByID (userID: string): Promise<User | null> {
    try {
      const userFiltred = await prisma.person.findUnique({ where: { personID: userID } })
      return userFiltred as User
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async findByCPF (personCPF: string): Promise<User | null> {
    try {
      const userFounded = await prisma.person.findUnique({ where: { personCPF } })
      return userFounded as User
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

  async update (data: IUpdateUserDTO, userID: string): Promise<User> {
    try {
      const userUpdated = await prisma.person.update({
        where: { personID: userID },
        data: {
          ...data,
          verified: true
        }
      })
      return userUpdated as User
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async updateImage (image: string, userID: string): Promise<User> {
    try {
      const userUpdated = await prisma.person.update({
        where: { personID: userID },
        data: { personImage: image }
      })
      return userUpdated as User
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async disable (userID: string): Promise<void> {
    try {
      await prisma.person.update({
        where: { personID: userID },
        data: { disabled: true }
      })
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async evaluateContribution (contributionID: string, score: number): Promise<EntityContribution> {
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

  async querySupporters (caseID: string): Promise<User[] | Array<{}>> {
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

  async login (userID: string): Promise<void> {
    try {
      await prisma.person.update({
        where: { personID: userID },
        data: { login: subHours(new Date(), 3) }
      })
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async logout (userID: string): Promise<void> {
    try {
      await prisma.person.update({
        where: { personID: userID },
        data: { logout: subHours(new Date(), 3) }
      })
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async becomeSupporter (biografy: string, personID: string): Promise<User> {
    try {
      const supporter = await prisma.person.update({
        where: { personID },
        data: {
          personTypeID: 4,
          personBiografy: biografy,
          score: 0
        }
      })
      return supporter as User
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async joinCase (caseID: string, supporterID: string): Promise<{} | null> {
    try {
      const supportCase = await prisma.supportCase.create({
        data: {
          supportCaseID: uuidv4(),
          personID: supporterID,
          caseID,
          dateEntry: subHours(new Date(), 3)
        }
      })
      await prisma.sessionChat.create({
        data: {
          sessionChatID: uuidv4(),
          supportCaseID: supportCase.supportCaseID
        }
      })
      return supportCase
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async sendContribution (data: ICreateContributionDTO, supporterID: string): Promise<EntityContribution> {
    try {
      const contribution = await prisma.contribution.create({
        data: {
          contributionID: uuidv4(),
          ...data,
          dateTimeSend: subHours(new Date(), 3),
          issuer: supporterID
        }
      })
      return contribution as EntityContribution
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async sendAttachment (file: string, contributionID: string): Promise<EntityAttachment> {
    try {
      const attachment = await prisma.attachment.create({
        data: {
          attachmentID: uuidv4(),
          attachmentName: file,
          contributionID
        }
      })
      return attachment as EntityAttachment
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async ranking (state: string, city: string): Promise<User[] | Array<{}>> {
    try {
      const supporters = await prisma.person.findMany({
        where: {
          personTypeID: 1,
          state,
          city
        },
        orderBy: {
          score: 'desc'
        },
        select: {
          personTypeID: true,
          personID: true,
          name: true,
          lastname: true,
          personBiografy: true,
          state: true,
          city: true,
          score: true
        }
      })
      return supporters
    } catch (err) {
      throw new DatabaseError(err)
    }
  }
}
