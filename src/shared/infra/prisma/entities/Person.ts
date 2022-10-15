import { Person } from '@prisma/client'

export class PersonEntity implements Person {
  public personID!: number
  public personTypeID!: number
  public name!: string
  public lastname!: string
  public birthDate!: Date | null
  public personCPF!: string | null
  public age!: number | null
  public gender!: string | null
  public email!: string | null
  public password!: string | null
  public phoneNumber!: string | null
  public personCEP!: string
  public state!: string
  public city!: string
  public personBiografy!: string | null
  public score!: number | null
  public ownerID!: number | null
  public personDeficiency!: string | null
  public personKinship!: string | null
  public personImage!: string | null
  public description!: string | null
  public verified!: boolean

  constructor (props: PersonEntity) {
    Object.assign(this, props)
  }
}
