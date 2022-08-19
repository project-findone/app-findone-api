import { Person } from '@prisma/client'

export class User implements Person {
  public person_id!: number
  public personType_id!: number
  public name!: string
  public lastname!: string
  public birth_date!: Date | null
  public personCPF!: string | null
  public age!: number | null
  public gender!: string | null
  public email!: string | null
  public password!: string | null
  public phone_number!: string | null
  public personCEP!: number
  public state_id!: number
  public city!: string
  public person_biografy!: string | null
  public score!: number | null
  public owner_id!: number | null
  public person_deficiency!: string | null
  public person_kinship!: string | null
  public person_image!: string | null

  constructor (props: User) {
    Object.assign(this, props)
  }
}
