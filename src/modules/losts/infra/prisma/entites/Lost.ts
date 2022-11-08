import { PersonEntity } from '@shared/infra/prisma/entities/Person'

export class Lost extends PersonEntity {
  public personID!: string
  public personTypeID!: number
  public name!: string
  public lastname!: string
  public birthDate!: Date
  public personCPF!: string
  public age!: number
  public gender!: string
  public email!: string
  public password!: string
  public phoneNumber!: string
  public personCEP!: string
  public state!: string
  public city!: string
  public personBiografy!: string | null
  public score!: number | null
  public ownerID!: string
  public personDeficiency!: string
  public personKinship!: string | null
  public personImage!: string | null
  public description!: string
  public verified!: boolean

  constructor (props: Lost) {
    super(props)
    Object.assign(this, props)
  }
}
