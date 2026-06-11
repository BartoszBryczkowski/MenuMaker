import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const user = await prisma.user.findUnique({
    where: { slug },
    select: {
      slug: true,
      theme: true,
      menu: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Nie znaleziono użytkownika" },
      { status: 404 },
    );
  }

  return NextResponse.json(user);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { slug },
      data: {
        ...(body.menu !== undefined ? { menu: body.menu } : {}),
        ...(body.theme !== undefined ? { theme: body.theme } : {}),
      },
      select: {
        slug: true,
        theme: true,
        menu: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    if (error?.code === "P2025") {
      return NextResponse.json(
        { error: "Nie znaleziono użytkownika" },
        { status: 404 },
      );
    }

    return NextResponse.json({ error: "Błąd podczas zapisu" }, { status: 500 });
  }
}
