# Haven Realty

A modern real-estate brokerage web app: a public site for buyers and renters to browse and inquire, plus a private agent dashboard to manage listings, photos, prices, availability, and inquiries.

**Positioning:** brokerage marketing site + staff tools — not an open marketplace. Visitors browse and contact; agents manage inventory behind login.

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, Hugeicons |
| Language | TypeScript |
| Database | PostgreSQL (Neon) via Prisma ORM |
| Auth | bcryptjs + jose (JWT cookie sessions) |
| Images | Vercel Blob (`@vercel/blob`) |
| Hosting | Vercel |
| Font | Bricolage Grotesque |

## Features

### Public
- Landing page (hero, search, featured listings, why us, testimonials, consultation, CTA, footer)
- Hero search: location, property type, max price → filtered `/listings`
- Browse / Buy / Rent listings with filters
- Property detail pages
- Inquiry form on each listing
- Mobile-responsive cream / green / sand brand UI

### Agent dashboard (`/agent`)
- Secure email/password login
- Overview (counts, recent properties & inquiries)
- Property CRUD (title, description, price, location, beds/baths/sqft, type, sale/rent, status)
- Multi-image upload (primary + gallery)
- Mark available / sold / rented
- Inquiry inbox (read / unread)

## Data model

- **Agent** → owns **Properties**
- **Property** → many **PropertyImages**, many **Inquiries**
- Status: `available` / `sold` / `rented`
- Listing type: `sale` / `rent`
- Property types: house, apartment, condo, townhouse, land

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/listings` | Browse / filter listings |
| `/listings/[id]` | Property detail + inquiry |
| `/agent/login` | Agent login |
| `/agent` | Dashboard overview |
| `/agent/properties` | Manage properties |
| `/agent/properties/new` | Create property |
| `/agent/properties/[id]/edit` | Edit property |
| `/agent/inquiries` | Manage inquiries |

## Getting started

```bash
npm install
cp .env.example .env
# fill in DATABASE_URL, SESSION_SECRET (and optional AGENT_EMAIL / AGENT_PASSWORD)
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start local development server |
| `npm run build` | Production build (webpack) |
| `npm run start` | Start production server |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Create / apply migrations (dev) |
| `npm run db:seed` | Seed demo agent + sample properties |
| `npm run db:push` | Push schema without a migration |

## Environment variables

Copy `.env.example` to `.env` and set:

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Neon Postgres URL (prefer pooled; include `sslmode=require`) |
| `SESSION_SECRET` | Yes | Long random secret (≥ 32 characters) |
| `BLOB_READ_WRITE_TOKEN` | Yes on Vercel | From a connected Vercel Blob store |
| `AGENT_EMAIL` | Optional | Seed / agent email (defaults locally) |
| `AGENT_PASSWORD` | Optional | Seed / agent password (defaults locally; required in production seed) |

## Property image uploads (Vercel Blob)

- With `BLOB_READ_WRITE_TOKEN` set, images upload to **Vercel Blob** (public URLs stored in the DB).
- Locally, without a token, uploads fall back to `public/uploads`.
- On **Vercel**, disk writes are not available — Blob is required. After adding the token, **redeploy** so the runtime picks it up.

### Create a Blob store

1. Open the project on [vercel.com](https://vercel.com) → **Storage**.
2. **Create** → **Blob** → **Public** access.
3. Connect the store to this project (auto-adds `BLOB_READ_WRITE_TOKEN`).
4. Confirm the variable is enabled for **Production** (and Preview if needed).
5. Locally: copy the token into `.env`, or run `vercel env pull`.

Server Actions body size is raised to **10MB** in `next.config.ts` so typical property photos can upload.

## Deploy on Vercel

1. Push the repo and import the project on Vercel.
2. Set env vars: `DATABASE_URL`, `SESSION_SECRET`, `BLOB_READ_WRITE_TOKEN` (plus optional agent seed vars).
3. Run against Neon (locally or in a one-off job):

```bash
npx prisma migrate deploy
npm run db:seed
```

4. Deploy. If you add or change env vars later, **redeploy** so the new values are available at runtime.

## Architecture notes

- Next.js App Router + Server Actions for mutations (auth, properties, inquiries)
- Prisma migrations against Neon Postgres
- JWT session cookies for agent auth (`jose` + `bcryptjs`)
- Vercel Blob for durable image storage in production
- Public header is buyer-facing; agent login lives in the footer / `/agent/login`

## License

Private project.