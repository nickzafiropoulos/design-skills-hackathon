(function () {
  const spark = document.getElementById("revenue-spark");
  if (spark) {
    const ctx = spark.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const cssW = spark.clientWidth || 640;
    const cssH = 88;
    spark.width = Math.floor(cssW * dpr);
    spark.height = Math.floor(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Mon-Sun daily revenue (£k)
    const values = [22.1, 24.8, 26.4, 28.9, 31.2, 29.6, 21.2];
    const padX = 8;
    const padY = 10;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const stepX = (cssW - padX * 2) / (values.length - 1);

    const points = values.map((v, i) => ({
      x: padX + i * stepX,
      y: cssH - padY - ((v - min) / range) * (cssH - padY * 2),
    }));

    // Fill under curve
    ctx.beginPath();
    ctx.moveTo(points[0].x, cssH - padY);
    points.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, cssH - padY);
    ctx.closePath();
    const fill = ctx.createLinearGradient(0, 0, 0, cssH);
    fill.addColorStop(0, "rgba(245, 197, 24, 0.35)");
    fill.addColorStop(1, "rgba(245, 197, 24, 0)");
    ctx.fillStyle = fill;
    ctx.fill();

    // Line
    ctx.beginPath();
    points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.strokeStyle = "#0F1C3F";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();

    // Point markers
    points.forEach((p, i) => {
      const isPeak = values[i] === max;
      const isLast = i === points.length - 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, isPeak || isLast ? 4 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isPeak ? "#F5C518" : "#0F1C3F";
      ctx.fill();
      if (isPeak) {
        ctx.strokeStyle = "#0F1C3F";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    });
  }

  const regionStack = document.getElementById("region-stack");
  if (regionStack) {
    const regions = [
      { pct: 32, color: "#F5C518" },
      { pct: 18, color: "#0F1C3F" },
      { pct: 11, color: "#4A5568" },
      { pct: 39, color: "#DDD8CE" },
    ];
    regionStack.innerHTML = regions
      .map((r) => `<i style="width:${r.pct}%;background:${r.color}"></i>`)
      .join("");
  }

  const returnStack = document.getElementById("return-stack");
  if (returnStack) {
    const reasons = [
      { pct: 48, color: "#F5C518" },
      { pct: 22, color: "#0F1C3F" },
      { pct: 18, color: "#4A5568" },
      { pct: 12, color: "#DDD8CE" },
    ];
    returnStack.innerHTML = reasons
      .map((r) => `<i style="width:${r.pct}%;background:${r.color}"></i>`)
      .join("");
  }
})();
