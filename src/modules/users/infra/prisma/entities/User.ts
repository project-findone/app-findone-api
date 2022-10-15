import { Person } from '@prisma/client'

export class User implements Person {
  public personID!: number
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
  public personBiografy!: string | null
  public score!: number | null
  public ownerID!: number | null
  public personDeficiency!: string | null
  public personKinship!: string | null
  public personImage!: string | null
  public description!: string | null
  public verified!: boolean

  constructor (props: User) {
    Object.assign(this, props)
  }
}
