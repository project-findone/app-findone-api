import { ValidationError } from 'joi'
import { AppError } from './AppError'

export class JoiValidationError {
  private message = 'Os parâmetros são inválidos.'
  constructor (err: ValidationError) {
    const validationErrors = ['is not allowed', 'is required', 'must be a']

    validationErrors.forEach((validation, index) => {
      const validMatch = new RegExp(`(?<prop>".+")\\s*(?<verification>${validation})\\s*(?<type>.*)`, 'si')
        .exec(err.message)

      if (validMatch) {
        let { prop, type } = validMatch.groups as {prop: string, type: string}
        prop = prop.replace(/"/g, '')
        switch (index) {
          case 0:
            if (prop) this.message = `A propriedade '${prop}' não é permitida.`
            break
          case 1:
            if (prop) this.message = `A propriedade '${prop}' é obrigatória.`
            break
          case 2:
            if (prop && type) this.message = `A propriedade '${prop}' precisa ser do tipo ${type}.`
        }
      }
    })
    throw new AppError(this.message, 400, 'Validation Error')
  }
}
