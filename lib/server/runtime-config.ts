import "server-only";

function readEnv(key: string, fallback = "") {
  return process.env[key] || fallback;
}

function readNumber(key: string, fallback: number) {
  const value = Number(process.env[key]);
  return Number.isFinite(value) ? value : fallback;
}

export const runtimeConfig = {
  databaseUrl: readEnv("DATABASE_URL", ""),
  smsProvider: readEnv("SMS_PROVIDER", "mock"),
  smsApiKey: readEnv("SMS_API_KEY", ""),
  smsSender: readEnv("SMS_SENDER", ""),
  otpLength: readNumber("OTP_LENGTH", 5),
  otpTtlMinutes: readNumber("OTP_TTL_MINUTES", 2),
  ownerPhone: readEnv("OWNER_PHONE", "+989122262329"),
  adminUsername: readEnv("ADMIN_USERNAME", "manager"),
  adminSeedPassword: readEnv("ADMIN_SEED_PASSWORD", "ChangeMe123!"),
  authSecret: readEnv("AUTH_SECRET", "dev-german-group-secret"),
  paymentGateway: readEnv("PAYMENT_GATEWAY", "mock"),
} as const;
