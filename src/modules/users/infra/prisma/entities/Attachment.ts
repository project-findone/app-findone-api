import { Attachment } from '@prisma/client'

export class EntityAttachment implements Attachment {
  public attachmentID!: string
  public attachmentName!: string
  public contributionID!: string

  constructor (props: EntityAttachment) {
    Object.assign(this, props)
  }
}
