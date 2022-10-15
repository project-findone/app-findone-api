import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main (): Promise<void> {
  await prisma.personType.createMany({
    data: [
      { personTypeName: 'Usuário' },
      { personTypeName: 'Desaparecido' },
      { personTypeName: 'Sumido' },
      { personTypeName: 'Apoiador' }
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
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
