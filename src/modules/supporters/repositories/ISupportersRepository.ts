// import { Supporter } from '../infra/prisma/entites/Supporter'
import { EntityContribution } from '../infra/prisma/entites/Contribution'
import { EntityAttachment } from '../infra/prisma/entites/Attachment'
import { Supporter } from '../infra/prisma/entites/Supporter'
import { CaseEntity } from '@modules/case/infra/prisma/entites/Case'
import { ICreateContributionDTO } from '../dtos/ICreateContributionDTO'

export interface ISupportersRepository{
  becomeSupporter(biografy: string, personID: number): Promise<Supporter>
  joinCase(caseID: number, personID: number): Promise<{} | null>
  sendContribution(data: ICreateContributionDTO, personID: number): Promise<EntityContribution>
  sendAttachment(file: string, contributionID: number): Promise<EntityAttachment>
  queryCases(personID: number): Promise<CaseEntity[] | Array<{}>>
  ranking(state: string, city: string): Promise<Supporter[] | Array<{}>>
}
