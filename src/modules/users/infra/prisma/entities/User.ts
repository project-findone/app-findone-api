import { Person } from '@prisma/client'

export class User implements Person {
  public person_id!: number
  public personType_id!: number
  public name!: string
  public lastname!: string
  public birth_date!: Date
  public personCPF!: string
  public age!: number | null
  public gender!: string
  public email!: string
  public password!: string
  public phone_number!: string
  public personCEP!: string
  public state_id!: number
  public city!: string
  public person_biografy!: string | null
  public score!: number | null
  public owner_id!: number | null
  public person_deficiency!: string | null
  public person_kinship!: string | null
  public person_image!: string | null
  public verified!: boolean

  constructor (props: User) {
    Object.assign(this, props)
  }
}
