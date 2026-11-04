(function () {
  "use strict";

  var regions = [
    { name: "London", pct: 32, slug: "london", ember: true },
    { name: "Manchester", pct: 18, slug: "manchester", ember: false },
    { name: "Glasgow", pct: 11, slug: "glasgow", ember: false },
    { name: "Other", pct: 39, slug: "other", ember: false },
  ];

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
      var productFill = document.querySelector(".product-bar__fill");
      if (productFill) productFill.classList.add("is-on");

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
    var values = [20, 24, 22, 28, 26, 33, 30];
    var ctx = canvas.getContext("2d");
    var dpr = window.devicePixelRatio || 1;
    var w = 240;
    var h = 48;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var max = Math.max.apply(null, values);
    var min = Math.min.apply(null, values) - 2;
    var step = (w - 8) / (values.length - 1);
    var points = values.map(function (v, i) {
      return {
        x: 4 + i * step,
        y: h - 6 - ((v - min) / (max - min)) * (h - 14),
      };
    });

    ctx.beginPath();
    points.forEach(function (p, i) {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = "#E85D04";
    ctx.lineWidth = 3;
    ctx.stroke();

    points.forEach(function (p) {
      ctx.fillStyle = "#FBFBF9";
      ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
      ctx.strokeStyle = "#0A0A0A";
      ctx.lineWidth = 2;
      ctx.strokeRect(p.x - 3, p.y - 3, 6, 6);
    });
  }

  buildRegions();
  drawSpark();
  animateIn();
})();

