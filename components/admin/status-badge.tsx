import { BOOKING_STATUS_COLORS, BOOKING_STATUS_LABELS } from "@/lib/admin/format";
import type { BookingStatus } from "@/lib/server/domain";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        BOOKING_STATUS_COLORS[status]
      )}
    >
      {BOOKING_STATUS_LABELS[status]}
    </span>
  );
}
