document.addEventListener("DOMContentLoaded", function () {
  var mount = document.getElementById("videoGrid");
  if (!mount) return;

  if (!VIDEOS.length) {
    mount.innerHTML =
      '<div class="video-empty">' +
        "<h3>New videos are on their way</h3>" +
        "<p>Training sessions and coaching breakdowns are being added soon. Catch everything live on the channel in the meantime.</p>" +
        '<div class="btn-row text-center" style="justify-content:center; margin-top:1.25rem;">' +
          '<a class="btn btn-primary" href="' + YOUTUBE_CHANNEL_URL + '" target="_blank" rel="noopener">Watch on YouTube</a>' +
        "</div>" +
      "</div>";
    return;
  }

  mount.innerHTML = VIDEOS.map(function (v, i) {
    return (
      '<div class="video-card" data-reveal>' +
        '<div class="video-frame" data-video-id="' + v.id + '">' +
          '<img src="' + youtubeThumb(v.id) + '" alt="' + v.title + ' — video thumbnail" loading="lazy" />' +
          '<button class="play-btn" aria-label="Play ' + v.title + '">' +
            '<span class="disc"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>' +
          "</button>" +
        "</div>" +
        '<div class="video-meta"><h3>' + v.title + "</h3></div>" +
      "</div>"
    );
  }).join("");

  mount.querySelectorAll(".play-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var frame = btn.closest(".video-frame");
      var id = frame.getAttribute("data-video-id");
      frame.innerHTML =
        '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" ' +
        'title="YouTube video player" frameborder="0" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
        "allowfullscreen></iframe>";
    });
  });
});
