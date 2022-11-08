import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../repositories/IUsersRepository'

import { AppError } from '@shared/error/AppError'
import { ICasesRepository } from '@modules/case/repositories/ICasesRepository'

@injectable()
class JoinCaseService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('CasesRepository')
    private caseRepository: ICasesRepository
  ) {}

  public async handle (caseID: string, supporterID: string): Promise<{} | null> {
    if (!caseID || typeof caseID !== 'string') {
      throw new AppError(' Não foi possível acessar o ID do caso.', 500)
    }

    const caseFounded = await this.caseRepository.findCaseByID(caseID)
    if (!caseFounded) throw new AppError('O caso informado não existe.', 404)

    const { case: caseF, supporters } = caseFounded

    if (caseF.person?.ownerID === supporterID) throw new AppError('Você não pode ingressar a um caso que cadastrou.', 403)

    const supporterFounded = supporters.find(({ personID }) => (personID === supporterID))
    if (supporterFounded) throw new AppError('Você já ingressou ao caso.', 403)

    const supportCase = await this.userRepository.joinCase(caseID, supporterID)

    if (supportCase !== null) {
      return supportCase
    }

    throw new AppError('Não foi possível ingressar no caso.', 500)
  }
}

export default JoinCaseService
