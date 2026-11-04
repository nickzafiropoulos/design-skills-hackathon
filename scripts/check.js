import fs from "node:fs";

const required = ["index.html", "gallery.css", "gallery.js", "server.js", "prototypes"];

for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`Missing ${file}`);
    process.exit(1);
  }
}

console.log("Scaffold ok");
