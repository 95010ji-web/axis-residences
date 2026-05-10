import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase-server";
import { Lead, LeadNote } from "@/lib/crm-types";
import LeadDetail from "@/components/crm/LeadDetail";

export const dynamic = "force-dynamic";

export default async function LeadPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: leadData } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!leadData) notFound();

  const { data: notesData } = await supabase
    .from("lead_notes")
    .select("*")
    .eq("lead_id", params.id)
    .order("created_at", { ascending: false });

  const lead = leadData as Lead;
  const notes = (notesData as LeadNote[]) || [];

  return (
    <div className="p-6 lg:p-10">
      <Link
        href="/crm/leads"
        className="inline-flex items-center gap-2 font-mono text-xs text-stone hover:text-gold transition-colors tracking-wider uppercase mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to leads
      </Link>

      <LeadDetail lead={lead} initialNotes={notes} />
    </div>
  );
}
