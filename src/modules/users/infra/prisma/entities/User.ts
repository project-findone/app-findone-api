import { tb_pessoa } from '@prisma/client'

export class User implements tb_pessoa {
  public PESSOA_TIPO_ID_FK!: number
  public TB_PESSOA_DATA_NASC!: Date | null
  public TB_PESSOA_CPF!: number | null
  public TB_PESSOA_IDADE!: number | null
  public TB_PESSOA_SEXO!: string | null
  public TB_PESSOA_EMAIL!: string | null
  public TB_PESSOA_SENHA!: string | null
  public TB_PESSOA_TEL!: string | null
  public TB_PESSOA_CEP!: number | null
  public ESTADO_ID_FK!: number | null
  public TB_PESSOA_CIDADE!: string | null
  public TB_PESSOA_BIO!: string | null
  public TB_PESSOA_PONTOS!: number | null
  public PESSOA_RESPONSAVEL_FK!: number | null
  public TB_PESSOA_DEFIENCIA!: string | null
  public TB_PESSOA_PARENTESCO!: string | null
  public TB_PESSOA_IMAGEM!: Buffer | null
  public TB_PESSOA_CARACTERISTICA_AD!: string | null
  public TB_PESSOA_ID!: number
  public TB_PESSOA_NOME!: string
  public TB_PESSOA_SOBRENOME!: string | null

  constructor (props: User) {
    Object.assign(this, props)
  }
}
