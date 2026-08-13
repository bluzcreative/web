(function () {
  "use strict";

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  function initNav() {
    var header = $("[data-nav]");
    var toggle = $("[data-nav-toggle]");
    var menu = $("[data-mobile-menu]");
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!toggle || !menu) return;

    var closeMenu = function () {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    var openMenu = function () {
      toggle.setAttribute("aria-expanded", "true");
      menu.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeMenu(); else openMenu();
    });

    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Fallback reveal — used when GSAP/ScrollTrigger aren't available
  function initRevealFallback() {
    var singles = $$("[data-reveal]");
    var groups = $$("[data-reveal-group]").concat($$("[data-reveal-bento]"));
    var items = singles.concat(groups);
    if (!items.length || typeof IntersectionObserver === "undefined") return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });

    items.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      items.forEach(function (el) {
        if (!el.classList.contains("is-revealed") && el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-revealed");
        }
      });
    }, 6000);
  }

  // GSAP-powered reveal — richer easing + staggered groups, same trigger points as the fallback
  function initRevealGSAP() {
    var dur = reduced ? 0.3 : 0.8;
    var groupDur = reduced ? 0.3 : 0.7;

    $$("[data-reveal]").forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: dur, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
    });

    $$("[data-reveal-group]").forEach(function (group) {
      var children = Array.prototype.slice.call(group.children);
      if (!children.length) return;
      gsap.fromTo(children,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: groupDur, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 85%" }
        });
    });

    // Bento-style reveal — same idea, livelier pop (scale + back-ease) for card grids
    $$("[data-reveal-bento]").forEach(function (group) {
      var children = Array.prototype.slice.call(group.children);
      if (!children.length) return;
      gsap.fromTo(children,
        { opacity: 0, y: 26, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1, duration: reduced ? 0.3 : 0.65,
          ease: reduced ? "power3.out" : "back.out(1.5)", stagger: 0.07,
          scrollTrigger: { trigger: group, start: "top 85%" }
        });
    });
  }

  // Cursor-tracking tilt + glow on the "What we do" cards — GSAP only, fine-pointer only.
  function initCardTilt() {
    if (!window.gsap) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    $$(".grid-cell").forEach(function (card) {
      var halo = document.createElement("span");
      halo.className = "cell-halo";
      halo.setAttribute("aria-hidden", "true");
      card.insertBefore(halo, card.firstChild);

      var bounds = null;

      card.addEventListener("mousemove", function (e) {
        bounds = bounds || card.getBoundingClientRect();
        var x = e.clientX - bounds.left;
        var y = e.clientY - bounds.top;
        var px = x / bounds.width;
        var py = y / bounds.height;

        gsap.to(card, {
          rotateY: (px - 0.5) * 9, rotateX: (0.5 - py) * 9,
          transformPerspective: 700, duration: 0.5, ease: "power2.out"
        });
        gsap.to(halo, { x: x, y: y, opacity: 1, duration: 0.35, ease: "power2.out" });
      });

      card.addEventListener("mouseover", function (e) {
        if (!card.contains(e.relatedTarget)) bounds = card.getBoundingClientRect();
      });

      card.addEventListener("mouseout", function (e) {
        if (card.contains(e.relatedTarget)) return;
        bounds = null;
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
        gsap.to(halo, { opacity: 0, duration: 0.3 });
      });
    });
  }

  // Wraps each word of a heading in a mask span so it can slide up into view.
  // Preserves <br> and inline tags (e.g. <em>) instead of flattening them —
  // the <em> itself is left untouched so it keeps its own underline/entrance.
  function splitHeroWords(el) {
    el.setAttribute("aria-label", el.textContent.trim().replace(/\s+/g, " "));
    var wrap = function (text) {
      return text.split(/(\s+)/).map(function (chunk) {
        if (/^\s+$/.test(chunk) || !chunk) return chunk;
        return '<span class="word-wipe"><span class="word-wipe-inner">' + chunk + "</span></span>";
      }).join("");
    };
    var html = Array.prototype.slice.call(el.childNodes).map(function (node) {
      if (node.nodeType === 3) return wrap(node.textContent);
      if (node.nodeName === "BR") return "<br>";
      if (node.nodeType === 1) return node.outerHTML;
      return "";
    }).join("");
    el.innerHTML = html;
    return el.querySelectorAll(".word-wipe-inner");
  }

  // Hero entrance — plays once on load, above the fold, GSAP only.
  // A green rule draws in, the headline rises word-by-word out of a mask,
  // the emphasised word pops in with a slight overshoot, then sub + CTA follow.
  function initHeroEntrance() {
    var hero = $(".hero-inner");
    if (!hero) return;
    var rule = $(".hero-rule", hero);
    var kicker = $(".kicker", hero);
    var title = $(".hero-title", hero);
    var sub = $(".hero-sub", hero);
    var actions = $(".hero-actions", hero);
    if (!title) return;

    var words = splitHeroWords(title);
    var emWord = $("em", title);

    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (rule) {
      tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: reduced ? 0.3 : 0.55 }, 0);
    }
    if (kicker) {
      tl.from(kicker, { opacity: 0, y: 14, duration: reduced ? 0.25 : 0.5 }, reduced ? 0.05 : 0.18);
    }
    if (words.length) {
      tl.from(words, {
        yPercent: 115, duration: reduced ? 0.3 : 0.8, stagger: reduced ? 0.02 : 0.045
      }, reduced ? 0.1 : 0.32);
    }
    if (emWord) {
      tl.from(emWord, {
        opacity: 0, scale: 0.9, duration: reduced ? 0.25 : 0.55, ease: "back.out(1.6)"
      }, reduced ? "-=0.1" : "-=0.35");
    }
    if (sub) {
      tl.from(sub, { opacity: 0, y: 16, duration: reduced ? 0.25 : 0.6 }, reduced ? "-=0.1" : "-=0.3");
    }
    if (actions && actions.children.length) {
      tl.from(actions.children, {
        opacity: 0, y: 12, duration: reduced ? 0.25 : 0.5, stagger: 0.08
      }, reduced ? "-=0.1" : "-=0.35");
    }
  }

  function boot() {
    safe(initNav, "initNav");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
      safe(initRevealGSAP, "initRevealGSAP");
      safe(initHeroEntrance, "initHeroEntrance");
      safe(initCardTilt, "initCardTilt");
    } else {
      safe(initRevealFallback, "initRevealFallback");
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
