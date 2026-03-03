---
name: html-presentation
description: Use when the user wants to create a presentation website, scaffold a scroll-snapping site, build a full-viewport HTML presentation, or mentions /create-presentation. Also use when adding sections to an existing presentation project.
---

# HTML Presentation

Scaffold full viewport, scroll snapping HTML presentation websites from templates. Ships with 6 section types, a complete CSS design system, and JavaScript interactions (scroll reveal, progress rail, counter animations, password gate).

## When to Use

- User says "create a presentation", "new presentation site", "scaffold a presentation"
- User runs `/create-presentation`
- User asks to "add a section" to an existing presentation project
- User references this plugin by name

## Workflow 1: Create Presentation

### Step 1: Gather Requirements

Ask the user two questions using AskUserQuestion:

1. **Project name** — used for the folder name and HTML `<title>`. Examples: "Q4 Strategy", "Product Launch", "Innovation Pitch"
2. **Password gate** — "Should the site require a password to view?" If yes, ask for the password in a follow up question. **Tell the user:** this is a visual deterrent only, not real security. The password hash is visible in the JavaScript and all content remains in the HTML source. Anyone with browser DevTools can bypass it.

### Step 2: Create Project Directory

Create the project folder in the user's current working directory (or wherever they specify):

```
<project-name>/
├── index.html
├── styles.css
└── script.js
```

### Step 3: Copy styles.css

Read the template CSS from `${CLAUDE_PLUGIN_ROOT}/templates/base/styles.css` and write it to `<project>/styles.css`. No modifications needed — the CSS ships complete.

### Step 4: Prepare script.js

Read `${CLAUDE_PLUGIN_ROOT}/templates/base/script.js`.

**If password gate is OFF:**

- Remove the entire first IIFE (the password gate code block, from line 1 through the closing `})();`)
- Keep only the second IIFE (interactions)

**If password gate is ON:**

- Hash the password: run `echo -n "<password>" | shasum -a 256 | cut -d ' ' -f 1` in bash
- Replace the HASH constant value in the script with the generated hash

Write the result to `<project>/script.js`.

### Step 5: Assemble index.html

Read the shell template from `${CLAUDE_PLUGIN_ROOT}/templates/base/index.html`.

**Replace `{{PROJECT_NAME}}`** with the user's project name (appears in title and meta tags).

**Handle password gate:**

- If OFF: remove everything between `<!-- PASSWORD_GATE_START -->` and `<!-- PASSWORD_GATE_END -->` (inclusive)
- If ON: keep as is

**Read and insert section templates** in this order:

1. Read `${CLAUDE_PLUGIN_ROOT}/templates/sections/hero.html`
2. Read `${CLAUDE_PLUGIN_ROOT}/templates/sections/stat-cards.html`
3. Read `${CLAUDE_PLUGIN_ROOT}/templates/sections/feature-grid.html`
4. Read `${CLAUDE_PLUGIN_ROOT}/templates/sections/deep-dive.html` — single instance with:
   - `{{STEP_NUM}}=1`, `{{STEP_NUM_PADDED}}=01`, `{{STEP_TOTAL_PADDED}}=01`, `{{THEME}}=dark`
5. Read `${CLAUDE_PLUGIN_ROOT}/templates/sections/media-content.html` — single instance with:
   - `{{EXAMPLE_NUM}}=1`, `{{EXAMPLE_NUM_PADDED}}=01`, `{{EXAMPLE_TOTAL_PADDED}}=01`, `{{THEME}}=charcoal`
6. Read `${CLAUDE_PLUGIN_ROOT}/templates/sections/cta.html`

**Replace `{{INDEX}}`** on each section sequentially: 1, 2, 3, 4, 5, 6.

**Insert the assembled sections** between `<!-- SECTIONS_START -->` and `<!-- SECTIONS_END -->`.

**Generate progress rail nodes.** For each section (6 total), create a `<li>` element:

```html
<li>
  <a href="#SECTION_ID" class="progress-rail__node" aria-label="SECTION_LABEL"
    ><span>N</span></a
  >
</li>
```

The first node should have the `is-active` class added. Use these section IDs and labels:

| #   | ID              | Label        |
| --- | --------------- | ------------ |
| 1   | hero            | Introduction |
| 2   | stat-cards      | Statistics   |
| 3   | feature-grid    | Features     |
| 4   | deep-dive-1     | Deep dive    |
| 5   | media-content-1 | Example      |
| 6   | cta             | Get in touch |

Insert the rail nodes at `<!-- PROGRESS_RAIL_NODES -->`.

Write the assembled `index.html` to `<project>/index.html`.

### Step 6: Generate Project CLAUDE.md

Write a `CLAUDE.md` to the project root:

```markdown
# <Project Name>

Single page presentation website.

## Tech Stack

- Plain HTML, CSS, JavaScript (no build step)
- Google Fonts: Manuale, Inter, JetBrains Mono

## Local Preview

\`\`\`bash
python3 -m http.server 8847

# Open http://localhost:8847

\`\`\`

## Structure

- 6 full viewport sections with scroll snap on desktop
- Progress rail navigation (fixed left, desktop only)
- Scroll reveal animations on all content
- Counter animations on stat numbers
- Responsive (single column on mobile, no snap)
- Reduced motion support throughout
- Password gate (if enabled) is a visual deterrent only, not real security. The hash is visible in `script.js` and all content remains in the HTML source.

## Customisation

- **Colours:** Edit `:root` tokens in `styles.css`
- **Fonts:** Replace Google Fonts link in `index.html`, update font tokens in `styles.css`
- **Logo:** Replace SVG text placeholders in the site logo elements
- **Content:** Replace lorem ipsum throughout `index.html`
```

### Step 7: Done

Tell the user:

- The project has been created at `<path>`
- Run `python3 -m http.server 8847` in the project directory to preview
- Open http://localhost:8847

---

## Workflow 2: Add Section

Use this when the user wants to add a new section to an existing presentation project.

### Step 1: Identify Section Type

Ask the user which section type to add. Read `${CLAUDE_PLUGIN_ROOT}/skills/html-presentation/reference/section-types.md` for the full catalogue. Present the options:

1. Hero
2. Stat Cards
3. Feature Grid
4. Deep Dive
5. Media + Content
6. CTA

### Step 2: Determine Placement

Ask where to insert the new section (after which existing section).

### Step 3: Determine Theme (if applicable)

For Deep Dive sections, ask which theme: dark, light, or navy.
For Media + Content sections, ask which theme: charcoal, off white, or deep.

### Step 4: Insert Section

Read the relevant template from `${CLAUDE_PLUGIN_ROOT}/templates/sections/`.

Replace all placeholders:

- `{{INDEX}}` — will be set in the next step
- For Deep Dive: `{{STEP_NUM}}`, `{{STEP_NUM_PADDED}}`, `{{STEP_TOTAL_PADDED}}`, `{{THEME}}`
- For Media + Content: `{{EXAMPLE_NUM}}`, `{{EXAMPLE_NUM_PADDED}}`, `{{EXAMPLE_TOTAL_PADDED}}`, `{{THEME}}`

For step/example numbering, count existing sections of the same type and increment.

Insert the HTML after the specified section in `index.html`.

### Step 5: Renumber and Update Rail

1. Renumber ALL `data-section` attributes sequentially (1, 2, 3...)
2. Regenerate the progress rail `<ol>` to match the new section count
3. Each new `<li>` needs the correct `href`, `aria-label`, and `<span>` number

### Step 6: Done

Tell the user the section has been added and where to find it in the HTML.

---

## Reference

For section details, read: `./reference/section-types.md`
For design token details, read: `./reference/design-system.md`
