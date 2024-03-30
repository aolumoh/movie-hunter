"use strict";

import * as utils from './utils.js'
import movies from './movies.js';

const searchInput = utils.select('.search-input');
const searchButton = utils.select('.search-button');
const movieInfo = utils.select('.movie-info');
const resultList = utils.select('.list');
let chosenMovie = '';

/*--------------------*/
/*    Search Movies   */
/*--------------------*/
function searchMovie(name) {
  const matches =
    movies.filter(movie => movie.title.toLowerCase().includes(name.toLowerCase()));
  let matchTitles = matches.map(movie => movie.title);
  if (matchTitles.length > 5) {
    matchTitles = matchTitles.slice(0, 5)
  }
  return matchTitles;
}


/*--------------------*/
/*    List Movies   */
/*--------------------*/

function convertToList(input) {
  let occurences = searchMovie(input);

  if (occurences.length > 0) {
    occurences = occurences.map(title => '<li>' + title + '</li>');
  } else {
    occurences = ['<p>Movie not found<p>'];
  }

  resultList.innerHTML = occurences.join(' ');
}

/*--------------------*/
/*   Display Movies   */
/*--------------------*/

function displayMovie(title) {
  const foundMovie = movies.find(movie => movie.title.trim().toLowerCase() === (title.trim().toLowerCase()));

  if (!foundMovie) {
    console.error('Movie not found:', title);
  } else {
    movieInfo.innerHTML = `
    <div class="movie-photo"><img src="${foundMovie.poster}" alt="${foundMovie.title}"></div>
    <div class="movie-info">
      <div class="title">${foundMovie.title}</div>
      <div class="year-runtime">${foundMovie.year} | ${foundMovie.runningTime}</div>
      <div class="description">${foundMovie.description}</div>
      <div class="tags">${foundMovie.genre.join(' ')}</div>
    </div>
    `;
  }
}

/*----------------------------*/
/*   Implement all the work   */
/*----------------------------*/

// type in search term
utils.listen('input', searchInput, () => {
  if (searchInput.value.length >= 3) {
    convertToList(searchInput.value);

    const listItems = utils.selectAll('li');

    listItems.forEach(item => {
      utils.listen('click', item, () => {
        searchInput.value = item.textContent;
        chosenMovie = item.textContent;
        utils.listen('click', searchButton, displayMovie(chosenMovie));
        resultList.textContent = '';
      });
    });
  }
  else {
    resultList.textContent = '';
  }
});
