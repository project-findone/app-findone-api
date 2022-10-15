import { injectable } from 'tsyringe'

import { AppError } from '@shared/error/AppError'

import AutomaticArchiveCaseService from '@modules/case/services/AutomaticArchiveCaseService'

@injectable()
export default class MiddleArchiveService {
  private archiveService: AutomaticArchiveCaseService
  constructor () {
    this.archiveService = new AutomaticArchiveCaseService()
  }

  public async handle (personID: number, archiveOption: 'start' | 'stop'): Promise<void> {
    if (!personID || typeof personID !== 'number') {
      throw new AppError(' Não foi possível acessar o ID do usuário.', 400)
    }

    if (archiveOption === 'start') {
      await this.archiveService.startTask(personID)
    } else {
      await this.archiveService.stopTask()
    }
  }
}

export const middleArchiveService = new MiddleArchiveService()
