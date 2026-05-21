import { Container } from "@/components/ui/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "وبلاگ",
};

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-bg pt-24 pb-dock-safe">
      <Container narrow>
        <h1 className="text-white mb-4">وبلاگ</h1>
        <p className="text-muted">به‌زودی...</p>
      </Container>
    </main>
  );
}
