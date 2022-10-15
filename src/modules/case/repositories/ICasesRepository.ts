// import { CaseEntity } from '@modules/case/infra/prisma/entites/Case'
import { EntityContribution } from '@modules/supporters/infra/prisma/entites/Contribution'

export interface ICasesRepository{
  archiveCase(personID: number, caseID: number): Promise<EntityContribution[]>
  finishCase(personID: number, caseID: number): Promise<EntityContribution[]>
  reactivateCase(personID: number, caseID: number): Promise<{} | null>
  archiveAllCase(personID: number): Promise<void>
}
