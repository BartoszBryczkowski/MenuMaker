import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

const defaultTheme = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  accent: "#ec4899",
  background: "#0f172a",
  surface: "#1e293b",
  text: "#f8fafc",
  textSecondary: "#cbd5e1",
  borderRadius: "12px",
  layout: "default",
  colorScheme: "dark",
};

const defaultMenu = [
  {
    id: "cat-3",
    name: "🍝 Dania główne",
    items: [
      {
        id: "pa1",
        name: "Carbonara",
        description:
          "Guanciale, żółtko jajka, pecorino romano, czarny pieprz — bez śmietany",
        price: 36,
        tags: ["klasyczne"],
        available: true,
      },
      {
        id: "pa2",
        name: "Pesto Genovese",
        description:
          "Pesto ze świeżej bazylii, orzeszki pinii, parmezan, makaron trofie",
        price: 34,
        tags: ["wegetariańskie"],
        available: true,
      },
      {
        id: "pa3",
        name: "Aglio e Olio",
        description:
          "Czosnek, chili, natka pietruszki, oliwa extra virgin, spaghetti",
        price: 28,
        tags: ["wegetariańskie", "pikantne"],
        available: true,
      },
    ],
  },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, email, password, restaurantName, subtitle } = body;

    if (!slug || !email || !password) {
      return NextResponse.json(
        { error: "Brak wymaganych danych" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { slug }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Użytkownik o takim emailu lub slugu już istnieje" },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        slug,
        email,
        passwordHash,
        restaurantName,
        subtitle,
        theme: defaultTheme,
        menu: defaultMenu,
      },
      select: {
        slug: true,
        email: true,
        theme: true,
        menu: true,
        restaurantName: true,
        subtitle: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const response = NextResponse.json({ ok: true, user }, { status: 201 });

    response.cookies.set("user_slug", user.slug, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Błąd podczas rejestracji" },
      { status: 500 },
    );
  }
}
