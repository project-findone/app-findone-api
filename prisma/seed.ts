import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main (): Promise<void> {
  await prisma.personType.create({
    data: {
      personTypeName: 'Usuário'
    }
  })
  await prisma.personType.create({
    data: {
      personTypeName: 'Desaparecido'
    }
  })
  await prisma.state.create({
    data: {
      stateName: 'SP'
    }
  })
  await prisma.state.create({
    data: {
      stateName: 'SP'
    }
  })
  await prisma.characteristicType.create({
    data: {
      characteristicTypeName: 'Cor dos olhos'
    }
  })
  await prisma.characteristicType.create({
    data: {
      characteristicTypeName: 'Cor da pele'
    }
  })
  await prisma.characteristicType.create({
    data: {
      characteristicTypeName: 'Cor do cabelo'
    }
  })
  await prisma.characteristic.create({
    data: {
      characteristicTypeID: 1,
      characteristicName: 'Azul'
    }
  })
  await prisma.characteristic.create({
    data: {
      characteristicTypeID: 1,
      characteristicName: 'Verde'
    }
  })
  await prisma.characteristic.create({
    data: {
      characteristicTypeID: 1,
      characteristicName: 'Castanho'
    }
  })
  await prisma.characteristic.create({
    data: {
      characteristicTypeID: 2,
      characteristicName: 'Branca'
    }
  })
  await prisma.characteristic.create({
    data: {
      characteristicTypeID: 2,
      characteristicName: 'Preta'
    }
  })
  await prisma.characteristic.create({
    data: {
      characteristicTypeID: 2,
      characteristicName: 'Parda'
    }
  })
  await prisma.characteristic.create({
    data: {
      characteristicTypeID: 3,
      characteristicName: 'Loiro'
    }
  })
  await prisma.characteristic.create({
    data: {
      characteristicTypeID: 3,
      characteristicName: 'Preto'
    }
  })
  await prisma.characteristic.create({
    data: {
      characteristicTypeID: 3,
      characteristicName: 'Castanho'
    }
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
