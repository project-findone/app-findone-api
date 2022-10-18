import { ICreateDisappearedDTO } from '@modules/disappeareds/dtos/ICreateDisappearedDTO'
import { ICreateCaseDTO } from '@modules/case/dtos/ICreateCaseDTO'
import { IQueryDisappearedDTO } from '@modules/disappeareds/dtos/IQueryDisappearedDTO'
import { IDisappearedRepository } from '@modules/disappeareds/repositories/IDisappearedRepository'

import prisma from '@shared/infra/prisma'
import { Disappeared } from '../entites/Disappeared'
import subHours from 'date-fns/subHours'

export class DisappearedRepository implements IDisappearedRepository {
  async create (disappearedData: ICreateDisappearedDTO, caseData: ICreateCaseDTO, ownerID: number, characteristics: number[]): Promise<Disappeared> {
    const disappeared = await prisma.person.create({
      data: {
        personTypeID: 2,
        ownerID,
        ...disappearedData
      }
    })

    for (let index = 0; index < characteristics.length; index++) {
      await prisma.disCharacteristic.create({
        data: {
          personID: disappeared.personID,
          characteristicID: characteristics[index]
        }
      })
    }

    await prisma.case.create({
      data: {
        caseTypeID: 1,
        caseStatusID: 1,
        personID: disappeared.personID,
        ...caseData,
        dateStart: subHours(new Date(), 3)
      }
    })

    return disappeared as Disappeared
  }

  async findDisappearedsByFilters (data: IQueryDisappearedDTO): Promise<Disappeared[]> {
    const disappeareds = await prisma.person.findMany({
      where: {
        age: {
          gte: data.minAge,
          lte: data.maxAge
        },
        ...data.disappeared,
        AND: [
          {
            disCharacteristic: {
              some: {
                characteristicID: data.eyes
              }
            }
          },
          {
            disCharacteristic: {
              some: {
                characteristicID: data.hair
              }
            }
          },
          {
            disCharacteristic: {
              some: {
                characteristicID: data.skin
              }
            }
          },
          {
            disCharacteristic: {
              some: {
                characteristicID: data.typeHair
              }
            }
          }
        ],
        case: {
          some: {
            caseTypeID: {
              in: data.caseTypes
            },
            caseStatusID: {
              in: data.caseStatus
            }
          }
        }
      }
    })

    return disappeareds as Disappeared[]
  }

  async findSimilarDisappeareds (data: ICreateDisappearedDTO, characteristics: number[]): Promise<Disappeared[]> {
    const definedResult = await prisma.person.findMany({
      where: {
        personTypeID: 2,
        personCPF: data.personCPF
      }
    })

    if (definedResult.length > 0) {
      console.log('definedResult')
      return definedResult as Disappeared[]
    }

    const parcialResult = await prisma.person.findMany({
      where: {
        personTypeID: 2,
        name: data.name,
        lastname: data.lastname,
        state: data.state,
        city: data.city,
        gender: data.gender,
        AND: [
          {
            disCharacteristic: {
              some: {
                characteristicID: characteristics[0]
              }
            }
          },
          {
            disCharacteristic: {
              some: {
                characteristicID: characteristics[1]
              }
            }
          },
          {
            disCharacteristic: {
              some: {
                characteristicID: characteristics[2]
              }
            }
          },
          {
            disCharacteristic: {
              some: {
                characteristicID: characteristics[3]
              }
            }
          }
        ]
      }
    })

    if (parcialResult.length <= 10) {
      console.log('parcialResult')
      return parcialResult as Disappeared[]
    }

    return []
  }
}
