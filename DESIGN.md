# DESIGN.md: amirlearner.me

**Direction: calm, plain and trustworthy.** The site is for school leaders, small
business owners and hiring managers who want proof they can rely on. Real work
(screenshots, live links) does the talking; the design stays out of the way.
One blue, slate neutrals, Inter, borders instead of glows, left-aligned text.

> Not based on a comparison with reference sites (no design library was connected);
> built from the existing brand (Inter, blue) and standard contrast and spacing rules.

Tokens live in `frontend/src/index.css` (`:root` and `.dark`). Components use the
token names, never raw hex values.

## Color

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg-primary` | `#ffffff` | `#0f172a` | Page background, cards on secondary sections |
| `--bg-secondary` | `#f8fafc` | `#1e293b` | Alternate section background, cards on primary sections |
| `--bg-tertiary` | `#f1f5f9` | `#334155` | Tags, inputs, image placeholders |
| `--border-color` | `#e2e8f0` | `#334155` | All borders and dividers |
| `--text-primary` | `#0f172a` | `#f8fafc` | Headings, body text |
| `--text-secondary` | `#475569` | `#cbd5e1` | Supporting text, descriptions |
| `--text-muted` | `#5b6779` | `#94a3b8` | Labels, meta text (still 4.5:1+) |
| `--accent-primary` | `#2563eb` | `#60a5fa` | **The only brand color**: primary buttons, links, eyebrows, active nav |
| `--accent-hover` | `#1d4ed8` | `#93c5fd` | Hover state of the above |
| `--accent-contrast` | `#ffffff` | `#0f172a` | Text on a solid accent background |
| `--accent-soft` | `#eff6ff` | `#1e3a8a33` | Icon tiles, selected filter, soft highlights |
| `--success` | `#15803d` | `#4ade80` | "Available" status, sent messages |
| `--warning` | `#b45309` | `#fbbf24` | Dashboard: saved changes not published yet |
| `--error` | `#b91c1c` | `#f87171` | Form errors |

Rules:
- **No gradients.** No gradient text, gradient buttons, gradient icon tiles or glow shadows.
- Color is never the only signal: status text always has a word or an icon too.
- Contrast: body text 4.5:1 or more on its background; checked for both themes.

## Typography

Inter only (400, 500, 600, 700). Headings use `tracking-tight`.

| Use | Class | Size / line height | Weight |
|---|---|---|---|
| Hero headline | `text-4xl sm:text-5xl lg:text-6xl` | 36→48→60px / 1.1 | 700 |
| Section title (h2) | `text-3xl md:text-4xl` | 30→36px / 1.2 | 700 |
| Card title (h3) | `text-xl` | 20px / 1.4 | 600 |
| Lead text | `text-lg md:text-xl` | 18→20px / 1.6 | 400 |
| Body | `text-base` | 16px / 1.6 | 400 |
| Small / meta | `text-sm` | 14px / 1.5 | 400–500 |
| Eyebrow, tags | `text-xs` / `text-sm` uppercase `tracking-wider` | 12–14px | 600 |

Body copy is capped at about 65 characters per line (`max-w-2xl` or `max-w-prose`).

## Spacing and layout

- Tailwind's 4px scale everywhere.
- Sections: `py-20 md:py-28`. Content width: `max-w-6xl`, side padding `px-4 sm:px-6 lg:px-8`.
- **Left-aligned by default.** Section headers (eyebrow, h2, intro) align left; only the
  404 page and short confirmation messages are centered. On phones the hero is centered
  under the round photo; from `lg` up it is left-aligned like everything else.
- Sections alternate `--bg-primary` / `--bg-secondary`.

## Shape and depth

| Use | Radius |
|---|---|
| Tags, small badges | `rounded-md` (6px) |
| Buttons, inputs, icon tiles | `rounded-lg` (8px) |
| Cards, images, panels | `rounded-xl` (12px) |
| Avatars, status dots | `rounded-full` |

Depth comes from 1px borders (`--border-color`). One shadow only, `shadow-sm`, for the
sticky header after scrolling. Hover on cards changes the border to `--accent-primary`;
nothing scales up.

## Components

- **Primary button:** solid `--accent-primary`, text `--accent-contrast`, `rounded-lg`,
  `px-6 py-3`, font 600. Hover `--accent-hover`. One per view.
- **Secondary button:** transparent, 1px `--border-color`, text `--text-primary`.
  Hover border `--accent-primary`.
- **Quiet / link:** text `--accent-primary`, underline on hover.
- **Focus:** 2px `--accent-primary` outline with 2px offset on every interactive element.
- **Disabled:** 60% opacity, `cursor-not-allowed`.
- **Inputs:** `--bg-secondary` fill, 1px border, `rounded-lg`; focus border `--accent-primary`.
- **Cards:** `--bg-primary` (or secondary) with 1px border, `rounded-xl`, `p-6`.
- **Icon tile:** 40px `rounded-lg` square, `--accent-soft` fill, icon in `--accent-primary`.
- **Section header:** eyebrow (accent, uppercase, `text-sm`), h2, one-sentence intro. No
  decorative underline bar.
- **Navigation:** logo text "Amir." in `--text-primary` with the dot in accent; links
  `--text-secondary`, active and hover `--accent-primary`.
- **Top bar (desktop only):** plain `slate-900` strip with email, phone, WhatsApp and Viber;
  no animation.

## Motion

Short fades and 16px slide-ins when a section first appears (300–500ms). No infinite loops,
floating elements, shimmer or pulsing glows. Everything stops for `prefers-reduced-motion`.

The one exception is the hero portrait: an accent ring draws around it once, a small dot
circles the ring every 24s, and the photo floats 6px over 6s. Keep it that quiet, and keep
it to the hero.

## Imagery and icons

- **Icons:** Lucide only, 16–24px, stroke 2. No emoji.
- **Photos:** the real profile photo in the hero and About; never stock photos.
- **Project images:** real 16:9 screenshots (`/projects/*.webp`, 960×540). A plain
  `--bg-tertiary` panel with a code icon when there is no screenshot.
- **Tech logos:** only inside the Skills section, never floating decoration.
