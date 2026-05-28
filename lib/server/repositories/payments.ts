import "server-only";
import { invoices, payments } from "@/lib/server/mock-data";

export function getAllInvoices() {
  return invoices.map((invoice) => ({
    ...invoice,
    payments: payments.filter((payment) => payment.invoiceId === invoice.id),
  }));
}

export function getInvoiceByBookingId(bookingId: string) {
  const invoice = invoices.find((item) => item.bookingId === bookingId);
  if (!invoice) {
    return null;
  }

  return {
    ...invoice,
    payments: payments.filter((payment) => payment.invoiceId === invoice.id),
  };
}
