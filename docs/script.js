// RF & Telecommunications Engineering Portfolio — site script
// No framework, no build step: this file is the whole client-side logic.

(function () {
  "use strict";

  // --- animated counters ---------------------------------------------------
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10);
        countIO.unobserve(el);
        if (reduceMotion || target === 0) { el.textContent = target; return; }
        var start = performance.now();
        var dur = 900;
        function step(now) {
          var p = Math.min((now - start) / dur, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countIO.observe(el); });
  }

  // --- progressive line-draw (hero scope trace) -----------------------------
  var drawLines = document.querySelectorAll(".draw-line");
  if (drawLines.length) {
    var drawIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-drawn");
          drawIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    drawLines.forEach(function (el) { drawIO.observe(el); });
  }

  // --- synthetic SDR waterfall canvas ---------------------------------------
  var wfCanvas = document.getElementById("waterfallCanvas");
  if (wfCanvas && wfCanvas.getContext) {
    var ctx = wfCanvas.getContext("2d");
    var W = wfCanvas.width, H = wfCanvas.height;
    var img = ctx.createImageData(W, H);
    function psd(x, t) {
      var base = 0.06 + 0.02 * Math.sin(x * 0.02 + t * 0.3);
      var peak = Math.exp(-Math.pow((x - W / 2 - 8 * Math.sin(t * 0.15)) / 10, 2)) * 0.9;
      var noise = Math.random() * 0.05;
      return Math.min(1, base + peak + noise);
    }
    function colorFor(v) {
      // dark -> green -> pale, matching the site's single accent
      var r = Math.round(20 + v * 40);
      var g = Math.round(30 + v * 190);
      var b = Math.round(35 + v * 90);
      return [r, g, b];
    }
    var rows = [];
    for (var y = 0; y < H; y++) rows.push(new Float32Array(W));
    var t0 = 0;
    function renderFrame() {
      t0 += 1;
      var newRow = new Float32Array(W);
      for (var x = 0; x < W; x++) newRow[x] = psd(x, t0 * 0.15);
      rows.pop();
      rows.unshift(newRow);
      for (var yy = 0; yy < H; yy++) {
        var row = rows[yy];
        for (var xx = 0; xx < W; xx++) {
          var c = colorFor(row[xx]);
          var idx = (yy * W + xx) * 4;
          img.data[idx] = c[0]; img.data[idx + 1] = c[1]; img.data[idx + 2] = c[2]; img.data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    }
    if (reduceMotion) {
      renderFrame();
    } else {
      var wfIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!wfCanvas._interval) wfCanvas._interval = setInterval(renderFrame, 140);
          } else if (wfCanvas._interval) {
            clearInterval(wfCanvas._interval);
            wfCanvas._interval = null;
          }
        });
      }, { threshold: 0.1 });
      wfIO.observe(wfCanvas);
    }
  }

  // --- mobile nav toggle --------------------------------------------------
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- scroll reveal -----------------------------------------------------
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealables = document.querySelectorAll(".reveal, .reveal-img");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealables.forEach(function (el, i) {
      // small stagger within each section, capped so long pages don't
      // end up with a multi-second delay on the last card
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      io.observe(el);
    });
  }

  // --- friendly console note for whoever forks this repo -----------------
  if (document.body.innerHTML.indexOf("YOUR-REPO-NAME") !== -1) {
    console.info(
      "[portfolio] index.html still has 'YOUR-REPO-NAME' placeholders in the " +
      "project links — replace them with the real repository name before publishing."
    );
  }
})();
