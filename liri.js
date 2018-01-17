var dotenv = require('dotenv').config({path:'./keys.js'}); 
if (dotenv.err) {
throw dotenv.err}
const buf = new Buffer('BASIC=basic')
var config = dotenv.parse(buf)
console.log(process.env)
const fs = require('fs')
const request = require('request');
const spotify = require('spotify')
/*const spotifyApi = new SpotifyWebApi({*/
    //clientId: process.env.SPOTIFY_ID,
    //clientSecret: process.env.SPOTIFY_SECRET
//});

const Twitter = require('twitter');
const twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const program = process.argv[2];
const command = process.argv[3];

// Switch Statement
switch (program) {
    case 'movie-this':
        movieSearch(command);
        break;
    case 'spotify-this-song':
        spotifySearch(command)
        break;
    case 'my-tweets':
        postTwitter(command)
        break;
}

// Movie Search function
function movieSearch(command) {
    let queryUrl = 'http://www.omdbapi.com/?t=' + command + '&y=&plot=short&apikey=trilogy';
    request(queryUrl, (err, res, body) => {
        if (err) {
            console.log(err);
        }
        let data = JSON.parse(body);
        console.log(`
Title: ${data.Title} (${data.Year}) ${data.Rated}
Genre: ${data.Genre}  Runtime: ${data.Runtime}

Plot Summary:
${data.Plot}

Starring: ${data.Actors}
Directed by ${data.Director}
Written by ${data.Writer}`);
    });
}

// Spotify search funtion
function spotifySearch(command) {
    spotify.search({ type: 'track', query: command, limit: 20, id: spotify.id}, (err, data) => {
       if ( err ) {
        console.log('Error occurred: ' + err)
        return
       } 
        console.log(data)
    })
 }  

// Twitter post funtion
function postTwitter(command) {
    console.log(process.env)
console.log(config)
}
