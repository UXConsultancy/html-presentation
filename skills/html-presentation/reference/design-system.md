# Design System

Reference for the CSS custom properties and design tokens.

## Colour Tokens

| Token             | Default                    | Purpose                             |
| ----------------- | -------------------------- | ----------------------------------- |
| `--primary-deep`  | `#0f1229`                  | Hero, dark section backgrounds      |
| `--primary`       | `#171d41`                  | Secondary dark backgrounds          |
| `--primary-light` | `#1e2548`                  | Tertiary dark backgrounds           |
| `--accent`        | `#ff137c`                  | CTAs, active states, progress rail  |
| `--accent-hover`  | `#e6116f`                  | Hover state for accent              |
| `--accent-glow`   | `rgba(255, 19, 124, 0.15)` | Subtle glow effect                  |
| `--warm-grey`     | `#f7f5f2`                  | Light section backgrounds           |
| `--surface`       | `#ffffff`                  | White backgrounds                   |
| `--ink`           | `#111111`                  | Primary text on light backgrounds   |
| `--muted`         | `#637288`                  | Secondary text on light backgrounds |
| `--muted-light`   | `#a8b3d0`                  | Secondary text on dark backgrounds  |

## Typography

| Token            | Default                                | Use                    |
| ---------------- | -------------------------------------- | ---------------------- |
| `--font-display` | Manuale, Georgia, serif                | Headlines              |
| `--font-body`    | Inter, system-ui, sans-serif           | Body text              |
| `--font-mono`    | JetBrains Mono, Courier New, monospace | Labels, stats, accents |

## Type Scale

| Token          | Value                                            | Use                      |
| -------------- | ------------------------------------------------ | ------------------------ |
| `--text-h1`    | `clamp(2.75rem, 5vw + 1rem, 4.5rem)`             | Hero title               |
| `--text-h2`    | `clamp(2rem, 3vw + 0.5rem, 3rem)`                | Section headings         |
| `--text-h3`    | `clamp(1.25rem, 1.5vw + 0.5rem, 1.625rem)`       | Card titles              |
| `--text-h4`    | `clamp(1rem, 1vw + 0.25rem, 1.125rem)`           | Small headings           |
| `--text-body`  | `clamp(0.9375rem, 0.5vw + 0.8125rem, 1.0625rem)` | Body text                |
| `--text-small` | `0.875rem`                                       | Small text, descriptions |
| `--text-mono`  | `0.8125rem`                                      | Monospace labels         |
| `--text-stat`  | `clamp(2rem, 3vw, 2.75rem)`                      | Large stat numbers       |

## Spacing

| Token             | Value                      | Use                    |
| ----------------- | -------------------------- | ---------------------- |
| `--space-section` | `clamp(5rem, 10vw, 9rem)`  | Between major sections |
| `--space-block`   | `clamp(2rem, 4vw, 4rem)`   | Within sections        |
| `--space-element` | `clamp(1rem, 2vw, 1.5rem)` | Small internal gaps    |
| `--pad`           | `clamp(1.5rem, 4vw, 3rem)` | Container padding      |
| `--max-w`         | `1200px`                   | Content max width      |
| `--header-h`      | `64px`                     | Fixed header height    |

## Motion

| Token           | Value                            | Use                      |
| --------------- | -------------------------------- | ------------------------ |
| `--ease-expo`   | `cubic-bezier(0.16, 1, 0.3, 1)`  | Reveal animations        |
| `--ease-out`    | `cubic-bezier(0.33, 1, 0.68, 1)` | SVG path drawing         |
| `--dur-reveal`  | `600ms`                          | Element fade in duration |
| `--dur-stagger` | `100ms`                          | Per child stagger delay  |
| `--dur-path`    | `1200ms`                         | SVG stroke animation     |

All animations are gated behind `prefers-reduced-motion: no-preference`.

## Responsive Breakpoints

| Breakpoint   | Behaviour                                           |
| ------------ | --------------------------------------------------- |
| > 1024px     | Full layout. Progress rail visible                  |
| 769px-1024px | Progress rail hidden. Grids collapse                |
| < 768px      | Single column. No scroll snap. Sections auto height |
| < 480px      | Tighter spacing                                     |

## Customisation

To rebrand a generated project, change the `:root` tokens in `styles.css`:

1. **Colours:** Replace `--primary-deep`, `--primary`, `--primary-light` with your brand dark shades. Replace `--accent` and `--accent-hover` with your brand highlight colour
2. **Fonts:** Replace the Google Fonts `<link>` in `index.html` and update `--font-display`, `--font-body`, `--font-mono` in `:root`
3. **Logo:** Replace the placeholder SVG text in the site logo elements
