"use client";

import { useState, useCallback } from "react";
import { MenuCategory, MenuItem } from "@/types/menu";

const uid = () => Math.random().toString(36).slice(2, 10);

export function useMenuEditor(initial: MenuCategory[]) {
  const [categories, setCategories] = useState<MenuCategory[]>(initial);

  const addCategory = useCallback(() => {
    setCategories((prev) => [
      ...prev,
      { id: uid(), name: "Nowa kategoria", icon: "🍽️", items: [] },
    ]);
  }, []);

  const updateCategory = useCallback(
    (id: string, patch: Partial<MenuCategory>) => {
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...patch } : c)),
      );
    },
    [],
  );

  const removeCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const addItem = useCallback((categoryId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              items: [
                ...c.items,
                {
                  id: uid(),
                  name: "Nowa pozycja",
                  description: "",
                  price: 0,
                  available: true,
                },
              ],
            }
          : c,
      ),
    );
  }, []);

  const updateItem = useCallback(
    (categoryId: string, itemId: string, patch: Partial<MenuItem>) => {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                items: c.items.map((i) =>
                  i.id === itemId ? { ...i, ...patch } : i,
                ),
              }
            : c,
        ),
      );
    },
    [],
  );

  const removeItem = useCallback((categoryId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, items: c.items.filter((i) => i.id !== itemId) }
          : c,
      ),
    );
  }, []);

  const reorderCategories = useCallback((fromId: string, toId: string) => {
    setCategories((prev) => {
      const from = prev.findIndex((c) => c.id === fromId);
      const to = prev.findIndex((c) => c.id === toId);
      if (from === -1 || to === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const moveItem = useCallback(
    (
      itemId: string,
      fromCategoryId: string,
      toCategoryId: string,
      toIndex: number,
    ) => {
      setCategories((prev) => {
        const next = prev.map((c) => ({ ...c, items: [...c.items] }));
        const fromCat = next.find((c) => c.id === fromCategoryId);
        const toCat = next.find((c) => c.id === toCategoryId);
        if (!fromCat || !toCat) return prev;
        const idx = fromCat.items.findIndex((i) => i.id === itemId);
        if (idx === -1) return prev;
        const [moved] = fromCat.items.splice(idx, 1);
        toCat.items.splice(toIndex, 0, moved);
        return next;
      });
    },
    [],
  );

  return {
    categories,
    setCategories,
    addCategory,
    updateCategory,
    removeCategory,
    addItem,
    updateItem,
    removeItem,
    reorderCategories,
    moveItem,
  };
}
