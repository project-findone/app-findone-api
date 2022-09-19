import { ICreateDisappearedDTO } from '@modules/disappeareds/dtos/ICreateDisappearedDTO'
import { IDisappearedRepository } from '@modules/disappeareds/repositories/IDisappearedRepository'

import prisma from '@shared/infra/prisma'
import { Disappeared } from '../entites/Disappeared'

export class DisappearedRepository implements IDisappearedRepository {
  async create (data: ICreateDisappearedDTO): Promise<Disappeared> {
    const disappeared = await prisma.person.create({
      data: {
        personTypeID: 2,
        ...data
      }
    })
    return disappeared as Disappeared
  }
}
