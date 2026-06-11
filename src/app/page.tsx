"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Błąd logowania");
      }

      router.push(`/${data.user.slug}`);
    } catch (error) {
      console.error(error);
      alert("Nieprawidłowy email lub hasło");
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
        {/* Logo / Brand */}
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
            Twórz menu w kilka chwil
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleLogin}
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
              Zaloguj się
            </h2>
            <p
              className="text-sm mt-1"
              style={{
                color: "color-mix(in srgb, var(--color-text) 60%, transparent)",
              }}
            >
              Witaj ponownie, podaj swoje dane
            </p>
          </div>

          {/* Email */}
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

          {/* Password */}
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

          <button
            type="submit"
            disabled={loading}
            className="py-3 mt-2 font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              background: "var(--color-accent)",
              borderRadius: "var(--radius)",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
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
                Logowanie...
              </>
            ) : (
              "Zaloguj się"
            )}
          </button>

          <div
            className="text-center text-xs mt-2"
            style={{
              color: "color-mix(in srgb, var(--color-text) 55%, transparent)",
            }}
          >
            Nie masz konta?{" "}
            <a
              href="/register"
              className="text-sm font-semibold underline hover:opacity-80"
            >
              Zarejestruj się
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
