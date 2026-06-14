"use client";

import { useSpring, animated } from "@react-spring/web";

interface Props {
  restaurantName: string;
  subtitle?: string;
}

export default function Header({ restaurantName, subtitle }: Props) {
  const titleSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 180, friction: 18 },
  });

  return (
    <animated.header style={titleSpring} className="py-8 text-center">
      <h1
        className="text-4xl font-extrabold tracking-tight md:text-5xl"
        style={{ color: "var(--color-primary)" }}
      >
        {restaurantName}
      </h1>
      {subtitle && (
        <p
          className="mt-2 text-lg"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {subtitle}
        </p>
      )}
      <div
        className="mx-auto mt-4 h-1 w-24"
        style={{
          background: "var(--color-accent)",
          borderRadius: "var(--radius)",
        }}
      />
    </animated.header>
  );
}
