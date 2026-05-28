import "server-only";
import { createHash } from "node:crypto";
import { runtimeConfig } from "@/lib/server/runtime-config";
import type { OtpChallenge } from "@/lib/server/domain";

const otpStore = new Map<string, OtpChallenge>();

function hashOtp(code: string) {
  return createHash("sha256").update(code).digest("hex");
}

export function issueOtp(phone: string) {
  const code = Array.from({ length: runtimeConfig.otpLength }, () =>
    Math.floor(Math.random() * 10).toString()
  ).join("");

  const expiresAt = new Date(
    Date.now() + runtimeConfig.otpTtlMinutes * 60 * 1000
  ).toISOString();

  otpStore.set(phone, {
    phone,
    code: hashOtp(code),
    expiresAt,
  });

  return {
    phone,
    code,
    expiresAt,
  };
}

export function verifyOtp(phone: string, code: string) {
  const challenge = otpStore.get(phone);
  if (!challenge) {
    return false;
  }

  if (new Date(challenge.expiresAt).getTime() < Date.now()) {
    otpStore.delete(phone);
    return false;
  }

  const valid = challenge.code === hashOtp(code);
  if (valid) {
    otpStore.delete(phone);
  }

  return valid;
}
