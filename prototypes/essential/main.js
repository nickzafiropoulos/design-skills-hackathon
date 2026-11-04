(function () {
  const regions = [
    { label: "London", value: 32, color: "#2563EB" },
    { label: "Manchester", value: 18, color: "#111827" },
    { label: "Glasgow", value: 11, color: "#9CA3AF" },
    { label: "Other", value: 39, color: "#D1D5DB" },
  ];

  function drawChart() {
    const canvas = document.getElementById("region-chart");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const size = 180;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = size / 2;
    const cy = size / 2;
    const outer = 74;
    const inner = 44;
    const total = regions.reduce((sum, item) => sum + item.value, 0);
    let angle = -Math.PI / 2;

    regions.forEach((region) => {
      const slice = (region.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, outer, angle, angle + slice);
      ctx.closePath();
      ctx.fillStyle = region.color;
      ctx.fill();
      angle += slice;
    });

    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    ctx.fillStyle = "#111827";
    ctx.font = "700 18px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("UK", cx, cy - 4);
    ctx.fillStyle = "#6B7280";
    ctx.font = "600 10px Inter, sans-serif";
    ctx.fillText("regions", cx, cy + 14);
  }

  function wireFilters() {
    document.querySelectorAll(".filters .pill").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".filters .pill").forEach((item) => {
          item.classList.toggle("is-active", item === button);
          item.setAttribute("aria-pressed", item === button ? "true" : "false");
        });
      });
    });
  }

  function wireExport() {
    const button = document.getElementById("export-btn");
    if (!button) return;
    button.addEventListener("click", () => {
      button.classList.add("is-done");
      button.textContent = "Copied summary";
      window.setTimeout(() => {
        button.classList.remove("is-done");
        button.textContent = "Export report";
      }, 1600);
    });
  }

  function drawSpark() {
    const canvas = document.getElementById("ess-spark");
    if (!canvas || !canvas.getContext) return;
    const values = [21, 24, 22, 28, 26, 32, 30];
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = 160;
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
    ctx.strokeStyle = "#2563EB";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  drawChart();
  drawSpark();
  wireFilters();
  wireExport();
  requestAnimationFrame(() => {
    document.getElementById("progress-fill")?.classList.add("is-ready");
  });
})();

