import { Case } from '@prisma/client'

export class CaseEntity implements Case {
  public caseID!: number
  public caseTypeID!: number
  public caseStatusID!: number
  public personID!: number
  public state!: string
  public city!: string
  public district!: string | null
  public street!: string | null
  public description!: string
  public dateStart!: Date
  public dateEnd!: Date | null
  public latitude!: string
  public longitude!: string

  constructor (props: CaseEntity) {
    Object.assign(this, props)
  }
}
