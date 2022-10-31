import { ICasesRepository } from '@modules/case/repositories/ICasesRepository'

import prisma from '@shared/infra/prisma'
import { EntityContribution } from '@modules/supporters/infra/prisma/entites/Contribution'
// import { CaseEntity } from '@modules/case/infra/prisma/entites/Case'

import { addDays, compareAsc, subHours } from 'date-fns'
import { DatabaseError } from '@shared/error/DatabaseError'
import { Case } from '@prisma/client'

export class CasesRepository implements ICasesRepository {
  async archiveCase (personID: number, caseID: number): Promise<EntityContribution[]> {
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

  async finishCase (personID: number, caseID: number): Promise<EntityContribution[]> {
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

  async reactivateCase (personID: number, caseID: number): Promise<{} | null> {
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

  async archiveAllCase (personID: number): Promise<void> {
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

  async findCaseByID (personID: number): Promise<Case | null> {
    try {
      const caseFound = await prisma.case.findFirst({ where: { personID } })
      return caseFound
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async findAllCases (): Promise<Case[] | null> {
    try {
      const cases = await prisma.case.findMany()
      return cases
    } catch (err) {
      throw new DatabaseError(err)
    }
  }
}
