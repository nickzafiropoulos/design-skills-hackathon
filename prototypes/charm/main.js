(function () {
  const regions = [
    { label: "London", value: 32, color: "#E4544B" },
    { label: "Manchester", value: 18, color: "#1C1917" },
    { label: "Glasgow", value: 11, color: "#A8A29E" },
    { label: "Other", value: 39, color: "#D6D3D1" },
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

  function drawDailyRevenue() {
    const canvas = document.getElementById("daily-revenue");
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement;
    const w = Math.max(parent ? parent.clientWidth : 980, 320);
    const h = 200;
    const padX = 8;
    const padTop = 16;
    const padBottom = 12;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const values = dailyRevenue.map((d) => d.value);
    const max = Math.max(...values) * 1.08;
    const min = Math.min(...values) * 0.82;
    const chartW = w - padX * 2;
    const chartH = h - padTop - padBottom;
    const step = chartW / (values.length - 1);

    const points = values.map((v, i) => ({
      x: padX + i * step,
      y: padTop + chartH - ((v - min) / (max - min)) * chartH,
    }));

    // Soft horizontal guides
    ctx.strokeStyle = "#E7E6E5";
    ctx.lineWidth = 1;
    for (let g = 0; g < 3; g++) {
      const y = padTop + (chartH / 2) * g;
      ctx.beginPath();
      ctx.moveTo(padX, y);
      ctx.lineTo(w - padX, y);
      ctx.stroke();
    }

    // Area fill
    const grad = ctx.createLinearGradient(0, padTop, 0, h);
    grad.addColorStop(0, "rgba(228, 84, 75, 0.28)");
    grad.addColorStop(0.55, "rgba(228, 84, 75, 0.1)");
    grad.addColorStop(1, "rgba(228, 84, 75, 0)");

    ctx.beginPath();
    ctx.moveTo(points[0].x, h - padBottom);
    points.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, h - padBottom);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Smooth stroke
    ctx.beginPath();
    points.forEach((p, i) => {
      if (i === 0) {
        ctx.moveTo(p.x, p.y);
        return;
      }
      const prev = points[i - 1];
      const cx1 = prev.x + step * 0.4;
      const cx2 = p.x - step * 0.4;
      ctx.bezierCurveTo(cx1, prev.y, cx2, p.y, p.x, p.y);
    });
    ctx.strokeStyle = "#E4544B";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();

    // Peak marker (Friday)
    const peakIdx = values.indexOf(Math.max(...values));
    const peak = points[peakIdx];
    ctx.beginPath();
    ctx.arc(peak.x, peak.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#E4544B";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(peak.x, peak.y, 5, 0, Math.PI * 2);
    ctx.strokeStyle = "#FBFAF9";
    ctx.lineWidth = 2;
    ctx.stroke();
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

  function init() {
    drawRegionChart();
    drawDailyRevenue();
    wireExport();
  }

  init();
  window.addEventListener("resize", drawDailyRevenue);
})();
