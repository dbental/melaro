# Backend Notes

Shared notes between the Melaro frontend and Superclip backend engineers.

## Backend Reference
- **Repo**: C:\Projects\superclip
- **API Base**: http://localhost:3100/api
- **Auth**: better-auth (sessions + OAuth)
- **DB**: PostgreSQL (73 tables, Drizzle ORM)
- **Real-time**: WebSocket at /api/companies/{companyId}/events/ws

## Deployment Plan
- **Local dev**: Next.js dev server
- **Preview/staging**: Vercel (free tier, preview deploys per PR)
- **Production**: AWS (same account as Superclip) — CloudFront + S3 for static, App Runner for SSR when dashboard is added
- **WebSocket**: Browser connects directly to Superclip API (wss://), does NOT proxy through frontend hosting

## Frontend → Backend Requests

_Items the frontend needs from the backend team._

- [x] `@superclip/shared` available locally at C:\Projects\superclip\packages\shared (pnpm link)
- [ ] Confirm production API URL (api.melaro.io?)
- [ ] Add melaro.io to better-auth trusted origins
- [ ] MVP auth is email/password only — confirm better-auth email provider is configured

## Backend → Frontend Notes

_Items the backend team wants the frontend to know._
