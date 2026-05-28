import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/server/auth/session";
import {
  deleteService,
  updateService,
  type ServiceInput,
} from "@/lib/server/repositories/services";

type RouteContext = { params: Promise<{ id: string }> };

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    return null;
  }
  return session;
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as Partial<ServiceInput>;
  const service = updateService(id, body);

  if (!service) {
    return NextResponse.json({ ok: false, message: "خدمت یافت نشد." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, service });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = deleteService(id);

  if (!deleted) {
    return NextResponse.json({ ok: false, message: "خدمت یافت نشد." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
