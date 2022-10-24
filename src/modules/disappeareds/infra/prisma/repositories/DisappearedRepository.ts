import { ICreateDisappearedDTO } from '@modules/disappeareds/dtos/ICreateDisappearedDTO'
import { IQueryDisappearedDTO } from '@modules/disappeareds/dtos/IQueryDisappearedDTO'
import { IDisappearedRepository } from '@modules/disappeareds/repositories/IDisappearedRepository'

import prisma from '@shared/infra/prisma'
import { Disappeared } from '../entites/Disappeared'
import subHours from 'date-fns/subHours'
import { DatabaseError } from '@shared/error/DatabaseError'

export class DisappearedRepository implements IDisappearedRepository {
  async create (data: ICreateDisappearedDTO, ownerID: number): Promise<Disappeared> {
    try {
      const disappeared = await prisma.person.create({
        data: {
          personTypeID: 2,
          ownerID,
          ...data.disappeared
        }
      })

      for (let index = 0; index < data.characteristics.length; index++) {
        await prisma.disCharacteristic.create({
          data: {
            personID: disappeared.personID,
            characteristicID: data.characteristics[index]
          }
        })
      }

      await prisma.case.create({
        data: {
          caseTypeID: 1,
          caseStatusID: 1,
          personID: disappeared.personID,
          ...data.case,
          dateStart: subHours(new Date(), 3)
        }
      })

      return disappeared as Disappeared
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async findDisappearedsByFilters (data: IQueryDisappearedDTO): Promise<Disappeared[]> {
    try {
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
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  async findSimilarDisappeareds (data: ICreateDisappearedDTO): Promise<Disappeared[]> {
    try {
      const definedResult = await prisma.person.findMany({
        where: {
          personTypeID: 2,
          personCPF: data.disappeared.personCPF
        }
      })

      if (definedResult.length > 0) {
        console.log('definedResult')
        return definedResult as Disappeared[]
      }

      const parcialResult = await prisma.person.findMany({
        where: {
          personTypeID: 2,
          name: data.disappeared.name,
          lastname: data.disappeared.lastname,
          state: data.disappeared.state,
          city: data.disappeared.city,
          gender: data.disappeared.gender,
          AND: [
            {
              disCharacteristic: {
                some: {
                  characteristicID: data.characteristics[0]
                }
              }
            },
            {
              disCharacteristic: {
                some: {
                  characteristicID: data.characteristics[1]
                }
              }
            },
            {
              disCharacteristic: {
                some: {
                  characteristicID: data.characteristics[2]
                }
              }
            },
            {
              disCharacteristic: {
                some: {
                  characteristicID: data.characteristics[3]
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
    } catch (err) {
      throw new DatabaseError(err)
    }
  }
}
