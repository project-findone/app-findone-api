import { EntityContribution } from '@modules/supporters/infra/prisma/entites/Contribution'
import { SupportCase } from '@prisma/client'
import { CaseEntity } from '../infra/prisma/entites/Case'

export interface ICasesRepository{
  archiveCase(personID: string, caseID: string): Promise<EntityContribution[]>
  finishCase(personID: string, caseID: string): Promise<EntityContribution[]>
  reactivateCase(personID: string, caseID: string): Promise<{} | null>
  archiveAllCase(personID: string): Promise<void>
  findCaseByID(caseID: string): Promise<{case: CaseEntity, supporters: SupportCase[]} | null>
  findAllCases(): Promise<{case: CaseEntity, supporters: SupportCase[]} | null>
  queryOwnerCases(ownerID: string): Promise<CaseEntity[] | Array<{}>>
  querySupporterCases(supporterID: string): Promise<CaseEntity[] | Array<{}>>
}
