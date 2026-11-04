(function () {
  const regions = [
    { label: "London", value: 32, color: "#E4544B" },
    { label: "Manchester", value: 18, color: "#1C1917" },
    { label: "Glasgow", value: 11, color: "#A8A29E" },
    { label: "Other", value: 39, color: "#D6D3D1" },
  ];

  function drawRegionChart() {
    const canvas = document.getElementById("region-chart");
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const size = 220;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = size / 2;
    const cy = size / 2;
    const radius = 86;
    const inner = 52;
    const total = regions.reduce((sum, r) => sum + r.value, 0);
    let angle = -Math.PI / 2;

    regions.forEach((region) => {
      const slice = (region.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle, angle + slice);
      ctx.closePath();
      ctx.fillStyle = region.color;
      ctx.fill();
      angle += slice;
    });

    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.fillStyle = "#FBFAF9";
    ctx.fill();

    ctx.fillStyle = "#1C1917";
    ctx.font = "700 22px 'DM Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("UK", cx, cy - 6);

    ctx.fillStyle = "#79716B";
    ctx.font = "400 11px 'Fragment Mono', monospace";
    ctx.fillText("regions", cx, cy + 14);
  }

  function drawSpark() {
    const canvas = document.getElementById("rev-spark");
    if (!canvas || !canvas.getContext) return;
    const values = [21, 24, 22, 29, 27, 33, 31];
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = 180;
    const h = 36;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const max = Math.max(...values);
    const min = Math.min(...values) - 2;
    const step = (w - 4) / (values.length - 1);
    const points = values.map((v, i) => ({
      x: 2 + i * step,
      y: h - 4 - ((v - min) / (max - min)) * (h - 8),
    }));

    ctx.beginPath();
    points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.strokeStyle = "#E4544B";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  function animateHighlight() {
    const fill = document.querySelector(".highlight__fill");
    if (!fill) return;
    requestAnimationFrame(() => fill.classList.add("is-ready"));
  }

  function wireExport() {
    const btn = document.getElementById("export-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      btn.classList.add("is-done");
      btn.textContent = "Copied summary";
      window.setTimeout(() => {
        btn.classList.remove("is-done");
        btn.textContent = "Export report";
      }, 1800);
    });
  }

  drawRegionChart();
  drawSpark();
  animateHighlight();
  wireExport();
})();
