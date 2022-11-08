import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { hashSync } from 'bcrypt'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
const prisma = new PrismaClient()

class RandomInsert {
  private names = ['Paulo', 'Arthur', 'Rogério', 'Matheus', 'Mário', 'Gustavo', 'Maria', 'Giovana', 'Yasmim', 'Roberta', 'Sheila', 'Iara']
  private lastnames = ['Silva', 'Andrade', 'Muzy', 'Carvalho', 'Duarte', 'Gomes', 'Lima', 'Soares', 'Vieira', 'Santos', 'Cassiani', 'Muniz', 'Ferreira', 'Farias']
  private personAdress = [['SP', 'Santana de Parnaíba'], ['SP', 'Barueri'], ['SP', 'Osasco'], ['MG', 'Itaú de Minas'], ['MG', 'Belo Horizonte'], ['MG', 'Conêgo Marinho'], ['MG', 'Januária'], ['SP', 'Diadema'], ['ES', 'Vitória']]

  generateRandomUser (): ICreateUserDTO | object {
    const user = { birthDate: new Date(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`), verified: true, disabled: false, personCEP: '06528105', phoneNumber: '975598060', name: undefined, lastname: undefined, gender: undefined, personCPF: undefined, state: undefined, city: undefined, email: undefined, password: undefined }

    const nameNum = Math.floor(Math.random() * this.names.length)
    Object.defineProperty(user, 'name', { value: this.names[nameNum] })

    const lastNameNum = Math.floor(Math.random() * this.lastnames.length)
    Object.defineProperty(user, 'lastname', { value: this.lastnames[lastNameNum] })

    Object.defineProperty(user, 'email', { value: `${this.names[nameNum].toLowerCase()}.${this.lastnames[lastNameNum].toLowerCase()}@gmail.com` })

    Object.defineProperty(user, 'password', { value: hashSync('12345', 12) })

    if (nameNum < 6) {
      Object.defineProperty(user, 'gender', { value: 'Masculino' })
    } else {
      Object.defineProperty(user, 'gender', { value: 'Feminino' })
    }

    const adressNum = Math.floor(Math.random() * this.personAdress.length)
    const [state, city] = this.personAdress[adressNum]
    Object.defineProperties(user, {
      state: { value: state },
      city: { value: city }
    })

    const personCPF = this.generateCPF()
    Object.defineProperty(user, 'personCPF', { value: personCPF })

    return user
  }

  generateCPF (): string {
    const initialDigits = String(Math.random()).match(/\d{9}/)
    if (!initialDigits) throw Error('Não foi possível gerar o CPF.')

    function calcSum (arr: number[]): number {
      let subSequence = 10
      return arr.reduce((previous, current, index) => {
        if (index !== 1) {
          const sum = previous + (current * subSequence)
          subSequence--
          return sum
        } else {
          const sum = (previous * subSequence) + (current * (subSequence - 1))
          subSequence -= 2
          return sum
        }
      })
    }

    const d1Arr = initialDigits[0].split('').map(d => parseInt(d))
    const d1Sum = calcSum(d1Arr)
    const d1 = d1Sum % 11 === 0 ? 0 : d1Sum % 11 === 1 ? 0 : 11 - d1Sum % 11

    const d2Arr = d1Arr.slice(1)
    d2Arr.push(d1)
    const d2Sum = calcSum(d2Arr)
    const d2 = d2Sum % 11 === 0 ? 0 : d2Sum % 11 === 1 ? 0 : 11 - d2Sum % 11

    return `${initialDigits[0]}${d1}${d2}`
  }
}

async function main (): Promise<void> {
  await prisma.personType.createMany({
    data: [
      { personTypeName: 'Apoiador' },
      { personTypeName: 'Desaparecido' },
      { personTypeName: 'Sumido' }
    ]
  })
  await prisma.characteristicType.createMany({
    data: [
      { characteristicTypeName: 'Cor dos olhos' },
      { characteristicTypeName: 'Cor da pele' },
      { characteristicTypeName: 'Cor do cabelo' },
      { characteristicTypeName: 'Tipo do cabelo' }
    ]
  })
  await prisma.characteristic.createMany({
    data: [
      { characteristicTypeName: 'Cor dos olhos', characteristicName: 'Azul' },
      { characteristicTypeName: 'Cor dos olhos', characteristicName: 'Verde' },
      { characteristicTypeName: 'Cor dos olhos', characteristicName: 'Castanho' },

      { characteristicTypeName: 'Cor da pele', characteristicName: 'Branca' },
      { characteristicTypeName: 'Cor da pele', characteristicName: 'Preta' },
      { characteristicTypeName: 'Cor da pele', characteristicName: 'Parda' },

      { characteristicTypeName: 'Cor do cabelo', characteristicName: 'Loiro' },
      { characteristicTypeName: 'Cor do cabelo', characteristicName: 'Preto' },
      { characteristicTypeName: 'Cor do cabelo', characteristicName: 'Castanho' },

      { characteristicTypeName: 'Tipo do cabelo', characteristicName: 'Liso' },
      { characteristicTypeName: 'Tipo do cabelo', characteristicName: 'Cacheados' },
      { characteristicTypeName: 'Tipo do cabelo', characteristicName: 'Crespos' }
    ]
  })
  await prisma.caseType.createMany({
    data: [
      { caseTypeName: 'Desaparecido' },
      { caseTypeName: 'Sumido' }
    ]
  })
  await prisma.caseStatus.createMany({
    data: [
      { caseStatusName: 'Ativo' },
      { caseStatusName: 'Arquivado' },
      { caseStatusName: 'Finalizado' }
    ]
  })
  await prisma.category.createMany({
    data: [
      { categoryName: 'Fotos' },
      { categoryName: 'Documentos' },
      { categoryName: 'Personalizado' }
    ]
  })
  for (let i = 0; i < 10; i++) {
    const user = new RandomInsert().generateRandomUser()
    await prisma.person.create({
      data: {
        personID: uuidv4(),
        personTypeID: 1,
        ...user as ICreateUserDTO
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
