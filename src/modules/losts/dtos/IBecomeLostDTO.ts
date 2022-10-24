export interface IBecomeLostDTO {
  lost: {
    name: string
    lastname: string
    age: number
    birthDate: Date
    personCPF: string
    gender: string
    personCEP: string
    state: string
    city: string
    personDeficiency: string
    description: string
  }
  case: {
    state: string
    city: string
    district?: string
    street: string
    description: string
    latitude: string
    longitude: string
  }
  characteristics: number[]
}
