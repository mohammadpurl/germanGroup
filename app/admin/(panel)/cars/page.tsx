import { AdminShell } from "@/components/admin/admin-shell";
import { vehicles } from "@/lib/server/mock-data";

export default function AdminCarsPage() {
  return (
    <AdminShell title="خودروها" subtitle="خودروهای ثبت‌شده در سیستم">
      <div className="admin-card overflow-hidden">
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>برند / مدل</th>
              <th>سال</th>
              <th>پلاک</th>
              <th>VIN</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>
                  {vehicle.brand} {vehicle.model}
                </td>
                <td>{vehicle.year}</td>
                <td>{vehicle.plateNumber || "—"}</td>
                <td className="font-latin text-xs text-muted">{vehicle.vin || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
