---
name: charm
description: Warm, polished, friendly UI with coral actions, cream accent bands, pill controls, soft 24px panels, Inter body, and confident display typography. Use when building Charm-style product or marketing interfaces.
metadata:
  author: typeui.sh
  source: https://www.typeui.sh/design-skills/charm
  note: Assembled from the public TypeUI design-skill page; the downloadable SKILL.md requires unlock on TypeUI.
---

# Charm Design System Skill

## Mission
Build warm, approachable, production-ready interfaces that feel polished without becoming cold or corporate.

## Brand
Charm design is warm, polished, and friendly: vivid coral actions, cream hero and footer bands, pill-shaped controls, soft panels, confident display typography, and restrained depth.

## Style Foundations
- Visual style: warm, soft, friendly, high clarity
- Typography: body/controls = Inter; display headings = Circular (fallback DM Sans), bold, tight tracking; uppercase labels/eyebrows/code = Fragment Mono
- Color tokens:
  - Section Surface `#F7F7F5` — warm matte content canvas
  - Panel `#FBFAF9` — cards and raised content
  - Accent Band `#F1F2EA` — hero and footer backgrounds
  - Brand `#E4544B` — primary actions and brand emphasis
  - Brand Text `#C9443A` — accessible links and text accents
  - Heading `#1C1917`
  - Body `#57534E`
  - Muted Body `#79716B`
  - Border `#E7E6E5`
- Spacing: 4px scale; content max width 1280px
- Radius: pills for buttons/inputs/alerts; 24px for cards/widgets/modals/tables/drawers; 12px for menus; 4px for checkboxes
- Depth: prefer tone changes, hairline borders, and spacing over heavy shadows; subtle control lift; medium floating shadow for menus/popovers; coral glow only for genuine emphasis

## Accessibility
WCAG 2.2 AA, keyboard-first interactions, visible focus states. Reserve status colors for real success/danger/warning only.

## Writing Tone
Warm, trustworthy, concise, refined — never sterile or overly formal.

## Rules: Do
- Use semantic tokens, not raw one-off hex values
- Keep coral for actions, links, focus, and intentional accents
- Keep marketing content on section surface; hero/footer on cream band
- Preserve focus-visible and interaction states on every control

## Rules: Don't
- Do not turn every decorative element coral
- Do not use heavy multi-layer shadows on resting cards
- Do not use status colors decoratively
- Do not mix sharp corners into the soft/pill system

## Component expectations
Primary actions use a coral gradient with a white label, restrained layered shadow, and accessible hover/focus. Resting cards stay light and quietly bordered. Keep dense app UI and marketing sections on the same token set.
