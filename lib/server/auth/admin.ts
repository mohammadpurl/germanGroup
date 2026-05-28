import "server-only";
import { adminUsers } from "@/lib/server/mock-data";
import { runtimeConfig } from "@/lib/server/runtime-config";

export function validateAdminCredentials(username: string, password: string) {
  const admin = adminUsers.find((item) => item.username === username);
  if (!admin) {
    return null;
  }

  if (
    username !== runtimeConfig.adminUsername ||
    password !== runtimeConfig.adminSeedPassword
  ) {
    return null;
  }

  return admin;
}
