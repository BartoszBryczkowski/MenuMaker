// src/lib/saveTheme.ts
import { ThemeConfig } from "@/types/menu";

export async function saveTheme(slug: string, theme: ThemeConfig) {
  const res = await fetch(`/api/users/${slug}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ theme }),
  });

  if (!res.ok) {
    throw new Error("Nie udało się zapisać motywu");
  }
}
