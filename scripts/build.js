import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { writePrototypesJson } from "./list-prototypes.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const required = ["index.html", "gallery.css", "gallery.js", "prototypes", "skills-catalog.json"];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error(`Missing ${file}`);
    process.exit(1);
  }
}

const { count } = writePrototypesJson();

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

function copy(from, to) {
  const stat = fs.statSync(from);
  if (stat.isDirectory()) {
    fs.mkdirSync(to, { recursive: true });
    for (const entry of fs.readdirSync(from)) {
      if (entry === ".gitkeep") continue;
      copy(path.join(from, entry), path.join(to, entry));
    }
    return;
  }
  fs.copyFileSync(from, to);
}

for (const file of [
  "index.html",
  "gallery.css",
  "gallery.js",
  "prototypes.json",
  "skills-catalog.json",
  "prototypes",
]) {
  copy(path.join(root, file), path.join(dist, file));
}

console.log(`Built static gallery with ${count} prototypes → dist/`);
