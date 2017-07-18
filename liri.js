var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

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
      console.log(data);
    });
}
