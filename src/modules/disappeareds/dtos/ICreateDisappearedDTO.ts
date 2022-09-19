export interface ICreateDisappearedDTO {
  name: string
  lastname: string
  age?: number
  birthDate?: Date
  personCPF?: string
  gender: string
  personCEP: string
  stateID: number
  city: string
  ownerID: number
  personDeficiency?: string
  personKinship: string
  personImage: string | null
  characteristics: string
}
