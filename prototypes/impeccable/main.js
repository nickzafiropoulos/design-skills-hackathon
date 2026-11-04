const REGIONS = [
  { name: "London", pct: 32 },
  { name: "Manchester", pct: 18 },
  { name: "Glasgow", pct: 11 },
  { name: "Other", pct: 39 },
];

const TOP_UNITS = 1240;
const REVENUE_DAYS = [21400, 23800, 22100, 28600, 26900, 31200, 30200];

function renderRegions() {
  const list = document.getElementById("region-list");
  list.innerHTML = REGIONS.map(
    (r) =>
      `<li class="region-item"><span>${r.name}</span><span class="region-item__pct">${r.pct}%</span></li>`
  ).join("");

  const host = document.getElementById("region-bars");
  const w = 400;
  const h = 56;
  const gap = 6;
  const barH = (h - gap * (REGIONS.length - 1)) / REGIONS.length;
  const colors = ["#CC8800", "#C55221", "#111827", "#8A6A3E"];

  const bars = REGIONS.map((r, i) => {
    const bw = Math.round((r.pct / 100) * w);
    const y = i * (barH + gap);
    return `<rect x="0" y="${y}" width="${bw}" height="${barH}" fill="${colors[i]}" />`;
  }).join("");

  host.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" aria-hidden="true">${bars}</svg>`;
}

function drawRevenueArea() {
  const canvas = document.getElementById("revenue-area");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 520;
  const cssH = 120;
  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const pad = 8;
  const values = REVENUE_DAYS;
  const max = Math.max(...values);
  const min = Math.min(...values) * 0.85;
  const range = max - min || 1;
  const stepX = (cssW - pad * 2) / (values.length - 1);
  const points = values.map((v, i) => ({
    x: pad + i * stepX,
    y: cssH - pad - ((v - min) / range) * (cssH - pad * 2),
  }));

  const gradient = ctx.createLinearGradient(0, 0, 0, cssH);
  gradient.addColorStop(0, "rgba(204, 136, 0, 0.45)");
  gradient.addColorStop(1, "rgba(204, 136, 0, 0)");

  ctx.beginPath();
  ctx.moveTo(points[0].x, cssH - pad);
  points.forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, cssH - pad);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.strokeStyle = "#C55221";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  const last = points[points.length - 1];
  ctx.beginPath();
  ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#CC8800";
  ctx.fill();
}

function animateCount(el, target, duration = 900) {
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
  drawRevenueArea();
  animateCount(document.getElementById("top-units"), TOP_UNITS);
  window.addEventListener("resize", drawRevenueArea);
});
