import { Case } from '@prisma/client'

export class CaseEntity implements Case {
  public caseID!: string
  public caseTypeID!: number
  public caseStatusID!: number
  public personID!: string
  public state!: string
  public city!: string
  public district!: string | null
  public street!: string | null
  public description!: string
  public dateStart!: Date
  public dateEnd!: Date | null
  public dateArchive!: Date | null
  public latitude!: string
  public longitude!: string
  public person?: { ownerID: string | null } | undefined

  constructor (props: CaseEntity) {
    Object.assign(this, props)
  }
}
