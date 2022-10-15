import { ICreateDisappearedDTO } from '../dtos/ICreateDisappearedDTO'
import { ICreateCaseDTO } from '@modules/case/dtos/ICreateCaseDTO'
import { IQueryDisappearedDTO } from '../dtos/IQueryDisappearedDTO'
import { Disappeared } from '../infra/prisma/entites/Disappeared'

export interface IDisappearedRepository{
  create(disappearedData: ICreateDisappearedDTO, caseData: ICreateCaseDTO, ownerID: number, characteristics: number[]): Promise<Disappeared>
  findDisappearedsByFilters(data: IQueryDisappearedDTO): Promise<Disappeared[]>
  findSimilarDisappeareds (data: ICreateDisappearedDTO, characteristics: number[]): Promise<Disappeared[]>
}
