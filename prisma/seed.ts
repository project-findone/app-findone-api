import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main (): Promise<void> {
  await prisma.personType.create({
    data: {
      personTypeName: 'Usuário'
    }
  })
  await prisma.state.create({
    data: {
      stateName: 'SP'
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
