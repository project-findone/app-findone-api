import { Contribution } from '@prisma/client'

export class EntityContribution implements Contribution {
  public contributionID!: number
  public sessionChatID!: number
  public categoryID!: number
  public description!: string
  public score!: number | null
  public dateTimeSend!: Date
  public issuer!: number

  constructor (props: EntityContribution) {
    Object.assign(this, props)
  }
}
