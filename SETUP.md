# Swincotex CRUD build — what's here and what's next

## Corrections from the previous pass

You flagged three wrong assumptions — all fixed now:

1. **Database driver**: swapped `@prisma/adapter-neon` for `@prisma/adapter-pg`
   (standard node-postgres, via the `pg` package). This is Postgres-generic —
   the exact same code runs against local Postgres in dev and Neon (or
   anywhere else) in production. `src/lib/prisma.ts` and `prisma/seed.ts`
   both updated.
2. **Image uploads**: swapped Vercel Blob for `next-cloudinary`'s
   `CldUploadWidget`, using **signed uploads** (not unsigned — signed
   means only logged-in Admin/Staff can push assets, via
   `/api/sign-cloudinary-params`, gated by `requireSessionResponse()`).
   `src/components/admin/ImageUploadField.tsx` rewritten; the old
   `/api/admin/upload` Blob route is deleted.
3. **Auth adapter**: added `@auth/prisma-adapter` (`PrismaAdapter`) to
   `auth.ts`, and added the `Account`, `Session`, `VerificationToken`
   models to `schema.prisma` that it requires. **Important constraint**:
   session strategy stays `"jwt"` even with the adapter present — Auth.js
   does not support database sessions with the Credentials provider,
   since there's no OAuth-verified identity to persist a session against.
   The adapter is still worth having: it's what lets you add Google/GitHub
   sign-in later with zero schema changes.

   One thing to flag: your dependency list has both `@auth/prisma-adapter`
   (current, v5-compatible) and `@next-auth/prisma-adapter` (the old v4
   package, different scope). I used `@auth/prisma-adapter` throughout —
   the `@next-auth/*` one is safe to remove unless something else in your
   codebase still imports it directly.

Also removed the custom `output = "../src/generated/prisma"` from the
generator block to match the schema you pasted back (default output —
`@prisma/client` is the import path everywhere now, not `@/generated/prisma`).

## What's fully built and working

- **Database**: `prisma/schema.prisma` — every content model + NextAuth
  adapter tables + `prisma/seed.ts` populating everything from your
  existing hardcoded data.
- **Auth**: Auth.js v5, Credentials provider + PrismaAdapter, JWT
  sessions, Admin/Staff roles. `proxy.ts` (Next 16's renamed
  `middleware.ts`) protects `/admin/*` and restricts Staff to `/admin/news`.
- **Notifications**: bell in the admin header, polls every 30s.
- **Email**: Resend integration (free tier, no card).
- **Google Sheets forwarding**: service-account based.
- **Image uploads**: Cloudinary, signed uploads via `CldUploadWidget`.
- **Full CRUD vertical slice for Services** — copy this exact pattern
  for Projects, Team, Gallery, News.
- **Contact form submission API** (`/api/contact`).
- **Admin dashboard home + messages inbox**.

## Open question before I build News/Blog

Your dependencies (`@hookform/resolvers`, likely paired with
`react-hook-form` + a zod-style resolver, plus `@headlessui/react`) suggest
your real forms elsewhere in the app use react-hook-form, not the plain
`useState` I used in `ServiceForm.tsx`. Confirm: should I rebuild
`ServiceForm` (and everything going forward) on `react-hook-form` +
`@hookform/resolvers`, and use Headless UI for selects/comboboxes instead
of the plain `<select>`/button-grid I used for the icon picker? I don't
want to guess again and hand you a third version.

## What's NOT built yet

- Projects, Team, Gallery, News/Blog CRUD (same pattern as Services)
- About / Contact page editors
- Public pages still read from `src/lib/*-data.ts`, not Prisma — needs
  reconnecting once you're happy with the CMS

## Setup steps

1. `npm install`

2. **Database**: point `DATABASE_URL` / `DIRECT_URL` at Postgres — local
   Postgres for dev, Neon for prod (see comments in `.env.example`).

3. **Auth secret**: `npx auth secret`

4. **Push schema + seed**:
   ```
   npx prisma migrate dev --name init
   npm run db:seed
   ```
   Creates `admin@swincotex.com` / `staff@swincotex.com`, password
   `ChangeMe123!` unless overridden via `SEED_ADMIN_PASSWORD` /
   `SEED_STAFF_PASSWORD`. Change these after first login.

5. **Cloudinary**: create a free account, grab your cloud name, API key,
   and API secret from the dashboard into the three `CLOUDINARY_*` env
   vars. No upload preset needed since uploads are signed server-side.

6. **Resend**: free API key into `RESEND_API_KEY`.

7. **Google Sheets**: Service Account JSON key → `GOOGLE_SHEETS_CLIENT_EMAIL`
   / `GOOGLE_SHEETS_PRIVATE_KEY`, sheet shared with that email as Editor,
   sheet ID → `GOOGLE_SHEETS_SPREADSHEET_ID`.

8. **next.config.ts**: allow Cloudinary's image domain for `next/image`:
   ```ts
   images: {
     remotePatterns: [
       new URL("https://res.cloudinary.com/**"),
     ],
   },
   ```

9. Visit `/login`, sign in as admin, go to `/admin/services`.
