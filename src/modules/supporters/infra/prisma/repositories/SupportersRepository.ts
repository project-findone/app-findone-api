import { ISupportersRepository } from '@modules/supporters/repositories/ISupportersRepository'

import prisma from '@shared/infra/prisma'
// import { Supporter } from '../entites/Supporter'
import { EntityContribution } from '../entites/Contribution'
import { EntityAttachment } from '../entites/Attachment'
import { Supporter } from '../entites/Supporter'
import { CaseEntity } from '@modules/case/infra/prisma/entites/Case'
import { ICreateContributionDTO } from '@modules/supporters/dtos/ICreateContributionDTO'
import subHours from 'date-fns/subHours'
import { DatabaseError } from '@shared/error/DatabaseError'

export class SupportersRepository implements ISupportersRepository {
  async becomeSupporter (biografy: string, personID: number): Promise<Supporter> {
    try {
      const supporter = await prisma.person.update({
        where: { personID },
        data: {
          personTypeID: 4,
          personBiografy: biografy,
          score: 0
        }
      })
      return supporter as Supporter
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async joinCase (caseID: number, personID: number): Promise<{} | null> {
    try {
      const disCase = await prisma.case.findUnique({ where: { caseID } })
      const disPerson = await prisma.person.findUnique({ where: { personID } })
      if (disCase?.caseStatusID === 1 && disPerson?.personTypeID === 4) {
        const supportCase = await prisma.supportCase.create({
          data: {
            personID,
            caseID,
            dateEntry: subHours(new Date(), 3)
          }
        })
        await prisma.sessionChat.create({
          data: {
            supportCaseID: supportCase.supportCaseID
          }
        })
        return {}
      }
      return null
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async sendContribution (data: ICreateContributionDTO, personID: number): Promise<EntityContribution> {
    try {
      const contribution = await prisma.contribution.create({
        data: {
          ...data,
          dateTimeSend: subHours(new Date(), 3),
          issuer: personID
        }
      })
      return contribution as EntityContribution
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async sendAttachment (file: string, contributionID: number): Promise<EntityAttachment> {
    try {
      const attachment = await prisma.attachment.create({
        data: {
          attachmentName: file,
          contributionID
        }
      })
      return attachment as EntityAttachment
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async queryCases (personID: number): Promise<CaseEntity[] | Array<{}>> {
    try {
      const cases = await prisma.supportCase.findMany({
        where: { personID },
        include: {
          case: {
            select: {
              caseID: true,
              personID: true
            }
          }
        }
      })
      return cases
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async ranking (state: string, city: string): Promise<Supporter[] | Array<{}>> {
    try {
      const supporters = await prisma.person.findMany({
        where: {
          personTypeID: 4,
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
