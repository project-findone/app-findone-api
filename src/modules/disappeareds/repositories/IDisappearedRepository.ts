import { ICreateDisappearedDTO } from '../dtos/ICreateDisappearedDTO'
import { IQueryDisappearedDTO } from '../dtos/IQueryDisappearedDTO'
import { Disappeared } from '../infra/prisma/entites/Disappeared'

export interface IDisappearedRepository{
  create(data: ICreateDisappearedDTO, ownerID: string): Promise<Disappeared>
  findDisappearedsByFilters(data: IQueryDisappearedDTO): Promise<Disappeared[]>
  findSimilarDisappeareds (data: ICreateDisappearedDTO): Promise<Disappeared[]>
}
