"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { MenuCategory } from "@/types/menu";
import { useMenuEditor } from "@/hooks/useMenuEditor";
import EditableCategory from "./EditableCategory";

interface Props {
  initial: MenuCategory[];
  onChange?: (categories: MenuCategory[]) => void;
}

export default function MenuEditor({ initial, onChange }: Props) {
  const {
    categories,
    setCategories,
    addCategory,
    updateCategory,
    removeCategory,
    addItem,
    updateItem,
    removeItem,
  } = useMenuEditor(initial);

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  useEffect(() => {
    onChange?.(categories);
  }, [categories, onChange]);

  const findCategoryByItemId = (itemId: string) =>
    categories.find((c) => c.items.some((i) => i.id === itemId));

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(String(e.active.id));
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeType = active.data.current?.type;
    if (activeType !== "item") return;

    const activeCatId = active.data.current?.categoryId as string;
    const overData = over.data.current;

    let targetCatId: string | undefined;
    if (overData?.type === "item") targetCatId = overData.categoryId;
    else if (overData?.type === "category-dropzone")
      targetCatId = overData.categoryId;

    if (!targetCatId || targetCatId === activeCatId) return;

    setCategories((prev) => {
      const next = prev.map((c) => ({ ...c, items: [...c.items] }));
      const fromCat = next.find((c) => c.id === activeCatId);
      const toCat = next.find((c) => c.id === targetCatId);
      if (!fromCat || !toCat) return prev;

      const idx = fromCat.items.findIndex((i) => i.id === active.id);
      if (idx === -1) return prev;
      const [moved] = fromCat.items.splice(idx, 1);

      if (overData?.type === "item") {
        const overIdx = toCat.items.findIndex((i) => i.id === over.id);
        toCat.items.splice(overIdx, 0, moved);
      } else {
        toCat.items.push(moved);
      }
      return next;
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveId(null);
    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type;

    if (activeType === "category") {
      setCategories((prev) => {
        const from = prev.findIndex((c) => c.id === active.id);
        const to = prev.findIndex((c) => c.id === over.id);
        if (from === -1 || to === -1) return prev;
        const next = [...prev];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        return next;
      });
      return;
    }

    if (activeType === "item") {
      const cat = findCategoryByItemId(String(active.id));
      const overCat = findCategoryByItemId(String(over.id));
      if (!cat || !overCat || cat.id !== overCat.id) return;

      setCategories((prev) =>
        prev.map((c) => {
          if (c.id !== cat.id) return c;
          const from = c.items.findIndex((i) => i.id === active.id);
          const to = c.items.findIndex((i) => i.id === over.id);
          if (from === -1 || to === -1) return c;
          const items = [...c.items];
          const [moved] = items.splice(from, 1);
          items.splice(to, 0, moved);
          return { ...c, items };
        }),
      );
    }
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categories.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {categories.map((cat) => (
            <EditableCategory
              key={cat.id}
              category={cat}
              onUpdateCategory={(patch) => updateCategory(cat.id, patch)}
              onRemoveCategory={() => removeCategory(cat.id)}
              onAddItem={() => addItem(cat.id)}
              onUpdateItem={(itemId, patch) =>
                updateItem(cat.id, itemId, patch)
              }
              onRemoveItem={(itemId) => removeItem(cat.id, itemId)}
            />
          ))}
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <div
              className="rounded-md p-3 shadow-2xl"
              style={{
                background: "var(--color-surface)",
                color: "var(--color-text)",
              }}
            >
              Przenoszenie…
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <button
        onClick={addCategory}
        className="mt-4 w-full py-3 font-medium transition-all hover:scale-[1.01]"
        style={{
          background: "var(--color-primary)",
          color: "var(--color-bg)",
          borderRadius: "var(--radius)",
        }}
      >
        + Dodaj kategorię
      </button>
    </div>
  );
}
