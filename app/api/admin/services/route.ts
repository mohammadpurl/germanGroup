import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/server/auth/session";
import {
  createService,
  getAllServices,
  type ServiceInput,
} from "@/lib/server/repositories/services";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    return null;
  }
  return session;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, services: getAllServices() });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as ServiceInput;
  if (!body.slug || !body.title?.fa || !body.description?.fa) {
    return NextResponse.json(
      { ok: false, message: "اطلاعات خدمت ناقص است." },
      { status: 400 }
    );
  }

  const service = createService(body);
  return NextResponse.json({ ok: true, service });
}
