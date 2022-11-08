import { ScheduledTask } from 'node-cron'

import { CasesRepository } from '../infra/prisma/repositories/CasesRepository'

import Cron from '@shared/infra/cron/index'

export default class AutomaticArchiveCaseService {
  archiveTask: ScheduledTask | null = null
  private casesRepository: CasesRepository

  constructor () {
    this.casesRepository = new CasesRepository()
  }

  public async stopTask (): Promise<void> {
    console.log('Parou')
    if (this.archiveTask) { this.archiveTask.stop() }
  }

  public async startTask (personID: string): Promise<void> {
    console.log('Começou')
    this.archiveTask = Cron.schedule('*/1 * * * *', async () => {
      console.log('Executou')
      if (this.casesRepository) await this.casesRepository.archiveAllCase(personID)
      this.archiveTask?.stop()
    })
  }
}

// '0 0 */7 * *'
