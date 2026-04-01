# Melaro Marketing Site — UI/UX Improvement Plan

**Site:** https://melaro-marketing.vercel.app/
**Pages in scope:** `/` (Home), `/platform`, `/use-cases`, `/waitlist`
**Prepared for:** Designer / Frontend Developer
**Date:** 2026-03-30

---

## Table of Contents

1. [Quick Wins (< 1 day)](#1-quick-wins)
2. [Mobile Navigation](#2-mobile-navigation)
3. [Hero Section](#3-hero-section)
4. [Social Proof](#4-social-proof)
5. [Waitlist Page](#5-waitlist-page)
6. [Use Cases Page](#6-use-cases-page)
7. [Platform Page](#7-platform-page)
8. [Global / All Pages](#8-global--all-pages)
9. [Acceptance Criteria Checklist](#9-acceptance-criteria-checklist)

---

## 1. Quick Wins

These can be done in isolation with no design review needed.

| Task | File / Component | Notes |
|------|-----------------|-------|
| Add active state to nav links | `Navbar` | Highlight current page link (e.g., bottom border or brighter color) |
| Fix hero subtitle max-width | `Hero` section | Add `max-w-lg` to the subtitle paragraph |
| Add `prefers-reduced-motion` guard | Global CSS | Disable orbital animation for users with motion sensitivity |
| Add footer legal links | `Footer` | Privacy Policy + Terms of Service links |
| Add post-submit success state | `Waitlist` form | Show confirmation after "Get Early Access" is clicked |

---

## 2. Mobile Navigation

**Priority:** Critical
**Breakpoint:** < 768px
**Pages affected:** All

### Problem
At mobile viewports (~390px), the full desktop navbar (wordmark + 4 links + CTA button) is displayed without collapsing. On actual devices this will overflow or produce untappable touch targets.

### Required Behaviour
- Desktop (≥ 768px): current navbar layout unchanged
- Mobile (< 768px): hide nav links + CTA button, show hamburger icon (top-right)
- Tapping hamburger opens a full-screen or slide-in drawer with:
  - Wordmark at top
  - Nav links stacked vertically (Home, Platform, Use Cases)
  - "Waitlist" CTA button at the bottom of the drawer, full-width
  - Close (×) button top-right
- Drawer opens/closes with a smooth slide or fade animation (150–250ms)
- Tapping outside the drawer or pressing Escape closes it
- Body scroll should be locked while drawer is open

### Design Notes
- Use the existing amber CTA style for the Waitlist button in the drawer
- Nav link font style should match the desktop version
- Drawer background: `bg-bg-elevated` (`#111114`) with a subtle overlay scrim on the page behind it

---

## 3. Hero Section

**Priority:** High
**Page:** `/` (Home)

### 3.1 CTA Hierarchy Fix

**Problem:** Two CTAs of equal visual weight split conversion focus.

**Current:**
```
[  Reserve Early Access  ]   [  See Use Cases  ]
       amber button              ghost button
       (equal weight)            (equal weight)
```

**Fix:**
```
[  Reserve Early Access  ]   See Use Cases →
       amber button           plain text link (no border)
```

- "Reserve Early Access" stays as the amber filled button
- "See Use Cases" becomes a plain inline text link with a right arrow (`→`), styled `text-fg-muted` with `hover:text-foreground` transition
- Both remain on the same row on desktop; stack vertically on mobile (button first, text link second)

---

### 3.2 Subtitle Line Length

**Problem:** The subtitle paragraph ("Melaro is a shared operational layer...") renders at ~80 characters wide on desktop, exceeding the readable maximum of 65–75 characters.

**Fix:**
- Constrain the subtitle to `max-w-lg` (512px)
- Let it wrap naturally — do not truncate

---

### 3.3 Social Proof Micro-Line

Add a single trust-signal line directly below the CTA buttons.

**Placement:** Below the two CTAs, ~16px margin-top
**Style:** Small text (`text-xs` or `text-sm`), `text-fg-dim`, centered on mobile / left-aligned on desktop
**Content example:**
> `● 847 teams on the waitlist · Early access Q3 2025`

- The `●` dot should use the amber/orange accent color
- Update the number dynamically if Supabase data is available; otherwise hardcode a credible figure until launch

---

## 4. Social Proof

**Priority:** High
**Pages affected:** `/` (Home), `/waitlist`

### 4.1 Homepage — Add a Social Proof Section

Currently the landing page has no testimonials, logos, or user validation. Add a social proof section between the "Why It Feels Different" feature grid and "The Pulse" section.

**Section structure:**
```
[SECTION LABEL]  EARLY TRACTION

[Headline]  Built for teams that move fast.

[Content]   3–5 quote cards or a single large featured quote
            + logos row (if early design partners / advisors exist)
```

- If real testimonials aren't available yet: use attributed quotes from design partners, advisors, or beta testers
- If no quotes available: use a waitlist count stat block instead:
  ```
  [ 847 ]           [ 12 ]           [ 4 ]
  Teams registered  Industries       Use cases live
  ```
- Style: same card style as existing feature cards (`bg-bg-elevated`, `border-card-border`, `rounded-2xl`)

---

### 4.2 Waitlist Page — Show Waitlist Count

On the Waitlist page hero, add a live or static count below the headline.

**Placement:** Below the subtitle ("This intake flow is designed to capture...")
**Content:** `"Join 847 teams already registered"`
**Style:** Small, `text-fg-muted`, with a pulsing amber dot to indicate live data

---

## 5. Waitlist Page

**Priority:** High
**Page:** `/waitlist`

### 5.1 Replace Free-Text Fields with Structured Inputs

**Problem:** "Primary Goal" and "Favorite Integration" are open text inputs. The form's stated purpose is segmentation, which requires consistent structured data.

**Fix — Primary Goal:** Replace with a chip selector (multi-select pills):

| Option | Value |
|--------|-------|
| Build an autonomous product | `build` |
| Integrate my existing stack | `integrate` |
| Run roleplay or simulation | `simulate` |
| Collaborate across teams | `collaborate` |

**Fix — Favorite Integration:** Replace with a multi-select chip selector:

| Options |
|---------|
| GitHub |
| Jira |
| Monday.com |
| Notion |
| Slack |
| Linear |
| Other |

**Chip UI design:**
- Unselected: `border border-card-border bg-bg-surface text-fg-muted rounded-full px-4 py-2`
- Selected: `border border-primary-bright bg-glow-primary text-primary-bright rounded-full px-4 py-2`
- Allow multi-select for the Integration field; single-select for Primary Goal

---

### 5.2 Post-Submit Success State

**Problem:** After submitting, there is no visible confirmation.

**Fix — Option A (inline):** Replace the form content with a success message:
```
[✓ icon]
You're on the list.
We'll route you to the right onboarding path based on your ecosystem shape.
Check your inbox for a confirmation.

[Back to Home] (text link)
```

**Fix — Option B (redirect):** Redirect to a `/waitlist/confirmed` page with the above message.

Recommended: Option A (inline replacement, no page load).

---

### 5.3 Explain the "Founder Rank" Mechanic

The "FOUNDER RANK PREVIEW" card appears dynamically but with no explanation of what the rank means or why it matters.

**Fix:** Add a tooltip or helper text below the preview card:
> *"Your Founder Rank reflects your ecosystem archetype. It determines your onboarding sequence and early access tier."*

---

### 5.4 Form Layout — Fields Above the Fold

On initial load, the Name and Email fields are partially visible but the remaining fields require scrolling. Consider stacking the form more compactly or using a two-step flow:

- **Step 1:** Name + Email → "Continue"
- **Step 2:** Primary Goal + Favorite Integration + Team Shape → "Get Early Access"

A two-step form typically improves completion rates by reducing perceived effort upfront.

---

## 6. Use Cases Page

**Priority:** High
**Page:** `/use-cases`

### 6.1 Replace Placeholder Persona Copy

All four persona cards currently show identical placeholder text:
> *"Mission heartbeat aligned with the autonomous entrepreneur pathway."*

Each card needs a unique, specific description. Suggested directions:

| Persona | Suggested Description |
|---------|-----------------------|
| CEO Agent | "Owns the mission heartbeat. Escalates blockers, flags drift, and keeps the ecosystem aligned with strategic goals." |
| CTO Agent | "Routes technical decisions through the right review layers. Maintains architecture coherence across sprint cycles." |
| Product Strategist | "Translates roadmap priorities into division signals. Owns the product narrative layer." |
| Go-to-Market Lead | "Coordinates launch sequencing, partner signals, and outbound activation across the ecosystem." |

---

### 6.2 Build Out or Hide Incomplete Tab Panels

Currently only the "Autonomous Entrepreneur" tab has full content. The other three tabs ("Bring Your Own Project", "Roleplay & Simulation", "Creative Hub") should either:

- **Option A:** Be fully built out with unique left-panel copy + right-panel cards
- **Option B:** Be hidden/disabled with a "Coming soon" state if content isn't ready

Do not leave tabs that navigate to empty or near-empty states.

---

### 6.3 Add Icons to Feature List Items

The left-panel feature bullet list (e.g., "Division templates for startup, agency, and venture studio launches") has no visual anchors.

**Fix:** Prefix each list item with a small SVG icon (Lucide or Heroicons, `16px`, `text-fg-muted`). Suggested icons:

| Feature | Icon |
|---------|------|
| Division templates | `layout-template` |
| Heartbeat loops | `activity` |
| Persona-driven missions | `user-check` |

---

## 7. Platform Page

**Priority:** Medium
**Page:** `/platform`

### 7.1 Add Icons to Feature Cards

The 4-column feature grid (Semantic Memory, Intelligent Routing, Project Guardrails, Live Knowledge) is visually undifferentiated. Each card needs an icon to aid scanning.

**Suggested icons (Lucide):**

| Feature Card | Icon |
|-------------|------|
| Semantic Memory | `brain` |
| Intelligent Routing | `git-branch` |
| Project Guardrails | `shield-check` |
| Live Knowledge | `database-zap` |

**Icon style:** `24px`, color `text-primary-bright` (`#C4B5FD`), placed above the card title.

---

### 7.2 Reduce Grid Background Opacity on Interior Pages

The decorative CSS grid overlay that persists across all pages creates visual noise on the Platform page where it competes with card borders.

**Fix:** On `/platform` and `/use-cases`, reduce the grid opacity to 30–40% of the homepage value. Can be done via a page-level class override.

---

## 8. Global / All Pages

### 8.1 `prefers-reduced-motion`

Add the following to the global stylesheet to respect user accessibility preferences:

```css
@media (prefers-reduced-motion: reduce) {
  /* Orbital animation */
  .orbital-canvas,
  .orbital-canvas * {
    animation: none !important;
    transition: none !important;
  }

  /* Any other keyframe animations */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 8.2 Active Nav State

The current page is not visually indicated in the navbar.

**Fix:** On the active link, apply:
- A bottom border: `border-b border-primary-bright`
- Or brighter text: `text-foreground` instead of `text-fg-muted`

Use Next.js `usePathname()` to determine active route.

---

### 8.3 Skip-to-Content Link (Accessibility)

Add a visually hidden skip link as the first focusable element in the page:

```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-bg-elevated focus:text-foreground focus:rounded-lg">
  Skip to main content
</a>
```

Add `id="main-content"` to the `<main>` element.

---

### 8.4 Footer Legal Links

Add the following to the footer, right-aligned or center-aligned below the existing nav links:

```
Privacy Policy  ·  Terms of Service
```

- Style: `text-xs text-fg-dim hover:text-fg-muted`
- These pages can be placeholder `/privacy` and `/terms` routes initially

---

### 8.5 Consistent Heading Hierarchy

Ensure heading levels don't skip across pages. Current structure mixes visually similar weights at different semantic levels. Verify:

- Each page has exactly one `<h1>` (the hero headline)
- Section headlines are `<h2>`
- Card titles within sections are `<h3>`
- No visual heading has a lower heading level than its visual weight implies

---

## 9. Acceptance Criteria Checklist

Use this as a QA checklist before marking work complete.

### Mobile
- [ ] Navbar collapses at < 768px with a working hamburger menu
- [ ] Hamburger drawer contains all nav links and the Waitlist CTA
- [ ] Drawer closes on outside tap and Escape key
- [ ] Body scroll locks when drawer is open
- [ ] All touch targets are ≥ 44×44px
- [ ] No horizontal scroll at 390px viewport width
- [ ] Hero CTAs stack vertically on mobile (button above text link)

### Homepage
- [ ] "See Use Cases" is a text link, not a ghost button
- [ ] Hero subtitle constrained to ~65 chars max-width
- [ ] Social proof micro-line visible below CTAs
- [ ] Social proof section exists between features and heartbeat sections
- [ ] Orbital animation is disabled when `prefers-reduced-motion` is set
- [ ] Active nav state shows on "Home" link

### Waitlist Page
- [ ] "Primary Goal" is a chip selector (single-select)
- [ ] "Favorite Integration" is a chip selector (multi-select)
- [ ] Waitlist count displayed on page
- [ ] Founder Rank mechanic has explanation text
- [ ] Post-submit success state replaces form (no page reload required)

### Use Cases Page
- [ ] All four persona cards have unique, meaningful descriptions
- [ ] All four tabs have real content OR incomplete tabs show a "Coming soon" state
- [ ] Feature list items have icons

### Platform Page
- [ ] All four feature cards have icons
- [ ] Grid background opacity reduced vs homepage

### Global
- [ ] `prefers-reduced-motion` CSS rule added
- [ ] Active nav link state implemented on all pages
- [ ] Skip-to-content link present and functional
- [ ] Footer includes Privacy Policy and Terms of Service links
- [ ] Heading hierarchy is semantically correct on all pages (one `<h1>` per page)
- [ ] No horizontal scroll at any of: 390px, 768px, 1024px, 1440px
