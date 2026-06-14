"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { MenuCategory } from "@/types/menu";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import CategorySection from "@/components/CategorySection";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import MenuEditor from "@/components/editor/MenuEditor";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { ThemeConfig } from "@/types/menu";

type PublicUser = {
  slug: string;
  theme: ThemeConfig | null;
  menu: MenuCategory[];
  restaurantName: string | null;
  subtitle?: string | null;
};

export default function MenuPageClient({ user }: { user: PublicUser }) {
  const router = useRouter();
  const { isAuthenticated, slug } = useAuth();
  const [categories, setCategories] = useState<MenuCategory[]>(user.menu ?? []);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { theme, cssVars, setTheme } = useTheme();
  const handleToggleEdit = async () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(`/api/users/${user.slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menu: categories,
          theme: user.theme ?? theme,
        }),
      });

      if (!res.ok) {
        throw new Error("Nie udało się zapisać zmian");
      }

      setEditMode(false);
    } catch (error) {
      console.error(error);
      alert("Błąd podczas zapisu zmian");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Nie udało się wylogować");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Błąd podczas wylogowywania");
    } finally {
      setLoggingOut(false);
    }
  };
  useEffect(() => {
    if (user.theme) {
      setTheme(user.theme as ThemeConfig);
    }
  }, []);
  return (
    <div
      style={cssVars}
      className="min-h-screen transition-colors duration-400"
    >
      <div className="mx-auto max-w-4xl px-4">
        <Header
          restaurantName={user.restaurantName || user.slug}
          subtitle={user.subtitle || "Twoje publiczne menu"}
        />

        <div className="flex justify-between gap-3 py-2">
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-sm font-medium transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background: "var(--color-surface)",
              color: "var(--color-text)",
              borderRadius: "var(--radius)",
              border:
                "1px solid color-mix(in srgb, var(--color-text) 10%, transparent)",
            }}
          >
            Strona główna
          </button>
          {slug === user.slug && isAuthenticated && (
            <div className="flex gap-2">
              <button
                onClick={handleToggleEdit}
                disabled={saving || loggingOut}
                className="px-4 py-2 text-sm font-medium transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  background: editMode
                    ? "var(--color-accent)"
                    : "var(--color-surface)",
                  color: "var(--color-text)",
                  borderRadius: "var(--radius)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-text) 10%, transparent)",
                }}
              >
                {saving
                  ? "Zapisywanie..."
                  : editMode
                    ? "✓ Zakończ edycję"
                    : "✎ Edytuj menu"}
              </button>

              <button
                onClick={handleLogout}
                disabled={saving || loggingOut}
                className="px-4 py-2 text-sm font-medium transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                  borderRadius: "var(--radius)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-text) 10%, transparent)",
                }}
              >
                {loggingOut ? "Wylogowywanie..." : "Wyloguj"}
              </button>
            </div>
          )}
        </div>

        {editMode ? (
          <main className="py-6">
            <MenuEditor
              initial={categories}
              onChange={(next) => setCategories(next)}
            />
          </main>
        ) : categories.length === 0 ? (
          <div className="py-20 text-center">
            <p
              className="text-lg"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Menu jest puste.
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
                    layout={theme.layout ?? "classic"}
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
