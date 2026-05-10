import Link from "next/link";
import { CircleCheck, Clock, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase-server";
import { Lead, relativeTime, STATUS_META } from "@/lib/crm-types";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .not("next_followup_at", "is", null)
    .neq("status", "closed_won")
    .neq("status", "closed_lost")
    .order("next_followup_at", { ascending: true });

  const followups = (data as Lead[]) || [];

  const now = Date.now();
  const overdue = followups.filter(
    (l) => new Date(l.next_followup_at!).getTime() < now
  );
  const upcoming = followups.filter(
    (l) => new Date(l.next_followup_at!).getTime() >= now
  );

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-10">
        <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase mb-2">
          Tasks
        </p>
        <h1 className="font-display text-3xl lg:text-4xl text-earth tracking-tight">
          FOLLOW-UPS
        </h1>
      </div>

      {/* Overdue */}
      {overdue.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-base text-terracotta mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            OVERDUE ({overdue.length})
          </h2>
          <div className="space-y-2">
            {overdue.map((lead) => (
              <FollowupRow key={lead.id} lead={lead} overdue />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming */}
      <section>
        <h2 className="font-display text-base text-earth mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-gold" />
          UPCOMING ({upcoming.length})
        </h2>
        {upcoming.length === 0 ? (
          <div className="bg-cream border border-earth/10 p-12 text-center">
            <CircleCheck className="w-10 h-10 text-leaf/50 mx-auto mb-3" />
            <p className="font-display text-base text-earth mb-1">ALL CAUGHT UP</p>
            <p className="font-mono text-xs text-stone">
              No upcoming follow-ups scheduled
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {upcoming.map((lead) => (
              <FollowupRow key={lead.id} lead={lead} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FollowupRow({ lead, overdue }: { lead: Lead; overdue?: boolean }) {
  const meta = STATUS_META[lead.status];
  const due = new Date(lead.next_followup_at!);
  return (
    <Link
      href={`/crm/leads/${lead.id}`}
      className={`block p-4 border transition-colors group ${
        overdue
          ? "bg-terracotta/5 border-terracotta/20 hover:bg-terracotta/10"
          : "bg-cream border-earth/10 hover:bg-cream-2"
      }`}
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            <p className="font-mono text-sm text-earth font-bold">{lead.name}</p>
            <span
              className="font-caption text-[9px] tracking-[0.1em] uppercase px-2 py-0.5"
              style={{ backgroundColor: meta.bg, color: meta.color }}
            >
              {meta.label}
            </span>
          </div>
          <p className="font-mono text-xs text-stone truncate">{lead.email}</p>
        </div>
        <div className="text-right">
          <p
            className={`font-mono text-xs ${
              overdue ? "text-terracotta font-bold" : "text-earth"
            }`}
          >
            {due.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <p className="font-caption text-[10px] text-stone tracking-[0.1em] uppercase mt-1">
            {relativeTime(lead.next_followup_at!)}
          </p>
        </div>
        <ArrowRight className="w-4 h-4 text-stone group-hover:text-gold group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
