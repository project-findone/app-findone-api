import { PersonEntity } from '@shared/infra/prisma/entities/Person'

export class Supporter extends PersonEntity {
  public personID!: string
  public personTypeID!: number
  public name!: string
  public lastname!: string
  public birthDate!: Date
  public personCPF!: string
  public age!: number | null
  public gender!: string
  public email!: string
  public password!: string
  public phoneNumber!: string
  public personCEP!: string
  public state!: string
  public city!: string
  public personBiografy!: string
  public score!: number
  public ownerID!: string | null
  public personDeficiency!: string | null
  public personKinship!: string | null
  public personImage!: string | null
  public description!: string | null
  public verified!: boolean

  constructor (props: Supporter) {
    super(props)
    Object.assign(this, props)
  }
}
