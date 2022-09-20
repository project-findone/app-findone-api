import { ICreateDisappearedDTO } from '../dtos/ICreateDisappearedDTO'
import { Disappeared } from '../infra/prisma/entites/Disappeared'

export interface IDisappearedRepository{
  create(data: ICreateDisappearedDTO): Promise<Disappeared>
}
