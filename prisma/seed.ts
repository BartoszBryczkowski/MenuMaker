import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: {
      email: "jan@example.com",
    },
    update: {
      slug: "stary-dom",
      passwordHash,
      restaurantName: "Twoje Smaki",
      subtitle: "Mała włoska restauracja",
      theme: {
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
      },
      menu: [
        {
          id: "cat-1",
          name: "🍕 Pizza",
          items: [
            {
              id: "p1",
              name: "Margherita",
              description:
                "Pomidory San Marzano, świeża mozzarella, bazylia, oliwa extra virgin",
              price: 32,
              tags: ["wegetariańskie", "klasyczne"],
              available: true,
              image:
                "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
            },
            {
              id: "p2",
              name: "Diavola",
              description:
                "Pikantne salami, mozzarella, płatki chili, pieczona papryka",
              price: 38,
              tags: ["pikantne"],
              available: true,
              image:
                "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
            },
            {
              id: "p3",
              name: "Quattro Formaggi",
              description:
                "Mozzarella, gorgonzola, parmezan, fontina na białym spodzie",
              price: 42,
              tags: ["wegetariańskie", "serowe"],
              available: false,
            },
          ],
        },
        {
          id: "cat-2",
          name: "🥗 Sałatki",
          items: [
            {
              id: "s1",
              name: "Cezar",
              description:
                "Sałata rzymska, grzanki, parmezan, dressing anchois, grillowany kurczak",
              price: 28,
              tags: ["popularne"],
              available: true,
            },
            {
              id: "s2",
              name: "Sałatka grecka",
              description:
                "Pomidory, ogórek, czerwona cebula, oliwki, ser feta, oregano",
              price: 26,
              tags: ["wegetariańskie", "świeże"],
              available: true,
            },
          ],
        },
        {
          id: "cat-3",
          name: "🍝 Makarony",
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
        {
          id: "cat-4",
          name: "🍰 Desery",
          items: [
            {
              id: "d1",
              name: "Tiramisu",
              description: "Mascarpone, biszkopty nasączone espresso, kakao",
              price: 22,
              tags: ["klasyczne"],
              available: true,
            },
            {
              id: "d2",
              name: "Panna Cotta",
              description: "Krem waniliowy z kompotem z owoców sezonowych",
              price: 20,
              tags: ["wegetariańskie"],
              available: true,
            },
          ],
        },
        {
          id: "cat-5",
          name: "🥤 Napoje",
          items: [
            {
              id: "n1",
              name: "Lemoniada domowa",
              description:
                "Świeża cytryna, mięta, cukier trzcinowy, woda gazowana",
              price: 14,
              tags: ["świeże"],
              available: true,
            },
            {
              id: "n2",
              name: "Espresso",
              description: "Podwójne espresso, 100% ziaren Arabiki",
              price: 10,
              tags: ["klasyczne"],
              available: true,
            },
            {
              id: "n3",
              name: "Aperol Spritz",
              description:
                "Aperol, prosecco, woda gazowana, plaster pomarańczy",
              price: 24,
              tags: ["alkohol"],
              available: true,
            },
          ],
        },
      ],
    },
    create: {
      slug: "stary-dom",
      email: "jan@example.com",
      passwordHash,
      restaurantName: "Twoje Smaki",
      subtitle: "Mała włoska restauracja",
      theme: {
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
      },
      menu: [
        {
          id: "cat-1",
          name: "🍕 Pizza",
          items: [
            {
              id: "p1",
              name: "Margherita",
              description:
                "Pomidory San Marzano, świeża mozzarella, bazylia, oliwa extra virgin",
              price: 32,
              tags: ["wegetariańskie", "klasyczne"],
              available: true,
              image:
                "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
            },
            {
              id: "p2",
              name: "Diavola",
              description:
                "Pikantne salami, mozzarella, płatki chili, pieczona papryka",
              price: 38,
              tags: ["pikantne"],
              available: true,
              image:
                "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
            },
            {
              id: "p3",
              name: "Quattro Formaggi",
              description:
                "Mozzarella, gorgonzola, parmezan, fontina na białym spodzie",
              price: 42,
              tags: ["wegetariańskie", "serowe"],
              available: false,
            },
          ],
        },
        {
          id: "cat-2",
          name: "🥗 Sałatki",
          items: [
            {
              id: "s1",
              name: "Cezar",
              description:
                "Sałata rzymska, grzanki, parmezan, dressing anchois, grillowany kurczak",
              price: 28,
              tags: ["popularne"],
              available: true,
            },
            {
              id: "s2",
              name: "Sałatka grecka",
              description:
                "Pomidory, ogórek, czerwona cebula, oliwki, ser feta, oregano",
              price: 26,
              tags: ["wegetariańskie", "świeże"],
              available: true,
            },
          ],
        },
        {
          id: "cat-3",
          name: "🍝 Makarony",
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
        {
          id: "cat-4",
          name: "🍰 Desery",
          items: [
            {
              id: "d1",
              name: "Tiramisu",
              description: "Mascarpone, biszkopty nasączone espresso, kakao",
              price: 22,
              tags: ["klasyczne"],
              available: true,
            },
            {
              id: "d2",
              name: "Panna Cotta",
              description: "Krem waniliowy z kompotem z owoców sezonowych",
              price: 20,
              tags: ["wegetariańskie"],
              available: true,
            },
          ],
        },
        {
          id: "cat-5",
          name: "🥤 Napoje",
          items: [
            {
              id: "n1",
              name: "Lemoniada domowa",
              description:
                "Świeża cytryna, mięta, cukier trzcinowy, woda gazowana",
              price: 14,
              tags: ["świeże"],
              available: true,
            },
            {
              id: "n2",
              name: "Espresso",
              description: "Podwójne espresso, 100% ziaren Arabiki",
              price: 10,
              tags: ["klasyczne"],
              available: true,
            },
            {
              id: "n3",
              name: "Aperol Spritz",
              description:
                "Aperol, prosecco, woda gazowana, plaster pomarańczy",
              price: 24,
              tags: ["alkohol"],
              available: true,
            },
          ],
        },
      ],
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
