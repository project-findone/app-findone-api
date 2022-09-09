export interface IUpdateUserDTO {
  name: string
  lastname: string
  birth_date: Date
  gender: string
  email: string
  password: string
  phone_number: string
  personCEP: string
  state_id: number
  city: string
  score: 0
  person_biografy: string | null
  person_image: string | null
}
