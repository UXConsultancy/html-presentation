/* ================================================
   HTML Presentation — Interactions
   ================================================ */
(function () {
  "use strict";

  var HASH = "1bec1d6c54a0aeb5deb5a4d71bdd68104d7d7506912d385176cf1f2e233bba7b";

  async function sha256(str) {
    var buf = new TextEncoder().encode(str);
    var digest = await crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(digest))
      .map(function (b) {
        return b.toString(16).padStart(2, "0");
      })
      .join("");
  }

  var gate = document.getElementById("password-gate");
  var form = document.getElementById("password-form");
  var input = document.getElementById("password-input");
  var error = document.getElementById("password-error");

  if (sessionStorage.getItem("etch-unlocked") === "1") {
    gate.remove();
  } else {
    document.body.style.overflow = "hidden";
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var h = await sha256(input.value.trim());
      if (h === HASH) {
        sessionStorage.setItem("etch-unlocked", "1");
        document.body.style.overflow = "";
        gate.classList.add("is-unlocked");
        gate.addEventListener("transitionend", function () {
          gate.remove();
        });
      } else {
        input.classList.add("is-error");
        error.hidden = false;
        input.addEventListener(
          "animationend",
          function () {
            input.classList.remove("is-error");
          },
          { once: true },
        );
      }
    });
  }
})();

/* ================================================
   HTML Presentation — Interactions
   ================================================ */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ---- Progress Rail ---- */
  function initProgressRail() {
    const fill = document.querySelector(".progress-rail__fill");
    const nodes = document.querySelectorAll(".progress-rail__node");
    const sections = document.querySelectorAll("[data-section]");
    if (!fill || !nodes.length || !sections.length) return;

    const track = fill.parentElement;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);

      fill.style.height = progress * 100 + "%";

      let activeIndex = 0;
      sections.forEach(function (section, i) {
        const rect = section.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;
        if (sectionMiddle < window.innerHeight * 0.6) {
          activeIndex = i;
        }
      });

      nodes.forEach(function (node, i) {
        node.classList.remove("is-active");
        if (i === activeIndex) node.classList.add("is-active");
      });
    }

    /* track height set via CSS top/bottom */
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---- Scroll Reveal ---- */
  function initReveal() {
    var elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length) return;

    if (prefersReducedMotion) {
      elements.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- Metric Counter ---- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    if (prefersReducedMotion) {
      counters.forEach(function (el) {
        el.textContent =
          el.getAttribute("data-count") +
          (el.getAttribute("data-suffix") || "");
      });
      return;
    }

    function animateCounter(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1500;
      var start = null;
      var isFloat = target % 1 !== 0;

      function step(timestamp) {
        if (!start) start = timestamp;
        var elapsed = timestamp - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = eased * target;

        if (isFloat) {
          el.textContent = current.toFixed(1) + suffix;
        } else {
          el.textContent = Math.round(current) + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach(function (el) {
      el.textContent = "0" + (el.getAttribute("data-suffix") || "");
      observer.observe(el);
    });
  }

  /* ---- SVG Path Drawing ---- */
  function initPathDraw() {
    var paths = document.querySelectorAll(".draw-path");
    if (!paths.length) return;

    paths.forEach(function (path) {
      var length = path.getTotalLength();
      path.style.setProperty("--path-length", length);
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    if (prefersReducedMotion) {
      paths.forEach(function (p) {
        p.classList.add("is-drawn");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-drawn");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    paths.forEach(function (p) {
      observer.observe(p);
    });
  }

  /* ---- Logo Colour & Mobile Visibility ---- */
  function initLogoColour() {
    var logo = document.querySelector(".site-logo");
    if (!logo) return;

    var lightSections = document.querySelectorAll(
      ".section--stat-cards, .case-study--light, .case-study--off-white, .section--cta",
    );

    var darkOverlay = logo.querySelector(".site-logo__dark");
    if (!darkOverlay) return;

    var hero = document.getElementById("hero");
    var isMobile = window.matchMedia("(max-width: 768px)");

    function update() {
      var logoRect = logo.getBoundingClientRect();
      var logoTop = logoRect.top;
      var logoBottom = logoRect.bottom;
      var logoHeight = logoRect.height;

      /* Mobile: hide logo once hero scrolls away */
      if (isMobile.matches && hero) {
        var heroBottom = hero.getBoundingClientRect().bottom;
        if (heroBottom < 0) {
          logo.classList.add("is-hidden");
        } else {
          logo.classList.remove("is-hidden");
        }
      } else {
        logo.classList.remove("is-hidden");
      }

      var clipTop = logoHeight;
      var clipBottom = logoHeight;

      lightSections.forEach(function (section) {
        var rect = section.getBoundingClientRect();
        var overlapTop = Math.max(logoTop, rect.top);
        var overlapBottom = Math.min(logoBottom, rect.bottom);

        if (overlapTop < overlapBottom) {
          var relTop = overlapTop - logoTop;
          var relBottom = logoBottom - overlapBottom;
          clipTop = Math.min(clipTop, relTop);
          clipBottom = Math.min(clipBottom, relBottom);
        }
      });

      if (clipTop >= logoHeight) {
        darkOverlay.style.clipPath = "inset(100% 0 0 0)";
      } else {
        darkOverlay.style.clipPath =
          "inset(" + clipTop + "px 0 " + clipBottom + "px 0)";
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---- Smooth Scroll for Rail Links ---- */
  function initSmoothScroll() {
    document
      .querySelectorAll(
        ".progress-rail__node, .site-logo__light, .site-logo__dark",
      )
      .forEach(function (link) {
        link.addEventListener("click", function (e) {
          var href = this.getAttribute("href");
          if (!href || href.charAt(0) !== "#") return;
          var target = document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });
        });
      });
  }

  /* ---- Initialise ---- */
  document.addEventListener("DOMContentLoaded", function () {
    initProgressRail();
    initLogoColour();
    initReveal();
    initCounters();
    initPathDraw();
    initSmoothScroll();
  });
})();
