const REGIONS = [
  { name: "London", pct: 32 },
  { name: "Manchester", pct: 18 },
  { name: "Glasgow", pct: 11 },
  { name: "Other", pct: 39 },
];

const CATEGORIES = [
  { name: "Running", pct: 41 },
  { name: "Training", pct: 28 },
  { name: "Lifestyle", pct: 19 },
  { name: "Accessories", pct: 12 },
];

const SIZES = [
  { size: "XS", pct: 8 },
  { size: "S", pct: 28 },
  { size: "M", pct: 34 },
  { size: "L", pct: 22 },
  { size: "XL", pct: 8 },
];

const COLOURS = [
  { name: "Black", pct: 78, fill: "#111827" },
  { name: "Ember", pct: 71, fill: "#C55221" },
  { name: "Bone", pct: 54, fill: "#C4B8A4" },
];

const RETURNS = [
  { name: "Fit", pct: 48 },
  { name: "Quality", pct: 22 },
  { name: "Changed mind", pct: 18 },
  { name: "Other", pct: 12 },
];

const TOP_UNITS = 1240;
const REVENUE_DAYS = [22100, 24800, 26400, 28900, 31200, 29600, 21200];

function renderRegions() {
  const list = document.getElementById("region-list");
  if (!list) return;

  list.innerHTML = REGIONS.map(
    (r) =>
      `<li class="region-item"><span>${r.name}</span><span class="region-item__pct">${r.pct}%</span></li>`
  ).join("");

  const host = document.getElementById("region-bars");
  if (!host) return;

  const w = 400;
  const h = 56;
  const gap = 6;
  const barH = (h - gap * (REGIONS.length - 1)) / REGIONS.length;
  const colors = ["#CC8800", "#C55221", "#F3EDE3", "#8A6A3E"];

  const bars = REGIONS.map((r, i) => {
    const bw = Math.round((r.pct / 100) * w);
    const y = i * (barH + gap);
    return `<rect x="0" y="${y}" width="${bw}" height="${barH}" fill="${colors[i]}" />`;
  }).join("");

  host.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" aria-hidden="true">${bars}</svg>`;
}

function renderCategories() {
  const list = document.getElementById("category-list");
  if (!list) return;

  list.innerHTML = CATEGORIES.map(
    (c) => `
      <li class="category-item">
        <span class="category-item__name">${c.name}</span>
        <span class="category-item__track"><span class="category-item__fill" style="width:${c.pct}%"></span></span>
        <span class="category-item__pct">${c.pct}%</span>
      </li>`
  ).join("");
}

function renderSizes() {
  const chips = document.getElementById("size-chips");
  const stack = document.getElementById("size-stack");
  if (!chips || !stack) return;

  chips.innerHTML = SIZES.map(
    (s) =>
      `<li class="size-chip"><span class="size-chip__size">${s.size}</span><span class="size-chip__pct">${s.pct}%</span></li>`
  ).join("");

  stack.innerHTML = SIZES.map(
    (s) => `<span style="width:${s.pct}%" title="${s.size} ${s.pct}%"></span>`
  ).join("");
}

function renderColours() {
  const list = document.getElementById("colour-list");
  if (!list) return;

  list.innerHTML = COLOURS.map(
    (c) => `
      <li class="colour-item">
        <span><span class="colour-item__swatch" style="background:${c.fill}"></span>${c.name}</span>
        <span class="colour-item__track"><span class="colour-item__fill" style="width:${c.pct}%;background:${c.fill}"></span></span>
        <span class="colour-item__pct">${c.pct}%</span>
      </li>`
  ).join("");
}

function renderReturns() {
  const list = document.getElementById("returns-list");
  if (!list) return;

  list.innerHTML = RETURNS.map(
    (r) => `
      <li class="returns-item">
        <span>${r.name}</span>
        <span class="returns-item__pct">${r.pct}%</span>
        <span class="returns-item__bar-wrap"><span class="returns-item__bar" style="width:${r.pct}%"></span></span>
      </li>`
  ).join("");
}

function drawRevenueArea() {
  const canvas = document.getElementById("revenue-area");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 520;
  const cssH = 148;
  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);

  const padX = 10;
  const padY = 14;
  const values = REVENUE_DAYS;
  const max = Math.max(...values);
  const min = Math.min(...values) * 0.82;
  const range = max - min || 1;
  const stepX = (cssW - padX * 2) / (values.length - 1);
  const points = values.map((v, i) => ({
    x: padX + i * stepX,
    y: cssH - padY - ((v - min) / range) * (cssH - padY * 2),
    v,
  }));

  // Baseline guide
  ctx.beginPath();
  ctx.moveTo(padX, cssH - padY);
  ctx.lineTo(cssW - padX, cssH - padY);
  ctx.strokeStyle = "rgba(17, 24, 39, 0.12)";
  ctx.lineWidth = 1;
  ctx.stroke();

  const gradient = ctx.createLinearGradient(0, 0, 0, cssH);
  gradient.addColorStop(0, "rgba(204, 136, 0, 0.5)");
  gradient.addColorStop(0.55, "rgba(197, 82, 33, 0.18)");
  gradient.addColorStop(1, "rgba(204, 136, 0, 0)");

  ctx.beginPath();
  ctx.moveTo(points[0].x, cssH - padY);
  points.forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, cssH - padY);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.strokeStyle = "#C55221";
  ctx.lineWidth = 2.75;
  ctx.lineJoin = "round";
  ctx.stroke();

  points.forEach((p, i) => {
    const isPeak = p.v === max;
    ctx.beginPath();
    ctx.arc(p.x, p.y, isPeak ? 5 : 3.25, 0, Math.PI * 2);
    ctx.fillStyle = isPeak ? "#CC8800" : "#111827";
    ctx.fill();
    if (isPeak) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(204, 136, 0, 0.45)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  });
}

function animateCount(el, target, duration = 900) {
  if (!el) return;
  const start = performance.now();
  const from = 0;
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (target - from) * eased).toLocaleString("en-GB");
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

document.addEventListener("DOMContentLoaded", () => {
  renderRegions();
  renderCategories();
  renderSizes();
  renderColours();
  renderReturns();
  drawRevenueArea();
  animateCount(document.getElementById("top-units"), TOP_UNITS);
  window.addEventListener("resize", drawRevenueArea);
});
