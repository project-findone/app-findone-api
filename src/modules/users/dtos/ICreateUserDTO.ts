
export interface ICreateUserDTO {
  TB_PESSOA_ID: number
  PESSOA_TIPO_ID_FK: number
  TB_PESSOA_NOME: string
  TB_PESSOA_SOBRENOME: string | null
  TB_PESSOA_DATA_NASC: Date | null
  TB_PESSOA_CPF: number | null
  TB_PESSOA_IDADE: number | null
  TB_PESSOA_SEXO: string | null
  TB_PESSOA_EMAIL: string
  TB_PESSOA_SENHA: string | null
  TB_PESSOA_TEL: string | null
  TB_PESSOA_CEP: number | null
  ESTADO_ID_FK: number | null
  TB_PESSOA_CIDADE: string | null
  TB_PESSOA_BIO: string | null
  TB_PESSOA_PONTOS: number | null
  PESSOA_RESPONSAVEL_FK: number | null
  TB_PESSOA_DEFIENCIA: string | null
  TB_PESSOA_PARENTESCO: string | null
  TB_PESSOA_IMAGEM: Buffer | null
  TB_PESSOA_CARACTERISTICA_AD: string | null
}
