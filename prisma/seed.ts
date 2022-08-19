import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main (): Promise<void> {
  await prisma.personType.create({
    data: {
      personType_name: 'Usuário'
    }
  })
  await prisma.state.create({
    data: {
      state_name: 'SP'
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
