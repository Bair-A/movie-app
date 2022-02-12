'use strict';
// variables and constants
const url = 'https://api.themoviedb.org/3/movie/popular?api_key=8357f16dd86f4e87399151581bec47d2';

const main = document.querySelector('.main');
const form = document.querySelector('.header__form');
const search = document.querySelector('.header__search');

// listeners
form.addEventListener('submit', (event) => {
    event.preventDefault();

    document.querySelectorAll('.movie').forEach((elem) => elem.remove());

    const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=8357f16dd86f4e87399151581bec47d2&query=${search.value}`;

    async function getDataSearch() {
        const res = await fetch(urlSearch);
        const data = await res.json();
        
        let movieDataArr = data['results'];
        movieDataArr.map(element => createMovieCard(element))
      }

      getDataSearch();

})

// code 
getData();

// functions
async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    
    // console.log(data);
    let movieDataArr = data['results'];
    movieDataArr.map(element => createMovieCard(element))
    
  }
  
function createMovieCard(element) {
    const movie = document.createElement('div');
    movie.classList.add('movie');

    const img = document.createElement('img');
    img.classList.add('poster');
    img.src = `https://image.tmdb.org/t/p/w500${element['poster_path']}`;

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-info');

    const movieTitle = document.createElement('h3');
    movieTitle.classList.add('movie-title');
    movieTitle.innerHTML = element['title'];

    const movieGrade = document.createElement('span');
    movieGrade.classList.add('movie-grade')

    const movieGradeValue = element['vote_average'];

    if (movieGradeValue >= 8) {
        movieGrade.classList.add('green')
    } else if (movieGradeValue >= 5) {
        movieGrade.classList.add('orange')
    } else {
        movieGrade.classList.add('red')
    }

    movieGrade.innerHTML = movieGradeValue;

    const overview = document.createElement('div');
    overview.classList.add('overview');

    const overviewTitle = document.createElement('h3');
    overviewTitle.classList.add('overview-title');
    overviewTitle.innerHTML = 'Overview';
    
    const overviewText = document.createElement('p');
    overviewText.classList.add('overview-text');
    overviewText.innerHTML = element['overview'];

    movie.append(img);

    movieInfo.append(movieTitle);
    movieInfo.append(movieGrade);
    movie.append(movieInfo);

    overview.append(overviewTitle);
    overview.append(overviewText);
    movie.append(overview);
    
    main.append(movie);
} 
    