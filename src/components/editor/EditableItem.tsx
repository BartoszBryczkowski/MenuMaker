"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MenuItem } from "@/types/menu";

interface Props {
  item: MenuItem;
  categoryId: string;
  onUpdate: (patch: Partial<MenuItem>) => void;
  onRemove: () => void;
}

export default function EditableItem({
  item,
  categoryId,
  onUpdate,
  onRemove,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: { type: "item", categoryId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    background: "var(--color-surface)",
    borderRadius: "var(--radius)",
    border: "1px solid color-mix(in srgb, var(--color-text) 10%, transparent)",
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-2 p-3">
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none px-1 py-2 text-lg opacity-50 hover:opacity-100 active:cursor-grabbing"
        style={{ color: "var(--color-text)" }}
        aria-label="Przeciągnij"
      >
        ≡
      </button>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            value={item.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Nazwa"
            className="flex-1 bg-transparent font-semibold outline-none"
            style={{ color: "var(--color-text)" }}
          />
          <input
            type="number"
            step="0.01"
            min="0"
            value={item.price}
            onChange={(e) =>
              onUpdate({ price: parseFloat(e.target.value) || 0 })
            }
            className="w-24 bg-transparent text-right outline-none"
            style={{ color: "var(--color-text)" }}
          />
          <span style={{ color: "var(--color-text-secondary)" }}>zł</span>
        </div>

        <textarea
          value={item.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Opis (opcjonalnie)"
          rows={2}
          className="resize-none bg-transparent text-sm outline-none"
          style={{ color: "var(--color-text-secondary)" }}
        />

        <div className="flex items-center gap-3 text-sm">
          <label className="flex cursor-pointer items-center gap-1.5">
            <input
              type="checkbox"
              checked={item.available}
              onChange={(e) => onUpdate({ available: e.target.checked })}
            />
            <span style={{ color: "var(--color-text-secondary)" }}>
              Dostępne
            </span>
          </label>

          <button
            onClick={onRemove}
            className="ml-auto text-xs opacity-60 hover:opacity-100"
            style={{ color: "#dc2626" }}
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  );
}
