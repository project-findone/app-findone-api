import nodemailer, { Transporter } from 'nodemailer'
import { IMailProvider } from '../Models/IMailProvider'

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

  public async sendMail (to: string, body: string): Promise<void> {
    if (!this.client) {
      throw new Error(' O transportador precisa ser iniciado.')
    }

    const message = await this.client.sendMail({
      from: ' Equipe FindOne <projetofindone@gmail.com> ',
      to,
      subject: 'Código de Verificação - FindOne',
      text: body
    })

    console.log('Message sent: %s', message.messageId)
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
