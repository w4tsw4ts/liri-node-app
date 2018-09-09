
// Load .env key data
require("dotenv").config();
console.log(SPOTIFY_ID);
console.log(SPOTIFY_SECRET);
/*
var spotify = new Spotify(keys.spotify);

switch (process.argv[2]) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatISay();
        break;
}

function concertThis() {

}

function spotifyThisSong() {
    requestAnimationFrame("https://api.spotify.com/v1/tracks/" + SPOTIFY_SECRET);

}

function movieThis() {

}

function doWhatISay() {

}
*/

/*
// fs is a core Node package for reading and writing files
var fs = require("fs");

// This block of code will read from the "random.txt" file.
// The code will store the contents of the reading inside the variable "spotifyData"
fs.readFile("random.txt", "utf8", function(error, spotifyData) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of spotifyData
  console.log(spotifyData);

  // Then split it by commas (to make it more readable)
  var dataArr = spotifyData.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);

});
*/