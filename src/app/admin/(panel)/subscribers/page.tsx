import { desc } from "drizzle-orm";
import { db, subscribers } from "@/db";
import { requireAdmin } from "@/lib/auth";
import { PageTitle } from "@/components/admin/ui";

// Reads the admin session cookie: navigations here may block (see admin/layout.tsx).
export const instant = false;

export default async function SubscribersAdmin() {
  await requireAdmin();
  const rows = await db.select().from(subscribers).orderBy(desc(subscribers.createdAt)).limit(2000);

  return (
    <>
      <PageTitle>გამომწერები ({rows.length})</PageTitle>
      <p className="text-sm text-slate-500 mb-4">ფუტერის „გამოწერის“ ფორმიდან შემოსული ელფოსტები.</p>
      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">ელფოსტა</th>
              <th className="px-4 py-3">თარიღი</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{r.email}</td>
                <td className="px-4 py-3 text-slate-500">{r.createdAt.toLocaleString("ka-GE")}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={2} className="px-4 py-10 text-center text-slate-400">
                  ჯერ არავინ გამოწერილა.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
