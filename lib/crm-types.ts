export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "showing_scheduled"
  | "offer"
  | "closed_won"
  | "closed_lost";

export type LeadPriority = "low" | "medium" | "high";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: LeadStatus;
  priority: LeadPriority;
  source: string;
  internal_notes: string | null;
  assigned_listing_id: string | null;
  last_contacted_at: string | null;
  next_followup_at: string | null;
  created_at: string;
}

export interface LeadNote {
  id: string;
  lead_id: string;
  body: string;
  author_email: string | null;
  created_at: string;
}

export interface LeadTask {
  id: string;
  lead_id: string | null;
  title: string;
  description: string | null;
  due_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export const STATUS_META: Record<
  LeadStatus,
  { label: string; color: string; bg: string; order: number }
> = {
  new: { label: "New", color: "#1A100A", bg: "#F3EDE2", order: 1 },
  contacted: { label: "Contacted", color: "#FFFFFF", bg: "#6B9158", order: 2 },
  qualified: { label: "Qualified", color: "#FFFFFF", bg: "#3D6130", order: 3 },
  showing_scheduled: {
    label: "Showing Scheduled",
    color: "#FFFFFF",
    bg: "#C2881E",
    order: 4,
  },
  offer: { label: "Offer Out", color: "#FFFFFF", bg: "#C04A2E", order: 5 },
  closed_won: { label: "Closed (Won)", color: "#FFFFFF", bg: "#263B1A", order: 6 },
  closed_lost: { label: "Closed (Lost)", color: "#FFFFFF", bg: "#5C3D28", order: 7 },
};

export const STATUS_FLOW: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "showing_scheduled",
  "offer",
  "closed_won",
];

export const PRIORITY_META: Record<
  LeadPriority,
  { label: string; color: string; dot: string }
> = {
  low: { label: "Low", color: "#5C3D28", dot: "#AFA598" },
  medium: { label: "Medium", color: "#1A100A", dot: "#C2881E" },
  high: { label: "High", color: "#FFFFFF", dot: "#C04A2E" },
};

export function relativeTime(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffSec = Math.floor((now - then) / 1000);
  if (diffSec < 60) return "just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
