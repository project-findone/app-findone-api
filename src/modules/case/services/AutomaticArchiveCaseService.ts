import { autoInjectable } from 'tsyringe'
import { ScheduledTask } from 'node-cron'

import { CasesRepository } from '../infra/prisma/repositories/CasesRepository'

import Cron from '@shared/infra/cron/index'

@autoInjectable()
export default class AutomaticArchiveCaseService {
  archiveTask: ScheduledTask | null = null

  constructor (
    private casesRepository?: CasesRepository) {}

  public async stopTask (): Promise<void> {
    if (this.archiveTask) { this.archiveTask.stop() }
  }

  public async startTask (personID: number): Promise<void> {
    this.archiveTask = Cron.schedule('* * * * * *', async () => {
      await this.casesRepository?.archiveAllCase(personID)
      console.log('.')
    })
  }
}

// '0 0 */7 * *'
