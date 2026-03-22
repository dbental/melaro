# Melaro — Decisions Log

## Project Scope (MVP)
- Marketing website: landing page, features, pricing
- Sign-up and login (email/password only, no OAuth for MVP)
- No dashboard, chat, or billing UI in MVP

## Domain
- **melaro.io** — needs to be configured in backend trusted origins

## Brand
- **Name**: Melaro ("Natural Harmony")
- **Branding**: All user-facing copy uses "Melaro", never "Superclip"
- **Design**: Concept E — Obsidian Aurora (dark theme)

## Design System (Concept E — Obsidian Aurora)
- **Palette**: Violet (#7C3AED primary-deep, #A78BFA primary), fuchsia accent (#F0ABFC), amber (#FCD34D)
- **Background**: #09090B (near-black)
- **Typography**: DM Serif Display (headings, serif) + Plus Jakarta Sans (body, sans)
- **Logo**: Italic serif "M" with gradient
- **Effects**: Aurora gradient backgrounds, subtle grid overlay, shimmer text, bento feature grid
- **Mockup reference**: `mockups/concept-e-obsidian-aurora.html`
- **Known fix**: Ghost button text contrast needs improvement

## Tech Stack
| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS 4 + vanilla CSS for complex effects |
| Components | shadcn/ui (Radix + custom Obsidian Aurora tokens) |
| Auth | better-auth client (email/password MVP, OAuth later) |
| Data fetching | TanStack React Query v5 |
| Payments | Stripe (post-MVP) |
| Package manager | pnpm |
| Testing | Vitest + Playwright |

## Deployment
| Phase | Platform |
|-------|----------|
| Local dev | Next.js dev server |
| Preview/staging | Vercel (free tier, dbental-9446 account) |
| Production | AWS (same account as Superclip) |

## Repo Strategy
- Separate repo: github.com/dbental/melaro
- `@superclip/shared` available locally at C:\Projects\superclip\packages\shared — use pnpm link
- Backend coordination via `BACKEND-NOTES.md`

## Pricing Tiers (from mockup — TBD confirmation)
- Starter: $0/mo (1 company, 3 agents, 100 heartbeats)
- Pro: $49/mo (5 companies, 25 agents, unlimited heartbeats)
- Enterprise: Custom
