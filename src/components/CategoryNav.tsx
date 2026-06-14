"use client";

import { MenuCategory } from "@/types/menu";

interface Props {
  categories: MenuCategory[];
}

export default function CategoryNav({ categories }: Props) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="sticky top-0 z-40 flex gap-2 overflow-x-auto px-4 py-3 backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--color-bg) 85%, transparent)",
        borderBottom:
          "1px solid color-mix(in srgb, var(--color-text) 10%, transparent)",
      }}
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => scrollTo(cat.id)}
          className="shrink-0 px-4 py-2 text-sm font-medium transition-all hover:scale-105 active:scale-95"
          style={{
            background: "var(--color-surface)",
            color: "var(--color-text)",
            borderRadius: "var(--radius)",
            border:
              "1px solid color-mix(in srgb, var(--color-text) 10%, transparent)",
          }}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  );
}
