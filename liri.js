const dotenv = require('dotenv').config();
if (dotenv.err) {
  throw dotenv.err;
}
const env = dotenv.parsed
const fs = require('fs');
const request = require('request');

const Spotify = require('node-spotify-api');
const spotify = new Spotify({
  id: env.SPOTIFY_ID,
  secret: env.SPOTIFY_SECRET,
});
const Twitter = require('twitter');
const client = new Twitter({
  consumer_key: env.TWITTER_CONSUMER_KEY,
  consumer_secret: env.TWITTER_CONSUMER_SECRET,
  access_token_key: env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: env.TWITTER_ACCESS_TOKEN_SECRET,
});

const program = process.argv[2];
const command = process.argv[3];

// Switch Statement
switch (program) {
  case 'movie-this':
    movieSearch(command);
    break;
  case 'spotify-this-song':
    spotifySearch(command);
    break;
  case 'my-tweets':
    postTwitter(command);
    break;
  case 'do-what-it-says':
    doIt();
    break;
}

// Movie Search function
function movieSearch(command) {
  let queryUrl =
    'http://www.omdbapi.com/?t=' + command + '&y=&plot=short&apikey=trilogy';
  request(queryUrl, (err, res, body) => {
    if (err) {
      console.log(err);
    }
    let data = JSON.parse(body);
    console.log(`
Title: ${data.Title}   (${data.Year})    Rated: ${data.Rated}\n
Genre: ${data.Genre}  Runtime: ${data.Runtime} \n
Plot Summary: \n${data.Plot}\n
Starring: ${data.Actors}\n
Directed by ${data.Director}\n
Written by ${data.Writer}
    `);
  });
}

// TODO: make this shiz mo betta
// Spotify search funtion
function spotifySearch(command) {
  if (command === undefined) {
    command = 'Never gonna give you up';
  }
  spotify.search({
      type: 'track',
      query: command,
      limit: 3
    },
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      let songs = data.tracks.items;
      for (song in songs) {
        let test = JSON.stringify(songs[song], undefined, 2);
        let s = songs[song]
        let a = []
        for (artist in s.artists) {
          let name = s.artists[artist].name
          a.push(name)
        }
        // console.log(test);
        console.log(` 
#${parseInt(song) + 1}: "${s.name}"\nArtist: ${a[0]} `)
        if (a[1] !== undefined) {
          console.log(`featuring ${a[1]}`)
        } else if (s.preview_url !== null)
          console.log(`Link to preview:\n${s.preview_url}`)
      }
    });
}

// TODO: Change to request
// Twitter get funtion

function postTwitter(command) {
  client.get('statuses/update', {
    status: command
  }, (err, tweet, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log(tweet)
      console.log(res)
    }
  })
}