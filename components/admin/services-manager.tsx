"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/admin/format";
import type { Service } from "@/lib/server/domain";

type ServicesManagerProps = {
  initialServices: Service[];
};

type FormState = {
  slug: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  durationMinutes: string;
  basePrice: string;
  featured: boolean;
  isActive: boolean;
};

const emptyForm: FormState = {
  slug: "",
  titleFa: "",
  titleEn: "",
  descFa: "",
  descEn: "",
  durationMinutes: "60",
  basePrice: "0",
  featured: false,
  isActive: true,
};

export function ServicesManager({ initialServices }: ServicesManagerProps) {
  const router = useRouter();
  const [services, setServices] = useState(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  }

  function openEdit(service: Service) {
    setEditingId(service.id);
    setForm({
      slug: service.slug,
      titleFa: service.title.fa,
      titleEn: service.title.en || "",
      descFa: service.description.fa,
      descEn: service.description.en || "",
      durationMinutes: String(service.durationMinutes),
      basePrice: String(service.basePrice),
      featured: service.featured ?? false,
      isActive: service.isActive,
    });
    setMessage("");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      slug: form.slug,
      title: { fa: form.titleFa, en: form.titleEn || undefined },
      description: { fa: form.descFa, en: form.descEn || undefined },
      durationMinutes: Number(form.durationMinutes),
      basePrice: Number(form.basePrice),
      featured: form.featured,
      isActive: form.isActive,
    };

    const url = editingId ? `/api/admin/services/${editingId}` : "/api/admin/services";
    const method = editingId ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as {
      ok: boolean;
      message?: string;
      service?: Service;
    };

    if (!response.ok || !data.ok || !data.service) {
      setMessage(data.message || "ذخیره ناموفق بود.");
      setLoading(false);
      return;
    }

    setServices((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? data.service! : item));
      }
      return [...prev, data.service!];
    });

    setMessage(editingId ? "خدمت به‌روزرسانی شد." : "خدمت جدید اضافه شد.");
    setEditingId(null);
    setForm(emptyForm);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete(serviceId: string) {
    if (!confirm("این خدمت حذف شود؟")) {
      return;
    }

    const response = await fetch(`/api/admin/services/${serviceId}`, { method: "DELETE" });
    const data = (await response.json()) as { ok: boolean };

    if (!response.ok || !data.ok) {
      setMessage("حذف ناموفق بود.");
      return;
    }

    setServices((prev) => prev.filter((item) => item.id !== serviceId));
    router.refresh();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <section className="admin-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <h2 className="font-semibold text-primary">فهرست خدمات</h2>
          <Button type="button" variant="accent" size="sm" onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden />
            خدمت جدید
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="admin-table w-full min-w-[640px]">
            <thead>
              <tr>
                <th>عنوان</th>
                <th>مدت</th>
                <th>قیمت پایه</th>
                <th>وضعیت</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>
                    <p className="font-medium text-primary">{service.title.fa}</p>
                    <p className="text-xs text-muted">{service.slug}</p>
                  </td>
                  <td>{service.durationMinutes} دقیقه</td>
                  <td>{formatPrice(service.basePrice)}</td>
                  <td>
                    <span
                      className={
                        service.isActive
                          ? "text-emerald-300"
                          : "text-muted"
                      }
                    >
                      {service.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="admin-icon-btn"
                        onClick={() => openEdit(service)}
                        aria-label="ویرایش"
                      >
                        <Pencil className="h-4 w-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        className="admin-icon-btn text-red-300"
                        onClick={() => handleDelete(service.id)}
                        aria-label="حذف"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-card p-5">
        <h2 className="mb-4 font-semibold text-primary">
          {editingId ? "ویرایش خدمت" : "افزودن خدمت"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="admin-input"
            placeholder="slug (مثلاً engine-repair)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
          />
          <input
            className="admin-input"
            placeholder="عنوان فارسی"
            value={form.titleFa}
            onChange={(e) => setForm({ ...form, titleFa: e.target.value })}
            required
          />
          <input
            className="admin-input"
            placeholder="عنوان انگلیسی"
            value={form.titleEn}
            onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
          />
          <textarea
            className="admin-input min-h-20 resize-y"
            placeholder="توضیح فارسی"
            value={form.descFa}
            onChange={(e) => setForm({ ...form, descFa: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              className="admin-input"
              type="number"
              placeholder="مدت (دقیقه)"
              value={form.durationMinutes}
              onChange={(e) => setForm({ ...form, durationMinutes: e.target.value })}
              required
            />
            <input
              className="admin-input"
              type="number"
              placeholder="قیمت پایه"
              value={form.basePrice}
              onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
              required
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-secondary">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            نمایش در صفحه اصلی
          </label>

          <label className="flex items-center gap-2 text-sm text-secondary">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            فعال برای رزرو
          </label>

          {message ? <p className="text-sm text-gold-light">{message}</p> : null}

          <Button type="submit" variant="accent" className="w-full" disabled={loading}>
            {loading ? "در حال ذخیره..." : editingId ? "ذخیره تغییرات" : "ثبت خدمت"}
          </Button>
        </form>
      </section>
    </div>
  );
}
