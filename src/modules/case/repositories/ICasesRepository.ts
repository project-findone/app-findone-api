// import { CaseEntity } from '@modules/case/infra/prisma/entites/Case'
import { EntityContribution } from '@modules/supporters/infra/prisma/entites/Contribution'
import { Case } from '@prisma/client'

export interface ICasesRepository{
  archiveCase(personID: number, caseID: number): Promise<EntityContribution[]>
  finishCase(personID: number, caseID: number): Promise<EntityContribution[]>
  reactivateCase(personID: number, caseID: number): Promise<{} | null>
  archiveAllCase(personID: number): Promise<void>
  findCaseByID(personID: number): Promise<Case | null>
  findAllCases(): Promise<Case[] | null>
}
