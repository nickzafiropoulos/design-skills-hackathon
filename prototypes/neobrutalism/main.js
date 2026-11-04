(function () {
  "use strict";

  var regions = [
    { name: "London", pct: 32, slug: "london", ember: true },
    { name: "Manchester", pct: 18, slug: "manchester", ember: false },
    { name: "Glasgow", pct: 11, slug: "glasgow", ember: false },
    { name: "Other", pct: 39, slug: "other", ember: false },
  ];

  /* Daily revenue £k: Mon-Sun */
  var dailyRevenue = [22.1, 24.8, 26.4, 28.9, 31.2, 29.6, 21.2];

  function buildRegions() {
    var list = document.getElementById("region-list");
    var stack = document.getElementById("region-stack");
    if (!list || !stack) return;

    list.innerHTML = "";
    stack.innerHTML = "";

    regions.forEach(function (region) {
      var li = document.createElement("li");
      li.className = "region-row";

      var name = document.createElement("span");
      name.className = "region-name";
      name.textContent = region.name;

      var track = document.createElement("div");
      track.className = "region-track";
      track.setAttribute("role", "presentation");

      var fill = document.createElement("span");
      fill.className =
        "region-track__fill" +
        (region.ember ? " region-track__fill--ember" : "");
      fill.style.setProperty("--fill", region.pct + "%");

      track.appendChild(fill);

      var pct = document.createElement("span");
      pct.className = "region-pct";
      pct.textContent = region.pct + "%";

      li.appendChild(name);
      li.appendChild(track);
      li.appendChild(pct);
      list.appendChild(li);

      var seg = document.createElement("span");
      seg.className =
        "region-stack__seg region-stack__seg--" + region.slug;
      seg.style.setProperty("--seg-w", region.pct + "%");
      seg.title = region.name + " " + region.pct + "%";
      stack.appendChild(seg);
    });
  }

  function animateIn() {
    requestAnimationFrame(function () {
      document.querySelectorAll(".region-track__fill").forEach(function (el) {
        el.classList.add("is-on");
      });

      document.querySelectorAll(".region-stack__seg").forEach(function (el) {
        el.classList.add("is-on");
      });
    });
  }

  function drawSpark() {
    var canvas = document.getElementById("neo-spark");
    if (!canvas || !canvas.getContext) return;

    var values = dailyRevenue;
    var ctx = canvas.getContext("2d");
    var dpr = window.devicePixelRatio || 1;
    var w = 320;
    var h = 72;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var max = Math.max.apply(null, values);
    var min = Math.min.apply(null, values) - 1;
    var padX = 10;
    var padY = 10;
    var step = (w - padX * 2) / (values.length - 1);
    var points = values.map(function (v, i) {
      return {
        x: padX + i * step,
        y: h - padY - ((v - min) / (max - min)) * (h - padY * 2),
        v: v,
      };
    });

    /* baseline */
    ctx.beginPath();
    ctx.moveTo(padX, h - padY);
    ctx.lineTo(w - padX, h - padY);
    ctx.strokeStyle = "rgba(251, 251, 249, 0.25)";
    ctx.lineWidth = 2;
    ctx.stroke();

    /* polyline */
    ctx.beginPath();
    points.forEach(function (p, i) {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = "#FDC800";
    ctx.lineWidth = 4;
    ctx.lineJoin = "miter";
    ctx.stroke();

    /* block markers - hard neobrutalist squares */
    points.forEach(function (p) {
      var size = 8;
      ctx.fillStyle = "#E85D04";
      ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      ctx.strokeStyle = "#0A0A0A";
      ctx.lineWidth = 2;
      ctx.strokeRect(p.x - size / 2, p.y - size / 2, size, size);
    });
  }

  buildRegions();
  drawSpark();
  animateIn();

  window.addEventListener("resize", drawSpark);
})();
