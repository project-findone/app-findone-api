import { ILostsRepository } from '@modules/losts/repositories/ILostsRepository'

import prisma from '@shared/infra/prisma'
import { Lost } from '../entites/Lost'
import { IBecomeLostDTO } from '@modules/losts/dtos/IBecomeLostDTO'
import subHours from 'date-fns/subHours'
import { DatabaseError } from '@shared/error/DatabaseError'

export class LostsRepository implements ILostsRepository {
  async becomeLost (data: IBecomeLostDTO, personID: number): Promise<Lost> {
    try {
      const lost = await prisma.person.update({
        where: { personID },
        data: {
          personTypeID: 3,
          ownerID: personID,
          ...data.lost
        }
      })

      for (let index = 0; index < data.characteristics.length; index++) {
        await prisma.disCharacteristic.create({
          data: {
            personID: lost.personID,
            characteristicID: data.characteristics[index]
          }
        })
      }

      await prisma.case.create({
        data: {
          caseTypeID: 2,
          caseStatusID: 1,
          personID: lost.personID,
          ...data.case,
          dateStart: subHours(new Date(), 3)
        }
      })
      return lost as Lost
    } catch (err) {
      throw new DatabaseError(err)
    }
  }
}
