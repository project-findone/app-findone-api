import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { User } from '../infra/prisma/entities/User'
import { Supporter } from '@modules/supporters/infra/prisma/entites/Supporter'
import { EntityContribution } from '@modules/supporters/infra/prisma/entites/Contribution'
import { CaseEntity } from '@modules/case/infra/prisma/entites/Case'
import { PersonEntity } from '@shared/infra/prisma/entities/Person'

export interface IUsersRepository{
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByID(personID: number): Promise<User | null>
  verifyEmail(email: string, verify: boolean): Promise<User>
  updatePass(email: string, newPassword: string): Promise<User>
  update(data: IUpdateUserDTO, personID: number): Promise<User>
  updateImage(image: string, personID: number): Promise<User>
  disable(personID: number): Promise<void>
  evaluateContribution(personID: number, contributionID: number, score: number): Promise<EntityContribution>
  queryCases(personID: number): Promise<CaseEntity[] | Array<{}>>
  querySupporters(caseID: number): Promise<Supporter[] | Array<{}>>
  findUserByID(personID: number): Promise<PersonEntity>
  login(personID: number): Promise<void>
  logout(personID: number): Promise<void>
}
