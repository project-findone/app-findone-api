export interface ICreateUserDTO {
  name: string
  lastname: string
  birthDate: string | Date
  personCPF: string
  gender: string
  email: string
  password: string
  phoneNumber: string
  personCEP: string
  state: string
  city: string
  personBiografy: string | null
  personImage: string | null
}
