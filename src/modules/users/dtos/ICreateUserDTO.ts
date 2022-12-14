
export interface ICreateUserDTO {
  personTypeID: number
  name: string
  lastname: string
  birthDate: Date
  personCPF: string
  gender: string
  email: string
  password: string
  phoneNumber: string
  personCEP: string
  stateID: number
  city: string
  score: 0
  personBiografy: string | null
  personImage: string | null
}
