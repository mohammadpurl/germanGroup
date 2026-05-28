import "server-only";
import {
  type AdminUser,
  type Booking,
  type BookingStatusEntry,
  type Customer,
  type Invoice,
  type NotificationLog,
  type Payment,
  type RepairTimelineEvent,
  type Service,
  type Vehicle,
} from "@/lib/server/domain";

const now = new Date();

function iso(hoursOffset = 0) {
  return new Date(now.getTime() + hoursOffset * 60 * 60 * 1000).toISOString();
}

export const adminUsers: AdminUser[] = [
  {
    id: "admin-1",
    username: "manager",
    fullName: "مدیر سیستم",
    phone: "+989122262329",
  },
];

export const services: Service[] = [
  {
    id: "svc-engine",
    slug: "engine-repair",
    title: { fa: "تعمیر موتور", en: "Engine Repair" },
    description: {
      fa: "تشخیص و بازسازی موتورهای توربو و تنفس طبیعی",
      en: "Diagnostics and rebuilds for turbo and naturally aspirated engines",
    },
    durationMinutes: 180,
    basePrice: 2800000,
    featured: true,
    isActive: true,
  },
  {
    id: "svc-gearbox",
    slug: "gearbox-specialist",
    title: { fa: "تعمیر گیربکس", en: "Gearbox Specialist" },
    description: {
      fa: "بررسی DSG، اتوماتیک و سیستم‌های انتقال قدرت",
      en: "Inspection and repair for DSG and automatic transmissions",
    },
    durationMinutes: 150,
    basePrice: 3200000,
    featured: true,
    isActive: true,
  },
  {
    id: "svc-diag",
    slug: "advanced-diagnostics",
    title: { fa: "دیاگ پیشرفته", en: "Advanced Diagnostics" },
    description: {
      fa: "اسکن تخصصی ECU، TCU و ماژول‌های بدنه",
      en: "Specialist ECU, TCU, and body-module diagnostics",
    },
    durationMinutes: 60,
    basePrice: 950000,
    featured: true,
    isActive: true,
  },
  {
    id: "svc-detail",
    slug: "detailing-pdr",
    title: { fa: "دیتیلینگ و PDR", en: "Detailing & PDR" },
    description: {
      fa: "احیای ظاهر خودرو، اصلاح رنگ و رفع تورفتگی",
      en: "Paint correction, detailing, and paintless dent repair",
    },
    durationMinutes: 120,
    basePrice: 1800000,
    featured: false,
    isActive: true,
  },
];

export const customers: Customer[] = [
  {
    id: "cust-1",
    fullName: "علی رضایی",
    phone: "09121234567",
    email: "ali@example.com",
  },
  {
    id: "cust-2",
    fullName: "نوید صادقی",
    phone: "09123344556",
  },
];

export const vehicles: Vehicle[] = [
  {
    id: "veh-1",
    customerId: "cust-1",
    brand: "BMW",
    model: "320i",
    year: 2019,
    vin: "WBA8E11090A123456",
    plateNumber: "22الف345-11",
    engineCode: "B48",
  },
  {
    id: "veh-2",
    customerId: "cust-2",
    brand: "Mercedes-Benz",
    model: "C200",
    year: 2018,
    vin: "WDDGF8AB5JR123456",
    plateNumber: "64ب778-44",
    engineCode: "M274",
  },
];

export const bookings: Booking[] = [
  {
    id: "book-1",
    customerId: "cust-1",
    vehicleId: "veh-1",
    status: "inProgress",
    requestedDate: iso(-36).slice(0, 10),
    requestedTime: "11:15",
    ownerPhone: "+989122262329",
    notes: "لرزش در شروع حرکت و هشدار گیربکس",
    items: [
      { serviceId: "svc-gearbox", quantity: 1, unitPrice: 3200000 },
      { serviceId: "svc-diag", quantity: 1, unitPrice: 950000 },
    ],
    createdAt: iso(-40),
  },
  {
    id: "book-2",
    customerId: "cust-2",
    vehicleId: "veh-2",
    status: "pendingApproval",
    requestedDate: iso(18).slice(0, 10),
    requestedTime: "09:30",
    ownerPhone: "+989122262329",
    notes: "بازدید اولیه برای سرویس دوره‌ای و دیاگ",
    items: [{ serviceId: "svc-diag", quantity: 1, unitPrice: 950000 }],
    createdAt: iso(-6),
  },
];

export const bookingStatusHistory: BookingStatusEntry[] = [
  {
    id: "status-1",
    bookingId: "book-1",
    status: "requested",
    title: "ثبت رزرو",
    createdAt: iso(-40),
  },
  {
    id: "status-2",
    bookingId: "book-1",
    status: "confirmed",
    title: "تایید پذیرش",
    createdAt: iso(-38),
  },
  {
    id: "status-3",
    bookingId: "book-1",
    status: "inProgress",
    title: "شروع فرایند تعمیر",
    description: "بازدید اولیه و بازکردن مجموعه گیربکس",
    createdAt: iso(-20),
  },
];

export const repairTimeline: RepairTimelineEvent[] = [
  {
    id: "tl-1",
    bookingId: "book-1",
    title: "خودرو تحویل شد",
    description: "خودرو در ساعت 10:15 توسط پذیرش ثبت شد.",
    happenedAt: iso(-22),
    completed: true,
    highlight: "success",
  },
  {
    id: "tl-2",
    bookingId: "book-1",
    title: "دیاگ کامل انجام شد",
    description: "عیب در واحد مکاترونیک و روغن آلوده گزارش شد.",
    happenedAt: iso(-20),
    completed: true,
    highlight: "warning",
  },
  {
    id: "tl-3",
    bookingId: "book-1",
    title: "تامین روغن و قطعات مصرفی",
    description: "قطعات در حال آماده‌سازی برای مونتاژ نهایی هستند.",
    happenedAt: iso(-2),
    completed: false,
    highlight: "neutral",
  },
];

export const invoices: Invoice[] = [
  {
    id: "inv-1",
    bookingId: "book-1",
    invoiceNumber: "INV-2026-1458",
    subtotal: 4150000,
    discount: 320000,
    total: 3830000,
    status: "pending",
    issuedAt: iso(-4),
    lineItems: [
      {
        id: "line-1",
        label: "بررسی و دیاگ گیربکس",
        quantity: 1,
        unitPrice: 950000,
        totalPrice: 950000,
      },
      {
        id: "line-2",
        label: "تعویض روغن و فیلتر گیربکس",
        quantity: 1,
        unitPrice: 3200000,
        totalPrice: 3200000,
      },
    ],
  },
];

export const payments: Payment[] = [
  {
    id: "pay-1",
    invoiceId: "inv-1",
    amount: 1200000,
    status: "paid",
    method: "transfer",
    paidAt: iso(-2),
    providerRef: "manual-transfer-01",
  },
];

export const notifications: NotificationLog[] = [
  {
    id: "notif-1",
    channel: "sms",
    recipient: "09121234567",
    template: "booking-confirmation",
    payload: { bookingId: "book-1", time: "11:15" },
    sentAt: iso(-38),
  },
];
