import { Attachment } from '@prisma/client'

export class EntityAttachment implements Attachment {
  public attachmentID!: number
  public attachmentName!: string
  public contributionID!: number

  constructor (props: EntityAttachment) {
    Object.assign(this, props)
  }
}
