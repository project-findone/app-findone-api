import { ILostsRepository } from '@modules/losts/repositories/ILostsRepository'

import prisma from '@shared/infra/prisma'
import { Lost } from '../entites/Lost'
import { IBecomeLostDTO } from '@modules/losts/dtos/IBecomeLostDTO'
import { ICreateCaseDTO } from '@modules/case/dtos/ICreateCaseDTO'
import subHours from 'date-fns/subHours'

export class LostsRepository implements ILostsRepository {
  async becomeLost (lostData: IBecomeLostDTO, caseData: ICreateCaseDTO, personID: number, characteristics: number[]): Promise<Lost> {
    const lost = await prisma.person.update({
      where: { personID },
      data: {
        personTypeID: 3,
        ownerID: personID,
        ...lostData
      }
    })

    for (let index = 0; index < characteristics.length; index++) {
      await prisma.disCharacteristic.create({
        data: {
          personID: lost.personID,
          characteristicID: characteristics[index]
        }
      })
    }

    await prisma.case.create({
      data: {
        caseTypeID: 2,
        caseStatusID: 1,
        personID: lost.personID,
        ...caseData,
        dateStart: subHours(new Date(), 3)
      }
    })

    return lost as Lost
  }
}
