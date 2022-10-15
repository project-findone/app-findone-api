import { Lost } from '../infra/prisma/entites/Lost'
import { IBecomeLostDTO } from '../dtos/IBecomeLostDTO'
import { ICreateCaseDTO } from '@modules/case/dtos/ICreateCaseDTO'

export interface ILostsRepository{
  becomeLost(lostData: IBecomeLostDTO, caseData: ICreateCaseDTO, personID: number, characteristics: number[]): Promise<Lost>
}
