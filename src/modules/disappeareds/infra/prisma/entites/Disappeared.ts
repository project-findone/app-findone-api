import { Person } from '@prisma/client'

export class Disappeared implements Person {
  public personID!: number
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
  public stateID!: number
  public city!: string
  public personBiografy!: string | null
  public score!: number | null
  public ownerID!: number
  public personDeficiency!: string
  public personKinship!: string
  public personImage!: string | null
  public characteristics!: string
  public verified!: boolean

  constructor (props: Disappeared) {
    Object.assign(this, props)
  }
}
