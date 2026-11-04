const regions = [
  { name: "London", value: 32, accent: false },
  { name: "Manchester", value: 18, accent: false },
  { name: "Glasgow", value: 11, accent: false },
  { name: "Other", value: 39, accent: true },
];

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

  requestAnimationFrame(() => {
    chart.querySelectorAll(".bar-fill").forEach((fill) => {
      fill.style.width = `${fill.dataset.width}%`;
    });
  });
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

function drawSpark() {
  const canvas = document.getElementById("organic-spark");
  if (!canvas || !canvas.getContext) return;
  const values = [20, 23, 21, 27, 26, 31, 30];
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = 200;
  const h = 40;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const max = Math.max(...values);
  const min = Math.min(...values) - 2;
  const step = (w - 6) / (values.length - 1);
  const points = values.map((v, i) => ({
    x: 3 + i * step,
    y: h - 4 - ((v - min) / (max - min)) * (h - 10),
  }));

  ctx.beginPath();
  ctx.moveTo(points[0].x, h - 2);
  points.forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, h - 2);
  ctx.closePath();
  ctx.fillStyle = "rgba(2, 79, 70, 0.12)";
  ctx.fill();

  ctx.beginPath();
  points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.strokeStyle = "#024F46";
  ctx.lineWidth = 2;
  ctx.stroke();
}

document.addEventListener("DOMContentLoaded", () => {
  renderRegions();
  drawSpark();
  setupExport();
});

