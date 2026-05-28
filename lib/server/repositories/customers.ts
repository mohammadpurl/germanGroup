import "server-only";
import { customers, vehicles } from "@/lib/server/mock-data";

export function getAllCustomers() {
  return customers.map((customer) => ({
    ...customer,
    vehicles: vehicles.filter((vehicle) => vehicle.customerId === customer.id),
  }));
}

export function getCustomerByPhone(phone: string) {
  const customer = customers.find((item) => item.phone === phone);
  if (!customer) {
    return null;
  }

  return {
    ...customer,
    vehicles: vehicles.filter((vehicle) => vehicle.customerId === customer.id),
  };
}
