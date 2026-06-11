import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const { theme, menu } = body;

    const updatedUser = await prisma.user.update({
      where: { slug },
      data: {
        ...(theme ? { theme } : {}),
        ...(menu ? { menu } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Nie udało się zaktualizować danych" },
      { status: 500 },
    );
  }
}
