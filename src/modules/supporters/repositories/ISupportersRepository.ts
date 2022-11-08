// import { Supporter } from '../infra/prisma/entites/Supporter'
import { EntityContribution } from '../infra/prisma/entites/Contribution'
import { EntityAttachment } from '../infra/prisma/entites/Attachment'
import { Supporter } from '../infra/prisma/entites/Supporter'
import { CaseEntity } from '@modules/case/infra/prisma/entites/Case'
import { ICreateContributionDTO } from '../dtos/ICreateContributionDTO'

export interface ISupportersRepository{
  becomeSupporter(biografy: string, personID: string): Promise<Supporter>
  joinCase(caseID: string, personID: string): Promise<{} | null>
  sendContribution(data: ICreateContributionDTO, personID: string): Promise<EntityContribution>
  sendAttachment(file: string, contributionID: string): Promise<EntityAttachment>
  queryCases(personID: string): Promise<CaseEntity[] | Array<{}>>
  ranking(state: string, city: string): Promise<Supporter[] | Array<{}>>
}
