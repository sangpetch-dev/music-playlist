import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test1() {
  const users = await prisma.user.findMany(); // or whatever model you have
  console.log(users);
}

test1();
