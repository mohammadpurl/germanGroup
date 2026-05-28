import "server-only";

export type BookingStatus =
  | "requested"
  | "pendingApproval"
  | "confirmed"
  | "inProgress"
  | "waitingParts"
  | "qualityCheck"
  | "completed"
  | "delivered"
  | "cancelled";

export type PaymentStatus =
  | "draft"
  | "unpaid"
  | "pending"
  | "paid"
  | "refunded"
  | "cancelled";

export type PaymentMethod = "offline" | "gateway" | "transfer";

export type LocalizedText = {
  fa: string;
  en?: string;
};

export type AdminUser = {
  id: string;
  username: string;
  fullName: string;
  phone: string;
};

export type Customer = {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
};

export type Vehicle = {
  id: string;
  customerId: string;
  brand: string;
  model: string;
  year: number;
  vin?: string;
  plateNumber?: string;
  engineCode?: string;
};

export type Service = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  durationMinutes: number;
  basePrice: number;
  featured?: boolean;
  isActive: boolean;
};

export type BookingServiceItem = {
  serviceId: string;
  quantity: number;
  unitPrice: number;
};

export type Booking = {
  id: string;
  customerId: string;
  vehicleId: string;
  status: BookingStatus;
  requestedDate: string;
  requestedTime: string;
  notes?: string;
  ownerPhone?: string;
  items: BookingServiceItem[];
  createdAt: string;
};

export type BookingStatusEntry = {
  id: string;
  bookingId: string;
  status: BookingStatus;
  title: string;
  description?: string;
  createdAt: string;
};

export type RepairTimelineEvent = {
  id: string;
  bookingId: string;
  title: string;
  description?: string;
  happenedAt: string;
  completed: boolean;
  highlight?: "danger" | "warning" | "success" | "neutral";
};

export type InvoiceLineItem = {
  id: string;
  label: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type Invoice = {
  id: string;
  bookingId: string;
  invoiceNumber: string;
  subtotal: number;
  discount: number;
  total: number;
  status: PaymentStatus;
  issuedAt: string;
  lineItems: InvoiceLineItem[];
};

export type Payment = {
  id: string;
  invoiceId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  providerRef?: string;
  paidAt?: string;
};

export type NotificationLog = {
  id: string;
  channel: "sms";
  recipient: string;
  template: string;
  payload: Record<string, string | number>;
  sentAt?: string;
};

export type PortalDashboardRecord = {
  customer: Customer;
  vehicle: Vehicle;
  booking: Booking;
  invoice: Invoice;
  payments: Payment[];
  timeline: RepairTimelineEvent[];
};

export type BookingRequestInput = {
  fullName: string;
  phone: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: number;
  selectedDate: string;
  selectedTime: string;
  serviceIds: string[];
  notes?: string;
};

export type OtpChallenge = {
  phone: string;
  code: string;
  expiresAt: string;
};
