import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function listPrototypes() {
  const catalogPath = path.join(root, "skills-catalog.json");
  const catalog = fs.existsSync(catalogPath)
    ? JSON.parse(fs.readFileSync(catalogPath, "utf8")).skills ?? []
    : [];
  const byId = new Map(catalog.map((skill) => [skill.id, skill]));
  const dir = path.join(root, "prototypes");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(dir, entry.name, "index.html")))
    .map((entry) => {
      const meta = byId.get(entry.name) ?? {
        id: entry.name,
        name: entry.name,
        url: null,
      };
      const previewFile = ["preview.png", "preview.jpg", "preview.webp"].find((file) =>
        fs.existsSync(path.join(dir, entry.name, file))
      );
      const summaryPath = path.join(dir, entry.name, "summary.json");
      const summary = fs.existsSync(summaryPath)
        ? JSON.parse(fs.readFileSync(summaryPath, "utf8"))
        : null;

      return {
        id: meta.id,
        name: meta.name,
        skillUrl: meta.url,
        href: `/prototypes/${encodeURIComponent(entry.name)}/index.html`,
        preview: previewFile
          ? `/prototypes/${encodeURIComponent(entry.name)}/${previewFile}`
          : null,
        note: summary?.note ?? null,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function writePrototypesJson() {
  const prototypes = listPrototypes();
  const out = path.join(root, "prototypes.json");
  fs.writeFileSync(out, `${JSON.stringify(prototypes, null, 2)}\n`);
  return { out, count: prototypes.length };
}
