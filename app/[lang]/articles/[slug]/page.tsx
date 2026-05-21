import { Container } from "@/components/ui/container";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = {
  title: "مقاله",
};

export default async function ArticlePage({ params }: Props) {
  await params;
  notFound();
}
