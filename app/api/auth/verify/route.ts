import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Указание на динамическую обработку маршрута

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Неверный код" }, { status: 400 });
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: { code },
    });

    if (!verificationCode) {
      return NextResponse.json({ error: "Неверный код" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: verificationCode.userId },
      data: { verified: new Date() },
    });

    await prisma.verificationCode.delete({
      where: { id: verificationCode.id },
    });

    try {
      return NextResponse.redirect(new URL("/?verified", req.url));
    } catch (redirectError) {
      console.error("Ошибка редиректа:", redirectError);
      return NextResponse.json({ error: "Ошибка редиректа" }, { status: 500 });
    }
  } catch (error) {
    console.error("[VERIFY_GET] Server error", error);
    return NextResponse.json(
      { error: "Произошла ошибка на сервере" },
      { status: 500 }
    );
  }
}
