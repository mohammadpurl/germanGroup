import { NextResponse } from "next/server";
import { validateAdminCredentials } from "@/lib/server/auth/admin";
import { createAdminSession } from "@/lib/server/auth/session";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };
  const username = body.username?.trim();
  const password = body.password?.trim();

  if (!username || !password) {
    return NextResponse.json(
      { ok: false, message: "نام کاربری و رمز عبور الزامی است." },
      { status: 400 }
    );
  }

  const admin = validateAdminCredentials(username, password);
  if (!admin) {
    return NextResponse.json(
      { ok: false, message: "اطلاعات ورود نادرست است." },
      { status: 401 }
    );
  }

  await createAdminSession(admin.username);

  return NextResponse.json({
    ok: true,
    admin: { username: admin.username, fullName: admin.fullName },
  });
}
