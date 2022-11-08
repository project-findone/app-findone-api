import { addDays, compareAsc, subHours } from 'date-fns'
import prisma from '@shared/infra/prisma'

import { EntityContribution } from '@modules/supporters/infra/prisma/entites/Contribution'
import { CaseEntity } from '../entites/Case'

import { ICasesRepository } from '@modules/case/repositories/ICasesRepository'

import { DatabaseError } from '@shared/error/DatabaseError'
import { SupportCase } from '@prisma/client'

export class CasesRepository implements ICasesRepository {
  async archiveCase (personID: string, caseID: string): Promise<EntityContribution[]> {
    try {
      const contributions = await prisma.contribution.findMany({
        where: {
          score: null,
          sessionChat: {
            supportCase: {
              caseID
            }
          }
        }
      })

      if (contributions.length <= 0) {
        await prisma.case.updateMany({
          data: {
            caseStatusID: 2,
            dateArchive: subHours(new Date(), 3)
          },
          where: {
            caseID,
            person: {
              ownerID: personID
            }
          }
        })
      }

      return contributions as EntityContribution[]
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async finishCase (personID: string, caseID: string): Promise<EntityContribution[]> {
    try {
      const contributions = await prisma.contribution.findMany({
        where: {
          score: null,
          sessionChat: {
            supportCase: {
              caseID
            }
          }
        }
      })

      if (contributions.length <= 0) {
        await prisma.case.updateMany({
          data: {
            caseStatusID: 3,
            dateEnd: subHours(new Date(), 3)
          },
          where: {
            caseID,
            person: {
              ownerID: personID
            }
          }
        })
      }
      return contributions as EntityContribution[]
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async reactivateCase (personID: string, caseID: string): Promise<{} | null> {
    try {
      const thisCase = await prisma.case.findUnique({ where: { caseID } })
      if (thisCase?.dateArchive) {
        const dateReactivate = addDays(thisCase.dateArchive, 7)

        if (compareAsc(new Date(), dateReactivate) === 1) {
          await prisma.case.updateMany({
            data: {
              caseStatusID: 1,
              dateArchive: null
            },
            where: {
              caseID,
              person: {
                ownerID: personID
              }
            }
          })

          return {}
        }
      }
      return null
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async archiveAllCase (personID: string): Promise<void> {
    try {
      await prisma.case.updateMany({
        data: {
          caseStatusID: 2,
          dateArchive: subHours(new Date(), 3)
        },
        where: {
          person: {
            ownerID: personID
          }
        }
      })
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async findCaseByID (caseID: string): Promise<{case: CaseEntity, supporters: SupportCase[]} | null> {
    try {
      const caseFound = await prisma.case.findFirst({
        where: { caseID },
        include: {
          person: {
            select: {
              ownerID: true
            }
          }
        }
      })
      if (caseFound) {
        const supportersInCase = await prisma.supportCase.findMany({ where: { caseID } })
        return { case: caseFound, supporters: supportersInCase }
      }
      return null
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async findAllCases (): Promise<CaseEntity[] | null> {
    try {
      const cases = await prisma.case.findMany()
      return cases
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async querySupporterCases (supporterID: string): Promise<CaseEntity[] | Array<{}>> {
    try {
      const cases = await prisma.supportCase.findMany({
        where: { personID: supporterID },
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

  async queryOwnerCases (ownerID: string): Promise<CaseEntity[] | Array<{}>> {
    try {
      const cases = await prisma.case.findMany({
        where: { person: { ownerID } }
      })
      return cases
    } catch (err) {
      throw new DatabaseError(err)
    }
  }
}
