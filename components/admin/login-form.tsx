"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("manager");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = (await response.json()) as { ok: boolean; message?: string };

    if (!response.ok || !data.ok) {
      setError(data.message || "ورود ناموفق بود.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card w-full max-w-md space-y-5 p-8">
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-gold">German Group</p>
        <h1 className="text-2xl font-bold text-primary">پنل مدیریت</h1>
        <p className="text-sm text-secondary">ورود مدیر سیستم</p>
      </div>

      <label className="block space-y-2">
        <span className="text-sm text-secondary">نام کاربری</span>
        <input
          className="admin-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-secondary">رمز عبور</span>
        <input
          type="password"
          className="admin-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={loading}>
        {loading ? "در حال ورود..." : "ورود به پنل"}
      </Button>
    </form>
  );
}
