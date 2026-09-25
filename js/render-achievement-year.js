document.addEventListener("DOMContentLoaded", function () {
  var params = new URLSearchParams(window.location.search);
  var year = params.get("year");

  var titleEl = document.getElementById("yearTitle");
  var countEl = document.getElementById("yearCount");
  var galleryEl = document.getElementById("yearGallery");
  var notFoundEl = document.getElementById("yearNotFound");

  var entry = year ? getAchievementYear(year) : null;

  if (!entry) {
    if (galleryEl) galleryEl.style.display = "none";
    if (notFoundEl) notFoundEl.style.display = "block";
    if (titleEl) titleEl.textContent = "Year not found";
    document.title = "Achievements | rohit.fitlog";
    return;
  }

  document.title = entry.year + " Achievements | Rohit Mhetre | rohit.fitlog";
  if (titleEl) titleEl.textContent = entry.year;
  if (countEl) {
    var n = entry.images.length;
    countEl.textContent = n + (n === 1 ? " photo" : " photos") + " from " + entry.year;
  }

  galleryEl.innerHTML = entry.images.map(function (filename, i) {
    var src = achievementImagePath(entry.year, filename);
    return (
      "<figure>" +
        '<img src="' + src + '" alt="Rohit Mhetre — ' + entry.year + ' achievement photo ' + (i + 1) + '" loading="lazy" />' +
      "</figure>"
    );
  }).join("");

  initLightbox("#yearGallery figure");
});
