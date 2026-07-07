// RF & Telecommunications Engineering Portfolio — site script
// No framework, no build step: this file is the whole client-side logic.

(function () {
  "use strict";

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
