import { Lost } from '../infra/prisma/entites/Lost'
import { IBecomeLostDTO } from '../dtos/IBecomeLostDTO'
export interface ILostsRepository{
  becomeLost(lostData: IBecomeLostDTO, personID: string): Promise<Lost>
}
