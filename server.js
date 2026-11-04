import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 5173;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function loadCatalog() {
  const catalogPath = path.join(root, "skills-catalog.json");
  if (!fs.existsSync(catalogPath)) return [];
  return JSON.parse(fs.readFileSync(catalogPath, "utf8")).skills ?? [];
}

function prototypes() {
  const catalog = loadCatalog();
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

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${port}`);
  if (url.pathname === "/api/prototypes") {
    send(res, 200, JSON.stringify(prototypes()), "application/json; charset=utf-8");
    return;
  }

  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const file = path.resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(`${root}${path.sep}`)) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      send(res, 404, "Not found");
      return;
    }
    send(res, 200, data, types[path.extname(file)] ?? "application/octet-stream");
  });
});

server.listen(port, () => {
  console.log(`Gallery at http://localhost:${port}/`);
});
