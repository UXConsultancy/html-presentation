# Section Types

Reference catalogue of all available section templates.

## 1. Hero

**Template:** `templates/sections/hero.html`
**Description:** Full viewport intro slide with title, subtitle, CTA button, scroll indicator, and decorative SVG constellation.
**CSS classes:** `.section--hero`, `.hero__content`, `.hero__label`, `.hero__title`, `.hero__subtitle`, `.hero__cta-row`, `.hero__scroll`, `.hero__constellation`
**Theme:** Dark (primary-deep background, white text)
**Placeholders:** `{{INDEX}}`

## 2. Stat Cards

**Template:** `templates/sections/stat-cards.html`
**Description:** Light background section with 3 cards, each containing an SVG icon, animated stat number, title, and description.
**CSS classes:** `.section--stat-cards`, `.stat-cards__grid`, `.stat-card`, `.stat-card__icon`, `.stat-card__stat`, `.stat-card__title`, `.stat-card__desc`
**Theme:** Light (warm-grey background, dark text)
**Data attributes:** `data-count="N"` and `data-suffix="%"` on stat elements trigger counter animation
**Placeholders:** `{{INDEX}}`

## 3. Feature Grid

**Template:** `templates/sections/feature-grid.html`
**Description:** Dark background section with a 2 column card grid plus a full width highlight card. Cards have icons, titles, descriptions, and tags.
**CSS classes:** `.section--feature-grid`, `.feature-grid__grid`, `.feature`, `.feature__icon`, `.feature__title`, `.feature__desc`, `.feature__tags`, `.feature__tag`, `.feature-grid__highlight`, `.feature-grid__highlight-icon`, `.feature-grid__highlight-content`
**Theme:** Dark (primary background, white text)
**Placeholders:** `{{INDEX}}`

## 4. Deep Dive

**Template:** `templates/sections/deep-dive.html`
**Description:** Full viewport immersive slide with two column layout. Narrative content left (label, title, context, detail blocks), metrics right. Large watermark number. Designed for sequential slides (Step 01/03 pattern).
**CSS classes:** `.case-study`, `.case-study__layout`, `.case-study__content`, `.case-study__label`, `.case-study__title`, `.case-study__context`, `.case-study__details`, `.case-study__detail`, `.case-study__visual`, `.case-study__metrics`, `.case-study__metric`, `.case-study__metric-value`, `.case-study__metric-label`, `.case-study__watermark`
**Theme variants:** `case-study--dark` (primary-deep), `case-study--light` (warm-grey), `case-study--navy` (primary)
**Placeholders:** `{{INDEX}}`, `{{STEP_NUM}}`, `{{STEP_NUM_PADDED}}`, `{{STEP_TOTAL_PADDED}}`, `{{THEME}}`
**Default:** 3 slides cycling dark → light → navy

## 5. Media + Content

**Template:** `templates/sections/media-content.html`
**Description:** Full viewport slide with What/How/Why structured content on left and a media placeholder on right. Designed for example or case study slides.
**CSS classes:** `.case-study`, `.case-study__layout`, `.case-study__content`, `.case-study__label`, `.case-study__title`, `.case-study__sector`, `.case-study__block`, `.case-study__media`, `.case-study__media-placeholder`, `.case-study__watermark`
**Theme variants:** `case-study--charcoal` (#1a1a2e), `case-study--off-white` (#edeae5), `case-study--deep` (primary-light)
**Placeholders:** `{{INDEX}}`, `{{EXAMPLE_NUM}}`, `{{EXAMPLE_NUM_PADDED}}`, `{{EXAMPLE_TOTAL_PADDED}}`, `{{THEME}}`
**Default:** 3 slides cycling charcoal → off-white → deep

## 6. CTA

**Template:** `templates/sections/cta.html`
**Description:** Light background call to action. Two column layout with CTA content (label, title, subtitle, button) on left and 6 outcome cards in a 2x3 grid on right.
**CSS classes:** `.section--cta`, `.cta__layout`, `.cta__content`, `.cta__outcomes`, `.cta__outcome`
**Theme:** Light (warm-grey background, dark text)
**Placeholders:** `{{INDEX}}`
