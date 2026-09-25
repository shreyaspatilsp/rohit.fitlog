/* ==========================================================================
   lightbox.js
   Minimal, dependency-free lightbox. Call initLightbox(selector) after the
   gallery markup exists in the DOM; it wires up click-to-open, prev/next,
   keyboard arrows/escape, and a counter.
   ========================================================================== */

function initLightbox(figureSelector) {
  "use strict";

  var figures = Array.prototype.slice.call(document.querySelectorAll(figureSelector));
  if (!figures.length) return;

  var overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Image viewer");
  overlay.innerHTML =
    '<button class="lightbox-close" aria-label="Close">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>' +
    "</button>" +
    '<button class="lightbox-prev" aria-label="Previous image">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
    "</button>" +
    '<img alt="" />' +
    '<button class="lightbox-next" aria-label="Next image">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
    "</button>" +
    '<div class="lightbox-counter"></div>';
  document.body.appendChild(overlay);

  var imgEl = overlay.querySelector("img");
  var counterEl = overlay.querySelector(".lightbox-counter");
  var closeBtn = overlay.querySelector(".lightbox-close");
  var prevBtn = overlay.querySelector(".lightbox-prev");
  var nextBtn = overlay.querySelector(".lightbox-next");
  var current = 0;

  function show(index) {
    current = (index + figures.length) % figures.length;
    var fig = figures[current];
    var img = fig.querySelector("img");
    imgEl.src = img.getAttribute("src");
    imgEl.alt = img.getAttribute("alt") || "";
    counterEl.textContent = (current + 1) + " / " + figures.length;
  }

  function open(index) {
    show(index);
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  figures.forEach(function (fig, i) {
    fig.addEventListener("click", function () { open(i); });
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", "View image " + (i + 1) + " of " + figures.length);
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () { show(current - 1); });
  nextBtn.addEventListener("click", function () { show(current + 1); });
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });
  window.addEventListener("keydown", function (e) {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
}
