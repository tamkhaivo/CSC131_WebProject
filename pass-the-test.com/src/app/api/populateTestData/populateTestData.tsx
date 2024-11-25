import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      const { title, desc, price, sale } = req.body;

      if (!title || !desc || !price) {
        return res
          .status(400)
          .json({ error: "Title, description, and price are required." });
      }

      const product = await prisma.product.create({
        data: {
          title,
          desc,
          price,
          sale: sale || null,
        },
      });

      return res.status(201).json({ product });
    } else {
      res.setHeader("Allow", ["POST"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
