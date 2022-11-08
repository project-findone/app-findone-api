import { AppError } from '@shared/error/AppError'

export function birthDateFormat (
  date: string, verifyAge = true
): { dateFormatted: Date, dateSplit: string[] } {
  try {
    const datePatternMatch = date.match(/^\d{2}\/\d{2}\/\d{4}$/s)
    if (!datePatternMatch) throw new Error()

    const dateS = date.split('/')
    dateS.forEach((e, index) => {
      switch (index) {
        case 0:
          if (parseInt(e) > 31 || parseInt(e) === 0) throw new Error()
          break
        case 1:
          if (parseInt(e) > 12 || parseInt(e) === 0) throw new Error()
          break
        case 2:
          if (parseInt(e) < 1900 || parseInt(e) === 0) throw new Error()
          break
      }
    })

    if (verifyAge) {
      const dateSN = dateS.map(e => parseInt(e))
      dateSN.reverse()

      const dateNow = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()]
      if ((dateNow[0] - dateSN[0]) === 18) {
        if ((dateNow[1] === dateSN[1] && dateNow[2] < dateSN[2]) ||
          (dateNow[1] < dateSN[1])) throw new AppError('')
      } else if ((dateNow[0] - dateSN[0]) < 18) throw new AppError('')
    }

    const newDate = new Date(`${dateS.reverse().join('-')}T00:00`)
    return { dateFormatted: newDate, dateSplit: dateS }
  } catch (err) {
    if (err instanceof AppError) throw new AppError('Você deve ser maior de 18 anos.', 403)
    throw new AppError('A data de nascimento é inválida. Ela deve ser no formato: DD/MM/YYYY', 400)
  }
}
