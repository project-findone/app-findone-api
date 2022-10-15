export interface IUpdateUserDTO {
  personID: number
  name?: string
  lastname?: string
  birthDate?: Date
  gender?: string
  email?: string
  password?: string
  phoneNumber?: string
  personCEP?: string
  state?: string
  city?: string
  personBiografy?: string | null
  personImage?: string | null
  verified: boolean | undefined
}
