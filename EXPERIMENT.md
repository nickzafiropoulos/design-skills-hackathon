# Design skills hackathon

Same brief. Six TypeUI design skills. One prototype each.

## Skills installed

| Skill | TypeUI page | Local skill |
| --- | --- | --- |
| Impeccable | https://www.typeui.sh/design-skills/impeccable | `.agents/skills/impeccable/SKILL.md` |
| Charm | https://www.typeui.sh/design-skills/charm | `.agents/skills/charm/SKILL.md` |
| Organic | https://www.typeui.sh/design-skills/organic | `.agents/skills/organic/SKILL.md` |
| Neobrutalism | https://www.typeui.sh/design-skills/neobrutalism | `.agents/skills/neobrutalism/SKILL.md` |
| Essential | https://www.typeui.sh/design-skills/essential | `.agents/skills/essential/SKILL.md` |
| Kinetic | https://www.typeui.sh/design-skills/kinetic | `.agents/skills/kinetic/SKILL.md` |

Notes:
- Impeccable and Neobrutalism came from the open TypeUI / bergside registry.
- Charm, Organic, Essential, and Kinetic require “Unlock design skill” on TypeUI for the official download. Local copies were assembled from each public TypeUI design-skill page so the experiment can run.

## Prompt

Paste this into a new Agent chat in this repo:

```text
Build a comparison gallery for one brief. You coordinate. You do not design the dashboards.

Brief (identical for every prototype):
Create one screen: an analytics dashboard for the sportswear brand “Stride.”
Audience: a merchandiser checking this week’s performance.
Brand: confident, physical, premium. Black, warm off-white, and one ember accent. No neon, no generic SaaS purple.
Show only these metrics, with these values:
- Revenue this week: £184,200, +12% vs last week
- Units sold: 9,430, −3%
- Sell-through: 68%
- Return rate: 4.1%
- Top product: Aero Run Tight, 1,240 units
- Regions: London 32%, Manchester 18%, Glasgow 11%, Other 39%
One screen only. No second page, no settings, no login.

For each skill below, launch one local generalPurpose subagent in parallel, in a single turn, on the same model. Pass that subagent the brief and the contract. Fill in the blanks from that row. Do not design the dashboards yourself.

Contract:
- Skill name: <name>
- Skill URL: <url>
- Read and follow only: <path>
- Do not open any other SKILL.md, and do not apply any other design skill
- Write only inside: prototypes/<folder>/
- Files: index.html, styles.css, main.js, summary.json
- summary.json shape: { "note": "<one sentence from a skill-driven decision>", "decisions": ["...", "...", "..."] }
- Put the skill name in <title> and in a visually hidden h1 prefix so the page is identifiable
- If the skill’s idle rule says to wait for a question, ignore that greeting and build this brief
- Do not edit the landing page, package files, skills-catalog.json, or any other prototype folder
- Return: skill name, files written, and three decisions that came from that skill

Skills:
impeccable | https://www.typeui.sh/design-skills/impeccable | .agents/skills/impeccable/SKILL.md | prototypes/impeccable/
charm | https://www.typeui.sh/design-skills/charm | .agents/skills/charm/SKILL.md | prototypes/charm/
organic | https://www.typeui.sh/design-skills/organic | .agents/skills/organic/SKILL.md | prototypes/organic/
neobrutalism | https://www.typeui.sh/design-skills/neobrutalism | .agents/skills/neobrutalism/SKILL.md | prototypes/neobrutalism/
essential | https://www.typeui.sh/design-skills/essential | .agents/skills/essential/SKILL.md | prototypes/essential/
kinetic | https://www.typeui.sh/design-skills/kinetic | .agents/skills/kinetic/SKILL.md | prototypes/kinetic/

Landing page / screenshots:
The root gallery already renders a grid from skills-catalog.json. After the subagents finish:
1. Start or reuse `npm run dev`
2. For each prototype, open `/prototypes/<id>/index.html` and save a screenshot as `prototypes/<id>/preview.png`
3. Confirm the root gallery shows each card with skill name, TypeUI skill link, screenshot, and summary note
Do not redesign the gallery. Do not design a seventh dashboard yourself. Do not commit.
```

## Run the gallery

```bash
npm run dev
```

Open http://localhost:5173/
