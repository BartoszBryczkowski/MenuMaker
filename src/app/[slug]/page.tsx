import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MenuPageClient from "@/components/MenuPageClient";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const user = await prisma.user.findUnique({
    where: { slug },
    select: {
      slug: true,
      theme: true,
      menu: true,
      restaurantName: true,
      subtitle: true,
    },
  });

  if (!user) {
    notFound();
  }

  const theme =
    user.theme && typeof user.theme === "object" && !Array.isArray(user.theme)
      ? (user.theme as any)
      : null;

  const menu = Array.isArray(user.menu) ? (user.menu as any[]) : [];

  return (
    <MenuPageClient
      user={{
        slug: user.slug,
        theme,
        menu,
        restaurantName: user.restaurantName,
        subtitle: user.subtitle,
      }}
    />
  );
}
