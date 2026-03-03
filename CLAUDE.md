# HTML Presentation

Claude Code plugin that scaffolds full viewport, scroll snapping HTML presentation websites. Ships as part of the UXC marketplace.

## Project Structure

- `.claude-plugin/plugin.json` — Plugin manifest
- `skills/html-presentation/SKILL.md` — Two workflows: Create + Add Section
- `skills/html-presentation/reference/` — Section catalogue and design system docs
- `templates/base/` — Core files: index.html shell, styles.css, script.js
- `templates/sections/` — HTML fragments for each section type
- `commands/create-presentation.md` — /create-presentation slash command

## Key Principles

- No build step. Plain HTML, CSS, JavaScript only
- All content is lorem ipsum by default
- UK English throughout. No hyphens in content
- Templates are the source of truth for all patterns
- CSS ships complete (all section styles included regardless of which are used)
- All animations gated behind prefers-reduced-motion
- Scroll snap desktop only (769px+), natural flow on mobile
