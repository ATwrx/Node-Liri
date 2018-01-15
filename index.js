const fs = require('fs');
const spotify = require('spotify');
const spotifyID = 'ced41733d1f04182a191baed2f7b00cc';
const request = require('request');
const twitter = require('twitter');

const program = process.argv[2];
const command = process.argv[3];
const args1 = process.argv[4];
const args2 = process.argv[5];

//Switch Statement
switch (program) {
    case 'movie':
        searchMovie(command);
        break;
    case 'spotify':
        spotifySearch(command)
        break;
    case 'twitter':
        twitter(command)
        break;
}

//OMDB Search function
function searchMovie(command) {
    let queryUrl = 'http://www.omdbapi.com/?t=' + command + '&y=&plot=short&apikey=trilogy';
    request(queryUrl, (err, res, body) => {
        if (err) {
            console.log(err);
        }
        let data = JSON.parse(body);
        console.log(' ');
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

