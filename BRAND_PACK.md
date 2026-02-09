# PKH Mentoring App — Brand Pack

**Client:** Property Know How
**Version:** 1.1
**Date:** 6th February 2026

---

## 1. LOGO

- **File:** `public/pkh_logo.png`
- **Usage:** Top-left of all pages (student and admin)
- **Logo:** "property know how" in bold black serif/slab-serif with three coloured circles (red, orange, green)
- **Note:** Logo colours are fixed and do not change. The app colour scheme is independent of the logo.

---

## 2. COLOUR PALETTE

Design direction: **Professional, trustworthy, calming.** Inspired by premium financial/property consultancy aesthetics — deep navy with warm gold accents.

### Primary Colours

| Colour | Hex | CSS Variable | Usage |
|--------|-----|-------------|-------|
| **Navy** | `#1B2B4B` | `--pkh-navy` | Headers, sidebar, primary backgrounds, headings |
| **Deep Navy** | `#0F1D35` | `--pkh-navy-dark` | Sidebar active states, hover, footer |
| **Gold** | `#C5A55A` | `--pkh-gold` | Accents, highlights, premium touches, links |
| **Warm Gold** | `#D4B96C` | `--pkh-gold-light` | Hover states, secondary accents |
| **Dark Gold** | `#A8893E` | `--pkh-gold-dark` | Active/pressed states |

### Functional Colours

| Colour | Hex | Usage |
|--------|-----|-------|
| **Success Green** | `#2D8A4E` | Confirmations, success states, available indicators |
| **Warning Amber** | `#D4952B` | Waitlist, approaching capacity, attention states |
| **Error Red** | `#C23B3B` | Errors, destructive actions, closed/full indicators |
| **Info Blue** | `#3B7DC2` | Information notices, links in body text |

### Neutral Palette

| Colour | Hex | Usage |
|--------|-----|-------|
| **White** | `#FFFFFF` | Page backgrounds, cards |
| **Warm White** | `#FAFAF8` | Subtle background tint, alternating table rows |
| **Light Sand** | `#F3F0EA` | Section backgrounds, card backgrounds on dark pages |
| **Stone** | `#E0DBD1` | Borders, dividers, input borders |
| **Warm Grey** | `#8C8577` | Secondary text, placeholders, captions |
| **Charcoal** | `#3D3D3D` | Body text |
| **Near Black** | `#1A1A1A` | Primary text (used sparingly) |

### Tailwind Config Extension

```javascript
// tailwind.config.ts — extend theme.colors
colors: {
  pkh: {
    navy: {
      DEFAULT: '#1B2B4B',
      dark: '#0F1D35',
      light: '#2A3F66',
    },
    gold: {
      DEFAULT: '#C5A55A',
      light: '#D4B96C',
      dark: '#A8893E',
    },
    sand: {
      DEFAULT: '#F3F0EA',
      dark: '#E0DBD1',
    },
    warm: {
      white: '#FAFAF8',
      grey: '#8C8577',
    },
    charcoal: '#3D3D3D',
    success: '#2D8A4E',
    warning: '#D4952B',
    error: '#C23B3B',
    info: '#3B7DC2',
  },
}
```

---

## 3. TYPOGRAPHY

### Font Stack

- **Headings:** `Inter` (Google Fonts) — semibold/bold, clean, modern
- **Body:** `Inter` — regular weight
- **Fallback:** `system-ui, -apple-system, sans-serif`
- **Alternative consideration:** `DM Sans` for a slightly softer, premium feel

### Hierarchy

| Element | Size | Weight | Colour |
|---------|------|--------|--------|
| Page title (h1) | 2rem / 32px | Bold (700) | PKH Navy |
| Section title (h2) | 1.5rem / 24px | Semibold (600) | PKH Navy |
| Subsection (h3) | 1.25rem / 20px | Semibold (600) | Charcoal |
| Body text | 1rem / 16px | Regular (400) | Charcoal |
| Small / caption | 0.875rem / 14px | Regular (400) | Warm Grey |
| Label | 0.875rem / 14px | Medium (500) | PKH Navy |

---

## 4. UI COMPONENTS STYLE GUIDE

### Buttons

| Type | Background | Text | Border | Usage |
|------|-----------|------|--------|-------|
| **Primary** | PKH Navy | White | None | Main CTAs (Submit, Confirm, Save) |
| **Primary accent** | PKH Gold | Navy Dark | None | Premium CTAs (student submit) |
| **Secondary** | White | Charcoal | Stone | Cancel, secondary actions |
| **Danger** | Error Red | White | None | Delete, revoke, destructive |
| **Ghost** | Transparent | PKH Navy | None | Tertiary actions, navigation |

- Border radius: `0.5rem` (8px)
- Padding: `0.75rem 1.5rem`
- Hover: darken by 8%, subtle shadow
- Disabled: 50% opacity
- Transition: `all 150ms ease`

### Cards

- Background: White
- Border: 1px Stone (`#E0DBD1`)
- Border radius: `0.75rem` (12px)
- Shadow: `0 1px 3px rgba(27, 43, 75, 0.08)`
- Padding: `1.5rem`
- Hover (if clickable): shadow increases slightly

### Form Inputs

- Background: White
- Border: 1px Stone (`#E0DBD1`)
- Border radius: `0.5rem`
- Focus: 2px ring PKH Gold (`#C5A55A`) with subtle glow
- Error: 2px ring Error Red
- Padding: `0.75rem 1rem`
- Label: 14px, medium weight, PKH Navy, above input with 4px gap

### Status Badges

| Status | Background | Text | Border |
|--------|-----------|------|--------|
| Active | `#EBF5EE` | Success Green | None |
| Waitlist | `#FEF3E2` | Warning Amber | None |
| Inactive | `#F3F0EA` | Warm Grey | None |
| Open | `#EBF5EE` | Success Green | None |
| Closed | `#FDEAEA` | Error Red | None |
| Full | `#FEF3E2` | Warning Amber | None |
| Unused | `#F3F0EA` | Warm Grey | None |
| Completed | `#EBF5EE` | Success Green | None |
| Expired | `#F3F0EA` | Warm Grey | None |
| Revoked | `#FDEAEA` | Error Red | None |

- Padding: `0.25rem 0.75rem`
- Border radius: `9999px` (pill shape)
- Font size: 12px, font weight: 500

### Capacity Bars

- Track: Stone (`#E0DBD1`)
- Fill < 70%: Success Green
- Fill 70–90%: Warning Amber
- Fill > 90%: Error Red
- Height: 8px
- Border radius: 4px

---

## 5. LAYOUT GUIDELINES

### Student Pages

- Centred layout, max-width `640px`
- Logo top-centre
- White background with subtle Sand section for the form area
- Clean, minimal, welcoming — "calm and professional"
- Mobile-first responsive
- Card-based form sections
- Navy headings, gold accent on the submit button

### Admin Pages

- **Sidebar:** PKH Navy background, white text, gold active state
- Content area: Warm White background
- Cards on white
- Max-width content: `1280px`
- Tables: White background, Sand alternating rows, Stone borders
- Responsive (sidebar collapses to top bar on mobile)

### Admin Sidebar Spec

- Width: `256px`
- Background: PKH Navy (`#1B2B4B`)
- Logo: White/light version or original on navy background
- Nav items: White text, 14px, medium weight
- Active nav item: Gold text (`#C5A55A`) with subtle gold left border
- Hover: slightly lighter navy background (`#2A3F66`)
- Divider between sections: subtle line in navy-light

### Spacing Scale

| Token | Size | Usage |
|-------|------|-------|
| xs | 4px | Tight gaps (label to input) |
| sm | 8px | Within components |
| md | 16px | Between form fields, table cell padding |
| lg | 24px | Between sections |
| xl | 32px | Page padding (desktop) |
| 2xl | 48px | Major section breaks |

---

## 6. ICONOGRAPHY

- Use **Lucide React** icons
- Size: 20px default, 16px in buttons/badges
- Colour: inherit from text colour
- Sidebar icons: 20px, white (gold when active)
- Weight: stroke-width 1.75 (slightly lighter than default for elegance)

---

## 7. TONE & MESSAGING

### Student-Facing

- Warm, professional, reassuring
- Premium feel — "you're in good hands"
- Clear instructions, no jargon
- Supportive language ("You're all set!", "We'll see you on...")
- Contact info prominent for questions

### Admin-Facing

- Functional, efficient, clean
- Clear labels, data-focused
- Status-driven (colours and badges communicate state at a glance)
- Navy dominates, gold draws attention to key actions

---

## 8. EMAIL TEMPLATE STYLE

- Clean HTML email
- Navy header bar with PKH logo (centred)
- White body, Charcoal text
- Gold accent line or divider
- Key info (date, time, zoom link) in a Sand-background box
- CTA button: Navy background, white text
- Footer: Warm Grey text, "Property Know How Support — support@propertyknowhow.com"
- Mobile-responsive

---

## 9. DESIGN PRINCIPLES

1. **Trust first** — Navy conveys authority and reliability. Every element should feel established, not startup-y.
2. **Calm confidence** — Warm neutrals (sand, stone) create a calm environment. Students selecting their slot shouldn't feel rushed or anxious.
3. **Premium without pretension** — Gold accents are used sparingly for impact. Not everything needs to be gold.
4. **Clarity over decoration** — Admin pages prioritise readability and data density. Student pages prioritise focus and simplicity.
5. **The logo stands alone** — The red/orange/green logo is a recognisable brand mark. The app design complements it without competing with it.
