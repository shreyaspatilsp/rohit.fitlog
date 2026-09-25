/* ==========================================================================
   videos-data.js

   HOW TO ADD A VIDEO
   -------------------
   Add an object to the VIDEOS array with the YouTube video ID (the part
   after "v=" or after the last "/" in a youtube.com/youtu.be link) and a
   title. The thumbnail loads automatically from YouTube — nothing else
   to configure. Leave the array empty to show the "coming soon" state
   with a link to the channel instead.

   Example:
   var VIDEOS = [
     { id: "dQw4w9WgXcQ", title: "Leg day breakdown" },
     { id: "9bZkp7q19f0", title: "Contest prep check-in" }
   ];
   ========================================================================== */

var VIDEOS = [];

var YOUTUBE_CHANNEL_URL = "https://youtube.com/@rohitfitlog4048";

function youtubeThumb(id) {
  return "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
}
