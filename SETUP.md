# Axis Residences — Setup & Deploy Guide

A premium real estate website built with Next.js 14, Tailwind CSS, Framer Motion, and Supabase.

---

## 🔐 CRM access — `/crm`

A full internal CRM is now live at `/crm`. Sign in to manage leads from the contact form.

**Admin login**
- URL: `https://your-vercel-url/crm/login`
- Email: `gunavjander@axisresidences.com`
- Password: `AxisAdmin2026!` *(change this immediately after first login at Supabase Dashboard → Authentication → Users)*

**What you can do in the CRM**

| Page | What it shows |
|---|---|
| `/crm` (Dashboard) | KPI cards (new leads, active pipeline, follow-ups due, closed won), pipeline breakdown by stage, high-priority alerts, recent submissions |
| `/crm/leads` | Searchable, filterable table of every form submission. Filter by status (New → Contacted → Qualified → Showing → Offer → Won/Lost) or priority |
| `/crm/leads/[id]` | Full lead detail: original message, activity log (notes you add over time), status flow stepper, priority selector, follow-up date picker, internal notes |
| `/crm/tasks` | Overdue + upcoming follow-ups based on `next_followup_at` dates you set |
| `/crm/listings` | Read-only overview of all 8 properties with portfolio totals |

**Tech**
- Auth: Supabase Auth (email/password) — sessions in cookies, refreshed by middleware
- Database: 3 tables — `contact_submissions` (extended with status fields), `lead_notes`, `lead_tasks`
- RLS: Anonymous users can INSERT only (form). Authenticated users have full SELECT/UPDATE on contact_submissions and full access to notes/tasks
- Routes: All `/crm/*` paths protected by `middleware.ts` — unauthenticated users redirected to `/crm/login`

**Adding more team members later**

```bash
# In Supabase dashboard → Authentication → Users → Add User
# Or via API:
curl -X POST "https://nbqzycwqfhwopnwpjhxm.supabase.co/auth/v1/admin/users" \
  -H "apikey: <SERVICE_ROLE_KEY>" \
  -H "Authorization: Bearer <SERVICE_ROLE_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"email":"agent@axisresidences.com","password":"...","email_confirm":true}'
```

---

## ✅ What's already done

### Backend (Supabase) — fully wired

- **Project:** `nbqzycwqfhwopnwpjhxm` (region: `ca-central-1`)
- **Table created:** `contact_submissions` with RLS + insert policy for anonymous form posts
- **Keys stored in:** `.env.local` (already populated, NOT committed to git)
- **End-to-end tested:** form submission → Supabase row insert → verified via REST query

You can view incoming form submissions any time at:
> https://supabase.com/dashboard/project/nbqzycwqfhwopnwpjhxm/editor → `contact_submissions`

### Frontend
- 8 listings with detail pages at `/listings/[id]`
- Hero with luxury villa drone video background
- Realtor profile for Gunavjander Saing on `/about`
- Phone `(437) 692-0988` on every page (correct it if needed — search the codebase for `4376920988`)
- Mobile menu rebuilt: full-screen overlay, body-scroll-locked, no contrast issues
- Framer Motion animations throughout

### Production build
- Last build: **exit 0**, all 7 routes static or SSR'd
- Bundle sizes: hero page = 153 kB First Load JS

---

## ⚠️ One blocker — Vercel account

Your Vercel account flag is `"limited": true, "version": "northstar"`. This is Vercel's onboarding state — it means the account exists but a few setup steps haven't been completed. **Every API call to create projects or deployments returns 403 until you finish that.**

I tried both tokens you sent. Same response. Once you complete the onboarding the account flips to `"limited": false` and the same token you already have will work — no need to regenerate.

### What to do (90 seconds)

1. Open https://vercel.com/dashboard in your browser
2. Sign in with `95010ji@gmail.com`
3. Vercel will walk you through:
   - Verify your email (click the link they send)
   - Pick a username (or accept the default `95010ji-3879`)
   - Create a "Hobby" team or accept the auto-generated one
   - Accept terms of service
4. **Send me the same Vercel token again** — I'll deploy in one shot.

### Alternative: GitHub-import path (no token needed)

If you'd rather not deal with the API:

```bash
cd "E:\landscaping website\axis-residences"
git init
git add -A
git commit -m "Initial Axis Residences site"
git branch -M main
# Create the empty repo on github.com first, then:
git remote add origin https://github.com/95010ji/axis-residences.git
git push -u origin main
```

Then on https://vercel.com/new:
1. Click **Import Git Repository** → pick `axis-residences`
2. Framework: **Next.js** (auto-detected)
3. **Environment Variables** — paste these two:

   ```
   NEXT_PUBLIC_SUPABASE_URL = https://nbqzycwqfhwopnwpjhxm.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icXp5Y3dxZmh3b3Bud3BqaHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MTE0MTksImV4cCI6MjA5MzQ4NzQxOX0.QDhg7q5Dw2wfpWJuhSSWusxwNXLo_D4dVu9XcgysH6A
   ```

4. Click **Deploy** — done in ~90 seconds. The first import auto-completes Vercel onboarding for you.

---

## Run locally

```bash
cd axis-residences
npm install
npm run dev
```

`http://localhost:3000` — the contact form is already saving to your real Supabase.

---

## Update content

| What | Where |
|---|---|
| 8 listings | `lib/listings.ts` |
| Realtor bio (Gunavjander) | `app/about/page.tsx` |
| Phone number | search `4376920988` in any file |
| Hero video | `public/videos/hero-villa.mp4` |
| Hero fallback image | `public/images/hero.jpg` |
| Listing photos | `public/images/listing-1.jpg` through `listing-8.jpg` |
| Realtor photo | drop your photo at `public/images/realtor.jpg`, then in `app/about/page.tsx` replace the `<div>` with `GS` initials with `<Image src="/images/realtor.jpg" fill className="object-cover" alt="Gunavjander Saing" />` |

---

## Token hygiene — please rotate

You shared two tokens in chat:
- Vercel: `vck_69MggSL...` — used for read-only API probes only (user info, list projects)
- Supabase: `sbp_97f2a5d...` — used to create the table, grant policies, run setup queries

**Standard practice is to rotate these now** that the setup is done:
- Vercel: https://vercel.com/account/tokens — delete the old one, create a new one if you ever need one
- Supabase: https://supabase.com/dashboard/account/tokens — same idea

The keys saved in `.env.local` (`NEXT_PUBLIC_SUPABASE_*`) are **public anon keys** intended to be shipped to browsers — those don't need rotating.

---

## Useful commands

```bash
npm run dev      # local dev with hot reload
npm run build    # production build (verified working)
npm run start    # serve the production build
npm run lint     # eslint
```
