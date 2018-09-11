/* Make it so liri.js can take in one of the following commands:
   concert-this
   spotify-this-song
   movie-this
   do-what-it-says
*/

// Load .env and key data
require("dotenv").config();
var keys = require("./keys.js");

// required NPM Packages
// npm require
//var fs = require("fs");
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

if (process.argv[2] == "--help" || process.argv[2] === "-h") {
    console.log("usage: liri.js [-h]");
    console.log(""); 
    console.log("optional arguments:");
    console.log("-h, --help         show this help message and exit");
    console.log("");
    console.log("node liri.js concert-this <artist/band name here>");
    console.log("");
    console.log("node liri.js spotify-this-song '<song name here>");
    console.log("");
    console.log("node liri.js movie-this '<movie name here>");
    console.log("");
    console.log("node liri.js do-what-it-says");
    console.log("");
    return;
}

// Main program
switch (process.argv[2]) {
    // node liri.js concert-this <artist/band name here>
    case "concert-this":
        concertThis();
        break;
    // node liri.js spotify-this-song '<song name here>
    case "spotify-this-song":
        spotifySong(process.argv[3]);
        break;
    // node liri.js movie-this '<movie name here>
    case "movie-this":
        movieThis(process.argv[3]);
        break;
    // node liri.js do-what-it-says
    case "do-what-it-says":
        doWhatISay();
        break;
};

function concertThis() {
    console.log("concert=this function");
    console.log(process.argv[3]);
    artist = process.argv[3];
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {

        // If the request was successful...
        if (!error && response.statusCode === 200) {

            // Then log the body from the site!
            console.log("statusCode: " + JSON.stringify(response.statusCode, null, 2));
            console.log(JSON.body);
        }
    });
};

function spotifySong(song) {
    console.log("spotify-this-song")
    console.log(song);
    if (song === undefined){
        song = "The Sign"
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //console.log(JSON.stringify(data, null, 2));
        console.log("")
        for(var i = 0; i < data.tracks.items.length; i++) {
            console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
            console.log("Song: " + song);
            console.log("Preview link: " + data.tracks.items[i].album.artists[0].external_urls.spotify);
            console.log("Album name: " + data.tracks.items[i].album.name);
            console.log("--------------------------------------------------------------------------------");
        };

    });
};

function movieThis(movieName) {
    console.log("movie-this");
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Release Year: " + JSON.parse(body).Year);
        }
    });
};

function doWhatISay() {
    console.log("do-what-it-says");
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(JSON.stringify(data, null, 2));
    });
};