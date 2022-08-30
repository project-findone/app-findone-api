export interface IMailProvider{
  initialize(): Promise<void>
  sendMail(to: string, body: string): Promise<void>
}
