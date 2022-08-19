
export interface ICreateUserDTO {
  personType_id: number
  name: string
  lastname: string
  birth_date: Date
  personCPF: string
  gender: string
  email: string
  password: string
  phone_number: string
  personCEP: number
  state_id: number
  city: string
  score: 0
  person_biografy: string | null
  person_image: string | null
}
