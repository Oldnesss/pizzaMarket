import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query =
    req.nextUrl.searchParams.get("query")?.trim().toLowerCase() || "";

  const products = await prisma.product.findMany();

  if (!query) {
    return NextResponse.json(products.slice(0, 5));
  }

  // Проверяем, если query есть, приводим и название продуктов, и запрос к нижнему регистру
  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(query))
    .slice(0, 5);

  return NextResponse.json(filteredProducts);
}
