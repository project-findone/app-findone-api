import subHours from 'date-fns/subHours'
import { v4 as uuidv4 } from 'uuid'

import { ILostsRepository } from '@modules/losts/repositories/ILostsRepository'

import prisma from '@shared/infra/prisma'
import { Lost } from '../entites/Lost'
import { IBecomeLostDTO } from '@modules/losts/dtos/IBecomeLostDTO'
import { DatabaseError } from '@shared/error/DatabaseError'

export class LostsRepository implements ILostsRepository {
  async becomeLost (data: IBecomeLostDTO, personID: string): Promise<Lost> {
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
            disCharacteristicID: uuidv4(),
            personID: lost.personID,
            characteristicID: uuidv4() // data.characteristics[index]
          }
        })
      }

      await prisma.case.create({
        data: {
          caseID: uuidv4(),
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
