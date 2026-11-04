(function () {
  const regions = [
    { label: "London", value: 32, color: "#2563EB" },
    { label: "Manchester", value: 18, color: "#111827" },
    { label: "Glasgow", value: 11, color: "#9CA3AF" },
    { label: "Other", value: 39, color: "#D1D5DB" },
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

  function drawDailyRevenue() {
    const canvas = document.getElementById("daily-revenue");
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement;
    const cssW = Math.max(320, (parent ? parent.clientWidth : 1040) - 40);
    const cssH = 200;
    const padX = 8;
    const padTop = 16;
    const padBottom = 12;

    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const values = dailyRevenue.map((d) => d.value);
    const max = Math.max(...values) * 1.08;
    const min = Math.min(...values) * 0.82;
    const plotW = cssW - padX * 2;
    const plotH = cssH - padTop - padBottom;
    const step = plotW / (values.length - 1);

    const points = values.map((v, i) => ({
      x: padX + i * step,
      y: padTop + plotH - ((v - min) / (max - min)) * plotH,
    }));

    // Soft grid
    ctx.strokeStyle = "#E5E7EB";
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      const y = padTop + (plotH / 2) * i;
      ctx.beginPath();
      ctx.moveTo(padX, y);
      ctx.lineTo(cssW - padX, y);
      ctx.stroke();
    }

    // Area fill
    const gradient = ctx.createLinearGradient(0, padTop, 0, cssH);
    gradient.addColorStop(0, "rgba(37, 99, 235, 0.28)");
    gradient.addColorStop(1, "rgba(37, 99, 235, 0.02)");

    ctx.beginPath();
    points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.lineTo(points[points.length - 1].x, cssH - padBottom);
    ctx.lineTo(points[0].x, cssH - padBottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.strokeStyle = "#2563EB";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();

    // Peak marker (Fri = index 4)
    const peak = points[4];
    ctx.beginPath();
    ctx.arc(peak.x, peak.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#2563EB";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(peak.x, peak.y, 8, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(37, 99, 235, 0.35)";
    ctx.lineWidth = 2;
    ctx.stroke();
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

  function init() {
    drawChart();
    drawDailyRevenue();
    wireFilters();
    wireExport();
    requestAnimationFrame(() => {
      document.getElementById("progress-fill")?.classList.add("is-ready");
    });
  }

  init();
  window.addEventListener("resize", drawDailyRevenue);
})();
