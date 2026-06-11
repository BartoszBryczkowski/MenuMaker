"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import QrCodeMaker from "@/components/QRCodeMaker";
function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function RegisterForm() {
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newSlug, setNewSlug] = useState<string | null>(null);
  const slug = useMemo(() => slugify(restaurantName), [restaurantName]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          email,
          password,
          restaurantName,
          subtitle: subtitle || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Błąd rejestracji");
      }
      setNewSlug(data.user.slug);
      /*       router.push(`/${data.user.slug}`);
      router.refresh(); */
    } catch (error) {
      console.error(error);
      alert("Nie udało się zarejestrować");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div
            className="flex items-center justify-center w-16 h-16 mb-4 text-2xl font-bold text-white"
            style={{
              background: "var(--color-accent)",
              borderRadius: "var(--radius)",
              boxShadow:
                "0 10px 30px -10px color-mix(in srgb, var(--color-accent) 50%, transparent)",
            }}
          >
            M
          </div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            MenuMaker
          </h1>
          <p
            className="text-sm mt-1"
            style={{
              color: "color-mix(in srgb, var(--color-text) 60%, transparent)",
            }}
          >
            Załóż konto i stwórz menu w kilka chwil
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-5 p-8 backdrop-blur-sm"
          style={{
            background: "var(--color-surface)",
            borderRadius: "var(--radius)",
            border:
              "1px solid color-mix(in srgb, var(--color-text) 10%, transparent)",
            boxShadow:
              "0 20px 50px -20px color-mix(in srgb, var(--color-text) 15%, transparent)",
          }}
        >
          <div>
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Rejestracja
            </h2>
            <p
              className="text-sm mt-1"
              style={{
                color: "color-mix(in srgb, var(--color-text) 60%, transparent)",
              }}
            >
              Utwórz konto dla swojej restauracji
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-medium uppercase tracking-wide"
              style={{
                color: "color-mix(in srgb, var(--color-text) 70%, transparent)",
              }}
            >
              Nazwa restauracji
            </label>
            <input
              type="text"
              placeholder="Twoja Restauracja"
              required
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              onFocus={() => setFocusedField("restaurantName")}
              onBlur={() => setFocusedField(null)}
              className="px-4 py-3 outline-none transition-all"
              style={{
                background: "var(--color-bg)",
                color: "var(--color-text)",
                borderRadius: "var(--radius)",
                border: `1px solid ${
                  focusedField === "restaurantName"
                    ? "var(--color-accent)"
                    : "color-mix(in srgb, var(--color-text) 15%, transparent)"
                }`,
                boxShadow:
                  focusedField === "restaurantName"
                    ? "0 0 0 3px color-mix(in srgb, var(--color-accent) 20%, transparent)"
                    : "none",
              }}
            />

            <p
              className="text-xs"
              style={{
                color: "color-mix(in srgb, var(--color-text) 55%, transparent)",
              }}
            >
              URL:{" "}
              <span className="font-medium">
                /{slug || "twoja-restauracja"}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-medium uppercase tracking-wide"
              style={{
                color: "color-mix(in srgb, var(--color-text) 70%, transparent)",
              }}
            >
              Podtytuł
            </label>
            <input
              type="text"
              placeholder="Mała włoska restauracja"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              onFocus={() => setFocusedField("subtitle")}
              onBlur={() => setFocusedField(null)}
              className="px-4 py-3 outline-none transition-all"
              style={{
                background: "var(--color-bg)",
                color: "var(--color-text)",
                borderRadius: "var(--radius)",
                border: `1px solid ${
                  focusedField === "subtitle"
                    ? "var(--color-accent)"
                    : "color-mix(in srgb, var(--color-text) 15%, transparent)"
                }`,
                boxShadow:
                  focusedField === "subtitle"
                    ? "0 0 0 3px color-mix(in srgb, var(--color-accent) 20%, transparent)"
                    : "none",
              }}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-medium uppercase tracking-wide"
              style={{
                color: "color-mix(in srgb, var(--color-text) 70%, transparent)",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="ty@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className="px-4 py-3 outline-none transition-all"
              style={{
                background: "var(--color-bg)",
                color: "var(--color-text)",
                borderRadius: "var(--radius)",
                border: `1px solid ${
                  focusedField === "email"
                    ? "var(--color-accent)"
                    : "color-mix(in srgb, var(--color-text) 15%, transparent)"
                }`,
                boxShadow:
                  focusedField === "email"
                    ? "0 0 0 3px color-mix(in srgb, var(--color-accent) 20%, transparent)"
                    : "none",
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-medium uppercase tracking-wide"
              style={{
                color: "color-mix(in srgb, var(--color-text) 70%, transparent)",
              }}
            >
              Hasło
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              className="px-4 py-3 outline-none transition-all"
              style={{
                background: "var(--color-bg)",
                color: "var(--color-text)",
                borderRadius: "var(--radius)",
                border: `1px solid ${
                  focusedField === "password"
                    ? "var(--color-accent)"
                    : "color-mix(in srgb, var(--color-text) 15%, transparent)"
                }`,
                boxShadow:
                  focusedField === "password"
                    ? "0 0 0 3px color-mix(in srgb, var(--color-accent) 20%, transparent)"
                    : "none",
              }}
            />
          </div>

          {!newSlug ? (
            <button
              type="submit"
              disabled={loading || !slug}
              className="py-3 mt-2 font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
              style={{
                background: "var(--color-accent)",
                borderRadius: "var(--radius)",
                opacity: loading || !slug ? 0.7 : 1,
                cursor: loading || !slug ? "not-allowed" : "pointer",
                boxShadow:
                  "0 8px 20px -8px color-mix(in srgb, var(--color-accent) 60%, transparent)",
              }}
            >
              {loading ? (
                <>
                  <span
                    className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                    aria-hidden
                  />
                  Rejestracja...
                </>
              ) : (
                "Zarejestruj się"
              )}
            </button>
          ) : (
            "Zarejestrowano!"
          )}
          <QrCodeMaker slug={newSlug} />
          <div
            className="text-center text-xs mt-2"
            style={{
              color: "color-mix(in srgb, var(--color-text) 55%, transparent)",
            }}
          >
            Masz już konto?{" "}
            <a
              href="/"
              className="text-sm font-semibold underline hover:opacity-80"
            >
              Zaloguj się
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
