import { ICasesRepository } from '@modules/case/repositories/ICasesRepository'

import prisma from '@shared/infra/prisma'
import { EntityContribution } from '@modules/supporters/infra/prisma/entites/Contribution'
// import { CaseEntity } from '@modules/case/infra/prisma/entites/Case'

import { addDays, compareAsc, subHours } from 'date-fns'

export class CasesRepository implements ICasesRepository {
  async archiveCase (personID: number, caseID: number): Promise<EntityContribution[]> {
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
  }

  async finishCase (personID: number, caseID: number): Promise<EntityContribution[]> {
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
  }

  async reactivateCase (personID: number, caseID: number): Promise<{} | null> {
    const thisCase = await prisma.case.findUnique({ where: { caseID } })
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

    return null
  }

  async archiveAllCase (personID: number): Promise<void> {
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
  }
}
