# R2U CRM — Enterprise Edition (Next.js)

Route2Uni's enterprise CRM, rebuilt on Next.js 14 (App Router) + TypeScript +
Tailwind + Firebase, replacing the vanilla JS / GitHub Pages version.

## What's in this delivery (Phase 1)

- **Core architecture**: clean-architecture folder layout (`core / modules /
  shared`), RBAC permission matrix (7 roles, resource:action model), domain
  types, Firebase client bootstrap with offline multi-tab persistence.
- **Design system**: `Card`, `Skeleton` (+ KPI/chart skeleton variants),
  dark/light theme with system-preference detection, RBAC-aware `Sidebar`,
  responsive `Topbar`, mobile drawer navigation.
- **Dashboard + Analytics module** (fully working, real-time):
  - 4 KPI cards with trend indicators
  - Revenue vs Target area chart
  - Lead Conversion Funnel bar chart
  - Applications by Status donut chart
  - Live Recent Activity feed (audit-log driven)
  - Full skeleton-loading states, empty states, error states
- **Cloud Functions**: incremental dashboard-aggregation triggers
  (`onLeadWrite`, `onApplicationWrite`) so KPIs stay O(1)-read at any scale.
- **Firestore Security Rules + composite indexes** mirroring the RBAC matrix.

## Folder structure

```
src/
  core/           # framework-agnostic: types, RBAC, firebase config, utils
  modules/        # one folder per business module (dashboard, leads, ...)
    dashboard/
      components/ # presentational, no direct Firestore access
      hooks/       # useDashboardStats — owns subscription lifecycle
      services/    # Firestore read/write functions
      types.ts
  shared/         # cross-module UI kit, layout shell, contexts
functions/        # Cloud Functions (aggregation triggers)
firestore.rules
firestore.indexes.json
```

Each future module (Leads, Students, Applications, Finance, ...) follows the
**exact same four-folder shape** as `modules/dashboard` — this is the
template to copy for every subsequent phase, which is why Phase 1 focused on
getting that shape right rather than rushing breadth.

## Local setup

```bash
npm install
cp .env.local.example .env.local   # fill in Firebase Web SDK config
npm run dev                        # http://localhost:3000
```

To deploy Firestore rules/indexes and Cloud Functions:

```bash
firebase deploy --only firestore:rules,firestore:indexes,functions
```

## Why a dashboard snapshot document instead of live COUNT queries?

See the comment block at the top of
`src/modules/dashboard/services/dashboardService.ts` — short version: at
CRM scale, aggregating millions of records on every page load doesn't work.
Cloud Functions maintain one small aggregate doc per branch incrementally;
the client subscribes to that single document in real time.

## Roadmap (subsequent phases — not yet built)

| Phase | Module(s) | Notes |
|---|---|---|
| 2 | Auth/Login screen, Users & RBAC admin UI | Needed before other modules are usable end-to-end |
| 3 | Leads (CRUD, Kanban pipeline, import/export) | |
| 4 | Students, Universities, Courses | Reference-data + student 360 profile |
| 5 | Applications, Offer Letters, CAS, Visa Processing | Core consultancy workflow |
| 6 | Finance (invoices, commissions, reconciliation) | |
| 7 | Tasks, Calendar, Messaging (DM + threads), Notifications | |
| 8 | Documents (upload, versioning, e-sign hooks), Audit Log viewer | |
| 9 | HR module | |
| 10 | Reports builder + AI-powered insights | |

Every module ships with: CRUD, search/filter, pagination, import/export,
audit logging, activity timeline, attachments, RBAC guards, skeleton
loaders, and responsive layouts — same as Phase 1's dashboard.

**Tell me which phase to build next** (or reorder — e.g. Leads before Users
admin UI is fine if you want to see the pipeline first) and I'll build it
directly on top of this scaffold without touching what's already working.
