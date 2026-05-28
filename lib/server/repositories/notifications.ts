import "server-only";
import { notifications } from "@/lib/server/mock-data";

export function getNotificationLogs() {
  return notifications;
}

export function logSmsNotification(recipient: string, template: string, payload: Record<string, string | number>) {
  notifications.unshift({
    id: `notif-${notifications.length + 1}`,
    channel: "sms",
    recipient,
    template,
    payload,
    sentAt: new Date().toISOString(),
  });
}
