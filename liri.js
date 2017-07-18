var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
// var Movie = require('request');

var keys = require("./keys.js");

var firstArgv = process.argv[2]

var userTwitter = function() {
  var client = new Twitter(keys.twitterKeys);
  var params = {screen_name: 'strongmalcolm3'}

  client.get("statuses/user_timeline", params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].created_at);
      console.log("");
      console.log(tweets[i].text);
    }
  }
    if (error) {
      console.log(error);

    }
  })
}
if (firstArgv === "my-tweets") {
  userTwitter();
}

if (process.argv[2] === "spotify-this-song") {

  var spotify = new Spotify({
    id: "2b6101e7345349d791330b3ca512296a",
    secret: "e626223fc5f149c3938e3c5d376c5b65"
  });

  var nodeArgs = process.argv;
  var songTitle = "";

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      songTitle = songTitle + "+" + nodeArgs[i];
    } else {
      songTitle += nodeArgs[i];
    }
  }

  var query = { type: 'track', query: songTitle };

  spotify.search(query, function(err, data) {
    if (err) {
      return console.log('Error Ocurred: ' + err);
    }

    var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        // console.log(i);
        console.log("album: " + songs[i].album.name);
        console.log("artist(s): " + songs[i].artists);

        var artist =  songs[i].artists
       for (var i = 0; i < artist.length; i++) {
        //  console.log(i);
         console.log(artist[i].name);
    // console.log(data);
    }
  }

    });
}

    // var nodeArgs = process.argv;
    //
    // // Create an empty variable for holding the movie name
    // var movieName = "";
    //
    // // Loop through all the words in the node argument
    // // And do a little for-loop magic to handle the inclusion of "+"s
    // for (var i = 2; i < nodeArgs.length; i++) {
    //
    //   if (i > 2 && i < nodeArgs.length) {
    //
    //     movieName = movieName + "+" + nodeArgs[i];
    //
    //   }
    //
    //   else {
    //
    //     movieName += nodeArgs[i];
    //
    //   }
    // }
    //
    // // Then run a request to the OMDB API with the movie specified
    // var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    //
    // // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);
    //
    // request(queryUrl, function(error, response, body) {
    //
    //   // If the request is successful
    //   if (!error && response.statusCode === 200) {
    //
    //     // Parse the body of the site and recover just the imdbRating
    //     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    //     console.log("Release Year: " + JSON.parse(body).Year);
    //   }
    // });
