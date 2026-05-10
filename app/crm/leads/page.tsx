import LeadsTable from "@/components/crm/LeadsTable";
import { createClient } from "@/lib/supabase-server";
import { Lead } from "@/lib/crm-types";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  const leads = (data as Lead[]) || [];

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <div className="mb-6 lg:mb-8">
        <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase mb-2">
          Pipeline
        </p>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-earth tracking-tight">
            ALL LEADS
          </h1>
          <p className="font-mono text-xs text-stone tracking-wider">
            {leads.length} {leads.length === 1 ? "LEAD" : "LEADS"}
          </p>
        </div>
      </div>

      <LeadsTable leads={leads} />
    </div>
  );
}
