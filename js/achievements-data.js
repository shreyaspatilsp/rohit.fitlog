/* ==========================================================================
   achievements-data.js

   HOW TO ADD A NEW YEAR
   ----------------------
   1. Create a folder:  assets/achievements/<YEAR>/
   2. Drop the photos for that year inside it.
   3. Add one entry to the ACHIEVEMENTS array below with the matching
      year and the list of filenames (in the order you want them shown).
      The first image in the list is used as the year's cover thumbnail
      on the main Achievements page.

   That's it — the Achievements page and the year detail page
   (achievement-year.html?year=<YEAR>) both read from this file, so no
   other HTML needs to change when a year is added.
   ========================================================================== */

var ACHIEVEMENTS = [
  {
    year: "2014",
    images: [
      "sample-01.jpg",
      "sample-02.jpg",
      "sample-03.jpg",
      "sample-04.jpg",
      "sample-05.jpg",
      "sample-06.jpg"
    ]
  }
];

/* Sorted newest-first for display; source order above stays untouched. */
function getAchievementYears() {
  return ACHIEVEMENTS.slice().sort(function (a, b) {
    return Number(b.year) - Number(a.year);
  });
}

function getAchievementYear(year) {
  return ACHIEVEMENTS.find(function (a) { return String(a.year) === String(year); });
}

function achievementImagePath(year, filename) {
  return "assets/achievements/" + year + "/" + filename;
}
