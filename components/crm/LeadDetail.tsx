"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Send,
  Trash2,
  CircleCheck,
  ExternalLink,
} from "lucide-react";

import {
  Lead,
  LeadNote,
  LeadPriority,
  STATUS_META,
  STATUS_FLOW,
  PRIORITY_META,
  relativeTime,
} from "@/lib/crm-types";
import { createClient } from "@/lib/supabase-browser";

export default function LeadDetail({
  lead: initialLead,
  initialNotes,
}: {
  lead: Lead;
  initialNotes: LeadNote[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [lead, setLead] = useState<Lead>(initialLead);
  const [notes, setNotes] = useState<LeadNote[]>(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [savedFlash, setSavedFlash] = useState<string | null>(null);

  const supabase = createClient();

  const flash = (msg: string) => {
    setSavedFlash(msg);
    setTimeout(() => setSavedFlash(null), 2500);
  };

  const updateField = async <K extends keyof Lead>(field: K, value: Lead[K]) => {
    const prev = lead[field];
    setLead({ ...lead, [field]: value });

    const { error } = await supabase
      .from("contact_submissions")
      .update({ [field]: value })
      .eq("id", lead.id);

    if (error) {
      setLead({ ...lead, [field]: prev });
      flash(`Error: ${error.message}`);
    } else {
      flash("Saved");
      startTransition(() => router.refresh());
    }
  };

  const markContacted = async () => {
    const now = new Date().toISOString();
    const updates: Partial<Lead> = {
      last_contacted_at: now,
      status: lead.status === "new" ? "contacted" : lead.status,
    };
    setLead({ ...lead, ...updates });
    const { error } = await supabase
      .from("contact_submissions")
      .update(updates)
      .eq("id", lead.id);
    if (error) flash(`Error: ${error.message}`);
    else {
      flash("Marked contacted");
      startTransition(() => router.refresh());
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    setSavingNote(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("lead_notes")
      .insert({
        lead_id: lead.id,
        body: newNote.trim(),
        author_email: user?.email || null,
      })
      .select()
      .single();

    setSavingNote(false);
    if (error) {
      flash(`Error: ${error.message}`);
      return;
    }
    if (data) {
      setNotes([data as LeadNote, ...notes]);
      setNewNote("");
      flash("Note added");
    }
  };

  const deleteNote = async (noteId: string) => {
    if (!confirm("Delete this note? This cannot be undone.")) return;
    const prev = notes;
    setNotes(notes.filter((n) => n.id !== noteId));
    const { error } = await supabase.from("lead_notes").delete().eq("id", noteId);
    if (error) {
      setNotes(prev);
      flash(`Error: ${error.message}`);
    } else {
      flash("Note deleted");
    }
  };

  const statusMeta = STATUS_META[lead.status];

  return (
    <>
      {/* Flash message */}
      <AnimatePresence>
        {savedFlash && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-6 right-6 z-50 bg-earth text-cream px-4 py-2 shadow-lg flex items-center gap-2"
          >
            <CircleCheck className="w-4 h-4 text-gold" />
            <span className="font-mono text-xs tracking-wider uppercase">
              {savedFlash}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
          <div>
            <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase mb-2">
              Lead · {relativeTime(lead.created_at)}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-earth tracking-tight leading-[0.95] break-words">
              {lead.name.toUpperCase()}
            </h1>
          </div>
          <span
            className="inline-flex items-center font-display text-xs tracking-wider uppercase px-3 py-1.5"
            style={{ backgroundColor: statusMeta.bg, color: statusMeta.color }}
          >
            {statusMeta.label}
          </span>
        </div>

        {/* Contact strip */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <a
            href={`mailto:${lead.email}`}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-earth text-cream hover:bg-gold transition-colors min-w-0 max-w-full"
          >
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="font-mono text-[11px] sm:text-xs truncate">{lead.email}</span>
          </a>
          {lead.phone && (
            <a
              href={`tel:${lead.phone}`}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-earth text-cream hover:bg-gold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="font-mono text-[11px] sm:text-xs">{lead.phone}</span>
            </a>
          )}
          <button
            onClick={markContacted}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-leaf text-cream hover:bg-moss transition-colors"
          >
            <CircleCheck className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase">
              Mark contacted
            </span>
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Main column — message + notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Original message */}
          <div className="bg-cream border border-earth/10 p-6">
            <h2 className="font-display text-base text-earth mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gold" />
              ORIGINAL MESSAGE
            </h2>
            <p className="font-mono text-sm text-earth/80 leading-relaxed whitespace-pre-wrap">
              {lead.message}
            </p>
          </div>

          {/* Notes timeline */}
          <div className="bg-cream border border-earth/10 p-6">
            <h2 className="font-display text-base text-earth mb-4">
              ACTIVITY LOG
            </h2>

            {/* Add note */}
            <div className="mb-6 pb-6 border-b border-earth/10">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="ADD A NOTE — CALL SUMMARY, FOLLOW-UP, OFFER DETAILS..."
                rows={3}
                className="form-input resize-none mb-3"
              />
              <div className="flex justify-between items-center">
                <p className="font-caption text-[10px] text-stone tracking-[0.1em] uppercase">
                  {newNote.length} chars
                </p>
                <button
                  onClick={addNote}
                  disabled={savingNote || !newNote.trim()}
                  className="btn-primary text-xs disabled:opacity-50"
                >
                  {savingNote ? (
                    <span className="w-3 h-3 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  ADD NOTE
                </button>
              </div>
            </div>

            {/* Notes list */}
            {notes.length === 0 ? (
              <p className="font-mono text-xs text-stone py-6 text-center">
                NO NOTES YET — ADD ONE TO TRACK YOUR INTERACTIONS
              </p>
            ) : (
              <div className="space-y-4">
                {notes.map((note, i) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-l-2 border-gold pl-4 py-1 group"
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <p className="font-caption text-[10px] text-stone tracking-[0.1em] uppercase">
                        {note.author_email || "system"} ·{" "}
                        {relativeTime(note.created_at)}
                      </p>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-stone hover:text-terracotta"
                        aria-label="Delete note"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-mono text-sm text-earth leading-relaxed whitespace-pre-wrap">
                      {note.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Side column — controls */}
        <div className="space-y-6">
          {/* Status flow */}
          <div className="bg-cream border border-earth/10 p-5">
            <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase mb-3">
              Pipeline Stage
            </p>
            <div className="space-y-2">
              {STATUS_FLOW.map((status) => {
                const meta = STATUS_META[status];
                const isActive = lead.status === status;
                const isPast =
                  STATUS_META[lead.status].order > meta.order &&
                  lead.status !== "closed_lost";
                return (
                  <button
                    key={status}
                    onClick={() => updateField("status", status)}
                    className={`w-full text-left px-3 py-2 transition-all flex items-center gap-2 ${
                      isActive
                        ? ""
                        : isPast
                        ? "opacity-60 hover:opacity-100"
                        : "hover:bg-cream-2"
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: meta.bg, color: meta.color }
                        : {}
                    }
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: isActive ? meta.color : meta.bg,
                      }}
                    />
                    <span className="font-mono text-xs tracking-wider uppercase">
                      {meta.label}
                    </span>
                    {isPast && (
                      <CircleCheck className="w-3 h-3 ml-auto text-gold" />
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => updateField("status", "closed_lost")}
                className={`w-full text-left px-3 py-2 transition-all flex items-center gap-2 ${
                  lead.status === "closed_lost"
                    ? ""
                    : "hover:bg-cream-2 opacity-70 hover:opacity-100"
                }`}
                style={
                  lead.status === "closed_lost"
                    ? {
                        backgroundColor: STATUS_META.closed_lost.bg,
                        color: STATUS_META.closed_lost.color,
                      }
                    : {}
                }
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor:
                      lead.status === "closed_lost"
                        ? STATUS_META.closed_lost.color
                        : STATUS_META.closed_lost.bg,
                  }}
                />
                <span className="font-mono text-xs tracking-wider uppercase">
                  Closed (Lost)
                </span>
              </button>
            </div>
          </div>

          {/* Priority */}
          <div className="bg-cream border border-earth/10 p-5">
            <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase mb-3">
              Priority
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(["low", "medium", "high"] as LeadPriority[]).map((p) => {
                const meta = PRIORITY_META[p];
                const isActive = lead.priority === p;
                return (
                  <button
                    key={p}
                    onClick={() => updateField("priority", p)}
                    className={`py-2 px-3 transition-all border flex items-center justify-center gap-1.5 ${
                      isActive
                        ? "bg-earth text-cream border-earth"
                        : "border-earth/15 hover:border-earth/40 text-earth"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: meta.dot }}
                    />
                    <span className="font-mono text-[10px] tracking-wider uppercase">
                      {meta.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Follow-up date */}
          <div className="bg-cream border border-earth/10 p-5">
            <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase mb-3 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Next Follow-up
            </p>
            <input
              type="datetime-local"
              value={
                lead.next_followup_at
                  ? new Date(lead.next_followup_at)
                      .toISOString()
                      .slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                updateField(
                  "next_followup_at",
                  e.target.value ? new Date(e.target.value).toISOString() : null
                )
              }
              className="form-input"
            />
            {lead.last_contacted_at && (
              <p className="font-caption text-[10px] text-stone tracking-[0.1em] uppercase mt-3">
                Last contacted {relativeTime(lead.last_contacted_at)}
              </p>
            )}
          </div>

          {/* Internal notes (single field) */}
          <div className="bg-cream border border-earth/10 p-5">
            <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase mb-3">
              Internal Notes
            </p>
            <textarea
              value={lead.internal_notes || ""}
              onChange={(e) =>
                setLead({ ...lead, internal_notes: e.target.value })
              }
              onBlur={() => updateField("internal_notes", lead.internal_notes)}
              placeholder="QUICK REFERENCE NOTES..."
              rows={4}
              className="form-input resize-none"
            />
          </div>

          {/* Public profile link */}
          <a
            href={`/`}
            target="_blank"
            rel="noopener"
            className="block bg-earth text-cream p-4 hover:bg-gold transition-colors"
          >
            <p className="font-caption text-[10px] text-cream/60 tracking-[0.15em] uppercase mb-1">
              Public site
            </p>
            <p className="font-display text-sm flex items-center gap-2">
              View axis-residences.com
              <ExternalLink className="w-3.5 h-3.5" />
            </p>
          </a>
        </div>
      </div>
    </>
  );
}
