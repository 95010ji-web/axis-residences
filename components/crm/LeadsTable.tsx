"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  Phone,
  Mail,
  ArrowRight,
  ChevronDown,
  Funnel,
} from "lucide-react";
import {
  Lead,
  LeadStatus,
  STATUS_META,
  PRIORITY_META,
  relativeTime,
} from "@/lib/crm-types";

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const params = useSearchParams();
  const initialStatus = params?.get("status") as LeadStatus | null;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">(
    initialStatus || "all"
  );
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        search === "" ||
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase()) ||
        (l.phone && l.phone.includes(search)) ||
        l.message.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || l.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [leads, search, statusFilter, priorityFilter]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-cream border border-earth/10 p-4 lg:p-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
          <input
            type="text"
            placeholder="SEARCH BY NAME, EMAIL, PHONE..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-10"
          />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "all")}
            className="form-input pr-10 appearance-none cursor-pointer min-w-[180px]"
          >
            <option value="all">ALL STATUSES</option>
            {(Object.keys(STATUS_META) as LeadStatus[])
              .sort((a, b) => STATUS_META[a].order - STATUS_META[b].order)
              .map((s) => (
                <option key={s} value={s}>
                  {STATUS_META[s].label.toUpperCase()}
                </option>
              ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="form-input pr-10 appearance-none cursor-pointer min-w-[140px]"
          >
            <option value="all">ALL PRIORITY</option>
            <option value="high">HIGH</option>
            <option value="medium">MEDIUM</option>
            <option value="low">LOW</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone pointer-events-none" />
        </div>
      </div>

      {/* Result count */}
      <p className="font-mono text-xs text-stone tracking-wider">
        {filtered.length} {filtered.length === 1 ? "RESULT" : "RESULTS"}
        {(statusFilter !== "all" || priorityFilter !== "all" || search) && (
          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setPriorityFilter("all");
            }}
            className="ml-3 text-gold hover:text-earth transition-colors"
          >
            CLEAR FILTERS
          </button>
        )}
      </p>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-cream border border-earth/10 p-16 text-center">
          <Funnel className="w-10 h-10 text-stone/30 mx-auto mb-4" />
          <p className="font-display text-base text-earth mb-1">
            NO LEADS FOUND
          </p>
          <p className="font-mono text-xs text-stone">
            Try adjusting your filters
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-cream border border-earth/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-earth text-cream">
                <tr>
                  <Th>Lead</Th>
                  <Th>Contact</Th>
                  <Th>Status</Th>
                  <Th>Priority</Th>
                  <Th>Received</Th>
                  <Th>&nbsp;</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => {
                  const statusMeta = STATUS_META[lead.status];
                  const priorityMeta = PRIORITY_META[lead.priority];
                  return (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-t border-earth/5 hover:bg-cream-2 transition-colors group"
                    >
                      <td className="px-4 py-4">
                        <Link
                          href={`/crm/leads/${lead.id}`}
                          className="block"
                        >
                          <p className="font-mono text-sm text-earth font-bold">
                            {lead.name}
                          </p>
                          <p className="font-caption text-[10px] text-stone tracking-[0.1em] truncate max-w-[280px] mt-0.5">
                            {lead.message.slice(0, 60)}
                            {lead.message.length > 60 ? "…" : ""}
                          </p>
                        </Link>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1.5 font-mono text-xs text-earth/70 hover:text-gold transition-colors"
                          >
                            <Mail className="w-3 h-3" />
                            <span className="truncate max-w-[180px]">
                              {lead.email}
                            </span>
                          </a>
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-1.5 font-mono text-xs text-earth/70 hover:text-gold transition-colors"
                            >
                              <Phone className="w-3 h-3" />
                              {lead.phone}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="inline-flex items-center font-caption text-[10px] tracking-[0.1em] uppercase px-2 py-1"
                          style={{
                            backgroundColor: statusMeta.bg,
                            color: statusMeta.color,
                          }}
                        >
                          {statusMeta.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-earth/70">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: priorityMeta.dot }}
                          />
                          {priorityMeta.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-caption text-[10px] text-stone tracking-[0.1em] uppercase">
                          {relativeTime(lead.created_at)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Link
                          href={`/crm/leads/${lead.id}`}
                          className="inline-flex items-center gap-1 font-mono text-[10px] text-gold tracking-wider uppercase hover:text-earth transition-colors group-hover:translate-x-1"
                        >
                          Open <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((lead, i) => {
              const statusMeta = STATUS_META[lead.status];
              const priorityMeta = PRIORITY_META[lead.priority];
              return (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={`/crm/leads/${lead.id}`}
                    className="block bg-cream border border-earth/10 p-4"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-mono text-sm text-earth font-bold">
                        {lead.name}
                      </p>
                      <span
                        className="font-caption text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 flex-shrink-0"
                        style={{
                          backgroundColor: statusMeta.bg,
                          color: statusMeta.color,
                        }}
                      >
                        {statusMeta.label}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-stone mb-3 truncate">
                      {lead.email}
                    </p>
                    <div className="flex items-center justify-between font-caption text-[10px] tracking-[0.1em] uppercase">
                      <span className="flex items-center gap-1.5 text-earth/70">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: priorityMeta.dot }}
                        />
                        {priorityMeta.label} priority
                      </span>
                      <span className="text-stone">
                        {relativeTime(lead.created_at)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-4 py-3 font-caption text-[10px] tracking-[0.15em] uppercase font-normal text-cream/70">
      {children}
    </th>
  );
}
