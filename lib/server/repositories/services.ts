import "server-only";
import { services } from "@/lib/server/mock-data";
import type { LocalizedText, Service } from "@/lib/server/domain";

export type ServiceInput = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  durationMinutes: number;
  basePrice: number;
  featured?: boolean;
  isActive: boolean;
};

export function getAllServices() {
  return [...services];
}

export function getActiveServices() {
  return services.filter((service) => service.isActive);
}

export function getServiceById(serviceId: string) {
  return services.find((service) => service.id === serviceId) || null;
}

export function createService(input: ServiceInput) {
  const service: Service = {
    id: `svc-${Date.now()}`,
    slug: input.slug,
    title: input.title,
    description: input.description,
    durationMinutes: input.durationMinutes,
    basePrice: input.basePrice,
    featured: input.featured ?? false,
    isActive: input.isActive,
  };

  services.push(service);
  return service;
}

export function updateService(serviceId: string, input: Partial<ServiceInput>) {
  const index = services.findIndex((service) => service.id === serviceId);
  if (index === -1) {
    return null;
  }

  services[index] = {
    ...services[index],
    ...input,
    title: input.title ?? services[index].title,
    description: input.description ?? services[index].description,
  };

  return services[index];
}

export function deleteService(serviceId: string) {
  const index = services.findIndex((service) => service.id === serviceId);
  if (index === -1) {
    return false;
  }

  services.splice(index, 1);
  return true;
}
