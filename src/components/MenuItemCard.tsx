// src/components/MenuItemCard.tsx
"use client";

import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { MenuItem } from "@/types/menu";

interface Props {
  item: MenuItem;
  layout: string;
}

export default function MenuItemCard({ item, layout }: Props) {
  const [expanded, setExpanded] = useState(false);

  const expandSpring = useSpring({
    maxHeight: expanded ? 300 : 0,
    opacity: expanded ? 1 : 0,
    config: { tension: 220, friction: 22 },
  });

  const cardSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 200, friction: 20 },
  });

  const scaleSpring = useSpring({
    transform: expanded ? "scale(1.02)" : "scale(1)",
    boxShadow: expanded
      ? "0 8px 30px rgba(0,0,0,0.15)"
      : "0 2px 8px rgba(0,0,0,0.06)",
    config: { tension: 300, friction: 20 },
  });

  const isGrid = layout === "grid";

  return (
    <animated.div
      style={{
        ...cardSpring,
        ...scaleSpring,
        background: "var(--color-surface)",
        borderRadius: "var(--radius)",
        color: "var(--color-text)",
      }}
      className={`cursor-pointer overflow-hidden transition-colors ${
        isGrid ? "flex flex-col" : ""
      } ${!item.available ? "opacity-50 grayscale" : ""}`}
      onClick={() => item.available && setExpanded((e) => !e)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          item.available && setExpanded((prev) => !prev);
        }
      }}
      aria-expanded={expanded}
    >
      {/* Image for grid/modern layouts */}
      {item.image && (isGrid || layout === "modern") && (
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {!item.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-sm font-bold text-white">Niedostępne</span>
            </div>
          )}
        </div>
      )}

      {/* Main row */}
      <div className="flex items-start justify-between gap-4 p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            {!item.available && layout === "classic" && (
              <span
                className="rounded-full px-2 py-0.5 text-xs text-white"
                style={{ background: "var(--color-text-secondary)" }}
              >
                Niedostępne
              </span>
            )}
          </div>

          {layout === "classic" && (
            <p
              className="mt-1 line-clamp-2 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {item.description}
            </p>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-medium"
                  style={{
                    background: "var(--color-accent)",
                    color: "#fff",
                    borderRadius: "var(--radius)",
                    opacity: 0.85,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-1">
          <span
            className="text-lg font-bold whitespace-nowrap"
            style={{ color: "var(--color-accent)" }}
          >
            {item.price.toFixed(2)} zł
          </span>
          <span
            className="text-xs transition-transform duration-200"
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              color: "var(--color-text-secondary)",
            }}
          >
            ▼
          </span>
        </div>
      </div>

      {/* Expanded details */}
      <animated.div
        style={{
          ...expandSpring,
          overflow: "hidden",
        }}
      >
        <div
          className="border-t px-4 pb-4 pt-3"
          style={{ borderColor: "var(--color-bg)" }}
        >
          {item.image && layout === "classic" && (
            <img
              src={item.image}
              alt={item.name}
              className="mb-3 h-48 w-full rounded object-cover"
              style={{ borderRadius: "var(--radius)" }}
            />
          )}

          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {item.description}
          </p>

          {item.available && (
            <button
              className="mt-3 w-full py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                background: "var(--color-accent)",
                borderRadius: "var(--radius)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                // future: add to order
              }}
            >
              Zamów do stolika
            </button>
          )}
        </div>
      </animated.div>
    </animated.div>
  );
}
