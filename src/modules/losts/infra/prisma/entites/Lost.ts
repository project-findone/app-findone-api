import { Person } from '@prisma/client'

export class Lost implements Person {
  public personID!: number
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
  public ownerID!: number
  public personDeficiency!: string
  public personKinship!: string | null
  public personImage!: string | null
  public description!: string
  public verified!: boolean

  constructor (props: Lost) {
    Object.assign(this, props)
  }
}
