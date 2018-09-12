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
// Time formating
var moment = require("moment");
// File system
var fs = require("fs");
// http request (POST, GET, PUT, DELETE, )
var request = require('request');
// Spotify API
var Spotify = require('node-spotify-api');
// Spotify Keys
var spotify = new Spotify(keys.spotify);

// CLI Help
if (process.argv[2] == "--help" || process.argv[2] === "-h") {
    console.log("usage: liri.js [-h]");
    console.log("");
    console.log("optional arguments:");
    console.log("-h, --help         show this help message and exit");
    console.log("");
    console.log("node liri.js concert-this <artist/band name here>");
    console.log("");
    console.log("node liri.js spotify-this-song <song name here>");
    console.log("");
    console.log("node liri.js movie-this <movie name here>");
    console.log("");
    console.log("node liri.js do-what-it-says");
    console.log("");
    return;
}

mainFunc(process.argv[2], process.argv[3])

// Main function
function mainFunc(argv2, argv3) {
    switch (argv2) {
        // node liri.js concert-this <artist/band name here>
        case "concert-this":
            concertThis(argv3);
            return;
        // node liri.js spotify-this-song '<song name here>
        case "spotify-this-song":
            spotifySong(argv3);
            return;
        // node liri.js movie-this '<movie name here>
        case "movie-this":
            movieThis(argv3);
            return;
        // node liri.js do-what-it-says
        case "do-what-it-says":
            doWhatISay();
            break;
    };
};


function concertThis(movieArtist) {
    //console.log("concert-this");
    //console.log(movieArtist);
    artist = movieArtist;
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {

        // If the request was successful...
        if (!error && response.statusCode === 200) {

            // Then log the body from the site!
            console.log("statusCode: " + JSON.stringify(response.statusCode, null, 2));
            // console.log(JSON.parse(body));
            body = JSON.parse(body);
            //for (var b = 0; b <= body.length; b++){
            for (var b in body) {
                console.log(b + " " + body[b].venue.name + "\t " + body[b].venue.city + "\t " + body[b].venue.region + "\t " + body[b].venue.country + "\t " + moment(body[b].datetime).format('MM/DD/YYYY'));
            }
            console.log("-----------------------------------------------------------------------------------");
        }
    });
};

function spotifySong(song) {
    //console.log("spotify-this-song")
    //console.log(song);
    if (song === undefined) {
        song = "The Sign"
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //console.log(JSON.stringify(data, null, 2));
        console.log("")
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
            console.log("Song: " + song);
            console.log("Preview link: " + data.tracks.items[i].album.artists[0].external_urls.spotify);
            console.log("Album name: " + data.tracks.items[i].album.name);
            console.log("-----------------------------------------------------------------------------------");
        };

    });
};

function movieThis(movieName) {
    console.log("movie-this");
    console.log(movieName);
    if (movieName === undefined) {
        movieName = "Mr. Nobody";
    };
    console.log(movieName);
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    //console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            //console.log(JSON.parse(body));
            var json_data = JSON.parse(body);
            console.log("Titie: " + json_data.Title);
            console.log("Year Released: " + json_data.Year);
            console.log("IMDB Rating: " + json_data.imdbRating);
            console.log("Rotten Tomatores Rating: " + json_data.Ratings[1].Value);
            console.log("Country Produced: " + json_data.Country);
            console.log("Language of Movie: " + json_data.Language);
            console.log("Plot: " + json_data.Plot);
            console.log("Actors: " + json_data.Actors);
            console.log("-----------------------------------------------------------------------------------");
        }
    });
};

function doWhatISay() {
    //console.log("do-what-it-says");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // for debuging print the content of data
        //console.log(data);

        // Split by commas
        var dataArr = data.split(',');
        //console.log(dataArr.length);
        
        for (var ranData = 0; ranData < dataArr.length; ranData = ranData + 2) {
            //console.log( ranData + " " + dataArr[ranData].trim() + " " + dataArr[ranData + 1].trim());
            mainFunc(dataArr[ranData].trim(), dataArr[ranData + 1].trim());
        };
    });
};