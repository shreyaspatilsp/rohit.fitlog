document.addEventListener("DOMContentLoaded", function () {
  var mount = document.getElementById("yearGrid");
  var emptyState = document.getElementById("yearGridEmpty");
  if (!mount) return;

  var years = getAchievementYears();

  if (!years.length) {
    mount.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  mount.innerHTML = years.map(function (entry) {
    var cover = achievementImagePath(entry.year, entry.images[0]);
    var count = entry.images.length;
    return (
      '<a class="year-card" href="achievement-year.html?year=' + encodeURIComponent(entry.year) + '" data-reveal>' +
        "<span class=\"bar\"></span>" +
        '<img src="' + cover + '" alt="Rohit Mhetre — ' + entry.year + ' achievements cover" loading="lazy" />' +
        '<span class="label">' +
          '<span class="yr">' + entry.year + "</span>" +
          '<span class="count">' + count + (count === 1 ? " photo" : " photos") + "</span>" +
        "</span>" +
      "</a>"
    );
  }).join("");

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  mount.querySelectorAll("[data-reveal]").forEach(function (el) { io.observe(el); });
});
