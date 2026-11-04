---
name: organic
description: Soft editorial system with paper-gray surfaces, borderless white panels, deep-teal hero, pale amber actions, generous rounded geometry, and serif-led headings. Use when building Organic-style literary, warm product UI.
metadata:
  author: typeui.sh
  source: https://www.typeui.sh/design-skills/organic
  note: Assembled from the public TypeUI design-skill page; the downloadable SKILL.md requires unlock on TypeUI.
---

# Organic Design System Skill

## Mission
Build soft, editorial interfaces that feel literary, warm, and unhurried while remaining practical for dense product UI.

## Brand
Organic pairs a paper-gray page with borderless white panels, a deep-teal hero, pale amber actions, generous rounded geometry, and serif-led typography.

## Style Foundations
- Visual style: soft, editorial, light-first, unhurried
- Typography: body/controls = Inter; headings/display = Georgia-class editorial serif at weight 400 with `-0.025em` tracking; buttons/labels sentence case at medium weight; display capped at 64px; body floor 16px; mono only for code
- Color tokens:
  - Paper surface `#F5F5F5`
  - Panel surface `#FFFFFF`
  - Hero teal `#024F46`
  - Brand amber `#ECBA82`
  - Heading ink `#2E2E2E`
  - Body ink `#57564C`
  - Muted text `#82817A`
  - Dark island `#1A1A1A`
  - Inner hairline `#E9E6E6`
- Spacing: centered 1280px container; section padding 112px desktop / 64px below 768px; consistent 24px beat after headings and paragraphs
- Radius: 16px for buttons/inputs/alerts/cards/widgets/tables/modals/drawers; 14px menus; 24–32px large features; hero/dark band up to 80px; checkboxes 4px
- Depth: borderless white panels on paper-gray; two-pixel tonal control edges; flat resting surfaces; soft elevation only for floating overlays

## Accessibility
WCAG 2.2 AA. Pay special attention to text on teal/dark bands, amber action contrast, tonal borders, mobile reading sizes, visible focus, and named controls.

## Writing Tone
Editorial, calm, clear, human.

## Rules: Do
- Start memorable compositions with a solid deep-teal hero and light type, then settle into paper-gray sections with borderless white panels
- Use amber for purposeful actions only
- Use real chart components with labels, legends, and tooltips on dashboards
- Keep labels visible when responsive layouts wrap

## Rules: Don't
- No decorative gradients, excessive shadows, or stock imagery that clashes with the palette
- No endless all-gray section runs without rhythm resets
- No near-sharp radii mixed into the soft system
- No unnecessary card borders; no decorative status colors; no native unthemed controls

## Signature composition
Deep-teal hero → warm-gray content with white panels → amber actions → serif headings → occasional rounded dark feature islands.
