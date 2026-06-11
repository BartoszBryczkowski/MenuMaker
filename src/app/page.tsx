// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { MenuCategory } from "@/types/menu";
import { mockCategories } from "@/data/mockMenu";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import CategorySection from "@/components/CategorySection";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function MenuPage() {
  const { theme, cssVars } = useTheme();

  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCategories(mockCategories); //tu fetch
      setLoading(false);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={cssVars}
      className="min-h-screen transition-colors duration-400"
    >
      <div className="mx-auto max-w-4xl px-4">
        <Header
          restaurantName="La Pizzeria"
          subtitle="Mała włoska restauracja"
        />

        {loading ? (
          <div className="flex flex-col items-center gap-4 py-20">
            <div
              className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"
              style={{
                borderColor: "var(--color-accent)",
                borderTopColor: "transparent",
              }}
            />
            <p style={{ color: "var(--color-text-secondary)" }}>
              Ładowanie menu…
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="py-20 text-center">
            <p
              className="text-lg"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Menu jest puste. Dodaj pozycje w panelu administracyjnym.
            </p>
          </div>
        ) : (
          <>
            <CategoryNav categories={categories} />

            <main className="py-6">
              {categories.map((cat, index) => (
                <div key={cat.id} id={cat.id}>
                  <CategorySection
                    category={cat}
                    layout={theme.layout}
                    defaultOpen={index < 2}
                  />
                </div>
              ))}
            </main>
          </>
        )}
      </div>

      <ThemeSwitcher />
    </div>
  );
}
