(function () {
  const spark = document.getElementById("revenue-spark");
  if (spark) {
    const ctx = spark.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const cssW = spark.clientWidth || 640;
    const cssH = 72;
    spark.width = Math.floor(cssW * dpr);
    spark.height = Math.floor(cssH * dpr);
    ctx.scale(dpr, dpr);

    const values = [22, 26, 24, 31, 29, 34, 38];
    const pad = 4;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const stepX = (cssW - pad * 2) / (values.length - 1);

    const points = values.map((v, i) => ({
      x: pad + i * stepX,
      y: cssH - pad - ((v - min) / range) * (cssH - pad * 2),
    }));

    ctx.beginPath();
    points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.strokeStyle = "#0F1C3F";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke();

    const last = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#F5C518";
    ctx.fill();
    ctx.strokeStyle = "#0F1C3F";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  const stack = document.getElementById("region-stack");
  if (stack) {
    const regions = [
      { pct: 32, color: "#F5C518" },
      { pct: 18, color: "#0F1C3F" },
      { pct: 11, color: "#4A5568" },
      { pct: 39, color: "#DDD8CE" },
    ];
    stack.innerHTML = regions
      .map((r) => `<i style="width:${r.pct}%;background:${r.color}"></i>`)
      .join("");
  }
})();
