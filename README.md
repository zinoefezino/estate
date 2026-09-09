# Haven Realty

Next.js real-estate listings app (Haven Realty) with agent auth, Prisma, and property image uploads.

## Getting Started

```bash
npm install
cp .env.example .env
# fill in DATABASE_URL, SESSION_SECRET, AGENT_EMAIL, AGENT_PASSWORD
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Property image uploads (Vercel Blob)

Images upload via `@vercel/blob` when `BLOB_READ_WRITE_TOKEN` is set. Without the token, uploads fall back to `public/uploads` (fine for local/dev).

### Create a Blob store and token

1. Open your project on [vercel.com](https://vercel.com) → **Storage**.
2. Click **Create** / **Create Database** → choose **Blob**.
3. Choose **Public** access (property photos are public URLs), name the store, and create it.
4. Connect the store to this project if prompted. Vercel adds `BLOB_READ_WRITE_TOKEN` to the project’s environment variables automatically.
5. For local development, either:
   - Copy the token from the Blob store / project **Settings → Environment Variables** into your local `.env` as `BLOB_READ_WRITE_TOKEN`, or
   - Run `vercel env pull` to sync env vars.

Redeploy after connecting Blob so production has the token. Local/static `/uploads/...` and site images under `public/` keep working either way.

## Vercel environment variables

Set these in the Vercel project (**Settings → Environment Variables**) before deploy:

- `DATABASE_URL` — Neon Postgres connection string (include `?sslmode=require`)
- `SESSION_SECRET` — long random secret (at least 32 chars)
- `AGENT_EMAIL` / `AGENT_PASSWORD` — seed/login agent credentials
- `BLOB_READ_WRITE_TOKEN` — from the connected Vercel Blob store (auto-added when you create/connect the store)

After setting `DATABASE_URL`, run `npx prisma migrate deploy` (and optionally `npm run db:seed`) against Neon. Do not run migrate until `DATABASE_URL` points at Neon Postgres.
