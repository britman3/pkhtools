# Claude Code Build Spec — PKH Tools Hub (pkhtools.com)

**Version:** 1.0
**Date:** 9th February 2026

---

## 0. CONTEXT & REFERENCES

Before building, read these project files for brand guidelines and deployment conventions:

- `BRAND_PACK.md` — Colours, typography, spacing, component styles, design principles
- `TECH_STACK.md` — Reference only (this is a static site, not Next.js)
- `hetzner-deployment-guide.md` — Server folder structure, Nginx config, deployment process
- `pkh_logo.png` — Brand logo file

**Server:** Hetzner VPS at `65.21.149.39`. Domain `pkhtools.com` points to this server.

---

## 1. GOAL

Build a fast, mobile-friendly static landing page at `https://pkhtools.com` that acts as a central hub linking to internal PKH tools. It should feel like an internal member dashboard — not a public marketing page. Clean, functional, professional.

---

## 2. BUILD OUTPUT

This is a **static site**. No frameworks, no build step, no Node.js.

```
pkhtools.com/
├── index.html
├── styles.css
├── app.js                  # Banner dismiss logic only
├── assets/
│   ├── pkh_logo.png        # Copy from project files
│   └── favicon.ico         # Generate from logo (see §11)
└── README.md               # How to deploy/update
```

**Deployment location on server:** `/var/www/pkhtools.com/`

---

## 3. BRANDING — FOLLOW BRAND_PACK.md EXACTLY

### Colour Variables (define as CSS custom properties)

```css
:root {
  /* Primary */
  --pkh-navy: #1B2B4B;
  --pkh-navy-dark: #0F1D35;
  --pkh-navy-light: #2A3F66;
  --pkh-gold: #C5A55A;
  --pkh-gold-light: #D4B96C;
  --pkh-gold-dark: #A8893E;

  /* Functional */
  --pkh-success: #2D8A4E;
  --pkh-warning: #D4952B;
  --pkh-error: #C23B3B;
  --pkh-info: #3B7DC2;

  /* Neutrals */
  --pkh-white: #FFFFFF;
  --pkh-warm-white: #FAFAF8;
  --pkh-sand: #F3F0EA;
  --pkh-stone: #E0DBD1;
  --pkh-warm-grey: #8C8577;
  --pkh-charcoal: #3D3D3D;
  --pkh-near-black: #1A1A1A;

  /* Status badge backgrounds */
  --pkh-success-bg: #EBF5EE;
}
```

### Typography

- **Font:** `Inter` from Google Fonts (weights: 400, 500, 600, 700)
- **Fallback:** `system-ui, -apple-system, sans-serif`
- Follow the hierarchy from BRAND_PACK.md §3 exactly:
  - h1: 2rem, bold (700), Navy
  - h2: 1.5rem, semibold (600), Navy
  - Body: 1rem, regular (400), Charcoal
  - Small/caption: 0.875rem, regular (400), Warm Grey
  - Labels: 0.875rem, medium (500), Navy

### Spacing

Use the brand pack spacing scale:

| Token | Size |
|-------|------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |

### Components — use brand pack specs exactly

- **Buttons:** Follow BRAND_PACK.md §4 (border-radius 8px, padding 0.75rem 1.5rem, transitions, hover states)
- **Cards:** Follow BRAND_PACK.md §4 (white bg, 1px Stone border, 12px radius, shadow, 1.5rem padding)
- **Status badges:** Follow BRAND_PACK.md §4 (pill shape, 12px font, 500 weight)

**Do NOT invent new design tokens.** If a value isn't in the brand pack, use the closest match from the defined palette.

---

## 4. PAGE STRUCTURE

### 4.1 Header

- **Background:** PKH Navy (`#1B2B4B`)
- **Layout:** Flexbox, space-between, vertically centred
- **Left:** Brand mark — three coloured dots (red `#E53935`, orange `#FB8C00`, green `#43A047`, each 10px circles, 3px gap) followed by "property know how" in white, 16px, bold (700), letter-spacing -0.3px. This is the navy-background header treatment of the logo — do NOT use the `pkh_logo.png` here (it has black text which is invisible on navy). The PNG logo is still used as the favicon source and in any light-background contexts.
- **Right:** Small text links (14px, medium weight, white text, gold on hover):
  - "Support" → `mailto:support@propertyknowhow.com`
  - "Request a Tool" → `mailto:support@propertyknowhow.com?subject=Tool%20Request%20-%20PKH%20Tools%20Hub`
  - "Report a Bug" → `mailto:support@propertyknowhow.com?subject=Bug%20Report%20-%20PKH%20Tools%20Hub`
- **Padding:** `md` (16px) vertical, `xl` (32px) horizontal
- **Separator between links:** Use a subtle divider (e.g. `|` in Warm Grey or a thin border)
- On mobile: logo on left, links collapse to a single "Support" link or wrap naturally

### 4.2 Notice Banner (feature ON by default)

- **Position:** Directly below the header
- **Background:** PKH Sand (`#F3F0EA`)
- **Border bottom:** 1px Stone (`#E0DBD1`)
- **Text:** Charcoal, 14px, centred
- **Content:** Configurable announcement text. Default: `"✨ New: Legal Brain v2 is now live."`
- **Dismiss:** Small `×` button on the right (Warm Grey, darkens on hover)
- **Dismiss behaviour:**
  - Uses `localStorage` with a versioned key
  - Key format: `pkh-banner-dismissed-v1`
  - When banner content changes, bump the version suffix (e.g. `v2`) so it reappears
  - On page load: check localStorage. If key exists, hide the banner. If not, show it.
  - On dismiss click: set the key in localStorage, hide the banner with a fade-out
- **Easy to disable:** Wrap the entire banner in a clearly commented HTML block:
  ```html
  <!-- ═══ NOTICE BANNER — comment out this block to disable ═══ -->
  <div id="notice-banner" ...>
    ...
  </div>
  <!-- ═══ END NOTICE BANNER ═══ -->
  ```
  And in `app.js`, the banner version and text should be at the top as simple constants:
  ```javascript
  // ── Banner config ──
  const BANNER_ENABLED = true;
  const BANNER_VERSION = 'v1';
  const BANNER_TEXT = '✨ New: Legal Brain v2 is now live.';
  ```

### 4.3 Hero Section

- **Background:** Warm White (`#FAFAF8`)
- **Padding:** `2xl` (48px) top and bottom
- **Content (centred):**
  - **Title:** "PKH Tools Hub" — h1 style (2rem, bold, Navy)
  - **Subtitle:** "Quick access to your PKH calculators and tools." — body style (1rem, Charcoal)
  - **Helper line:** "Bookmark this page for quick access." — small/caption style (0.875rem, Warm Grey), with a subtle bookmark icon (inline SVG from Lucide, 16px, stroke-width 1.75)
- **Max-width:** `640px`, centred with auto margins

### 4.4 Quick Links Strip

- **Position:** Below hero, centred
- **Background:** White
- **Padding:** `lg` (24px) vertical
- **Layout:** Horizontal row of pill-shaped links, centred, wrapping on mobile
- **Pill style:**
  - Background: Sand (`#F3F0EA`)
  - Text: Charcoal, 14px, medium weight
  - Padding: `0.25rem 0.75rem`
  - Border radius: `9999px` (pill)
  - Hover: Stone background (`#E0DBD1`)
  - Gap between pills: `sm` (8px)
- **Links:**
  - "✉ Support" → `mailto:support@propertyknowhow.com`
  - "🐛 Report a Bug" → `mailto:support@propertyknowhow.com?subject=Bug%20Report%20-%20PKH%20Tools%20Hub`
  - "💡 Request a Tool" → `mailto:support@propertyknowhow.com?subject=Tool%20Request%20-%20PKH%20Tools%20Hub`
- **Note:** Use simple emoji or inline SVG Lucide icons (Mail, Bug, Lightbulb). Keep it lightweight. If emojis look inconsistent across platforms, use Lucide SVGs instead.

### 4.5 Tools Grid

- **Background:** White
- **Padding:** `xl` (32px) horizontal, `2xl` (48px) vertical
- **Max-width:** `960px`, centred
- **Grid:** 2 columns on desktop (min-width 768px), 1 column on mobile
- **Gap:** `lg` (24px)

#### Tool Cards

Each card follows the BRAND_PACK.md card spec exactly:
- Background: White
- Border: 1px Stone (`#E0DBD1`)
- Border radius: 12px
- Shadow: `0 1px 3px rgba(27, 43, 75, 0.08)`
- Padding: `1.5rem`
- Hover: shadow increases to `0 4px 12px rgba(27, 43, 75, 0.12)`
- Transition: `all 150ms ease`

**Card content layout (top to bottom):**

1. **Icon + Name row:** Inline Lucide SVG icon (20px, Navy, stroke-width 1.75) + Tool name as h3 (1.25rem, semibold, Charcoal)
2. **Description:** 1 line, body text (1rem, Charcoal)
3. **Status badge:** "Live" badge using the Active/Open badge style from brand pack (Success Green text `#2D8A4E` on `#EBF5EE` background, pill shape, 12px, 500 weight)
4. **CTA button:** "Open Tool →" — Primary button style (Navy bg, white text, 8px radius, brand padding/hover). Opens link in new tab (`target="_blank"` `rel="noopener noreferrer"`)
5. **Domain text:** Small muted text below the button showing the URL domain (0.875rem, Warm Grey). For reassurance — users see where the link goes.

#### Tool Data

Render these four tools in this order:

| # | Name | Description | URL | Domain display | Lucide icon |
|---|------|-------------|-----|----------------|-------------|
| 1 | Legal Brain | Review legal packs with a structured checklist and faster decisioning. | `https://legalpackreview.app` | legalpackreview.app | `FileSearch` |
| 2 | Property Deal Calculator | Run the numbers fast: costs, margin, ROI, and exit. | `https://propertydealcalc.com` | propertydealcalc.com | `Calculator` |
| 3 | Check My Deal | Quick deal sense-check before you waste time viewing or offering. | `https://checkmydeal.app` | checkmydeal.app | `CircleCheck` |
| 4 | Bridging Loan Calculator | Estimate interest, fees, and total repayment quickly. | `http://65.21.149.39/calculator` | bridging calculator | `Landmark` |

**Important:** The Bridging Loan Calculator URL will change. Structure the tool data as a clear array/object at the top of `index.html` or in a `<script>` block so the URL is easy to find and swap:

```javascript
// ── Tool URLs — update here when domains change ──
const TOOLS = [
  { id: 'legal-brain', url: 'https://legalpackreview.app' },
  { id: 'deal-calc', url: 'https://propertydealcalc.com' },
  { id: 'check-deal', url: 'https://checkmydeal.app' },
  { id: 'bridging-calc', url: 'http://65.21.149.39/calculator' },
];
```

Alternatively, if using pure HTML without JS-rendered cards, put a clear comment next to the Bridging Loan Calculator link:

```html
<!-- ⚠️ UPDATE THIS URL when bridging calculator gets a proper domain -->
<a href="http://65.21.149.39/calculator" ...>
```

**Card order:** Match the table above (Legal Brain first, Bridging last). Order should be trivially reorderable by moving HTML blocks.

### 4.6 Footer

- **Background:** PKH Navy Dark (`#0F1D35`)
- **Text:** Warm Grey (`#8C8577`), 14px
- **Padding:** `lg` (24px) vertical, `xl` (32px) horizontal
- **Layout:** Centred text
- **Content:**
  - Line 1: "Need help? Email " + `support@propertyknowhow.com` (linked, Gold colour, underline on hover)
  - Line 2: "© Property Know How" (Warm Grey)

---

## 5. ICONS

Since this is a static site (no React), use **inline SVGs** copied from Lucide Icons (https://lucide.dev/icons/).

- Copy the raw SVG markup for each icon needed
- Set `width="20"` `height="20"` `stroke-width="1.75"` (per brand pack §6)
- Set `stroke="currentColor"` so icons inherit text colour
- Icons needed:
  - `FileSearch` — Legal Brain card
  - `Calculator` — Property Deal Calculator card
  - `CircleCheck` — Check My Deal card
  - `Landmark` — Bridging Loan Calculator card
  - `Bookmark` — Hero helper line (16px size for this one)
  - `X` — Banner dismiss button (16px)
  - `Mail` — Quick links / header (16px)
  - `Bug` — Quick links (16px)
  - `Lightbulb` — Quick links (16px)

---

## 6. RESPONSIVE BEHAVIOUR

- **Mobile first.** Write CSS mobile-default, then use `@media (min-width: 768px)` for desktop.
- **Breakpoint:** Single breakpoint at `768px`.
- **Header:** On mobile, logo stays left. Right-side links can wrap or reduce to just "Support". Use sensible judgement.
- **Hero:** Stays centred, text wraps naturally.
- **Quick links strip:** Pills wrap to multiple lines.
- **Tools grid:** 1 column below 768px, 2 columns at 768px+.
- **Cards:** Full width on mobile, equal columns on desktop.
- **Footer:** Centred at all sizes.
- **Max content width:** `960px` for the tools grid, `640px` for the hero. Both centred with auto margins.

---

## 7. SEO / SOCIAL / META

In `<head>`:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PKH Tools Hub</title>
<meta name="description" content="Quick access to Property Know How calculators and tools. Legal Brain, Deal Calculator, Check My Deal, and more.">
<meta name="robots" content="noindex, nofollow">  <!-- Internal tool, no indexing -->

<!-- OpenGraph -->
<meta property="og:title" content="PKH Tools Hub">
<meta property="og:description" content="Quick access to your PKH calculators and tools.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://pkhtools.com">

<!-- Favicon -->
<link rel="icon" href="/assets/favicon.ico" type="image/x-icon">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Styles -->
<link rel="stylesheet" href="/styles.css">
```

**Note:** `noindex, nofollow` because this is an internal tool behind basic auth. No need for search engines.

---

## 8. app.js — MINIMAL JAVASCRIPT

The only JavaScript needed is for the notice banner. Keep it tiny.

```javascript
// ── PKH Tools Hub — app.js ──

// Banner config — update these when changing the announcement
const BANNER_ENABLED = true;
const BANNER_VERSION = 'v1';

document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('notice-banner');
  const dismissBtn = document.getElementById('banner-dismiss');

  if (!banner || !BANNER_ENABLED) return;

  const storageKey = `pkh-banner-dismissed-${BANNER_VERSION}`;

  // Check if already dismissed
  if (localStorage.getItem(storageKey)) {
    banner.remove();
    return;
  }

  // Show banner
  banner.style.display = 'flex';

  // Dismiss handler
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 150);
      localStorage.setItem(storageKey, 'true');
    });
  }
});
```

Banner should be `display: none` by default in CSS, and the JS shows it if not dismissed. This prevents a flash of the banner before JS runs.

---

## 9. ACCESS PROTECTION — NGINX BASIC AUTH

### 9.1 Install htpasswd utility

```bash
sudo apt install apache2-utils -y
```

### 9.2 Create password file

```bash
sudo htpasswd -c /etc/nginx/.htpasswd_pkhtools pkh
# It will prompt for a password — enter a strong password
```

- Username: `pkh`
- Password: choose a strong password at deploy time
- File location: `/etc/nginx/.htpasswd_pkhtools`

### 9.3 Nginx config

Create `/etc/nginx/sites-available/pkhtools.com`:

```nginx
# Redirect www to non-www
server {
    listen 80;
    listen [::]:80;
    server_name www.pkhtools.com;
    return 301 https://pkhtools.com$request_uri;
}

server {
    listen 80;
    listen [::]:80;
    server_name pkhtools.com;

    root /var/www/pkhtools.com;
    index index.html;

    # Basic auth
    auth_basic "PKH Tools — Authorised Access";
    auth_basic_user_file /etc/nginx/.htpasswd_pkhtools;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static assets
    location ~* \.(css|js|png|ico|svg)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
}
```

**Note:** SSL will be added via Certbot after enabling the config (see §10). Certbot will modify this file to add the `listen 443 ssl` block and redirect.

### 9.4 Enable and test

```bash
sudo ln -s /etc/nginx/sites-available/pkhtools.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 9.5 SSL with Certbot

```bash
sudo certbot --nginx -d pkhtools.com -d www.pkhtools.com
```

---

## 10. DEPLOYMENT STEPS

Follow these in order on the server (`ssh root@65.21.149.39`):

### Step 1: Create site directory

```bash
sudo mkdir -p /var/www/pkhtools.com/assets
```

### Step 2: Copy site files

Copy the built files to the server. Either `scp` from local machine or `git clone` then copy:

```bash
# Option A: scp from local
scp -r ./index.html ./styles.css ./app.js ./assets/ root@65.21.149.39:/var/www/pkhtools.com/

# Option B: clone repo then copy
cd /opt/apps
git clone <repo-url> pkh-tools-hub
cp /opt/apps/pkh-tools-hub/index.html /var/www/pkhtools.com/
cp /opt/apps/pkh-tools-hub/styles.css /var/www/pkhtools.com/
cp /opt/apps/pkh-tools-hub/app.js /var/www/pkhtools.com/
cp -r /opt/apps/pkh-tools-hub/assets/ /var/www/pkhtools.com/
```

### Step 3: Set permissions

```bash
sudo chown -R www-data:www-data /var/www/pkhtools.com
sudo chmod -R 755 /var/www/pkhtools.com
```

### Step 4: Install htpasswd and create credentials

```bash
sudo apt install apache2-utils -y
sudo htpasswd -c /etc/nginx/.htpasswd_pkhtools pkh
# Enter strong password when prompted
```

### Step 5: Create Nginx config

```bash
sudo nano /etc/nginx/sites-available/pkhtools.com
# Paste the Nginx config from §9.3
```

### Step 6: Enable site and reload

```bash
sudo ln -s /etc/nginx/sites-available/pkhtools.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 7: SSL

```bash
sudo certbot --nginx -d pkhtools.com -d www.pkhtools.com
```

### Step 8: Verify

- [ ] `https://pkhtools.com` prompts for username/password
- [ ] After login with `pkh` / chosen password, page loads correctly
- [ ] All four tool links open in new tabs to the correct URLs
- [ ] `https://www.pkhtools.com` redirects to `https://pkhtools.com`
- [ ] Mobile layout: 1-column grid, header wraps sensibly
- [ ] Banner shows, dismiss works, stays dismissed on reload
- [ ] Banner reappears after clearing localStorage or bumping version

### Step 9: Create log directory (for consistency with server conventions)

```bash
sudo mkdir -p /var/log/apps/pkhtools.com
```

---

## 11. FAVICON

Generate a simple favicon from the PKH logo:

- Use the logo image (`pkh_logo.png`)
- Crop or resize to a 32×32 or 64×64 square `.ico` file
- If the full logo doesn't work at that size, use just the three coloured circles (red, orange, green) stacked or arranged as a simple mark
- Save as `assets/favicon.ico`
- Use an image processing tool (e.g. ImageMagick `convert pkh_logo.png -resize 64x64 favicon.ico`) or generate manually
- If this proves difficult, a simple fallback is fine: a 32×32 square filled with PKH Navy with a gold "P" in Inter Bold

---

## 12. README.md (include in site root)

Create a `README.md` in `/var/www/pkhtools.com/` (or in the repo):

```markdown
# PKH Tools Hub — pkhtools.com

Static internal dashboard linking to PKH tools.

## Location
- Site files: `/var/www/pkhtools.com/`
- Nginx config: `/etc/nginx/sites-available/pkhtools.com`
- Auth file: `/etc/nginx/.htpasswd_pkhtools`

## Update site content
1. Edit files locally or pull from repo
2. Copy updated files to `/var/www/pkhtools.com/`
3. No reload needed for static file changes

## Update Nginx config
```bash
sudo nano /etc/nginx/sites-available/pkhtools.com
sudo nginx -t
sudo systemctl reload nginx
```

## Update banner
Edit `app.js`:
- Change `BANNER_TEXT` in index.html
- Bump `BANNER_VERSION` (e.g. 'v1' → 'v2') so it reappears for users who dismissed the old one
- Set `BANNER_ENABLED = false` to turn it off entirely

## Change basic auth password
```bash
sudo htpasswd /etc/nginx/.htpasswd_pkhtools pkh
sudo systemctl reload nginx
```

## Tool URLs
Update tool links directly in `index.html`. The Bridging Loan Calculator URL is marked with a comment for easy swapping.
```

---

## 13. CONSTRAINTS — DO NOT BUILD

- ❌ No search or filter functionality
- ❌ No "recently used" tracking
- ❌ No analytics or tracking scripts
- ❌ No JavaScript frameworks (React, Vue, etc.)
- ❌ No build tools (Webpack, Vite, etc.)
- ❌ No CSS frameworks (Tailwind, Bootstrap) — write vanilla CSS using the brand pack variables
- ❌ No third-party dependencies beyond Google Fonts
- ❌ No service workers or PWA features
- ❌ Do not expose the site to search engines (keep `noindex, nofollow`)

---

## 14. QUALITY CHECKLIST

Before considering this done, verify:

- [ ] All CSS colours match BRAND_PACK.md hex values exactly
- [ ] Font is Inter, loaded from Google Fonts, with correct weights
- [ ] Buttons match brand pack specs (radius, padding, hover, transition)
- [ ] Cards match brand pack specs (border, radius, shadow, padding)
- [ ] Status badges match brand pack specs (pill, 12px, 500 weight, correct colours)
- [ ] Spacing uses the defined scale (4/8/16/24/32/48px)
- [ ] Navy header with white/gold links
- [ ] Dark navy footer
- [ ] Tools grid: 2 cols desktop, 1 col mobile
- [ ] All tool links open in new tab with `rel="noopener noreferrer"`
- [ ] Banner dismiss works and persists via localStorage
- [ ] Banner can be disabled via `BANNER_ENABLED = false`
- [ ] Logo displays correctly in header
- [ ] Page loads fast (no unnecessary assets)
- [ ] Valid HTML5
- [ ] Nginx config includes basic auth and security headers
- [ ] `noindex, nofollow` meta tag present
