# Green Farm Agrotech — Order & Stock Visibility Portal

An MVP portal with a public product catalog + RFQ form, and a Clerk-protected admin dashboard for managing stock and inquiries.

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full architecture reference (stack, folder structure, data model, deployment topology).

## Apps

This is an npm-workspaces monorepo with two independently deployable apps:

- **`apps/api`** — NestJS REST API (Prisma + Neon Postgres, Clerk auth, Resend email)
- **`apps/web`** — Next.js frontend (public catalog + RFQ form, Clerk-protected admin dashboard)

## Running locally

### API (`apps/api`)

```bash
cd apps/api
npm install
npm run start:dev
```

Runs at `http://localhost:3000` by default (see `.env` for configuration once Prisma/Clerk/Resend are wired up).

### Web (`apps/web`)

```bash
cd apps/web
npm install
npm run dev
```

Runs at `http://localhost:3000` by default — set `NEXT_PUBLIC_API_URL` in `.env.local` to point at the running API (use a different port for one of the two apps when running both at once).