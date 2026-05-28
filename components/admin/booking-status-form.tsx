"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BOOKING_STATUS_LABELS } from "@/lib/admin/format";
import type { BookingStatus } from "@/lib/server/domain";

const STATUS_OPTIONS = Object.keys(BOOKING_STATUS_LABELS) as BookingStatus[];

type BookingStatusFormProps = {
  bookingId: string;
  currentStatus: BookingStatus;
};

export function BookingStatusForm({ bookingId, currentStatus }: BookingStatusFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch(`/api/admin/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const data = (await response.json()) as { ok: boolean; message?: string };

    if (!response.ok || !data.ok) {
      setMessage(data.message || "به‌روزرسانی ناموفق بود.");
      setLoading(false);
      return;
    }

    setMessage("وضعیت رزرو به‌روزرسانی شد.");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card space-y-4 p-5">
      <h3 className="font-semibold text-primary">به‌روزرسانی وضعیت</h3>

      <select
        className="admin-input"
        value={status}
        onChange={(e) => setStatus(e.target.value as BookingStatus)}
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {BOOKING_STATUS_LABELS[option]}
          </option>
        ))}
      </select>

      {message ? <p className="text-sm text-gold-light">{message}</p> : null}

      <Button type="submit" variant="accent" disabled={loading}>
        {loading ? "در حال ذخیره..." : "تکمیل / ذخیره وضعیت"}
      </Button>
    </form>
  );
}
