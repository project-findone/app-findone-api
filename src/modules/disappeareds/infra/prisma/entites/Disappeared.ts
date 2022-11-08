import { PersonEntity } from '@shared/infra/prisma/entities/Person'

export class Disappeared extends PersonEntity {
  public personID!: string
  public personTypeID!: number
  public name!: string
  public lastname!: string
  public birthDate!: Date
  public personCPF!: string
  public age!: number | null
  public gender!: string
  public email!: string | null
  public password!: string | null
  public phoneNumber!: string | null
  public personCEP!: string
  public state!: string
  public city!: string
  public personBiografy!: string | null
  public score!: number | null
  public ownerID!: string
  public personDeficiency!: string
  public personKinship!: string
  public personImage!: string | null
  public description!: string
  public verified!: boolean

  constructor (props: Disappeared) {
    super(props)
    Object.assign(this, props)
  }
}
