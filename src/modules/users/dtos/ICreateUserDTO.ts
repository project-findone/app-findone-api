export interface ICreateUserDTO {
  name: string
  lastname: string
  birthDate: Date
  personCPF: string
  gender: string
  email: string
  password: string
  phoneNumber: string
  personCEP: string
  state: string
  city: string
  score: 0
  personBiografy: string | null
  personImage: string | null
}
