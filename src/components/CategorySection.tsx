// src/components/CategorySection.tsx
"use client";

import { useState } from "react";
import { useSpring, animated, useTrail } from "@react-spring/web";
import { MenuCategory } from "@/types/menu";
import MenuItemCard from "./MenuItemCard";

interface Props {
  category: MenuCategory;
  layout: string;
  defaultOpen?: boolean;
}

export default function CategorySection({
  category,
  layout,
  defaultOpen = true,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const contentSpring = useSpring({
    maxHeight: open ? 2000 : 0,
    opacity: open ? 1 : 0,
    config: { tension: 200, friction: 26 },
  });

  const arrowSpring = useSpring({
    transform: open ? "rotate(0deg)" : "rotate(-90deg)",
    config: { tension: 300, friction: 20 },
  });

  const trail = useTrail(category.items.length, {
    from: { opacity: 0, transform: "translateY(12px)" },
    to: {
      opacity: open ? 1 : 0,
      transform: open ? "translateY(0px)" : "translateY(12px)",
    },
    config: { tension: 220, friction: 22 },
  });

  const isGrid = layout === "grid";

  return (
    <section className="mb-6">
      {/* Category header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center gap-3 py-3 text-left"
      >
        <animated.span style={arrowSpring} className="text-lg">
          ▼
        </animated.span>
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--color-primary)" }}
        >
          {category.name}
        </h2>
        <span
          className="ml-auto text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {category.items.filter((i) => i.available).length}/
          {category.items.length}
        </span>
      </button>

      <div
        className="mb-4 h-0.5"
        style={{
          background: `linear-gradient(to right, var(--color-accent), transparent)`,
        }}
      />

      <animated.div style={{ ...contentSpring, overflow: "hidden" }}>
        <div
          className={
            isGrid
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col gap-3"
          }
        >
          {trail.map((style, i) => (
            <animated.div key={category.items[i].id} style={style}>
              <MenuItemCard item={category.items[i]} layout={layout} />
            </animated.div>
          ))}
        </div>
      </animated.div>
    </section>
  );
}
