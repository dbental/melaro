# MelAro — Brand Identity & Color Strategy

## Wordmark

- **Font:** Major Mono Display (Google Fonts)
- **Text:** `MelAro` — capital A and R are intentional, creating visual rhythm
- **Size:** 22px in UI, scale up proportionally for marketing use
- **Letter spacing:** 0.04em
- **Usage:** Always rendered as live text, never as an image — enables theming, scaling, accessibility
- **CSS token:** `--font-wordmark` → `font-wordmark` Tailwind class

---

## Brand Accent Colors

MelAro expresses a **single brand identity in two modes**. The coral and teal are not competing brands — they are the same product in different environments (light = warm/action, dark = focused/technical).

| Mode | Accent | Hex | Personality |
|------|--------|-----|-------------|
| Light | Coral/Rose | `#E11D48` | Energetic, action-oriented, human |
| Dark | Midnight Teal | `#0D9488` | Focused, technical, professional |

Both share the same brand DNA: bold, precise, purposeful.

---

## Full Color Token System

### Semantic Tokens (apply in both modes)

| Token | Purpose | Light | Dark |
|-------|---------|-------|------|
| `--brand` | Primary accent | `#E11D48` | `#0D9488` |
| `--brand-bg` | Accent tint surface | `#FFF1F2` | `rgba(13,148,136,0.15)` |
| `--brand-text` | Text on accent tint | `#9F1239` | `#5EEAD4` |
| `--info` | Informational / neutral actionable | `#4F46E5` | `#818CF8` |
| `--info-bg` | Info tint surface | `#EEF2FF` | `rgba(129,140,248,0.15)` |
| `--success` | Positive trend / completed | `#16A34A` | `#4ADE80` |
| `--warning` | Pending / at-risk | `#D97706` | `#FBB740` |
| `--danger` | Error / negative trend | `#DC2626` | `#F87171` |

### Surface Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#FAFAFA` | `#0F172A` |
| `--sidebar-bg` | `#FFFFFF` | `#1E293B` |
| `--card-bg` | `#FFFFFF` | `#1E293B` |
| `--card-border` | `#E5E5E5` | `#334155` |
| `--topbar-bg` | `#FFFFFF` | `#1E293B` |

### Text Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--text-primary` | `#111827` | `#F1F5F9` |
| `--text-secondary` | `#6B7280` | `#94A3B8` |
| `--text-muted` | `#9CA3AF` | `#64748B` |

---

## Color Semantics — NEVER BREAK THESE

| Color | Meaning | Allowed uses |
|-------|---------|-------------|
| 🔴 Red / Coral | Danger, error, destructive | Error states, negative trends, delete actions |
| 🟢 Green | Success, positive, complete | Positive trends, ACTIVE status, success toasts |
| 🟡 Amber | Warning, pending, attention | Warning states, budget alerts |
| 🔵 Indigo | Informational, actionable, neutral | Open tasks, info badges, secondary CTAs |
| 🎨 Brand (Coral/Teal) | Brand identity, primary actions | Active nav, primary CTA button, live status badges |

**Rule:** Never use the brand accent (coral/teal) to mean "error" or "warning". It is a brand color, not a semantic state color.

---

## Typography System

| Role | Font | Weight | Use |
|------|------|--------|-----|
| Wordmark | Major Mono Display | 400 | Logo only — `MelAro` |
| Marketing headlines | DM Serif Display | 400 | Landing page H1/H2 |
| UI / Dashboard headings | Inter or Plus Jakarta Sans | 600–700 | Page titles, section headers |
| Body | Plus Jakarta Sans | 400–500 | Marketing body copy |
| UI body | Inter | 400 | Dashboard body, labels |
| Data / numbers | Inter (tabular) | 500–600 | Stats, prices, metrics |

---

## Context-Specific Application

### Marketing Site (`/`, `/pricing`)
- **Mode:** Light by default, no dark toggle
- **Accent:** Coral `#E11D48`
- **Headlines:** DM Serif Display (large, editorial)
- **CTA:** Coral background, white text
- **Feel:** Warm, approachable, B2C-friendly

### Auth Pages (`/login`, `/signup`, `/verify`)
- **Mode:** Light
- **Accent:** Coral `#E11D48`
- **Layout:** Centered card, clean white, minimal
- **Logo:** Full `MelAro` wordmark centered at top

### Onboarding (`/onboarding`, `/configure`, `/launch`)
- **Mode:** Light
- **Accent:** Coral `#E11D48`
- **Progress:** Indigo info tokens for step indicators
- **Feel:** Encouraging, guided, not technical

### Dashboard (`/[orgSlug]/...`)
- **Mode:** Light/dark toggle persisted in localStorage
- **Light accent:** Coral `#E11D48`
- **Dark accent:** Teal `#0D9488`
- **Sidebar:** Logo → active nav → teal/coral left border
- **Feel:** Professional, focused, Linear-meets-Vercel

### Emails / Notifications
- **Mode:** Light (email clients)
- **Accent:** Coral `#E11D48`
- **Font:** System sans-serif fallback (fonts don't load in email)

---

## Tailwind Implementation

Add to `globals.css` `@theme inline` block:

```css
/* Brand tokens */
--color-brand: #E11D48;           /* light mode default */
--color-brand-bg: #FFF1F2;
--color-brand-text: #9F1239;
--color-info: #4F46E5;
--color-info-bg: #EEF2FF;
--color-success: #16A34A;
--color-warning: #D97706;
--color-danger: #DC2626;

/* Font */
--font-wordmark: var(--font-wordmark);
```

Dark mode overrides via `.dark` class (shadcn pattern):
```css
.dark {
  --color-brand: #0D9488;
  --color-brand-bg: rgba(13,148,136,0.15);
  --color-brand-text: #5EEAD4;
  --color-info: #818CF8;
  --color-info-bg: rgba(129,140,248,0.15);
  --color-success: #4ADE80;
  --color-warning: #FBB740;
  --color-danger: #F87171;
}
```

---

## Reference Files

- Approved mockup: `C:\Projects\Melaro\mockups\melaro-refined.html`
- Logo component: `C:\Projects\Melaro\src\components\logo.tsx`
- Globals: `C:\Projects\Melaro\src\app\globals.css`
- Layout: `C:\Projects\Melaro\src\app\layout.tsx`
