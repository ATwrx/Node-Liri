const dotenv = require('dotenv').config(); 
const request = require('request');

const spotify = new Spotify(keys.spotify)
const twitter = new Twitter(keys.twitter)

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
Title: ${data.Title} (${data.Year} )${data.Rated}
Genre: ${data.Genre}        Runtime: ${data.Runtime}

    ${data.Plot}

Starring: ${data.Actors}
Directed by ${data.Director}
Written by ${data.Writer}`);
    });
}

// Spotify search funtion
function spotifySearch(command) {
console.log("spotify")}  

// Twitter post funtion
function postTwitter(command) {
console.log('tweeter')}