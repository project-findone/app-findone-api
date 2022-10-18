export interface IQueryDisappearedDTO {
  disappeared: {
    name: string | undefined
    gender: string | undefined
    state: string | undefined
    city: string | undefined
    CPF: string | undefined
    deficiency: string | undefined
    description: string | undefined
  }
  minAge: number | undefined
  maxAge: number | undefined
  caseTypes: number[] | undefined
  caseStatus: number[] | undefined
  skin: number | undefined
  hair: number | undefined
  eyes: number | undefined
  typeHair: number | undefined
}
