"use client";

import { useState } from "react";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { MenuCategory, MenuItem } from "@/types/menu";
import EditableItem from "./EditableItem";

interface Props {
  category: MenuCategory;
  onUpdateCategory: (patch: Partial<MenuCategory>) => void;
  onRemoveCategory: () => void;
  onAddItem: () => void;
  onUpdateItem: (itemId: string, patch: Partial<MenuItem>) => void;
  onRemoveItem: (itemId: string) => void;
}

export default function EditableCategory({
  category,
  onUpdateCategory,
  onRemoveCategory,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}: Props) {
  const [open, setOpen] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: category.id,
    data: { type: "category" },
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `cat-drop-${category.id}`,
    data: { type: "category-dropzone", categoryId: category.id },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <section ref={setNodeRef} style={style} className="mb-6 rounded-lg p-3">
      <div className="flex items-center gap-2 py-2">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none px-1 text-xl opacity-50 hover:opacity-100 active:cursor-grabbing"
          style={{ color: "var(--color-text)" }}
          aria-label="Przeciągnij kategorię"
        >
          ≡
        </button>

        <button
          onClick={() => setOpen((o) => !o)}
          className="text-lg"
          style={{ color: "var(--color-text)" }}
        >
          {open ? "▼" : "▶"}
        </button>

        <input
          value={category.icon || ""}
          onChange={(e) => onUpdateCategory({ icon: e.target.value })}
          placeholder="🍽️"
          maxLength={4}
          className="w-12 bg-transparent text-center text-2xl outline-none"
        />

        <input
          value={category.name}
          onChange={(e) => onUpdateCategory({ name: e.target.value })}
          placeholder="Nazwa kategorii"
          className="flex-1 bg-transparent text-xl font-bold tracking-tight outline-none"
          style={{ color: "var(--color-primary)" }}
        />

        <span
          className="text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {category.items.length}
        </span>

        <button
          onClick={onRemoveCategory}
          className="px-2 text-sm opacity-60 hover:opacity-100"
          style={{ color: "#dc2626" }}
          title="Usuń kategorię"
        >
          ✕
        </button>
      </div>

      <div
        className="mb-3 h-0.5"
        style={{
          background:
            "linear-gradient(to right, var(--color-accent), transparent)",
        }}
      />

      {open && (
        <div
          ref={setDropRef}
          className="flex flex-col gap-2 rounded-md p-1 transition-colors"
          style={{
            background: isOver
              ? "color-mix(in srgb, var(--color-accent) 10%, transparent)"
              : "transparent",
            minHeight: category.items.length === 0 ? "60px" : undefined,
          }}
        >
          <SortableContext
            items={category.items.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            {category.items.map((item) => (
              <EditableItem
                key={item.id}
                item={item}
                categoryId={category.id}
                onUpdate={(patch) => onUpdateItem(item.id, patch)}
                onRemove={() => onRemoveItem(item.id)}
              />
            ))}
          </SortableContext>

          {category.items.length === 0 && (
            <p
              className="py-3 text-center text-sm italic"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Brak pozycji — przeciągnij tu lub dodaj nową
            </p>
          )}

          <button
            onClick={onAddItem}
            className="mt-1 py-2 text-sm font-medium opacity-70 hover:opacity-100"
            style={{
              border:
                "1px dashed color-mix(in srgb, var(--color-text) 25%, transparent)",
              borderRadius: "var(--radius)",
              color: "var(--color-text)",
            }}
          >
            + Dodaj pozycję
          </button>
        </div>
      )}
    </section>
  );
}
