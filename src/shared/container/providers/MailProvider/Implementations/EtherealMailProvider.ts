import nodemailer, { Transporter } from 'nodemailer'
import { IMailProvider } from '../Models/IMailProvider'
import { ISendMailDTO } from '../Models/ISendMailDTO'

export class EtherealMailProvider implements IMailProvider {
  private client!: Transporter

  public async initialize (): Promise<void> {
    const account = await nodemailer.createTestAccount()

    const transporter = await nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    })

    this.client = transporter
  }

  public async sendMail (data: ISendMailDTO): Promise<void> {
    await this.initialize()
    const { email } = data.to

    const message = await this.client.sendMail({
      from: ' Equipe FindOne <projetofindone@gmail.com> ',
      to: email,
      subject: 'Código de Verificação - FindOne',
      text: `Verifique a sua conta para ter acesso à plataforma FindOne! 
      \n \nCódigo de verificação: ${data.body}`
    }).catch(() => { throw new Error('O e-mail informado é inválido.') })

    console.log('Message sent: %s', message.messageId)
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
