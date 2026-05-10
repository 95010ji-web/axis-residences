import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { Lead, STATUS_META, relativeTime } from "@/lib/crm-types";
import {
  Users,
  TrendingUp,
  Clock,
  CircleCheck,
  ArrowRight,
  Phone,
  Mail,
  CircleAlert,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createClient();

  const { data: leadsData } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  const leads = (leadsData as Lead[]) || [];

  const newLeads = leads.filter((l) => l.status === "new").length;
  const activeLeads = leads.filter(
    (l) =>
      l.status !== "new" &&
      l.status !== "closed_won" &&
      l.status !== "closed_lost"
  ).length;
  const closedWon = leads.filter((l) => l.status === "closed_won").length;
  const totalLeads = leads.length;

  // This week's new leads
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const thisWeek = leads.filter(
    (l) => new Date(l.created_at).getTime() >= weekAgo
  ).length;

  // Status breakdown
  const statusCounts = leads.reduce<Record<string, number>>(
    (acc, l) => ({ ...acc, [l.status]: (acc[l.status] || 0) + 1 }),
    {}
  );

  // High priority not yet closed
  const highPriority = leads.filter(
    (l) =>
      l.priority === "high" &&
      l.status !== "closed_won" &&
      l.status !== "closed_lost"
  );

  // Recent submissions
  const recent = leads.slice(0, 5);

  // Followups due / overdue
  const overdueFollowups = leads.filter(
    (l) =>
      l.next_followup_at &&
      new Date(l.next_followup_at).getTime() < Date.now() &&
      l.status !== "closed_won" &&
      l.status !== "closed_lost"
  );

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-10">
        <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase mb-2">
          Dashboard
        </p>
        <h1 className="font-display text-3xl lg:text-4xl text-earth tracking-tight">
          GOOD TO SEE YOU,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
            GUNAVJANDER.
          </span>
        </h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <KPI
          label="New Leads"
          value={newLeads}
          icon={Users}
          accent="bg-terracotta"
          subtext={`${thisWeek} this week`}
        />
        <KPI
          label="Active Pipeline"
          value={activeLeads}
          icon={TrendingUp}
          accent="bg-gold"
          subtext="In progress"
        />
        <KPI
          label="Follow-ups Due"
          value={overdueFollowups.length}
          icon={Clock}
          accent="bg-leaf"
          subtext={
            overdueFollowups.length > 0 ? "Action needed" : "All caught up"
          }
        />
        <KPI
          label="Closed Won"
          value={closedWon}
          icon={CircleCheck}
          accent="bg-moss"
          subtext={totalLeads > 0
            ? `${Math.round((closedWon / totalLeads) * 100)}% conversion`
            : "—"}
        />
      </div>

      {/* Pipeline + Recent in two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline column */}
        <div className="lg:col-span-2">
          <div className="bg-cream border border-earth/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-base text-earth">PIPELINE BREAKDOWN</h2>
              <Link
                href="/crm/leads"
                className="font-mono text-[10px] text-gold tracking-wider uppercase hover:text-earth transition-colors flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {(Object.keys(STATUS_META) as Array<keyof typeof STATUS_META>)
                .sort((a, b) => STATUS_META[a].order - STATUS_META[b].order)
                .map((status) => {
                  const count = statusCounts[status] || 0;
                  const pct = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
                  const meta = STATUS_META[status];
                  return (
                    <Link
                      key={status}
                      href={`/crm/leads?status=${status}`}
                      className="block group"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs text-earth/80 tracking-wider uppercase">
                          {meta.label}
                        </span>
                        <span className="font-display text-sm text-earth">
                          {count}
                        </span>
                      </div>
                      <div className="h-1.5 bg-earth/5 overflow-hidden">
                        <div
                          className="h-full transition-all duration-700 group-hover:opacity-90"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: meta.bg,
                            minWidth: count > 0 ? "4px" : "0",
                          }}
                        />
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* High priority alert */}
          {highPriority.length > 0 && (
            <div className="mt-6 bg-terracotta/5 border-l-4 border-terracotta p-6">
              <div className="flex items-start gap-3 mb-4">
                <CircleAlert className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-sm text-earth">
                    {highPriority.length} HIGH-PRIORITY LEAD
                    {highPriority.length === 1 ? "" : "S"}
                  </p>
                  <p className="font-mono text-xs text-stone mt-1">
                    These leads need your attention.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {highPriority.slice(0, 3).map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/crm/leads/${lead.id}`}
                    className="flex items-center justify-between p-3 bg-cream hover:bg-cream-2 transition-colors border border-earth/10 group"
                  >
                    <div>
                      <p className="font-mono text-sm text-earth font-bold">
                        {lead.name}
                      </p>
                      <p className="font-caption text-[10px] text-stone tracking-[0.1em] uppercase mt-0.5">
                        {lead.email}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone group-hover:text-gold group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent leads column */}
        <div>
          <div className="bg-cream border border-earth/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-base text-earth">RECENT LEADS</h2>
              <Link
                href="/crm/leads"
                className="font-mono text-[10px] text-gold tracking-wider uppercase hover:text-earth transition-colors flex items-center gap-1"
              >
                All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {recent.length === 0 ? (
              <div className="py-12 text-center">
                <Users className="w-8 h-8 text-stone/30 mx-auto mb-3" />
                <p className="font-mono text-xs text-stone">No leads yet</p>
                <p className="font-caption text-[10px] text-stone/60 tracking-[0.1em] uppercase mt-1">
                  Submissions will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recent.map((lead) => {
                  const meta = STATUS_META[lead.status];
                  return (
                    <Link
                      key={lead.id}
                      href={`/crm/leads/${lead.id}`}
                      className="block p-3 hover:bg-cream-2 transition-colors border border-earth/10 group"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="font-mono text-sm text-earth font-bold truncate">
                          {lead.name}
                        </p>
                        <span
                          className="font-caption text-[8px] tracking-[0.1em] uppercase px-1.5 py-0.5 flex-shrink-0"
                          style={{
                            backgroundColor: meta.bg,
                            color: meta.color,
                          }}
                        >
                          {meta.label}
                        </span>
                      </div>
                      <p className="font-caption text-[10px] text-stone tracking-[0.1em] truncate">
                        {lead.email}
                      </p>
                      <p className="font-caption text-[10px] text-stone/60 mt-1 tracking-[0.1em] uppercase">
                        {relativeTime(lead.created_at)}
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href="tel:+14376920988"
              className="bg-earth text-cream p-4 hover:bg-gold transition-colors flex flex-col items-start"
            >
              <Phone className="w-5 h-5 text-gold mb-2" />
              <span className="font-mono text-[10px] tracking-wider uppercase">
                Call line
              </span>
              <span className="font-display text-xs mt-1">(437) 692-0988</span>
            </a>
            <a
              href="mailto:hello@axisresidences.com"
              className="bg-earth text-cream p-4 hover:bg-gold transition-colors flex flex-col items-start"
            >
              <Mail className="w-5 h-5 text-gold mb-2" />
              <span className="font-mono text-[10px] tracking-wider uppercase">
                Email
              </span>
              <span className="font-display text-xs mt-1">hello@axis...</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPI({
  label,
  value,
  icon: Icon,
  accent,
  subtext,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  subtext: string;
}) {
  return (
    <div className="bg-cream border border-earth/10 p-5 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-1 h-full ${accent}`} />
      <div className="flex items-center justify-between mb-3">
        <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase">
          {label}
        </p>
        <Icon className="w-4 h-4 text-stone/50" />
      </div>
      <p className="font-display text-3xl text-earth mb-1">{value}</p>
      <p className="font-mono text-[10px] text-stone tracking-wider">{subtext}</p>
    </div>
  );
}
