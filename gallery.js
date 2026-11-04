const list = document.querySelector("#list");
const empty = document.querySelector("#empty");

const response = await fetch("/api/prototypes");
const prototypes = await response.json();

empty.hidden = prototypes.length > 0;

for (const prototype of prototypes) {
  const item = document.createElement("li");

  const card = document.createElement("a");
  card.className = "card";
  card.href = prototype.href;

  const frame = document.createElement("div");
  frame.className = "preview-frame";

  if (prototype.preview) {
    const image = document.createElement("img");
    image.className = "preview";
    image.src = prototype.preview;
    image.alt = `${prototype.name} dashboard preview`;
    image.loading = "lazy";
    frame.append(image);
  } else {
    const fallback = document.createElement("div");
    fallback.className = "preview-fallback";
    fallback.textContent = "Screenshot pending";
    frame.append(fallback);
  }

  card.append(frame);

  const meta = document.createElement("div");
  meta.className = "meta";

  const title = document.createElement("strong");
  title.textContent = prototype.name;
  meta.append(title);

  if (prototype.skillUrl) {
    const skillLink = document.createElement("a");
    skillLink.className = "skill-link";
    skillLink.href = prototype.skillUrl;
    skillLink.textContent = prototype.skillUrl.replace(/^https?:\/\//, "");
    skillLink.target = "_blank";
    skillLink.rel = "noreferrer";
    skillLink.addEventListener("click", (event) => event.stopPropagation());
    meta.append(skillLink);
  }

  if (prototype.note) {
    const note = document.createElement("p");
    note.className = "note";
    note.textContent = prototype.note;
    meta.append(note);
  }

  card.append(meta);
  item.append(card);
  list.append(item);
}
