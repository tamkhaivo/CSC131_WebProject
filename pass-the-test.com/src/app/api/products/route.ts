import { db } from "~/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db.product.findMany();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
  }
} 