import { injectable } from 'tsyringe'

import { AppError } from '@shared/error/AppError'

import AutomaticArchiveCaseService from '@modules/case/services/AutomaticArchiveCaseService'

@injectable()
export default class MiddleArchiveService {
  private archiveService: AutomaticArchiveCaseService
  constructor () {
    this.archiveService = new AutomaticArchiveCaseService()
  }

  public async handle (personID: string, archiveOption: 'start' | 'stop'): Promise<void> {
    if (!personID || typeof personID !== 'string') {
      throw new AppError(' Não foi possível acessar o ID do usuário.', 500)
    }

    if (archiveOption === 'start') {
      await this.archiveService.startTask(personID)
    } else {
      await this.archiveService.stopTask()
    }
  }
}

export const middleArchiveService = new MiddleArchiveService()
