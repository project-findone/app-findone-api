import { ICreateContributionDTO } from '../dtos/ICreateContributionDTO'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'

import { User } from '../infra/prisma/entities/User'
import { EntityContribution } from '@modules/supporters/infra/prisma/entites/Contribution'
import { EntityAttachment } from '../infra/prisma/entities/Attachment'

export interface IUsersRepository{
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByCPF(personCPF: string): Promise<User | null>
  findByID(userID: string): Promise<User | null>
  verifyEmail(email: string, verify: boolean): Promise<User>
  updatePass(email: string, newPassword: string): Promise<User>
  update(data: IUpdateUserDTO, personID: string): Promise<User>
  updateImage(image: string, personID: string): Promise<User>
  disable(userID: string): Promise<void>
  evaluateContribution(contributionID: string, score: number): Promise<EntityContribution>
  querySupporters(caseID: string): Promise<User[] | Array<{}>>
  login(userID: string): Promise<void>
  logout(userID: string): Promise<void>
  joinCase(caseID: string, supporterID: string): Promise<{} | null>
  sendContribution(data: ICreateContributionDTO, supporterID: string): Promise<EntityContribution>
  sendAttachment(file: string, contributionID: string): Promise<EntityAttachment>
  ranking(state: string, city: string): Promise<User[] | Array<{}>>
}
