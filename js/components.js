/* ==========================================================================
   components.js
   Renders the shared navbar and footer into every page. Single source of
   truth so nav links / footer content only need to be edited once here.
   Works from plain static files (no fetch/CORS issues on file://).
   ========================================================================== */

(function () {
  "use strict";

  var NAV_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About Me" },
    { href: "gym-profile.html", label: "Gym Profile" },
    { href: "achievements.html", label: "Achievements" },
    { href: "contact.html", label: "Contact Us" }
  ];

  var SOCIAL = {
    instagram: "https://www.instagram.com/rohit.fitlog",
    youtube: "https://youtube.com/@rohitfitlog4048",
    facebook: "https://www.facebook.com/813586998740546",
    maps: "https://maps.app.goo.gl/d71YyLsRPryVuBZF6",
    phone: "+919595949194"
  };
  window.ROHIT_SOCIAL = SOCIAL;

  // Pages that show the RoyalX Gymnasium crest instead of the rohit.fitlog
  // personal-brand wordmark, per the gym profile branding rule.
  var ROYALX_BRAND_PAGES = ["gym-profile.html", "contact.html"];

  function currentPage() {
    var path = window.location.pathname.split("/").pop();
    if (!path) return "index.html";
    return path;
  }

  function isActive(href, page) {
    if (href === page) return true;
    if (href === "achievements.html" && page.indexOf("achievement-year") === 0) return true;
    return false;
  }

  function brandMarkup(page, linkClass) {
    if (ROYALX_BRAND_PAGES.indexOf(page) !== -1) {
      return (
        '<a class="brand-royalx' + (linkClass ? " " + linkClass : "") + '" href="gym-profile.html">' +
          '<span class="mark">RX</span>' +
          '<span class="wordmark">' +
            '<span class="top">ROYALX<span>-GYM</span></span>' +
            '<span class="bottom">Fitness Centre</span>' +
          "</span>" +
        "</a>"
      );
    }
    return '<a class="brand' + (linkClass ? " " + linkClass : "") + '" href="index.html">rohit<span>.fitlog</span></a>';
  }

  function renderHeader() {
    var mount = document.getElementById("site-header");
    if (!mount) return;
    var page = currentPage();

    var linksHtml = NAV_LINKS.map(function (l) {
      var active = isActive(l.href, page);
      return '<li><a href="' + l.href + '"' + (active ? ' aria-current="page"' : '') + '>' + l.label + "</a></li>";
    }).join("");

    mount.innerHTML =
      '<header class="site-header" id="siteHeader">' +
        brandMarkup(page) +
        '<nav class="nav-desktop" aria-label="Primary">' +
          "<ul>" + linksHtml + "</ul>" +
        "</nav>" +
        '<a class="btn btn-primary nav-cta" href="contact.html">Contact Me</a>' +
        '<button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="navMobile" aria-label="Toggle menu">' +
          '<svg class="icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
          '<svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>' +
        "</button>" +
      "</header>" +
      '<div class="nav-mobile" id="navMobile">' +
        '<nav aria-label="Mobile">' +
          "<ul>" + linksHtml + "</ul>" +
        "</nav>" +
        '<div class="nav-mobile-foot">' +
          '<a class="btn btn-primary" href="contact.html">Contact Me</a>' +
          '<a class="btn btn-outline" href="' + SOCIAL.instagram + '" target="_blank" rel="noopener">Instagram</a>' +
        "</div>" +
      "</div>";

    var header = document.getElementById("siteHeader");
    var toggle = document.getElementById("navToggle");
    var mobile = document.getElementById("navMobile");

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      mobile.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    function openMenu() {
      toggle.setAttribute("aria-expanded", "true");
      mobile.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    function onScroll() {
      if (window.scrollY > 12) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function renderFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;
    var page = currentPage();
    var year = new Date().getFullYear();

    mount.innerHTML =
      '<footer class="site-footer">' +
        '<div class="container">' +
          '<div class="footer-grid">' +
            '<div class="footer-brand">' +
              brandMarkup(page) +
              "<p>Bodybuilder, coach and nutrition &amp; fitness consultant based in Miraj, Maharashtra. Personal training, contest prep guidance and diet consultation at RoyalX Gymnasium &amp; Fitness Centre.</p>" +
              '<div class="footer-social">' +
                '<a href="' + SOCIAL.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.instagram + "</a>" +
                '<a href="' + SOCIAL.youtube + '" target="_blank" rel="noopener" aria-label="YouTube">' + ICONS.youtube + "</a>" +
                '<a href="' + SOCIAL.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICONS.facebook + "</a>" +
              "</div>" +
            "</div>" +
            '<div class="footer-col">' +
              "<h4>Navigate</h4>" +
              "<ul>" +
                '<li><a href="index.html">Home</a></li>' +
                '<li><a href="about.html">About Me</a></li>' +
                '<li><a href="gym-profile.html">Gym Profile</a></li>' +
                '<li><a href="achievements.html">Achievements</a></li>' +
                '<li><a href="contact.html">Contact Us</a></li>' +
              "</ul>" +
            "</div>" +
            '<div class="footer-col">' +
              "<h4>Connect</h4>" +
              "<ul>" +
                '<li><a href="' + SOCIAL.instagram + '" target="_blank" rel="noopener">Instagram</a></li>' +
                '<li><a href="' + SOCIAL.youtube + '" target="_blank" rel="noopener">YouTube</a></li>' +
                '<li><a href="' + SOCIAL.facebook + '" target="_blank" rel="noopener">Facebook</a></li>' +
              "</ul>" +
            "</div>" +
            '<div class="footer-col">' +
              "<h4>Reach out</h4>" +
              "<ul>" +
                '<li><a href="tel:' + SOCIAL.phone + '">' + SOCIAL.phone + "</a></li>" +
                '<li><a href="' + SOCIAL.maps + '" target="_blank" rel="noopener">Miraj, Maharashtra</a></li>' +
              "</ul>" +
            "</div>" +
          "</div>" +
          '<div class="footer-bottom">' +
            "<span>© " + year + " RoyalX Gymnasium &amp; Fitness Centre — rohit.fitlog. All rights reserved.</span>" +
            "<span>Bodybuilder · Coach · Nutrition &amp; Fitness Coach</span>" +
          "</div>" +
        "</div>" +
      "</footer>";
  }

  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 8.5h2.5V5H14c-2.2 0-3.5 1.4-3.5 3.6V11H8v3.5h2.5V21H14v-6.5h2.3l.5-3.5h-2.8V9c0-.6.3-1 1-1z"/></svg>'
  };

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();

    // Single orchestrated scroll-reveal pass
    var revealEls = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window && revealEls.length) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  });
})();
