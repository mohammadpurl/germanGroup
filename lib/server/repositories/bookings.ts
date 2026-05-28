import "server-only";
import {
  bookingStatusHistory,
  bookings,
  customers,
  invoices,
  payments,
  repairTimeline,
  services,
  vehicles,
} from "@/lib/server/mock-data";
import type { BookingRequestInput, BookingStatus } from "@/lib/server/domain";

const STATUS_TITLES: Record<BookingStatus, string> = {
  requested: "درخواست شده",
  pendingApproval: "در انتظار تایید",
  confirmed: "تایید شده",
  inProgress: "در حال انجام",
  waitingParts: "انتظار قطعه",
  qualityCheck: "کنترل کیفیت",
  completed: "تکمیل شده",
  delivered: "تحویل داده شده",
  cancelled: "لغو شده",
};

export function getAllBookings() {
  return bookings.map((booking) => {
    const customer = customers.find((item) => item.id === booking.customerId) || null;
    const vehicle = vehicles.find((item) => item.id === booking.vehicleId) || null;
    const invoice = invoices.find((item) => item.bookingId === booking.id) || null;

    return {
      ...booking,
      customer,
      vehicle,
      invoice,
    };
  });
}

export function getBookingById(bookingId: string) {
  const booking = bookings.find((item) => item.id === bookingId);
  if (!booking) {
    return null;
  }

  return {
    ...booking,
    customer: customers.find((item) => item.id === booking.customerId) || null,
    vehicle: vehicles.find((item) => item.id === booking.vehicleId) || null,
    statusHistory: bookingStatusHistory.filter((item) => item.bookingId === bookingId),
    timeline: repairTimeline.filter((item) => item.bookingId === bookingId),
    invoice: invoices.find((item) => item.bookingId === bookingId) || null,
  };
}

export function getPortalRecordByPhone(phone: string) {
  const customer = customers.find((item) => item.phone === phone);
  if (!customer) {
    return null;
  }

  const booking = bookings.find((item) => item.customerId === customer.id);
  if (!booking) {
    return null;
  }

  const vehicle = vehicles.find((item) => item.id === booking.vehicleId);
  const invoice = invoices.find((item) => item.bookingId === booking.id);

  if (!vehicle || !invoice) {
    return null;
  }

  return {
    customer,
    vehicle,
    booking,
    invoice,
    payments: payments.filter((item) => item.invoiceId === invoice.id),
    timeline: repairTimeline.filter((item) => item.bookingId === booking.id),
  };
}

export function createMockBooking(input: BookingRequestInput) {
  const customerId = `cust-${customers.length + 1}`;
  const vehicleId = `veh-${vehicles.length + 1}`;
  const bookingId = `book-${bookings.length + 1}`;

  customers.push({
    id: customerId,
    fullName: input.fullName,
    phone: input.phone,
  });

  vehicles.push({
    id: vehicleId,
    customerId,
    brand: input.vehicleBrand,
    model: input.vehicleModel,
    year: input.vehicleYear,
  });

  const newBooking = {
    id: bookingId,
    customerId,
    vehicleId,
    status: "requested" as const,
    requestedDate: input.selectedDate,
    requestedTime: input.selectedTime,
    notes: input.notes,
    ownerPhone: undefined,
    items: input.serviceIds.map((serviceId) => ({
      serviceId,
      quantity: 1,
      unitPrice: 0,
    })),
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);

  bookingStatusHistory.push({
    id: `status-${bookingStatusHistory.length + 1}`,
    bookingId,
    status: "requested",
    title: "رزرو جدید ثبت شد",
    description: "در انتظار تایید پذیرش",
    createdAt: new Date().toISOString(),
  });

  return newBooking;
}

export function getAdminDashboardStats() {
  const today = new Date().toISOString().slice(0, 10);
  const activeStatuses: BookingStatus[] = [
    "confirmed",
    "inProgress",
    "waitingParts",
    "qualityCheck",
  ];
  const pendingStatuses: BookingStatus[] = ["requested", "pendingApproval"];

  const activeCars = bookings.filter((b) => activeStatuses.includes(b.status)).length;
  const pendingServices = bookings.filter((b) => pendingStatuses.includes(b.status)).length;
  const todayAppointments = bookings.filter((b) => b.requestedDate.slice(0, 10) === today)
    .length;

  const todayIncome = payments
    .filter((p) => p.status === "paid" && p.paidAt?.slice(0, 10) === today)
    .reduce((sum, p) => sum + p.amount, 0);

  return {
    activeCars,
    pendingServices,
    todayAppointments,
    todayIncome,
  };
}

export function updateBookingStatus(bookingId: string, status: BookingStatus) {
  const booking = bookings.find((item) => item.id === bookingId);
  if (!booking) {
    return null;
  }

  booking.status = status;

  bookingStatusHistory.push({
    id: `status-${bookingStatusHistory.length + 1}`,
    bookingId,
    status,
    title: STATUS_TITLES[status],
    description: "به‌روزرسانی توسط پنل مدیریت",
    createdAt: new Date().toISOString(),
  });

  return getBookingById(bookingId);
}

export function getBookingsWithServices() {
  return getAllBookings().map((booking) => ({
    ...booking,
    serviceItems: booking.items.map((item) => ({
      ...item,
      service: services.find((s) => s.id === item.serviceId) || null,
    })),
  }));
}
