import { Contribution } from '@prisma/client'

export class EntityContribution implements Contribution {
  public contributionID!: string
  public sessionChatID!: string
  public categoryID!: number
  public description!: string
  public score!: number | null
  public dateTimeSend!: Date
  public issuer!: string

  constructor (props: EntityContribution) {
    Object.assign(this, props)
  }
}
