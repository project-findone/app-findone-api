import { ISendMailDTO } from './ISendMailDTO'

export interface IMailProvider{
  initialize(): Promise<void>
  sendMail(data: ISendMailDTO): Promise<void>
}
