export interface ICreateDisappearedDTO {
  case: {
    state: string
    city: string
    district?: string
    street: string
    description: string
    latitude: string
    longitude: string
  }
  disappeared: {
    name: string
    lastname: string
    age?: number
    birthDate?: string | Date
    personCPF?: string
    gender: string
    personCEP: string
    state: string
    city: string
    personDeficiency?: string
    personKinship: string
    description: string
  }
  characteristics: number[]
  passCheck: boolean
}
