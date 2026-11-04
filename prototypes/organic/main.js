const regions = [
  { name: "London", value: 32, accent: false },
  { name: "Manchester", value: 18, accent: false },
  { name: "Glasgow", value: 11, accent: false },
  { name: "Other", value: 39, accent: true },
];

const categories = [
  { name: "Running", value: 41 },
  { name: "Training", value: 28 },
  { name: "Lifestyle", value: 19 },
  { name: "Accessories", value: 12 },
];

const sizes = [
  { name: "XS", value: 8 },
  { name: "S", value: 28 },
  { name: "M", value: 34 },
  { name: "L", value: 22 },
  { name: "XL", value: 8 },
];

const returns = [
  { name: "Fit", value: 48 },
  { name: "Quality", value: 22 },
  { name: "Changed mind", value: 18 },
  { name: "Other", value: 12 },
];

const dailyRevenue = [
  { day: "Mon", value: 22.1 },
  { day: "Tue", value: 24.8 },
  { day: "Wed", value: 26.4 },
  { day: "Thu", value: 28.9 },
  { day: "Fri", value: 31.2 },
  { day: "Sat", value: 29.6 },
  { day: "Sun", value: 21.2 },
];

function animateBars(root) {
  if (!root) return;
  requestAnimationFrame(() => {
    root.querySelectorAll("[data-width]").forEach((fill) => {
      fill.style.width = `${fill.dataset.width}%`;
    });
  });
}

function renderRegions() {
  const chart = document.getElementById("regions-chart");
  const legend = document.getElementById("regions-legend");
  if (!chart || !legend) return;

  chart.innerHTML = regions
    .map(
      (region) => `
      <div class="bar-row">
        <span class="bar-row__label">${region.name}</span>
        <div class="bar-track" aria-hidden="true">
          <div
            class="bar-fill${region.accent ? " bar-fill--amber" : ""}"
            data-width="${region.value}"
          ></div>
        </div>
        <span class="bar-row__value">${region.value}%</span>
      </div>`
    )
    .join("");

  legend.innerHTML = regions
    .map(
      (region) => `
      <li class="legend__item">
        <span class="legend__swatch${region.accent ? " legend__swatch--amber" : ""}" aria-hidden="true"></span>
        ${region.name} ${region.value}%
      </li>`
    )
    .join("");

  animateBars(chart);
}

function renderCategories() {
  const root = document.getElementById("category-bars");
  if (!root) return;

  root.innerHTML = categories
    .map(
      (cat, index) => `
      <div class="cat-row">
        <span class="cat-row__label">${cat.name}</span>
        <div class="bar-track" aria-hidden="true">
          <div
            class="bar-fill${index === 1 ? " bar-fill--amber" : index > 1 ? " bar-fill--soft" : ""}"
            data-width="${cat.value}"
          ></div>
        </div>
        <span class="cat-row__value">${cat.value}%</span>
      </div>`
    )
    .join("");

  animateBars(root);
}

function renderSizes() {
  const root = document.getElementById("size-curve");
  if (!root) return;
  const max = Math.max(...sizes.map((s) => s.value));

  root.innerHTML = sizes
    .map(
      (size) => `
      <div class="size-row">
        <span class="size-row__label">${size.name}</span>
        <div class="bar-track" aria-hidden="true">
          <div
            class="bar-fill${size.name === "M" ? "" : " bar-fill--soft"}"
            data-width="${Math.round((size.value / max) * 100)}"
          ></div>
        </div>
        <span class="size-row__value">${size.value}%</span>
      </div>`
    )
    .join("");

  animateBars(root);
}

function renderReturns() {
  const root = document.getElementById("returns-chart");
  if (!root) return;

  root.innerHTML = returns
    .map(
      (item, index) => `
      <div class="return-row">
        <span class="return-row__label">${item.name}</span>
        <div class="bar-track" aria-hidden="true">
          <div
            class="bar-fill${index === 0 ? "" : index === 1 ? " bar-fill--amber" : " bar-fill--soft"}"
            data-width="${item.value}"
          ></div>
        </div>
        <span class="return-row__value">${item.value}%</span>
      </div>`
    )
    .join("");

  animateBars(root);
}

function setupExport() {
  const button = document.getElementById("export-btn");
  const toast = document.getElementById("toast");
  if (!button || !toast) return;

  let hideTimer;

  button.addEventListener("click", () => {
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("is-visible"));
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => {
        toast.hidden = true;
      }, 250);
    }, 2600);
  });
}

function drawDailyRevenue() {
  const canvas = document.getElementById("daily-revenue");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.clientWidth || 960;
  const cssHeight = 220;
  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  const values = dailyRevenue.map((d) => d.value);
  const pad = { top: 24, right: 16, bottom: 36, left: 40 };
  const plotW = cssWidth - pad.left - pad.right;
  const plotH = cssHeight - pad.top - pad.bottom;
  const max = 36;
  const min = 16;

  // Horizontal guides
  ctx.strokeStyle = "#E9E6E6";
  ctx.lineWidth = 1;
  [20, 24, 28, 32].forEach((tick) => {
    const y = pad.top + plotH - ((tick - min) / (max - min)) * plotH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + plotW, y);
    ctx.stroke();

    ctx.fillStyle = "#82817A";
    ctx.font = "500 11px Inter, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`£${tick}k`, pad.left - 8, y + 4);
  });

  const step = plotW / (values.length - 1);
  const points = values.map((v, i) => ({
    x: pad.left + i * step,
    y: pad.top + plotH - ((v - min) / (max - min)) * plotH,
  }));

  // Area fill
  const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
  gradient.addColorStop(0, "rgba(2, 79, 70, 0.22)");
  gradient.addColorStop(1, "rgba(2, 79, 70, 0.02)");

  ctx.beginPath();
  ctx.moveTo(points[0].x, pad.top + plotH);
  points.forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, pad.top + plotH);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Line
  ctx.beginPath();
  points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.strokeStyle = "#024F46";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.stroke();

  // Peak marker (Fri)
  const peakIndex = values.indexOf(Math.max(...values));
  const peak = points[peakIndex];
  ctx.beginPath();
  ctx.arc(peak.x, peak.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#ECBA82";
  ctx.fill();
  ctx.strokeStyle = "#024F46";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Day labels
  ctx.fillStyle = "#57564C";
  ctx.font = "500 12px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  dailyRevenue.forEach((d, i) => {
    ctx.fillText(d.day, points[i].x, cssHeight - 12);
  });
}

function setupResize() {
  let frame;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(drawDailyRevenue);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderRegions();
  renderCategories();
  renderSizes();
  renderReturns();
  drawDailyRevenue();
  setupResize();
  setupExport();
});
