import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function createEntries() {
  const createMany = await prisma.product.createMany({
    data: [
      {
        title: "CSC 131 Study Guide",
        desc: "This is Study Guide is made specifically for Computer Science 131 Course at California State University, Sacramento.",
        price: 100,
      },
      {
        title: "CSC 60 Study Guide",
        desc: "This is Study Guide is made specifically for Computer Science 60 Course at California State University, Sacramento.",
        price: 10,
      },
      {
        title: "CSC 35 Study Guide",
        desc: "This is Study Guide is made specifically for Computer Science 35 Course at California State University, Sacramento.",
        price: 5,
      },
    ],
  });
}
